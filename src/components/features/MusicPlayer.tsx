import React, { useState, useEffect, useRef } from 'react';
import { Music, Pause } from 'lucide-react';
import { Button } from '../ui/Button';

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
        <div className="fixed bottom-6 right-6 z-50">
            <Button
                variant="primary"
                onClick={togglePlay}
                className="rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-xl animate-pulse-slow active:scale-95 transition-transform"
                aria-label="Toggle Music"
            >
                {isPlaying ? <Pause size={32} /> : <Music size={32} />}
            </Button>
        </div>
    );
};
