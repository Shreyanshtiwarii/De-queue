"use client";

import { useState, useRef, useEffect, useCallback } from 'react';
import {
    LayoutDashboard,
    Package,
    BarChart3,
    Scan,
    Search,
    CheckCircle2,
    X,
    ShoppingBag,
    Clock,
    Wallet,
    ArrowRight,
    ShieldCheck,
    Menu,
    LogOut,
    TrendingUp,
    Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Html5Qrcode } from 'html5-qrcode';
import { useStore } from '@/lib/store';

interface ScannedCustomer {
    id: string;
    name: string;
    items: Array<{ name: string; qty: number; price: number }>;
    total: number;
    status: "PENDING_CASH" | "SUCCESS";
}

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('dashboard');
    const [isScanning, setIsScanning] = useState(false);
    const [scannedCustomer, setScannedCustomer] = useState<ScannedCustomer | null>(null);
    const [isProcessingCash, setIsProcessingCash] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const isTransitioningRef = useRef(false);

    const logout = useStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        window.location.href = '/';
    };

    const onScanSuccess = useCallback((decodedText: string) => {
        if (isTransitioningRef.current) return;
        isTransitioningRef.current = true;

        const stopScanner = async () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                try {
                    await scannerRef.current.stop();
                } catch (err) {
                    console.error("Scanner stop error:", err);
                }
            }
        };

        stopScanner().then(() => {
            setScannedCustomer({
                id: decodedText,
                name: "Rahul Sharma",
                items: [
                    { name: "Classic Milk Chocolate", qty: 2, price: 90 },
                    { name: "Organic Green Tea", qty: 1, price: 250 }
                ],
                total: 340,
                status: "PENDING_CASH"
            });
            setIsScanning(false);
            isTransitioningRef.current = false;
        });
    }, []);

    useEffect(() => {
        if (isScanning && !isTransitioningRef.current) {
            const html5QrCode = new Html5Qrcode("admin-reader");
            scannerRef.current = html5QrCode;

            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250 },
                onScanSuccess,
                () => { }
            ).catch(console.error);
        }

        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(console.error);
            }
        };
    }, [isScanning, onScanSuccess]);

    const handleCashReceived = () => {
        if (!scannedCustomer) return;
        setIsProcessingCash(true);
        setTimeout(() => {
            setIsProcessingCash(false);
            setScannedCustomer({ ...scannedCustomer, status: "SUCCESS" });
        }, 1500);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
                        <div className="lg:col-span-2 space-y-6 lg:space-y-8">
                            {/* Stats */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
                                {[
                                    { label: 'Today Sales', value: '₹12,450', color: 'bg-emerald-500' },
                                    { label: 'Pending Cash', value: '₹1,200', color: 'bg-amber-500' },
                                    { label: 'Total Orders', value: '42', color: 'bg-indigo-500' }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white p-6 rounded-[32px] shadow-sm border border-slate-100">
                                        <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-1">{stat.label}</p>
                                        <p className="text-2xl font-black text-slate-800">{stat.value}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Recent Orders */}
                            <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                                <div className="p-6 lg:p-8 border-b border-slate-50 flex justify-between items-center">
                                    <h3 className="font-black text-xl text-slate-800">Recent Orders</h3>
                                    <button onClick={() => setActiveTab('orders')} className="text-indigo-600 font-bold text-sm">View All</button>
                                </div>
                                <div className="divide-y divide-slate-50">
                                    {[...Array(4)].map((_, i) => (
                                        <div key={i} className="p-4 lg:p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 font-bold text-sm">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-slate-800 text-sm lg:text-base">Order #8A2F{i}</p>
                                                    <p className="text-[10px] lg:text-xs text-slate-400">2 mins ago • 3 Items</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="font-black text-slate-800 text-sm lg:text-base">₹{450 + i * 100}</p>
                                                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-500">Paid</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Right Sidebar - Action Area */}
                        <div className="space-y-6 lg:space-y-8">
                            <div className="bg-indigo-600 rounded-[40px] p-6 lg:p-8 text-white shadow-xl shadow-indigo-200 relative overflow-hidden">
                                <h3 className="text-xl font-black mb-2 relative z-10">Quick Scan</h3>
                                <p className="text-indigo-100 text-sm mb-6 opacity-80 relative z-10">Scan customer QR to process cash payments.</p>
                                <button
                                    onClick={() => setIsScanning(true)}
                                    className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl shadow-lg active:scale-95 transition-all relative z-10"
                                >
                                    Open Scanner
                                </button>
                                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                            </div>

                            <div className="bg-white rounded-[40px] p-6 lg:p-8 shadow-sm border border-slate-100">
                                <h3 className="font-black text-slate-800 mb-6">Store Status</h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                        <span className="text-sm font-bold text-slate-600">Gate Sensors</span>
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                    </div>
                                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
                                        <span className="text-sm font-bold text-slate-600">Payment Gateway</span>
                                        <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'orders':
                return (
                    <div className="bg-white rounded-[40px] shadow-sm border border-slate-100 overflow-hidden">
                        <div className="p-8 border-b border-slate-50">
                            <h3 className="font-black text-xl text-slate-800">Order Management</h3>
                        </div>
                        <div className="p-8">
                            <div className="space-y-4">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="flex items-center justify-between p-6 bg-slate-50 rounded-[32px] hover:bg-slate-100/50 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm">
                                                <Clock size={24} />
                                            </div>
                                            <div>
                                                <p className="font-black text-slate-800">Order #ORD-{1000 + i}</p>
                                                <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">Customer: John Doe • 4 Items</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-8">
                                            <div className="text-right">
                                                <p className="font-black text-slate-800">₹{850 + i * 120}</p>
                                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Completed</span>
                                            </div>
                                            <button className="p-3 bg-white text-slate-400 rounded-xl hover:text-indigo-600 transition-colors">
                                                <ArrowRight size={20} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            case 'products':
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { name: "Classic Milk Chocolate", stock: 42, price: 45 },
                            { name: "Organic Green Tea", stock: 15, price: 250 },
                            { name: "Organic Coffee", stock: 28, price: 450 },
                            { name: "Whole Wheat Bread", stock: 12, price: 65 },
                            { name: "Greek Yogurt", stock: 8, price: 120 }
                        ].map((product, i) => (
                            <div key={i} className="bg-white p-6 rounded-[40px] shadow-sm border border-slate-100">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 mb-6">
                                    <Package size={32} />
                                </div>
                                <h4 className="font-black text-slate-800 mb-1">{product.name}</h4>
                                <p className="text-sm text-slate-400 mb-6 font-bold uppercase tracking-wider">Stock: {product.stock} units</p>
                                <div className="flex justify-between items-center pt-6 border-t border-slate-50">
                                    <span className="text-xl font-black text-indigo-600">₹{product.price}</span>
                                    <button className="px-4 py-2 bg-slate-50 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-100 transition-colors">Edit</button>
                                </div>
                            </div>
                        ))}
                        <button className="border-2 border-dashed border-slate-200 rounded-[40px] p-8 flex flex-col items-center justify-center text-slate-400 hover:border-indigo-300 hover:text-indigo-400 transition-all group">
                            <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-50 transition-all">
                                <Package size={32} />
                            </div>
                            <span className="font-black">Add New Product</span>
                        </button>
                    </div>
                );
            case 'analytics':
                return (
                    <div className="space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="font-black text-xl text-slate-800">Revenue Growth</h3>
                                    <TrendingUp className="text-emerald-500" size={24} />
                                </div>
                                <div className="h-48 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 italic">
                                    Chart Visualization Placeholder
                                </div>
                            </div>
                            <div className="bg-white p-8 rounded-[40px] shadow-sm border border-slate-100">
                                <div className="flex justify-between items-center mb-8">
                                    <h3 className="font-black text-xl text-slate-800">Customer Traffic</h3>
                                    <Users className="text-indigo-500" size={24} />
                                </div>
                                <div className="h-48 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-300 italic">
                                    Chart Visualization Placeholder
                                </div>
                            </div>
                        </div>
                        <div className="bg-indigo-900 text-white p-10 rounded-[48px] shadow-xl shadow-indigo-100 relative overflow-hidden">
                            <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
                                <div>
                                    <h3 className="text-3xl font-black mb-2">Monthly Insights</h3>
                                    <p className="text-indigo-200 opacity-80">Your store performance is up by 12% compared to last month.</p>
                                </div>
                                <button className="px-8 py-4 bg-white text-indigo-900 font-black rounded-2xl shadow-lg active:scale-95 transition-all">
                                    Download Report
                                </button>
                            </div>
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col lg:flex-row">
            {/* Mobile Header */}
            <header className="lg:hidden bg-white border-b border-slate-200 p-4 flex justify-between items-center sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <ShoppingBag size={20} />
                    </div>
                    <span className="font-black text-lg text-slate-800">Dequeue</span>
                </div>
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="p-2 text-slate-600 hover:bg-slate-50 rounded-xl"
                >
                    <Menu size={24} />
                </button>
            </header>

            {/* Sidebar */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 lg:translate-x-0 lg:static lg:h-screen
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
                <div className="p-8 hidden lg:flex items-center gap-3">
                    <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
                        <ShoppingBag size={24} />
                    </div>
                    <span className="font-black text-xl text-slate-800">Dequeue</span>
                </div>

                <nav className="flex-1 px-4 space-y-2 pt-4 lg:pt-0">
                    {[
                        { id: 'dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
                        { id: 'orders', icon: <Clock size={20} />, label: 'Orders' },
                        { id: 'products', icon: <Package size={20} />, label: 'Products' },
                        { id: 'analytics', icon: <BarChart3 size={20} />, label: 'Analytics' }
                    ].map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id);
                                setIsMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === item.id
                                ? "bg-indigo-50 text-indigo-600"
                                : "text-slate-400 hover:bg-slate-50 hover:text-slate-600"
                                }`}
                        >
                            {item.icon}
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="p-6 space-y-4 border-t border-slate-100">
                    <button
                        onClick={() => {
                            setIsScanning(true);
                            setIsMobileMenuOpen(false);
                        }}
                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2 active:scale-95 transition-all"
                    >
                        <Scan size={20} />
                        Scan Customer QR
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full py-3 text-slate-400 font-bold rounded-xl hover:bg-red-50 hover:text-red-500 flex items-center justify-center gap-2 transition-all"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Overlay for Mobile Sidebar */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
                    onClick={() => setIsMobileMenuOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-10 overflow-y-auto">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 lg:mb-10">
                    <div>
                        <h1 className="text-2xl lg:text-3xl font-black text-slate-800 capitalize">
                            {activeTab === 'dashboard' ? 'Shop Overview' : activeTab}
                        </h1>
                        <p className="text-slate-400 text-sm">Manage your store operations and cash payments.</p>
                    </div>
                    <div className="w-full md:w-auto flex gap-4">
                        <div className="relative flex-1 md:flex-none">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search orders..."
                                className="w-full md:w-64 pl-12 pr-6 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all"
                            />
                        </div>
                    </div>
                </header>

                {renderContent()}
            </main>

            {/* Scanner Overlay */}
            <AnimatePresence>
                {isScanning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex flex-col items-center justify-center p-6"
                    >
                        <button
                            onClick={() => setIsScanning(false)}
                            className="absolute top-8 right-8 p-4 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
                        >
                            <X size={24} />
                        </button>

                        <div className="w-full max-w-md text-center">
                            <h2 className="text-3xl font-black text-white mb-2">Scan Customer QR</h2>
                            <p className="text-white/40 mb-8">Position the customer&apos;s payment QR code within the frame.</p>

                            <div className="relative w-full max-w-md mx-auto">
                                <div id="admin-reader" className="w-full aspect-square rounded-[32px] overflow-hidden bg-black"></div>

                                {/* Custom Overlay Frame */}
                                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                                    <div className="w-[250px] h-[250px] border-4 border-white rounded-3xl relative">
                                        {/* Corner accents */}
                                        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-indigo-400 rounded-tl-xl"></div>
                                        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-4 border-r-4 border-indigo-400 rounded-tr-xl"></div>
                                        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-4 border-l-4 border-indigo-400 rounded-bl-xl"></div>
                                        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-4 border-r-4 border-indigo-400 rounded-br-xl"></div>

                                        {/* Scanning line animation */}
                                        <motion.div
                                            animate={{ top: ["0%", "100%", "0%"] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="absolute left-0 right-0 h-0.5 bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"
                                        />
                                    </div>
                                </div>

                                {/* Simulation Button */}
                                <button
                                    onClick={() => onScanSuccess("CUST-8A2F")}
                                    className="absolute bottom-6 left-6 right-6 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white text-sm font-bold hover:bg-white/20 transition-all z-10"
                                >
                                    Simulate Customer Scan
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Order Details Modal (Cash Acceptance) */}
            <AnimatePresence>
                {scannedCustomer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-6"
                    >
                        <motion.div
                            initial={{ scale: 0.9, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            className="bg-white w-full max-w-md rounded-[48px] p-6 lg:p-10 shadow-2xl overflow-hidden relative"
                        >
                            <button
                                onClick={() => setScannedCustomer(null)}
                                className="absolute top-8 right-8 text-slate-300 hover:text-slate-600"
                            >
                                <X size={24} />
                            </button>

                            {scannedCustomer.status === "SUCCESS" ? (
                                <div className="text-center py-8">
                                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <ShieldCheck size={40} />
                                    </div>
                                    <h2 className="text-2xl font-black text-slate-800 mb-2">Payment Confirmed</h2>
                                    <p className="text-slate-500 mb-10 text-sm">Cash received successfully. Customer&apos;s exit pass is now active.</p>
                                    <button
                                        onClick={() => setScannedCustomer(null)}
                                        className="w-full py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100"
                                    >
                                        Done
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-12 lg:w-14 lg:h-14 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center">
                                            <Wallet size={28} />
                                        </div>
                                        <div>
                                            <h2 className="text-xl lg:text-2xl font-black text-slate-800">Cash Payment</h2>
                                            <p className="text-slate-400 text-xs lg:text-sm">Customer: {scannedCustomer.name}</p>
                                        </div>
                                    </div>

                                    <div className="bg-slate-50 rounded-3xl p-4 lg:p-6 mb-8 space-y-4">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest border-b border-slate-200 pb-2">Order Summary</p>
                                        {scannedCustomer.items.map((item, i) => (
                                            <div key={i} className="flex justify-between text-xs lg:text-sm">
                                                <span className="text-slate-600 font-bold">{item.name} x{item.qty}</span>
                                                <span className="font-black text-slate-800">₹{item.price}</span>
                                            </div>
                                        ))}
                                        <div className="pt-4 border-t border-slate-200 flex justify-between items-center">
                                            <span className="text-base lg:text-lg font-black text-slate-800">Total Amount</span>
                                            <span className="text-xl lg:text-2xl font-black text-indigo-600">₹{scannedCustomer.total}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleCashReceived}
                                        disabled={isProcessingCash}
                                        className="w-full py-4 lg:py-5 bg-emerald-500 text-white font-bold rounded-2xl shadow-xl shadow-emerald-200 flex items-center justify-center gap-2 active:scale-95 transition-all disabled:opacity-70"
                                    >
                                        {isProcessingCash ? (
                                            <span className="flex items-center gap-2">
                                                <Clock className="animate-spin" size={20} />
                                                Processing...
                                            </span>
                                        ) : (
                                            <>
                                                <CheckCircle2 size={20} />
                                                Confirm Cash Received
                                            </>
                                        )}
                                    </button>
                                </>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
