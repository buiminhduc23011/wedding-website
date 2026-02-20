import React, { useEffect, useState, useRef } from 'react';
import { ASSETS_VERSION } from '../../config';
import { Heart } from 'lucide-react';

interface OpeningSectionProps {
    id?: string;
}

export const OpeningSection: React.FC<OpeningSectionProps> = ({ id }) => {
    const [showContent, setShowContent] = useState(false);
    const [hearts, setHearts] = useState<{ id: number; left: string; size: number; duration: number; delay: string }[]>([]);
    const autoScrollTimer = useRef<any>(null);

    useEffect(() => {
        // Generate heart particles
        const newHearts = Array.from({ length: 40 }, (_, i) => ({
            id: i,
            left: `${Math.random() * 100}%`,
            size: 10 + Math.random() * 20,
            duration: 4 + Math.random() * 6,
            delay: `${Math.random() * 0.1}s`
        }));
        setHearts(newHearts);

        // Show main content after hearts start falling
        const contentTimer = setTimeout(() => setShowContent(true), 1200);

        // Auto-scroll logic
        const startAutoScroll = () => {
            autoScrollTimer.current = setTimeout(() => {
                const scrollStep = () => {
                    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
                    if (window.scrollY < maxScroll) {
                        window.scrollBy({ top: 1, behavior: 'auto' });
                        autoScrollTimer.current = setTimeout(scrollStep, 15);
                    }
                };
                scrollStep();
            }, 5000); // 5 seconds of inactivity
        };

        const stopAutoScroll = () => {
            if (autoScrollTimer.current) {
                clearTimeout(autoScrollTimer.current);
                autoScrollTimer.current = null;
            }
        };

        // Event listeners to handle user interaction
        const handleInteraction = () => {
            stopAutoScroll();
        };

        // window.addEventListener('scroll', handleInteraction, { passive: true }); // This was the bug!
        window.addEventListener('wheel', handleInteraction, { passive: true });
        window.addEventListener('mousedown', handleInteraction);
        window.addEventListener('touchstart', handleInteraction);
        window.addEventListener('keydown', handleInteraction);

        startAutoScroll();

        return () => {
            clearTimeout(contentTimer);
            stopAutoScroll();
            window.removeEventListener('wheel', handleInteraction);
            window.removeEventListener('mousedown', handleInteraction);
            window.removeEventListener('touchstart', handleInteraction);
            window.removeEventListener('keydown', handleInteraction);
        };
    }, []);

    return (
        <section id={id} className="relative h-screen w-full bg-[#ada89c] flex items-center justify-center overflow-hidden">
            {/* Heart Rain particles */}
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="heart-particle"
                    style={{
                        left: heart.left,
                        animation: `heart-fall ${heart.duration}s linear ${heart.delay} infinite`
                    }}
                >
                    <div style={{ animation: 'heart-sway 3s ease-in-out infinite' }}>
                        <Heart
                            size={heart.size}
                            fill="#ff4d4d"
                            className="text-[#ff4d4d] opacity-80"
                            strokeWidth={0}
                        />
                    </div>
                </div>
            ))}

            {/* BIG "WEDDING" Solid Text */}
            <div className={`absolute top-[5%] md:top-[8%] left-8 md:left-24 z-20 pointer-events-none transition-all duration-[2000ms] ${showContent ? 'opacity-90 translate-y-0' : 'opacity-0 translate-y-10'} max-w-[calc(100vw-3rem)]`}>
                <h1 className="font-cursive text-8xl sm:text-10xl md:text-[13vw] leading-none text-white select-none drop-shadow-lg break-words italic">
                    Wedding
                </h1>
            </div>

            {/* Content Area - Arch Frame */}
            <div className="relative w-full h-full max-w-7xl mx-auto px-6 flex items-start pt-[12vh] md:pt-[15vh] justify-end md:pr-[5%] z-10 text-[#ada89c]">
                <div className={`relative w-[85%] sm:w-[70%] md:w-[45%] lg:w-[40%] aspect-[3/4.8] max-h-[80vh] transition-all duration-[2000ms] ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
                    <div className="w-full h-full bg-white rounded-t-full pl-4 md:pl-5 pr-2 md:pr-1 pt-2 md:pt-2 pb-2 md:pb-1 shadow-2xl overflow-hidden">
                        <div className="w-full h-full rounded-t-full overflow-hidden">
                            <img
                                src={`/Images/1.jpg?v=${ASSETS_VERSION}`}
                                alt="Wedding Couple"
                                className="w-full h-full object-cover animate-ken-burns"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Quote */}
            <div className={`absolute bottom-20 md:bottom-20 left-8 md:left-24 w-full text-left px-4 z-20 transition-all duration-[2000ms] delay-500 ${showContent ? 'opacity-90 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
                <div className="space-y-1">
                    <p className="font-display text-lg md:text-2xl text-white font-light tracking-wide italic leading-relaxed">
                        Thời gian làm mối tơ hồng,
                    </p>
                    <p className="font-display text-lg md:text-2xl text-white font-light tracking-wide italic leading-relaxed">
                        Thanh xuân là sính, trao lòng cho nhau
                    </p>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
                .delay-500 { transition-delay: 500ms; }
                `
            }} />
        </section>
    );
};
