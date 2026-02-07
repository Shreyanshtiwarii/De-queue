"use client";

import Link from "next/link";
import { User, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
      <header className="text-center mb-12 lg:mb-16">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-16 h-16 lg:w-20 lg:h-20 bg-indigo-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl shadow-indigo-200 mx-auto mb-8 italic font-black text-3xl"
        >
          D
        </motion.div>
        <motion.h1
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-4xl lg:text-5xl font-black text-slate-800 mb-4 tracking-tight"
        >
          Dequeue
        </motion.h1>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-slate-500 text-lg max-w-md mx-auto"
        >
          The future of retail. A complete Scan-and-Pay Self-Checkout System.
        </motion.p>
      </header>

      <main className="w-full max-w-4xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <motion.div
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/login?role=customer" className="group block bg-white p-8 lg:p-10 shadow-xl border border-slate-100 rounded-[48px] transition-all hover:border-indigo-500/30 hover:shadow-2xl hover:shadow-indigo-100 active:scale-95">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-indigo-50 text-indigo-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <User size={32} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-slate-800 mb-2">Customer</h2>
              <p className="text-slate-500 text-sm lg:text-base mb-6">Scan items and pay instantly with your phone.</p>
              <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                Get Started <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link href="/login?role=admin" className="group block bg-white p-8 lg:p-10 shadow-xl border border-slate-100 rounded-[48px] transition-all hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-100 active:scale-95">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mb-8 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <ShieldCheck size={32} />
              </div>
              <h2 className="text-2xl lg:text-3xl font-black text-slate-800 mb-2">Shop Owner</h2>
              <p className="text-slate-500 text-sm lg:text-base mb-6">Manage inventory, sales and cash payments.</p>
              <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                Admin Portal <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          </motion.div>
        </div>
      </main>

      <footer className="mt-16 lg:mt-24 text-slate-400 text-sm font-medium">
        &copy; 2026 Dequeue Smart Retail. All rights reserved.
      </footer>
    </div>
  );
}
