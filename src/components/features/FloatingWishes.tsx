import React, { useEffect, useState } from 'react';
import { GOOGLE_SCRIPT_URL } from '../../config';
import { X, MessageCircle } from 'lucide-react';

interface WishData {
    name: string;
    message: string;
    timestamp: string;
}

export const FloatingWishes: React.FC = () => {
    const [wishes, setWishes] = useState<WishData[]>([]);
    const [shouldHide, setShouldHide] = useState(false);
    const [isUserHidden, setIsUserHidden] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                // If RSVP section is at least 10% visible, hide the wishes
                setShouldHide(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        const rsvpSection = document.getElementById('rsvp-section');
        const openingSection = document.getElementById('opening-section');

        if (rsvpSection) observer.observe(rsvpSection);
        if (openingSection) observer.observe(openingSection);

        return () => {
            if (rsvpSection) observer.unobserve(rsvpSection);
            if (openingSection) observer.unobserve(openingSection);
        };
    }, []);

    const fetchWishes = async () => {
        try {
            const response = await fetch(GOOGLE_SCRIPT_URL);
            const result = await response.json();
            if (result.result === 'success' && result.data && Array.isArray(result.data)) {
                const filteredWishes = result.data.filter((w: any) => w.message && w.message.trim() !== '');
                if (filteredWishes.length > 0) {
                    setWishes(filteredWishes);
                }
            }
        } catch (error) {
            console.error("Error fetching wishes:", error);
        }
    };

    useEffect(() => {
        fetchWishes();
        const pollInterval = setInterval(fetchWishes, 60000);
        return () => clearInterval(pollInterval);
    }, []);

    if (wishes.length === 0) return null;

    // To ensure a smooth "wheel" effect with exactly 5 visible:
    // 1. Create a base list that has at least 5 items (repeat if necessary)
    // 2. Double it for seamless marquee
    const baseWishes = [...wishes];
    while (baseWishes.length < 5) {
        baseWishes.push(...wishes);
    }

    // items to scroll: [A, B, C, A, B, C]
    const scrollList = [...baseWishes, ...baseWishes];

    const duration = Math.max(15, baseWishes.length * 4); // Slower for readability if wrapping

    return (
        <>
            <div className={`fixed bottom-10 left-4 z-[9999] pointer-events-none transition-all duration-700 ease-in-out ${shouldHide || isUserHidden ? 'opacity-0 translate-y-10 scale-95 pointer-events-none' : 'opacity-100 translate-y-0 scale-100'
                }`}>
                {/* The "Frame" that shows exactly 5 items */}
                <div className="relative h-[260px] overflow-hidden mask-fade-vertical w-[280px] md:w-[350px]">
                    <div
                        className="flex flex-col gap-2 absolute left-0 top-0 w-full animate-wheel-scroll"
                        style={{
                            '--duration': `${duration}s`
                        } as React.CSSProperties}
                    >
                        {scrollList.map((wish, index) => (
                            <div
                                key={`${wish.timestamp}-${index}`}
                                className="bg-white/90 backdrop-blur-sm border border-slate-100 rounded-xl px-4 py-2 min-h-[40px] flex items-center shadow-soft pointer-events-auto transition-all hover:scale-102 hover:shadow-md w-fit max-w-[300px] md:max-w-[450px]"
                            >
                                <span className="text-xs font-sans whitespace-normal break-words">
                                    <span className="font-bold text-primary mr-1.5">
                                        {wish.name}:
                                    </span>
                                    <span className="text-slate-600">
                                        {wish.message}
                                    </span>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Toggle Button - Bottom Right */}
            <div className={`fixed bottom-10 right-4 z-[9999] transition-all duration-700 ease-in-out ${shouldHide ? 'opacity-0 translate-y-10 pointer-events-none' : 'opacity-100 translate-y-0'}`}>
                <button
                    onClick={() => setIsUserHidden(!isUserHidden)}
                    className="bg-white/90 backdrop-blur-sm p-3 rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all duration-300 border border-slate-100 group"
                    aria-label={isUserHidden ? "Show Wishes" : "Hide Wishes"}
                >
                    {isUserHidden ? (
                        <MessageCircle className="w-5 h-5 text-slate-600 group-hover:text-primary transition-colors" />
                    ) : (
                        <X className="w-5 h-5 text-slate-600 group-hover:text-red-500 transition-colors" />
                    )}
                </button>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                @keyframes wheel-scroll {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
                .animate-wheel-scroll {
                    animation: wheel-scroll var(--duration) linear infinite;
                }
                .mask-fade-vertical {
                    mask-image: linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%);
                }
            `}} />
        </>
    );
};
