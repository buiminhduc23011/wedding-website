import React from 'react';


export const HeroSection: React.FC = () => {
    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Image with Overlay */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
                style={{ backgroundImage: "url('/Images/1.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center text-white px-4 animate-fade-in-up">
                <h3 className="text-xl md:text-2xl font-light tracking-[0.2em] mb-4 uppercase">Save the Date</h3>

                <div className="font-script text-6xl md:text-8xl lg:text-9xl mb-6 text-primary transform hover:scale-105 transition-transform duration-700">
                    <div className="mb-2">Đức</div>
                    <div className="text-4xl my-2">&</div>
                    <div>Tuyên</div>
                </div>

                <div className="flex flex-col items-center gap-4 mt-8 font-light tracking-widest text-lg md:text-xl">
                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-12">
                        <div className="text-center">
                            <p className="text-xs uppercase opacity-80 mb-1">Tiệc Nhà Gái</p>
                            <p className="font-medium">Thứ Bảy, 07/03/2026</p>
                        </div>
                        <div className="hidden md:block w-px h-10 bg-white/30"></div>
                        <div className="text-center">
                            <p className="text-xs uppercase opacity-80 mb-1">Tiệc Nhà Trai</p>
                            <p className="font-medium">Chủ Nhật, 08/03/2026</p>
                        </div>
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
