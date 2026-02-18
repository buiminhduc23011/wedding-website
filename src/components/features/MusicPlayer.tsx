import React, { useState, useEffect, useRef } from 'react';

export const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(true); // Default to true (optimistic)
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        audioRef.current = new Audio('/music/wedding-song.mp3');
        audioRef.current.loop = true;

        const playAudio = () => {
            if (audioRef.current && audioRef.current.paused) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        // Remove listeners only after success
                        document.removeEventListener('click', handleInteraction);
                        document.removeEventListener('touchstart', handleInteraction);
                    })
                    .catch((e) => {
                        console.log("Auto-play prevented:", e);
                        setIsPlaying(false);
                        // Do NOT remove listeners here, so we can try again on next click
                    });
            }
        };

        // Attempt initial auto-play
        playAudio();

        // Fallback: Play on first interaction if blocked
        const handleInteraction = () => {
            playAudio();
        };

        document.addEventListener('click', handleInteraction);
        document.addEventListener('touchstart', handleInteraction);
        // Removed scroll listener as it rarely allows audio

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
            document.removeEventListener('click', handleInteraction);
            document.removeEventListener('touchstart', handleInteraction);

        };
    }, []);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="fixed top-6 right-6 z-[60]">
            <button
                onClick={togglePlay}
                className="relative group transition-all duration-500 hover:scale-110 active:scale-95 flex items-center justify-center"
                aria-label="Toggle Music"
            >
                {/* Vinyl Record Design */}
                <div className={`relative w-14 h-14 md:w-16 md:h-16 flex items-center justify-center rounded-full bg-black shadow-2xl transition-all duration-700 ${isPlaying ? 'animate-spin-slow opacity-100 scale-100' : 'rotate-0 opacity-40 scale-90'}`}>
                    {/* Inner Grooves */}
                    <div className="absolute inset-1 border-[3px] border-white/5 rounded-full"></div>
                    <div className="absolute inset-2 border-[2px] border-white/10 rounded-full"></div>
                    <div className="absolute inset-4 border-[2px] border-white/5 rounded-full"></div>

                    {/* Center Label */}
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white flex items-center justify-center relative z-10 text-black">
                        {/* Spindle hole */}
                        <div className="w-1.5 h-1.5 rounded-full bg-black/20"></div>
                    </div>

                    {/* Glossy Reflection */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent rounded-full opacity-50"></div>

                    {/* Diagonal Slash when paused */}
                    {!isPlaying && (
                        <div className="absolute inset-0 z-20 flex items-center justify-center">
                            <div className="w-[120%] h-[4px] bg-white/60 rotate-45 rounded-full shadow-sm"></div>
                        </div>
                    )}
                </div>
            </button>
        </div>
    );
};
