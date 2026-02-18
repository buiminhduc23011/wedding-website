import React, { useState, useEffect } from 'react';

interface TimeLeft {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
}

interface CountdownProps {
    targetDate: string;
}

export const Countdown: React.FC<CountdownProps> = ({ targetDate }) => {
    const targetTime = new Date(targetDate).getTime();

    const calculateTimeLeft = (): TimeLeft => {
        const difference = targetTime - new Date().getTime();
        let timeLeft: TimeLeft = {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60)
            };
        }

        return timeLeft;
    };

    const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, [targetDate]);

    const TimeUnit: React.FC<{ value: number; label: string }> = ({ value, label }) => (
        <div className="flex flex-col items-center min-w-[55px] md:min-w-[70px]">
            <div className="bg-white border border-slate-100 rounded-lg p-2 md:p-3 w-full shadow-soft mb-1 transform hover:scale-105 transition-all duration-300">
                <span className="text-lg md:text-xl font-semibold text-primary font-sans">
                    {value.toString().padStart(2, '0')}
                </span>
            </div>
            <span className="text-[10px] md:text-[11px] uppercase tracking-widest text-standby font-medium">
                {label}
            </span>
        </div>
    );

    return (
        <div className="flex items-center justify-center gap-2 md:gap-3 animate-fade-in">
            <TimeUnit value={timeLeft.days} label="Ngày" />
            <TimeUnit value={timeLeft.hours} label="Giờ" />
            <TimeUnit value={timeLeft.minutes} label="Phút" />
            <TimeUnit value={timeLeft.seconds} label="Giây" />
        </div>
    );
};
