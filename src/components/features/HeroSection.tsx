import React from 'react';
import { Countdown } from './Countdown';
import { ASSETS_VERSION } from '../../config';


export const HeroSection: React.FC = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 animate-ken-burns"
                style={{ backgroundImage: `url('/Images/2.jpg?v=${ASSETS_VERSION}')` }}
            >
                <div className="absolute inset-0 bg-white/0 backdrop-blur-[1px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
                <h3 className="text-sm md:text-base font-medium tracking-[0.3em] mb-6 uppercase text-white bg-white/10 px-4 py-1.5 rounded-pill w-fit mx-auto">Save the Date</h3>

                <div className="font-display text-7xl md:text-9xl mb-8 text-white drop-shadow-sm">
                    <div className="mb-2">Đức</div>
                    <div className="text-3xl font-sans text-white my-4 flex items-center justify-center gap-4">
                        <span className="h-px w-8 bg-white/20"></span>
                        &
                        <span className="h-px w-8 bg-white/20"></span>
                    </div>
                    <div>Tuyên</div>
                </div>

                <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24 bg-white/40 backdrop-blur-sm p-6 md:p-8 rounded-lg border border-white/50 shadow-soft w-full max-w-[calc(100vw-2rem)] mx-auto">
                    {/* Tiệc Nhà Trai */}
                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className="text-center">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-standby mb-2 font-medium">Tiệc Nhà Trai</p>
                            <p className="font-semibold text-xl text-slate-800">08 . 03 . 2026</p>
                        </div>
                        <Countdown targetDate="2026-03-08T00:00:00" />
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden md:block w-px h-24 bg-slate-200 shadow-sm"></div>

                    {/* Tiệc Nhà Gái */}
                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className="text-center">
                            <p className="text-[10px] uppercase tracking-[0.2em] text-standby mb-2 font-medium">Tiệc Nhà Gái</p>
                            <p className="font-semibold text-xl text-slate-800">07 . 03 . 2026</p>
                        </div>
                        <Countdown targetDate="2026-03-07T00:00:00" />
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
            </div>
        </section>
    );
};
