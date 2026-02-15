import React, { useState, useEffect } from 'react';
import { Section } from '../ui/Section';
import { Button } from '../ui/Button';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

const ALL_IMAGES = Array.from({ length: 21 }, (_, i) => `/Images/${i + 2}.jpg`); // 2.jpg to 22.jpg
const INITIAL_COUNT = 6;

export const GallerySection: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const [selectedImage, setSelectedImage] = useState<number | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const imagesToDisplay = showAll ? ALL_IMAGES : ALL_IMAGES.slice(0, INITIAL_COUNT);

    useEffect(() => {
        setIsVisible(true);
    }, []);

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
        <Section id="gallery-section" className="bg-white overflow-hidden">
            <div className={`text-center mb-12 transition-all duration-1000 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <h2 className="text-3xl md:text-5xl font-display text-primary mb-4">Khoảnh Khắc Hạnh Phúc</h2>
                <div className="w-24 h-1 bg-primary/20 mx-auto mb-6 rounded-full"></div>
                <p className="text-gray-600 max-w-2xl mx-auto">
                    Mỗi bức ảnh là một câu chuyện tình yêu, ghi dấu những phút giây ngọt ngào nhất của chúng mình.
                </p>
            </div>

            {/* Masonry Layout */}
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
                {imagesToDisplay.map((src, index) => (
                    <div
                        key={index}
                        className={`break-inside-avoid group relative overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
                        style={{ transitionDelay: `${index * 100}ms` }}
                        onClick={() => openLightbox(index)}
                    >
                        <img
                            src={src}
                            alt={`Wedding moment ${index + 1}`}
                            className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center cursor-pointer">
                            <div className="bg-white/90 p-3 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                <Maximize2 className="text-primary w-6 h-6" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {!showAll && (
                <div className="mt-12 text-center">
                    <Button
                        variant="outline"
                        onClick={() => setShowAll(true)}
                        className="px-12 py-4 text-lg hover:bg-primary hover:text-white transition-colors"
                    >
                        Xem thêm khoảnh khắc
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
