import React, { useState, useEffect } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { ASSETS_VERSION } from '../../config';

const ALL_IMAGES = Array.from({ length: 12 }, (_, i) => `/Images/${i + 3}.jpg?v=${ASSETS_VERSION}`); // 3.jpg to 14.jpg
const INITIAL_COUNT = 12;

const QUOTES = [
    {
        lines: [
            "Mọi điều vĩnh hằng trên thế gian",
            "đều mang dấu vết tình yêu anh dành cho em",
            "như trăng khi tròn khi khuyết",
            "như mặt trời luôn mọc ở phương Đông",
            "như định luật I của Newton",
            "và như em – mãi yêu anh."
        ],
        footer: "Bên anh mãi mãi, dài lâu trọn đời"
    },
    {
        lines: [
            "Duyên do trời định, phận do người tạo",
            "Hạnh phúc do mình tự nắm giữ lấy",
            "Cảm ơn em đã xuất hiện",
            "Và viết tiếp bản tình ca này cùng anh."
        ],
        footer: "Hành trình hạnh phúc bắt đầu"
    },
    {
        lines: [
            "Có những điều bình dị",
            "Trở nên đặc biệt khi ta có nhau",
            "Cảm ơn vì đã cùng anh",
            "Đi qua những ngày nắng gắt",
            "Và cả những chiều mưa giông."
        ],
        footer: "Cùng nhau già đi, cùng nhau hạnh phúc"
    }
];

