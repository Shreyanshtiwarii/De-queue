"use client";

import { useState, Suspense } from 'react';
import { Mail, Lock, ArrowRight, ShoppingBag, Loader2 } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';

function LoginContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const role = searchParams.get('role') || 'user';

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate login delay
        setTimeout(() => {
            setIsLoading(false);
            if (role === 'admin') {
                router.push('/admin');
            } else {
                router.push('/customer');
            }
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full">
                <header className="text-center mb-10">
                    <div className="w-16 h-16 bg-indigo-600 rounded-[20px] flex items-center justify-center text-white shadow-xl shadow-indigo-200 mx-auto mb-6 italic font-black text-2xl">
                        D
                    </div>
                    <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Welcome Back</h1>
                    <p className="text-slate-500">Login to your {role === 'admin' ? 'Shop Owner' : 'Customer'} account</p>
                </header>

                <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white p-8 rounded-[40px] shadow-2xl shadow-slate-200/50 border border-slate-100"
                >
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="email"
                                    required
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                <input
                                    type="password"
                                    required
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70"
                        >
                            {isLoading ? (
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                <>
                                    Sign In
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-slate-50 text-center">
                        <p className="text-slate-400 text-sm">
                            Don't have an account? <button className="text-indigo-600 font-bold">Sign Up</button>
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-indigo-600" size={48} />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}
