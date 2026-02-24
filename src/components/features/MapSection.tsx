import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { MapPin, Navigation } from 'lucide-react';

export const MapSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState<'groom' | 'bride'>('groom');

    const locations = {
        groom: {
            title: "NHÀ TRAI",
            name: "Tư Gia",
            date: "Chủ Nhật, 08/03/2026",
            time: "11:00 SA",
            address: "101 Huỳnh Khương Ninh - Tổ 13 - KP. Lam Sơn - P. Tân Phước - TP. HCM",
            mapQuery: "101 Huỳnh Khương Ninh, Phường Tân Phước, Hồ Chí Minh",
            googleMapsUrl: "https://maps.app.goo.gl/CuH1ASRRJ1RnnW3K6?g_st=iz"
        },
        bride: {
            title: "NHÀ GÁI",
            name: "Tư Gia",
            date: "Thứ Bảy, 07/03/2026",
            time: "10:00 SA",
            address: "Ấp Trại Ngang, X. Gò Công Đông, T. Đồng Tháp",
            mapQuery: "Ấp Trại Ngang, Xã Gò Công Đông, Đồng Tháp",
            googleMapsUrl: "https://maps.app.goo.gl/ZQJLVQTosgWAKTs4A?g_st=az"
        }
    };

    const current = locations[activeTab];

    return (
        <Section id="map-section" className="bg-neutral">
            <div className="text-center mb-12">
                <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary mb-3">Bản đồ</h2>


                <div className="flex justify-center gap-3 mt-8">
                    <button
                        onClick={() => setActiveTab('groom')}
                        className={`px-6 py-2.5 rounded-pill text-sm font-bold transition-all shadow-soft border ${activeTab === 'groom' ? 'bg-primary text-white border-primary' : 'bg-white text-standby border-slate-200 hover:border-primary/50'}`}
                    >
                        Nhà Trai
                    </button>
                    <button
                        onClick={() => setActiveTab('bride')}
                        className={`px-6 py-2.5 rounded-pill text-sm font-bold transition-all shadow-soft border ${activeTab === 'bride' ? 'bg-primary text-white border-primary' : 'bg-white text-standby border-slate-200 hover:border-primary/50'}`}
                    >
                        Nhà Gái
                    </button>
                </div>
            </div>

            <Card className="max-w-5xl mx-auto p-0 overflow-hidden border border-slate-100 shadow-soft">
                <div className="grid md:grid-cols-2">
                    <div className="p-8 md:p-12 flex flex-col justify-center">
                        <div className="flex items-start gap-4 mb-8">
                            <div className="bg-primary/10 p-4 rounded-xl text-primary">
                                <MapPin size={28} />
                            </div>
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-2">{current.title}</h4>
                                <h5 className="text-2xl font-bold text-slate-800 mb-2">{current.name}</h5>
                                <p className="text-slate-600 font-sans leading-relaxed text-sm">{current.address}</p>
                            </div>
                        </div>

                        <div className="space-y-3 mb-8">
                            <div className="flex items-center gap-3 text-standby text-sm font-medium">
                                <span className="bg-slate-100 px-3 py-1 rounded-md text-slate-700">{current.date}</span>
                            </div>
                            <div className="flex items-center gap-3 text-standby text-sm font-medium">
                                <span className="bg-slate-100 px-3 py-1 rounded-md text-slate-700"> {current.time}</span>
                            </div>
                        </div>

                        <button
                            onClick={() => window.open(current.googleMapsUrl, '_blank')}
                            className="bg-primary text-white font-bold py-4 px-8 rounded-lg shadow-soft hover:bg-primary/90 transition-all flex items-center justify-center gap-3 w-full md:w-fit"
                        >
                            <Navigation size={20} />
                            <span>Mở Google Maps</span>
                        </button>
                    </div>

                    <div className="h-[400px] md:h-auto w-full bg-slate-100 grayscale-[0.3]">
                        <iframe
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            scrolling="no"
                            marginHeight={0}
                            marginWidth={0}
                            src={`https://maps.google.com/maps?q=${encodeURIComponent(current.mapQuery)}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
                            title="Map Preview"
                            className="w-full h-full"
                        ></iframe>
                    </div>
                </div>
            </Card>
        </Section>
    );
};
