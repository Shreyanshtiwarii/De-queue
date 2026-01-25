"use client";

import { useState } from 'react';
import {
    Search,
    Bell,
    Menu,
    Home,
    Scan,
    ShoppingCart,
    History,
    QrCode,
    Zap,
    Star,
    ChevronRight,
    Percent,
    ShoppingBag
} from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CustomerDashboard() {
    const cart = useStore((state) => state.cart);
    const [activeTab, setActiveTab] = useState('home');

    return (
        <div className="min-h-screen bg-slate-50 pb-32 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white min-h-screen shadow-2xl shadow-slate-200">
                {/* Header */}
                <header className="bg-indigo-600 p-4 sticky top-0 z-30 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                        <button className="text-white">
                            <Menu size={24} />
                        </button>
                        <div className="flex-1 flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 font-black italic">
                                D
                            </div>
                            <span className="text-white font-black text-xl tracking-tight">Dequeue</span>
                        </div>
                        <div className="flex items-center gap-4 text-white">
                            <Bell size={22} />
                            <Link href="/customer/cart" className="relative">
                                <ShoppingCart size={22} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-2 -right-2 bg-amber-400 text-indigo-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-indigo-600">
                                        {cart.length}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search for products, brands and more"
                            className="w-full pl-12 pr-4 py-3 bg-white rounded-xl text-sm focus:outline-none shadow-inner"
                        />
                    </div>
                </header>

                <main>
                    {/* Category Icons */}
                    <section className="bg-white p-4 flex justify-between overflow-x-auto no-scrollbar gap-6 mb-2">
                        {[
                            { label: 'Offers', icon: <Percent size={20} />, color: 'bg-amber-100 text-amber-600' },
                            { label: 'Grocery', icon: <ShoppingBag size={20} />, color: 'bg-emerald-100 text-emerald-600' },
                            { label: 'Mobiles', icon: <Zap size={20} />, color: 'bg-blue-100 text-blue-600' },
                            { label: 'Fashion', icon: <Star size={20} />, color: 'bg-pink-100 text-pink-600' },
                            { label: 'Home', icon: <Home size={20} />, color: 'bg-indigo-100 text-indigo-600' }
                        ].map((cat, i) => (
                            <div key={i} className="flex flex-col items-center gap-2 min-w-[60px]">
                                <div className={`w-12 h-12 ${cat.color} rounded-2xl flex items-center justify-center shadow-sm`}>
                                    {cat.icon}
                                </div>
                                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider">{cat.label}</span>
                            </div>
                        ))}
                    </section>

                    {/* Promo Banner */}
                    <section className="p-4">
                        <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
                            <div className="relative z-10">
                                <h2 className="text-3xl font-black mb-2">Smart Shopping</h2>
                                <p className="text-indigo-100 text-sm mb-6 opacity-80">Scan, Pay & Go. No more queues!</p>
                                <Link href="/customer/scan" className="inline-flex items-center gap-2 bg-amber-400 text-indigo-900 px-6 py-3 rounded-2xl font-black shadow-lg active:scale-95 transition-all">
                                    <Scan size={20} />
                                    Start Scanning
                                </Link>
                            </div>
                            <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                        </div>
                    </section>

                    {/* Featured Section */}
                    <section className="p-4">
                        <div className="flex justify-between items-end mb-4 px-2">
                            <h3 className="text-xl font-black text-slate-800">Featured Deals</h3>
                            <button className="text-indigo-600 font-bold text-sm flex items-center gap-1">
                                View All <ChevronRight size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {[
                                { name: "Milk Chocolate", price: 45, image: "https://images.unsplash.com/photo-1581795669633-91b77ad1805d?w=400&h=400&fit=crop", discount: "20% OFF" },
                                { name: "Green Tea", price: 250, image: "https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=400&h=400&fit=crop", discount: "15% OFF" },
                                { name: "Organic Coffee", price: 450, image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop", discount: "10% OFF" }
                            ].map((item, i) => (
                                <div key={i} className="bg-white rounded-[32px] p-4 shadow-sm border border-slate-100">
                                    <div className="relative aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-50">
                                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 left-2 bg-amber-400 text-indigo-900 text-[10px] font-black px-2 py-1 rounded-lg">
                                            {item.discount}
                                        </div>
                                    </div>
                                    <h4 className="font-bold text-slate-800 text-sm mb-1">{item.name}</h4>
                                    <p className="text-indigo-600 font-black">₹{item.price}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Persistent Bottom Navigation */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 flex justify-around items-center rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-40">
                    <Link href="/customer" className={`flex flex-col items-center gap-1 ${activeTab === 'home' ? 'text-indigo-600' : 'text-slate-400'}`}>
                        <Home size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
                    </Link>
                    <Link href="/customer/scan" className="p-4 bg-indigo-600 text-white rounded-2xl -mt-12 shadow-xl shadow-indigo-200 ring-8 ring-slate-50 active:scale-90 transition-all">
                        <Scan size={28} />
                    </Link>
                    <Link href="/customer/cart" className={`flex flex-col items-center gap-1 ${activeTab === 'cart' ? 'text-indigo-600' : 'text-slate-400'}`}>
                        <ShoppingCart size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
                    </Link>
                    <Link href="/customer/history" className={`flex flex-col items-center gap-1 ${activeTab === 'history' ? 'text-indigo-600' : 'text-slate-400'}`}>
                        <History size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">History</span>
                    </Link>
                    <Link href="/customer/exit" className={`flex flex-col items-center gap-1 ${activeTab === 'exit' ? 'text-indigo-600' : 'text-slate-400'}`}>
                        <QrCode size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Exit QR</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}
