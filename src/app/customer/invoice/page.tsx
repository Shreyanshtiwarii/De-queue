"use client";

import { ArrowLeft, Download, Share2, Printer, ShoppingBag, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function InvoicePage() {
    const invoiceData = {
        invoiceNo: "INV-2026-8A2F",
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        shop: {
            name: "Dequeue Smart Retail",
            address: "Gate #4, Terminal 1, Mall of India",
            phone: "+91 98765 43210"
        },
        items: [
            { name: "Classic Milk Chocolate", qty: 2, weight: 100, price: 45, total: 90 },
            { name: "Organic Green Tea", qty: 1, weight: 250, price: 250, total: 250 }
        ],
        total: 340,
        paymentMethod: "UPI (GPay)"
    };

    return (
        <div className="min-h-screen bg-slate-100 flex flex-col items-center p-6 pb-12">
            <div className="w-full max-w-2xl flex flex-col min-h-screen">
                <header className="flex items-center justify-between mb-8 w-full">
                    <Link href="/customer" className="p-2 bg-white rounded-full shadow-sm text-slate-600">
                        <ArrowLeft size={24} />
                    </Link>
                    <h1 className="text-xl font-bold text-slate-800">Tax Invoice</h1>
                    <div className="flex gap-2">
                        <button className="p-2 bg-white rounded-full shadow-sm text-slate-600">
                            <Share2 size={20} />
                        </button>
                    </div>
                </header>

                <main className="flex-1 w-full">
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-white shadow-2xl rounded-[40px] overflow-hidden border border-slate-200"
                    >
                        {/* Invoice Header */}
                        <div className="p-6 lg:p-10 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start gap-6">
                            <div>
                                <div className="flex items-center gap-2 mb-4">
                                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">D</div>
                                    <span className="text-2xl font-black text-slate-800 tracking-tight">Dequeue</span>
                                </div>
                                <p className="text-sm text-slate-500 max-w-[200px] leading-relaxed">
                                    {invoiceData.shop.address}<br />
                                    Ph: {invoiceData.shop.phone}
                                </p>
                            </div>
                            <div className="md:text-right">
                                <h2 className="text-3xl font-black text-slate-800 mb-1">INVOICE</h2>
                                <p className="text-sm font-bold text-indigo-600 mb-4">{invoiceData.invoiceNo}</p>
                                <div className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                                    {invoiceData.date} • {invoiceData.time}
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="p-6 lg:p-10 overflow-x-auto">
                            <table className="w-full text-left mb-10 min-w-[500px]">
                                <thead>
                                    <tr className="text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-slate-100">
                                        <th className="pb-4">Description</th>
                                        <th className="pb-4 text-center">Qty</th>
                                        <th className="pb-4 text-center">Weight</th>
                                        <th className="pb-4 text-right">Price</th>
                                        <th className="pb-4 text-right">Amount</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                    {invoiceData.items.map((item, i) => (
                                        <tr key={i}>
                                            <td className="py-6 font-bold text-slate-700">{item.name}</td>
                                            <td className="py-6 text-center text-slate-500">{item.qty}</td>
                                            <td className="py-6 text-center text-slate-500">{item.weight}g</td>
                                            <td className="py-6 text-right text-slate-500">₹{item.price}</td>
                                            <td className="py-6 text-right font-black text-slate-800">₹{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            {/* Totals */}
                            <div className="flex justify-end">
                                <div className="w-full max-w-[240px] space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">Subtotal</span>
                                        <span className="text-slate-700 font-bold">₹{invoiceData.total}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-400 font-bold uppercase tracking-wider">Tax (GST 0%)</span>
                                        <span className="text-slate-700 font-bold">₹0</span>
                                    </div>
                                    <div className="pt-4 border-t-2 border-slate-100 flex justify-between items-center">
                                        <span className="text-lg font-black text-slate-800">Total</span>
                                        <span className="text-3xl font-black text-indigo-600">₹{invoiceData.total}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Info */}
                            <div className="mt-16 pt-8 border-t border-slate-100 flex justify-between items-center">
                                <div>
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Payment Method</p>
                                    <p className="font-bold text-slate-700">{invoiceData.paymentMethod}</p>
                                </div>
                                <div className="flex items-center gap-2 text-emerald-500 font-bold text-sm bg-emerald-50 px-4 py-2 rounded-xl">
                                    <ShieldCheck size={18} />
                                    Fully Paid
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="bg-slate-50 p-8 text-center">
                            <p className="text-slate-400 text-xs font-medium">Thank you for shopping with Dequeue! This is a computer generated invoice.</p>
                        </div>
                    </motion.div>

                    <div className="mt-8 flex flex-col sm:flex-row gap-4">
                        <button className="flex-1 py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 active:scale-95 transition-transform">
                            <Download size={20} />
                            Download PDF
                        </button>
                        <button className="flex-1 py-4 bg-white text-slate-700 font-bold rounded-2xl border border-slate-200 shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-transform">
                            <Printer size={20} />
                            Print Receipt
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
}
