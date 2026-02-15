import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { MapPin, Navigation } from 'lucide-react';

export const MapSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');

    const locations = {
        groom: {
            title: "NHÀ TRAI",
            name: "Tư Gia",
            date: "Chủ Nhật, 08/03/2026",
            address: "101 Huỳnh Khương Ninh - Tổ 13 - KP. Lam Sơn - P. Tân Phước - TP. HCM",
            mapQuery: "101 Huỳnh Khương Ninh, Phường Tân Phước, Hồ Chí Minh",
            googleMapsUrl: "https://maps.app.goo.gl/CuH1ASRRJ1RnnW3K6?g_st=iz"
        },
        bride: {
            title: "NHÀ GÁI",
            name: "Tư Gia",
            date: "Thứ Bảy, 07/03/2026",
            address: "Ấp Trại Ngang, X. Gò Công Đông, T. Đồng Tháp",
            mapQuery: "Ấp Trại Ngang, Xã Gò Công Đông, Đồng Tháp",
            googleMapsUrl: "https://maps.app.goo.gl/ZQJLVQTosgWAKTs4A?g_st=az"
        }
    };

    const current = locations[activeTab];

    return (
        <Section id="map-section" className="bg-neutral/50">
            <div className="text-center mb-10">
                <h2 className="text-3xl md:text-5xl font-display text-primary mb-4">Bản Đồ Chỉ Đường</h2>
                <div className="flex justify-center gap-4 mt-6">
                    <Button
                        variant={activeTab === 'groom' ? 'primary' : 'outline'}
                        onClick={() => setActiveTab('groom')}
                        className="min-w-[140px]"
                    >
                        Nhà Trai
                    </Button>
                    <Button
                        variant={activeTab === 'bride' ? 'primary' : 'outline'}
                        onClick={() => setActiveTab('bride')}
                        className="min-w-[140px]"
                    >
                        Nhà Gái
                    </Button>
                </div>
            </div>

            <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2 gap-8">
                    <div className="flex flex-col justify-center gap-4">
                        <div className="flex items-start gap-3">
                            <MapPin className="text-primary mt-1 shrink-0" />
                            <div>
                                <h3 className="font-bold text-xl text-text-main mb-1">{current.title}</h3>
                                <p className="font-bold text-primary mb-1">{current.date}</p>
                                <p className="font-medium text-lg mb-2">{current.name}</p>
                                <p className="text-gray-600">{current.address}</p>
                            </div>
                        </div>

                        <div className="mt-4">
                            <Button
                                fullWidth
                                onClick={() => window.open(current.googleMapsUrl, '_blank')}
                                className="flex items-center justify-center gap-2"
                            >
                                <Navigation size={20} />
                                Mở Google Maps
                            </Button>
                        </div>
                    </div>

                    <div className="h-[300px] w-full rounded-xl overflow-hidden border border-gray-200 shadow-inner bg-gray-100 relative">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(current.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            title="Map Preview"
                            className="absolute inset-0"
                        ></iframe>
                    </div>
                </div>
            </Card>
        </Section>
    );
};
