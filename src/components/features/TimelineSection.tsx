import React from 'react';
import { Section } from '../ui/Section';
import { Heart, Users, Home } from 'lucide-react';

export const TimelineSection: React.FC = () => {
    const milestones = [
        {
            year: "2020",
            Icon: Users,
            label: "Khởi đầu hành trình"
        },
        {
            year: "2026",
            Icon: Heart,
            label: "Ngày chung đôi"
        },
        {
            year: "∞",
            Icon: Home,
            label: "Mãi mãi bên nhau"
        }
    ];

    return (
        <Section id="timeline-section" className="bg-white py-12">
            <div className="max-w-3xl mx-auto px-4">
                <div className="flex flex-row items-center justify-center gap-4 md:gap-12 relative">
                    {milestones.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="flex flex-col items-center text-center">
                                {/* Year */}
                                <div className="font-display text-2xl mb-4 text-text-main">
                                    {item.year}
                                </div>

                                {/* Icon */}
                                <div className="text-primary p-2 border border-primary/10 rounded-full bg-neutral/30">
                                    <item.Icon size={32} strokeWidth={1.5} />
                                </div>
                            </div>

                            {/* Dash Separator */}
                            {index < milestones.length - 1 && (
                                <div className="text-primary/30 font-light text-4xl self-end mb-2">
                                    —
                                </div>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </Section>
    );
};
