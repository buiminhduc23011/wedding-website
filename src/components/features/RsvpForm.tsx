import React, { useState } from 'react';
import { Section } from '../ui/Section';
import { Card } from '../ui/Card';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Send } from 'lucide-react';
import { GOOGLE_SCRIPT_URL } from '../../config';

export const RsvpForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        attending: 'yes',
        wishes: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Using text/plain to avoid CORS preflight options request which GAS doesn't handle well
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', // Important for Google Apps Script
                headers: {
                    'Content-Type': 'text/plain',
                },
                body: JSON.stringify({
                    Name: formData.name,
                    Phone: formData.phone,
                    Attending: formData.attending === 'yes' ? 'Có' : 'Không',
                    Wishes: formData.wishes
                })
            });

            // Since mode is no-cors, we can't check response.ok. We assume success if no network error.
            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại sau.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <Section id="rsvp-section">
                <Card className="text-center py-16">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
                        <Send size={32} />
                    </div>
                    <h3 className="text-3xl font-display text-primary mb-2">Cảm ơn bạn!</h3>
                    <p className="text-gray-600">Lời chúc của bạn đã được gửi đến Cô Dâu & Chú Rể.</p>
                    <Button variant="outline" className="mt-6" onClick={() => setSubmitted(false)}>
                        Gửi phản hồi khác
                    </Button>
                </Card>
            </Section>
        )
    }

    return (
        <Section id="rsvp-section" className="bg-neutral">
            <div className="text-center mb-12">
                <h3 className="text-3xl md:text-5xl font-display text-slate-800 mb-4">Gửi Lời Chúc</h3>
                <p className="text-standby max-w-lg mx-auto font-sans leading-relaxed">Sự hiện diện của quý khách là niềm vinh hạnh cho gia đình chúng tôi.</p>
            </div>

            <Card>
                <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <Input
                            label="Họ và Tên"
                            placeholder="Nhập tên của bạn"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                        <Input
                            label="Số Điện Thoại"
                            placeholder="Nhập số điện thoại"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>

                    <div>
                        <label className="text-sm font-medium text-text-main/80 ml-1 mb-2 block">Bạn sẽ tham dự chứ?</label>
                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, attending: 'yes' })}
                                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all shadow-soft border ${formData.attending === 'yes' ? 'bg-primary text-white border-primary' : 'bg-white text-standby border-slate-200 hover:border-primary/50'}`}
                            >
                                Chắc chắn!
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, attending: 'no' })}
                                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all shadow-soft border ${formData.attending === 'no' ? 'bg-standby text-white border-standby' : 'bg-white text-standby border-slate-200 hover:border-standby/50'}`}
                            >
                                Tiếc quá...
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label className="text-sm font-medium text-slate-700 ml-1">Lời chúc</label>
                        <textarea
                            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-[3px] focus:ring-primary/10 outline-none transition-all bg-white font-sans h-32 resize-none text-slate-700"
                            placeholder="Gửi lời chúc tốt đẹp đến cô dâu và chú rể..."
                            value={formData.wishes}
                            onChange={(e) => setFormData({ ...formData, wishes: e.target.value })}
                        />
                    </div>

                    <Button type="submit" fullWidth disabled={isSubmitting}>
                        {isSubmitting ? 'Đang gửi...' : (formData.attending === 'yes' ? 'Xác nhận tham dự' : 'Gửi lời chúc')}
                    </Button>
                </form>
            </Card>
        </Section>
    );
};
