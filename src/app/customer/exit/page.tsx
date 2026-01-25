"use client";

import { ArrowLeft, QrCode, ShieldCheck, Download, Share2 } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';

export default function ExitQRPage() {
    const exitId = "EXIT-8A2F-9B1C";

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6">
            <div className="w-full max-w-2xl flex flex-col min-h-screen">
                <header className="flex items-center justify-between mb-8">
                    <Link href="/customer" className="p-2 bg-white rounded-full shadow-sm text-slate-600">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-800">Exit Verification</h1>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white rounded-full shadow-sm text-slate-600">
                            <Share2 size={20} />
                        </button>
                    </div>
                </header>

                <main className="flex-1 flex flex-col items-center justify-center text-center">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white p-8 lg:p-10 rounded-[48px] shadow-2xl border border-slate-100 w-full max-w-sm relative overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 right-0 h-2 bg-indigo-600"></div>

                        <div className="mb-8">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                                <QrCode size={32} />
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-2">Exit Pass</h2>
                            <p className="text-slate-500 text-sm">Scan this at the exit gate sensor</p>
                        </div>

                        <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 shadow-inner mb-8 inline-block">
                            <QRCode value={exitId} size={200} />
                        </div>

                        <div className="space-y-1 mb-8">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Pass ID</p>
                            <p className="text-lg font-mono font-black text-slate-800">{exitId}</p>
                        </div>

                        <div className="flex items-center justify-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-50 py-3 rounded-2xl">
                            <ShieldCheck size={18} />
                            Payment Verified
                        </div>
                    </motion.div>

                    <div className="mt-12 w-full max-w-sm space-y-4">
                        <button className="w-full py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                            <Download size={20} />
                            Download Invoice PDF
                        </button>
                        <p className="text-slate-400 text-xs">A copy of your invoice has been sent to your email.</p>
                    </div>
                </main>
            </div>
        </div>
    );
}
