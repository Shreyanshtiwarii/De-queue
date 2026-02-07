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
    ChevronRight,
    CreditCard,
    CheckCircle2,
    X,
    LogOut,
    User,
    Settings,
    HelpCircle
} from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CustomerDashboard() {
    const cart = useStore((state) => state.cart);
    const userProfile = useStore((state) => state.userProfile);
    const logout = useStore((state) => state.logout);
    const pathname = usePathname();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    const notifications = [
        { id: 1, title: "Welcome to Dequeue!", message: "Start scanning items to experience smart shopping.", time: "1h ago" },
        { id: 2, title: "Special Offer", message: "Get 20% off on all chocolates today!", time: "3h ago" }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-32 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white min-h-screen shadow-2xl shadow-slate-200 relative overflow-hidden">
                {/* Header */}
                <header className="bg-indigo-600 p-4 sticky top-0 z-30 shadow-lg">
                    <div className="flex items-center gap-4 mb-4">
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <div className="flex-1 flex items-center gap-2">
                            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-indigo-600 font-black italic">
                                D
                            </div>
                            <span className="text-white font-black text-xl tracking-tight">Dequeue</span>
                        </div>
                        <div className="flex items-center gap-4 text-white">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="relative p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <Bell size={22} />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full border border-indigo-600"></span>
                            </button>
                            <Link href="/customer/cart" className="relative p-2 hover:bg-white/10 rounded-xl transition-colors">
                                <ShoppingCart size={22} />
                                {cart.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-amber-400 text-indigo-900 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-indigo-600">
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

                    {/* User Guide Section */}
                    <section className="p-4">
                        <div className="flex justify-between items-end mb-6 px-2">
                            <h3 className="text-xl font-black text-slate-800">How it Works</h3>
                            <button className="text-indigo-600 font-bold text-sm flex items-center gap-1">
                                User Guide <ChevronRight size={16} />
                            </button>
                        </div>

                        <div className="grid grid-cols-1 gap-4">
                            {[
                                {
                                    step: "01",
                                    title: "Scan Items",
                                    desc: "Scan the barcode of any item you want to buy.",
                                    icon: <Scan size={24} />,
                                    color: "bg-indigo-50 text-indigo-600"
                                },
                                {
                                    step: "02",
                                    title: "Review Cart",
                                    desc: "Check your items and adjust quantities in the cart.",
                                    icon: <ShoppingCart size={24} />,
                                    color: "bg-amber-50 text-amber-600"
                                },
                                {
                                    step: "03",
                                    title: "Quick Pay",
                                    desc: "Pay instantly via UPI, Card, or Cash at the counter.",
                                    icon: <CreditCard size={24} />,
                                    color: "bg-emerald-50 text-emerald-600"
                                },
                                {
                                    step: "04",
                                    title: "Exit Gate",
                                    desc: "Scan your exit QR code at the security gate to leave.",
                                    icon: <CheckCircle2 size={24} />,
                                    color: "bg-blue-50 text-blue-600"
                                }
                            ].map((item, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ x: -20, opacity: 0 }}
                                    whileInView={{ x: 0, opacity: 1 }}
                                    transition={{ delay: i * 0.1 }}
                                    viewport={{ once: true }}
                                    className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center gap-6"
                                >
                                    <div className={`w-14 h-14 ${item.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-sm`}>
                                        {item.icon}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-[10px] font-black text-indigo-600/40 tracking-widest">{item.step}</span>
                                            <h4 className="font-black text-slate-800">{item.title}</h4>
                                        </div>
                                        <p className="text-slate-500 text-xs leading-relaxed">{item.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                </main>

                {/* Side Menu Drawer */}
                <AnimatePresence>
                    {isMenuOpen && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setIsMenuOpen(false)}
                                className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40"
                            />
                            <motion.div
                                initial={{ x: -300 }}
                                animate={{ x: 0 }}
                                exit={{ x: -300 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="fixed inset-y-0 left-0 w-72 bg-white z-50 shadow-2xl flex flex-col"
                            >
                                <div className="p-8 bg-indigo-600 text-white">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                                            <User size={32} />
                                        </div>
                                        <button
                                            onClick={() => setIsMenuOpen(false)}
                                            className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                                        >
                                            <X size={24} />
                                        </button>
                                    </div>
                                    <h3 className="text-xl font-black">{userProfile.name}</h3>
                                    <p className="text-indigo-100 text-sm opacity-80">{userProfile.membership} Member</p>
                                </div>

                                <nav className="flex-1 p-6 space-y-2">
                                    <Link
                                        href="/customer/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full flex items-center gap-4 p-4 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                                    >
                                        <User size={20} />
                                        My Profile
                                    </Link>
                                    <Link
                                        href="/customer/history"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full flex items-center gap-4 p-4 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                                    >
                                        <History size={20} />
                                        Order History
                                    </Link>
                                    <Link
                                        href="/customer/settings"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full flex items-center gap-4 p-4 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                                    >
                                        <Settings size={20} />
                                        Settings
                                    </Link>
                                    <Link
                                        href="/customer/help"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="w-full flex items-center gap-4 p-4 text-slate-600 font-bold rounded-2xl hover:bg-slate-50 transition-colors"
                                    >
                                        <HelpCircle size={20} />
                                        Help & Support
                                    </Link>
                                </nav>

                                <div className="p-6 border-t border-slate-50">
                                    <button
                                        onClick={handleLogout}
                                        className="w-full flex items-center gap-4 p-4 text-red-500 font-black rounded-2xl hover:bg-red-50 transition-colors"
                                    >
                                        <LogOut size={20} />
                                        Logout
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Notifications Dropdown */}
                <AnimatePresence>
                    {showNotifications && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-20 right-4 left-4 bg-white rounded-[32px] shadow-2xl border border-slate-100 z-40 overflow-hidden"
                        >
                            <div className="p-6 border-b border-slate-50 flex justify-between items-center">
                                <h3 className="font-black text-slate-800">Notifications</h3>
                                <button
                                    onClick={() => setShowNotifications(false)}
                                    className="text-slate-400 hover:text-slate-600"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                            <div className="max-h-80 overflow-y-auto">
                                {notifications.map((n) => (
                                    <div key={n.id} className="p-6 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors">
                                        <div className="flex justify-between items-start mb-1">
                                            <h4 className="font-bold text-slate-800 text-sm">{n.title}</h4>
                                            <span className="text-[10px] text-slate-400 font-bold">{n.time}</span>
                                        </div>
                                        <p className="text-xs text-slate-500 leading-relaxed">{n.message}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full p-4 text-indigo-600 font-bold text-sm bg-slate-50 hover:bg-slate-100 transition-colors">
                                View All Notifications
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Persistent Bottom Navigation */}
                <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white/80 backdrop-blur-xl border-t border-slate-100 p-4 flex justify-around items-center rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] z-40">
                    <Link href="/customer" className={`flex flex-col items-center gap-1 ${pathname === '/customer' ? 'text-indigo-600' : 'text-slate-400'}`}>
                        <Home size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
                    </Link>
                    <Link href="/customer/cart" className={`flex flex-col items-center gap-1 ${pathname === '/customer/cart' ? 'text-indigo-600' : 'text-slate-400'}`}>
                        <ShoppingCart size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
                    </Link>
                    <Link href="/customer/scan" className="p-4 bg-indigo-600 text-white rounded-2xl -mt-12 shadow-xl shadow-indigo-200 ring-8 ring-slate-50 active:scale-90 transition-all">
                        <Scan size={28} />
                    </Link>
                    <Link href="/customer/history" className={`flex flex-col items-center gap-1 ${pathname === '/customer/history' ? 'text-indigo-600' : 'text-slate-400'}`}>
                        <History size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">History</span>
                    </Link>
                    <Link href="/customer/exit" className={`flex flex-col items-center gap-1 ${pathname === '/customer/exit' ? 'text-indigo-600' : 'text-slate-400'}`}>
                        <QrCode size={24} />
                        <span className="text-[10px] font-bold uppercase tracking-widest">Exit QR</span>
                    </Link>
                </nav>
            </div>
        </div>
    );
}
