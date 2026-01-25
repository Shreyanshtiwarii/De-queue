"use client";

import { ArrowLeft, ShoppingBag, ChevronRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function HistoryPage() {
    const orders = [
        { id: "8A2F-9B1C", date: "24 Jan 2026", time: "14:20", items: 3, total: 340, status: "Success" },
        { id: "7C4D-2E5F", date: "20 Jan 2026", time: "11:05", items: 1, total: 120, status: "Success" },
        { id: "5G6H-8I9J", date: "15 Jan 2026", time: "18:45", items: 5, total: 1250, status: "Success" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 pb-32">
            <div className="w-full max-w-2xl">
                <header className="flex items-center gap-4 mb-8">
                    <Link href="/customer" className="p-2 bg-white rounded-full shadow-sm text-slate-600">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-800">Order History</h1>
                </header>

                <main className="space-y-4">
                    {orders.map((order, i) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100 flex items-center justify-between hover:border-indigo-500/30 transition-all active:scale-[0.98]"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                                    <ShoppingBag size={28} />
                                </div>
                                <div>
                                    <h3 className="font-black text-slate-800 text-sm lg:text-base">Order #{order.id}</h3>
                                    <div className="flex items-center gap-3 text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">
                                        <span className="flex items-center gap-1"><Calendar size={12} /> {order.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={12} /> {order.time}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-right flex items-center gap-4">
                                <div>
                                    <p className="font-black text-slate-800 text-sm lg:text-base">₹{order.total}</p>
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">{order.status}</p>
                                </div>
                                <ChevronRight className="text-slate-300" size={20} />
                            </div>
                        </motion.div>
                    ))}
                </main>
            </div>
        </div>
    );
}