export const GallerySection: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);

    const imagesToDisplay = showAll ? ALL_IMAGES : ALL_IMAGES.slice(0, INITIAL_COUNT);

    // Group images into triplets
    const groupedImages = [];
    for (let i = 0; i < imagesToDisplay.length; i += 3) {
        groupedImages.push(imagesToDisplay.slice(i, i + 3));
    }

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    // Remove class when element leaves viewport to allow re-triggering
                    entry.target.classList.remove('is-visible');
                }
            });
        }, { threshold: 0.1 });

        const items = document.querySelectorAll('.gallery-item, .gallery-quote');
        items.forEach(item => observer.observe(item));

        return () => items.forEach(item => observer.unobserve(item));
    }, [imagesToDisplay]);

    const openLightbox = (index: number) => {
        setSelectedImage(index);
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        setSelectedImage(null);
        document.body.style.overflow = 'auto';
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage + 1) % ALL_IMAGES.length);
        }
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedImage !== null) {
            setSelectedImage((selectedImage - 1 + ALL_IMAGES.length) % ALL_IMAGES.length);
        }
    };

    return (
        <Section id="gallery-section" className="bg-[#fcfbf9]">
            <div className="text-center mb-24 animate-reveal-up is-visible">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Kỷ niệm bên nhau</h2>
                <h3 className="text-4xl md:text-6xl font-display text-slate-800 mb-6">Our Happy Moments</h3>
                <div className="w-16 h-px bg-primary/30 mx-auto"></div>
            </div>

            <div className="max-w-6xl mx-auto space-y-16">
                {groupedImages.map((group, groupIndex) => (
                    <div key={groupIndex} className="space-y-16">
                        {/* Triplet Group */}
                        <div className="space-y-4 md:space-y-8">
                            {/* 1. Large Top Image */}
                            {group[0] && (
                                <div
                                    className="gallery-item animate-reveal-up relative w-full aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                                    onClick={() => openLightbox(groupIndex * 3)}
                                >
                                    {/* Decorative background box */}
                                    <div className="absolute -top-4 -left-4 w-32 h-32 bg-[#ada89c]/10 rounded-full blur-3xl -z-10"></div>
                                    <img
                                        src={group[0]}
                                        className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105"
                                        alt="Wedding Memory"
                                    />
                                    <div className="absolute inset-0 bg-black/10 hover:bg-black/20 transition-colors duration-500"></div>
                                </div>
                            )}

                            {/* 2 & 3. Small Bottom Images */}
                            <div className="grid grid-cols-2 gap-4 md:gap-12">
                                {group[1] && (
                                    <div className="relative group">
                                        {/* Collage background element */}
                                        <div className="absolute top-4 left-4 inset-0 bg-[#ada89c]/10 rounded-xl -z-10 transform -rotate-3"></div>
                                        <div
                                            className="gallery-item animate-reveal-left aspect-[3/4] rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:-translate-y-2"
                                            style={{ transitionDelay: '200ms' }}
                                            onClick={() => openLightbox(groupIndex * 3 + 1)}
                                        >
                                            <img src={group[1]} className="w-full h-full object-cover" alt="Wedding Memory Small" />
                                        </div>
                                    </div>
                                )}
                                {group[2] && (
                                    <div className="relative pt-12 md:pt-24 group">
                                        <div
                                            className="gallery-item animate-reveal-right aspect-[3/4] rounded-xl overflow-hidden shadow-lg cursor-pointer transform transition-transform hover:-translate-y-2"
                                            style={{ transitionDelay: '400ms' }}
                                            onClick={() => openLightbox(groupIndex * 3 + 2)}
                                        >
                                            <img src={group[2]} className="w-full h-full object-cover" alt="Wedding Memory Small" />
                                        </div>

                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Artistic Interspersed Quote */}
                        {groupIndex < groupedImages.length - 1 && QUOTES[groupIndex % QUOTES.length] && (
                            <div className="gallery-quote animate-reveal-quote py-8 relative">
                                <div className="max-w-2xl ml-auto text-right pr-4 md:pr-12 relative">
                                    {/* Decorative line and circle */}
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 h-full w-px bg-slate-800/20 hidden md:block"></div>

                                    <div className="space-y-3">
                                        {QUOTES[groupIndex % QUOTES.length].lines.map((line, lIdx) => (
                                            <p
                                                key={lIdx}
                                                className="font-display text-lg md:text-2xl text-slate-800 leading-tight tracking-wide italic"
                                                style={{
                                                    marginRight: `${lIdx * 1}rem`,
                                                    opacity: 1 - (lIdx * 0.05)
                                                }}
                                            >
                                                {line}
                                            </p>
                                        ))}
                                    </div>

                                    {/* Footer lines */}
                                    <div className="mt-8 space-y-1 pr-2 md:pr-8">
                                        <p className="font-display text-base md:text-xl text-slate-500 italic opacity-80">
                                            {QUOTES[groupIndex % QUOTES.length].footer}
                                        </p>
                                        <div className="flex items-center justify-end gap-3 text-slate-400 font-display italic text-xs md:text-sm">
                                            <span>/ Love story about us /</span>
                                            {/* Decorative small circle blur element */}
                                            <div className="w-12 h-12 bg-[#ada89c]/10 rounded-full absolute -bottom-2 right-12 md:right-24 -z-10 blur-xl"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {!showAll && ALL_IMAGES.length > INITIAL_COUNT && (
                <div className="mt-16 text-center">
                    <Button
                        variant="outline"
                        onClick={() => setShowAll(true)}
                        className="px-12 py-4 text-lg hover:bg-primary hover:text-white transition-all rounded-full border-primary/20 text-primary"
                    >
                        Xem thêm nhiều kỷ niệm hơn
                    </Button>
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedImage !== null && (
                <div
                    className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md transition-opacity duration-300"
                    onClick={closeLightbox}
                >
                    <button
                        className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors p-2 z-[110]"
                        onClick={closeLightbox}
                    >
                        <X size={40} />
                    </button>

                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 hidden md:block"
                        onClick={prevImage}
                    >
                        <ChevronLeft size={60} />
                    </button>

                    <div className="relative max-w-5xl max-h-[90vh] px-4 animate-in zoom-in duration-300">
                        <img
                            src={ALL_IMAGES[selectedImage]}
                            alt="Full screen moment"
                            className="max-w-full max-h-[90vh] object-contain rounded-sm"
                        />
                        <div className="absolute bottom-[-40px] left-0 right-0 text-center text-white/60 text-sm">
                            Ảnh {selectedImage + 1} / {ALL_IMAGES.length}
                        </div>
                    </div>

                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-colors p-4 hidden md:block"
                        onClick={nextImage}
                    >
                        <ChevronRight size={60} />
                    </button>

                    {/* Mobile Controls */}
                    <div className="absolute bottom-10 flex gap-12 md:hidden">
                        <button onClick={prevImage} className="text-white/70 p-4"><ChevronLeft size={40} /></button>
                        <button onClick={nextImage} className="text-white/70 p-4"><ChevronRight size={40} /></button>
                    </div>
                </div>
            )}
        </Section>
    );
};
