import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Gift } from 'lucide-react';

interface BankQRProps {
    name: string;
    bankName: string;
    accountNumber: string;
    qrUrl: string;
    label: string;
}

const BankCard: React.FC<BankQRProps> = ({ name, bankName, accountNumber, qrUrl, label }) => {
    return (
        <div className="bg-[#FFFFFF] rounded-xl p-3 md:p-6 shadow-soft flex flex-col items-center gap-3 border border-slate-50 transition-all duration-300 w-full">
            <span className="text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#64748B] font-bold text-center">{label}</span>
            <div className="relative w-28 h-28 md:w-44 md:h-44 bg-[#F8FAFC] rounded-lg overflow-hidden p-2 border border-slate-100 shadow-inner">
                <img
                    src={qrUrl}
                    alt={`Mã QR ${name}`}
                    className="w-full h-full object-contain"
                />
            </div>
            <div className="text-center w-full">
                <p className="font-display text-sm md:text-xl text-primary mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">{name}</p>
                <div className="space-y-1">
                    <p className="text-[9px] md:text-[11px] font-medium text-[#64748B]">{bankName}</p>
                    <div className="flex items-center justify-center gap-1 bg-[#F8FAFC] px-2 py-1 md:px-3 md:py-1.5 rounded-md border border-slate-100 group/code cursor-pointer hover:bg-slate-100 transition-colors mx-auto w-fit"
                        onClick={() => {
                            navigator.clipboard.writeText(accountNumber);
                            alert('Đã sao chép số tài khoản!');
                        }}>
                        <p className="text-[10px] md:text-xs font-mono font-bold text-[#2563EB] tracking-wider">
                            {accountNumber}
                        </p>
                        <svg className="w-3 h-3 text-[#64748B] group-hover/code:text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const GiftSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const sectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isOpen && sectionRef.current) {
            // Wait for the animation start/layout change before scrolling
            setTimeout(() => {
                sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 100);
        }
    }, [isOpen]);

    const groomBank = {
        name: "BÙI VĂN ĐỨC",
        bankName: "TP Bank",
        accountNumber: "26092011200",
        qrUrl: "https://img.vietqr.io/image/TPB-26092011200-compact.png?accountName=BUI%20VAN%20DUC",
        label: "Mừng cưới Chú rể"
    };

    const brideBank = {
        name: "TRẦN THỊ LAM TUYÊN",
        bankName: "BIDV",
        accountNumber: "3143048130",
        qrUrl: "https://img.vietqr.io/image/BIDV-3143048130-compact.png?accountName=TRAN%20THI%20LAM%20TUYEN",
        label: "Mừng cưới Cô dâu"
    };

    return (
        <div ref={sectionRef} className="flex flex-col items-center w-full scroll-mt-10">
            <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer group flex flex-col items-center gap-1 transition-all duration-500"
            >
                <div className="w-10 h-10 border border-primary/20 rounded-full flex items-center justify-center group-hover:bg-primary/5 transition-all duration-300">
                    <Gift className="text-primary" size={20} strokeWidth={1} />
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="font-display text-xl text-primary italic leading-tight">Hộp Thư Chúc Phúc</h3>
                </div>
                <ChevronDown
                    className={`text-primary/40 group-hover:text-primary transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`}
                    size={14}
                />
            </div>

            <div className={`overflow-hidden transition-all duration-700 ease-in-out w-full ${isOpen ? 'max-h-[1200px] opacity-100 mt-8' : 'max-h-0 opacity-0'}`}>
                <div className="bg-white p-4 md:p-8 rounded-2xl shadow-soft border border-slate-50 grid grid-cols-2 gap-3 md:gap-8 w-full max-w-2xl mx-auto">
                    <BankCard {...groomBank} />
                    <BankCard {...brideBank} />
                </div>
            </div>
        </div>
    );
};
