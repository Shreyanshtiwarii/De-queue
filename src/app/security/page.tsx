"use client";

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Shield, Scan, Weight, CheckCircle2, AlertCircle, ArrowRight, RefreshCw, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecurityVerification() {
    const [step, setStep] = useState<'scan' | 'weight' | 'result'>('scan');
    const [receiptData, setReceiptData] = useState<any>(null);
    const [actualWeight, setActualWeight] = useState<number>(0);
    const [isVerifying, setIsVerifying] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
        if (step === 'scan') {
            const html5QrCode = new Html5Qrcode("security-reader");
            scannerRef.current = html5QrCode;

            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                onScanSuccess,
                () => { }
            ).catch(err => {
                console.error("Scanner error", err);
                setError("Camera access required for verification.");
            });
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.stop().catch(console.error);
            }
        };
    }, [step]);

    const onScanSuccess = (decodedText: string) => {
        // In a real app, fetch receipt details from API
        // For simulation, we'll use mock data
        setReceiptData({
            receiptId: decodedText,
            expectedWeight: 450,
            totalPrice: 340,
            items: [
                { name: "Classic Milk Chocolate", quantity: 2 },
                { name: "Organic Green Tea", quantity: 1 }
            ]
        });
        setStep('weight');
        if (scannerRef.current) scannerRef.current.stop();
    };

    const handleWeightVerification = () => {
        setIsVerifying(true);
        setTimeout(() => {
            setIsVerifying(false);
            setStep('result');
        }, 1500);
    };

    const reset = () => {
        setStep('scan');
        setReceiptData(null);
        setActualWeight(0);
        setError(null);
    };

    const weightMismatch = Math.abs(actualWeight - (receiptData?.expectedWeight || 0)) > 50; // 50g tolerance

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col">
            <header className="p-6 border-b border-white/10 flex justify-between items-center bg-slate-900/50 backdrop-blur-md sticky top-0 z-20">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center">
                        <Shield size={24} />
                    </div>
                    <div>
                        <h1 className="font-bold text-lg">Exit Security</h1>
                        <p className="text-[10px] text-white/40 uppercase font-bold tracking-widest">Gate #04 • Terminal 1</p>
                    </div>
                </div>
                <button className="p-2 text-white/40 hover:text-white transition-colors">
                    <LogOut size={20} />
                </button>
            </header>

            <main className="flex-1 p-6 flex flex-col max-w-md mx-auto w-full">
                {/* Progress Indicator */}
                <div className="flex gap-2 mb-8">
                    {[1, 2, 3].map((i) => (
                        <div
                            key={i}
                            className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${(i === 1 && step === 'scan') || (i === 2 && step === 'weight') || (i === 3 && step === 'result')
                                    ? "bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                                    : i < (step === 'scan' ? 1 : step === 'weight' ? 2 : 4)
                                        ? "bg-emerald-500"
                                        : "bg-white/10"
                                }`}
                        />
                    ))}
                </div>

                <AnimatePresence mode="wait">
                    {step === 'scan' && (
                        <motion.div
                            key="scan"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col"
                        >
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-2">Scan Receipt</h2>
                                <p className="text-white/60">Scan the QR code on the customer's digital receipt to begin verification.</p>
                            </div>

                            <div className="relative flex-1 min-h-[300px] bg-black rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                                <div id="security-reader" className="w-full h-full"></div>
                                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                    <div className="w-64 h-64 border-2 border-dashed border-white/20 rounded-3xl"></div>
                                </div>

                                {/* Simulation Button */}
                                <button
                                    onClick={() => onScanSuccess("REC-MOCK-123")}
                                    className="absolute bottom-6 left-6 right-6 py-4 bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl text-sm font-bold active:scale-95 transition-transform"
                                >
                                    Simulate Receipt Scan
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'weight' && (
                        <motion.div
                            key="weight"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="flex-1 flex flex-col"
                        >
                            <div className="mb-8">
                                <h2 className="text-2xl font-bold mb-2">Weight Check</h2>
                                <p className="text-white/60">Place the shopping bag on the digital scale for verification.</p>
                            </div>

                            <div className="bg-slate-800 rounded-[40px] p-8 border border-white/10 mb-8">
                                <div className="flex justify-between items-center mb-8">
                                    <div className="space-y-1">
                                        <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Expected Weight</p>
                                        <p className="text-3xl font-black text-white">{receiptData.expectedWeight}g</p>
                                    </div>
                                    <div className="w-16 h-16 bg-indigo-500/20 text-indigo-400 rounded-2xl flex items-center justify-center">
                                        <Weight size={32} />
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <p className="text-[10px] text-white/40 font-bold uppercase tracking-wider">Actual Weight (Simulated)</p>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1000"
                                            value={actualWeight}
                                            onChange={(e) => setActualWeight(parseInt(e.target.value))}
                                            className="flex-1 accent-indigo-500"
                                        />
                                        <span className="text-2xl font-black w-20 text-right">{actualWeight}g</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white/5 rounded-3xl p-6 mb-8 border border-white/5">
                                <h3 className="text-xs font-bold text-white/40 uppercase tracking-widest mb-4">Items Summary</h3>
                                <div className="space-y-3">
                                    {receiptData.items.map((item: any, i: number) => (
                                        <div key={i} className="flex justify-between text-sm">
                                            <span className="text-white/80">{item.name}</span>
                                            <span className="font-bold">x{item.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <button
                                onClick={handleWeightVerification}
                                disabled={isVerifying}
                                className="w-full py-5 bg-indigo-600 text-white font-bold rounded-[24px] shadow-xl shadow-indigo-500/20 active:scale-95 transition-transform flex items-center justify-center gap-3"
                            >
                                {isVerifying ? (
                                    <>
                                        <RefreshCw size={20} className="animate-spin" />
                                        Verifying...
                                    </>
                                ) : (
                                    <>
                                        Verify Weight
                                        <ArrowRight size={20} />
                                    </>
                                )}
                            </button>
                        </motion.div>
                    )}

                    {step === 'result' && (
                        <motion.div
                            key="result"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex-1 flex flex-col items-center justify-center text-center"
                        >
                            {!weightMismatch ? (
                                <>
                                    <div className="w-32 h-32 bg-emerald-500/20 text-emerald-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(16,185,129,0.2)]">
                                        <CheckCircle2 size={64} />
                                    </div>
                                    <h2 className="text-4xl font-black mb-4">VERIFIED</h2>
                                    <p className="text-white/60 mb-12 max-w-[280px]">Weight matches receipt within tolerance. Customer is allowed to exit.</p>
                                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-3xl p-6 w-full mb-8">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-white/40">Variance</span>
                                            <span className="text-emerald-500 font-bold">+{Math.abs(actualWeight - receiptData.expectedWeight)}g</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/40">Status</span>
                                            <span className="text-emerald-500 font-bold">Safe to Exit</span>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="w-32 h-32 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mb-8 shadow-[0_0_50px_rgba(239,68,68,0.2)]">
                                        <AlertCircle size={64} />
                                    </div>
                                    <h2 className="text-4xl font-black mb-4 text-red-500">MISMATCH</h2>
                                    <p className="text-white/60 mb-12 max-w-[280px]">Weight mismatch detected. Please redirect customer to the manual billing counter.</p>
                                    <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-6 w-full mb-8">
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-white/40">Variance</span>
                                            <span className="text-red-500 font-bold">{actualWeight - receiptData.expectedWeight}g</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/40">Action</span>
                                            <span className="text-red-500 font-bold">Manual Check Required</span>
                                        </div>
                                    </div>
                                </>
                            )}

                            <button
                                onClick={reset}
                                className="w-full py-5 bg-white text-slate-900 font-bold rounded-[24px] active:scale-95 transition-transform"
                            >
                                Next Customer
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
