"use client";

import { useStore } from '@/lib/store';
import {
    ArrowLeft,
    ShoppingCart,
    Plus,
    Minus,
    ArrowRight,
    Weight
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CartPage() {
    const { cart, updateQuantity } = useStore();
    const router = useRouter();

    const getTotalPrice = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    const getTotalWeight = () => {
        return cart.reduce((total, item) => total + (item.weight * item.quantity), 0);
    };

    const handleCheckout = () => {
        router.push('/customer/payment');
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-6 pb-32">
            <div className="w-full max-w-2xl">
                <header className="flex items-center justify-between mb-8">
                    <div className="flex items-center gap-4">
                        <Link href="/customer" className="p-2 bg-white rounded-full shadow-sm text-slate-600">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-xl font-bold text-slate-800">My Cart</h1>
                    </div>
                    <span className="bg-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider">
                        {cart.length} Items
                    </span>
                </header>

                {cart.length === 0 ? (
                    <div className="flex-1 flex flex-col items-center justify-center text-center p-8 py-20">
                        <div className="w-24 h-24 bg-slate-100 rounded-[32px] flex items-center justify-center text-slate-300 mb-6 shadow-inner">
                            <ShoppingCart size={48} />
                        </div>
                        <h2 className="text-2xl font-black text-slate-800 mb-2">Your cart is empty</h2>
                        <p className="text-slate-500 mb-8">Start scanning products to build your cart.</p>
                        <Link href="/customer/scan" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-100">
                            Start Scanning
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <AnimatePresence>
                            {cart.map((item) => (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="bg-white p-4 rounded-[32px] shadow-sm border border-slate-100 flex gap-4"
                                >
                                    <div className="w-20 h-20 bg-slate-50 rounded-2xl overflow-hidden flex-shrink-0 relative">
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <h3 className="font-bold text-slate-800 text-sm line-clamp-1">{item.name}</h3>
                                            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{item.weight}g</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <span className="font-black text-indigo-600">₹{item.price}</span>
                                            <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 active:scale-90"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className="font-bold text-sm w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="w-8 h-8 flex items-center justify-center bg-white rounded-lg shadow-sm text-slate-600 active:scale-90"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-2xl bg-white p-6 rounded-t-[40px] shadow-[0_-20px_50px_rgba(0,0,0,0.05)] border-t border-slate-50 z-40">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2 text-slate-400">
                                <Weight size={16} />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Total Weight: {getTotalWeight()}g</span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Payable Amount</p>
                                <p className="text-3xl font-black text-slate-800">₹{getTotalPrice()}</p>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-indigo-100 active:scale-95 transition-transform flex items-center justify-center gap-2"
                        >
                            Proceed to Checkout
                            <ArrowRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
