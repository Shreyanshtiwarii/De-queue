"use client";

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { ArrowLeft, Download, Share2, CheckCircle2, Calendar, Clock, Weight, Receipt as ReceiptIcon } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import QRCode from 'react-qr-code';
import { useParams } from 'next/navigation';

export default function ReceiptPage() {
    const params = useParams();
    const receiptId = params.receiptId as string;
    const [receipt, setReceipt] = useState<any>(null);

    useEffect(() => {
        // In a real app, we would fetch the receipt from the API
        // For now, we'll simulate it or use local storage if we had saved it
        // Since we don't have a DB, we'll just show a mock receipt based on the ID
        setReceipt({
            receiptId: receiptId,
            timestamp: new Date().toISOString(),
            items: [
                { name: "Classic Milk Chocolate", quantity: 2, price: 45 },
                { name: "Organic Green Tea", quantity: 1, price: 250 }
            ],
            totalPrice: 340,
            totalWeight: 450,
        });
    }, [receiptId]);

    if (!receipt) return null;

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col p-6 pb-12">
            <header className="flex items-center justify-between mb-8">
                <Link href="/customer" className="p-2 bg-white rounded-full shadow-sm text-slate-600">
                    <ArrowLeft size={24} />
                </Link>
                <h1 className="text-xl font-bold text-slate-800">Digital Receipt</h1>
                <div className="flex gap-2">
                    <button className="p-2 bg-white rounded-full shadow-sm text-slate-600">
                        <Share2 size={20} />
                    </button>
                </div>
            </header>

            <main className="flex-1 max-w-md mx-auto w-full">
                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white rounded-[40px] shadow-xl overflow-hidden border border-slate-100"
                >
                    {/* Receipt Header */}
                    <div className="bg-indigo-600 p-8 text-white text-center relative">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-md">
                            <ReceiptIcon size={32} />
                        </div>
                        <h2 className="text-2xl font-black mb-1">De-Queue Mall</h2>
                        <p className="text-indigo-100 text-sm opacity-80">Self-Checkout Receipt</p>

                        {/* Decorative circles for receipt look */}
                        <div className="absolute -bottom-3 left-0 right-0 flex justify-around">
                            {[...Array(10)].map((_, i) => (
                                <div key={i} className="w-6 h-6 bg-slate-50 rounded-full"></div>
                            ))}
                        </div>
                    </div>

                    <div className="p-8 pt-12">
                        {/* QR Code Section */}
                        <div className="flex flex-col items-center mb-10">
                            <div className="bg-white p-4 rounded-3xl border-2 border-slate-50 shadow-inner mb-4">
                                <QRCode value={receiptId} size={180} />
                            </div>
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">Scan at Exit Gate</p>
                        </div>

                        {/* Transaction Info */}
                        <div className="grid grid-cols-2 gap-6 mb-10">
                            <div className="space-y-1">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Receipt ID</p>
                                <p className="text-sm font-bold text-slate-700">{receipt.receiptId}</p>
                            </div>
                            <div className="space-y-1 text-right">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Date & Time</p>
                                <p className="text-sm font-bold text-slate-700">
                                    {new Date(receipt.timestamp).toLocaleDateString()} • {new Date(receipt.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                            </div>
                        </div>

                        {/* Items List */}
                        <div className="space-y-4 mb-10">
                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider border-b border-slate-50 pb-2">Items Purchased</p>
                            {receipt.items.map((item: any, i: number) => (
                                <div key={i} className="flex justify-between items-center">
                                    <div>
                                        <p className="text-sm font-bold text-slate-700">{item.name}</p>
                                        <p className="text-xs text-slate-400">Qty: {item.quantity} × ₹{item.price}</p>
                                    </div>
                                    <p className="font-bold text-slate-700">₹{item.quantity * item.price}</p>
                                </div>
                            ))}
                        </div>

                        {/* Totals */}
                        <div className="bg-slate-50 rounded-3xl p-6 space-y-3">
                            <div className="flex justify-between items-center text-slate-500">
                                <div className="flex items-center gap-2">
                                    <Weight size={14} />
                                    <span className="text-xs font-bold">Total Weight</span>
                                </div>
                                <span className="text-sm font-bold">{receipt.totalWeight}g</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-slate-200">
                                <span className="text-lg font-black text-slate-800">Total Paid</span>
                                <span className="text-2xl font-black text-indigo-600">₹{receipt.totalPrice}</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <div className="mt-8 text-center">
                    <p className="text-slate-400 text-sm mb-6 flex items-center justify-center gap-2">
                        <CheckCircle2 size={16} className="text-emerald-500" />
                        Verified Digital Transaction
                    </p>
                    <button className="w-full py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                        <Download size={20} />
                        Download PDF
                    </button>
                </div>
            </main>
        </div>
    );
}
