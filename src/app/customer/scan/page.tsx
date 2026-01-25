"use client";

import { useState, useRef, useEffect } from 'react';
import {
    ArrowLeft,
    Scan,
    ShoppingCart,
    Keyboard,
    X,
    Search,
    Loader2
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Html5Qrcode } from 'html5-qrcode';

export default function ScannerPage() {
    const router = useRouter();
    const { cart, addToCart } = useStore();
    const [isScanning, setIsScanning] = useState(true);
    const [scannedProduct, setScannedProduct] = useState<any>(null);
    const [showManualInput, setShowManualInput] = useState(false);
    const [manualBarcode, setManualBarcode] = useState('');
    const [error, setError] = useState<string | null>(null);
    const scannerRef = useRef<Html5Qrcode | null>(null);

    useEffect(() => {
        if (isScanning && !showManualInput && !scannedProduct) {
            const html5QrCode = new Html5Qrcode("reader");
            scannerRef.current = html5QrCode;

            html5QrCode.start(
                { facingMode: "environment" },
                { fps: 10, qrbox: { width: 250, height: 150 } },
                onScanSuccess,
                onScanFailure
            ).catch(err => {
                console.error("Scanner start error:", err);
                setError("Camera access denied or not found.");
            });
        }

        return () => {
            if (scannerRef.current && scannerRef.current.isScanning) {
                scannerRef.current.stop().catch(err => console.error("Scanner stop error:", err));
            }
        };
    }, [isScanning, showManualInput, scannedProduct]);

    const onScanSuccess = (decodedText: string) => {
        handleProductLookup(decodedText);
    };

    const onScanFailure = (error: any) => {
        // Silent failure for continuous scanning
    };

    const handleProductLookup = (barcode: string) => {
        // Simulated product database
        const products: Record<string, any> = {
            "8901234567890": { id: 1, name: "Classic Milk Chocolate", price: 90, weight: 100, image: "https://images.unsplash.com/photo-1581795669633-91b77ad1805d?w=400&h=400&fit=crop" },
            "8901234567891": { id: 2, name: "Organic Green Tea", price: 250, weight: 50, image: "https://images.unsplash.com/photo-1523920290228-4f321a939b4c?w=400&h=400&fit=crop" },
            "8901234567892": { id: 3, name: "Greek Yogurt", price: 65, weight: 200, image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&h=400&fit=crop" }
        };

        const product = products[barcode];
        if (product) {
            setScannedProduct(product);
            setIsScanning(false);
            if (scannerRef.current) scannerRef.current.stop();
        } else {
            setError("Product not found. Please try again.");
            setTimeout(() => setError(null), 3000);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (manualBarcode) {
            handleProductLookup(manualBarcode);
            setShowManualInput(false);
            setManualBarcode('');
        }
    };

    const handleAddToCart = () => {
        if (scannedProduct) {
            addToCart(scannedProduct);
            setScannedProduct(null);
            setIsScanning(true);
        }
    };

    return (
        <div className="min-h-screen bg-black flex flex-col items-center relative overflow-hidden">
            <div className="w-full max-w-2xl h-screen flex flex-col relative">
                {/* Header */}
                <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                    <Link href="/customer" className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white">
                        <ArrowLeft size={24} />
                    </Link>
                    <div className="flex gap-2">
                        <button
                            onClick={() => {
                                setShowManualInput(!showManualInput);
                                if (scannerRef.current && scannerRef.current.isScanning) {
                                    scannerRef.current.stop();
                                }
                            }}
                            className={`p-2 rounded-full transition-all ${showManualInput ? 'bg-indigo-600 text-white' : 'bg-white/10 text-white backdrop-blur-md'}`}
                        >
                            <Keyboard size={24} />
                        </button>
                        <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-white">
                            <ShoppingCart size={20} />
                            <span className="font-bold">{cart.length}</span>
                        </div>
                    </div>
                </div>

                {/* Scanner View */}
                <div className="flex-1 flex flex-col items-center justify-center relative">
                    <div id="reader" className="w-full h-full"></div>

                    {isScanning && !showManualInput && (
                        <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
                            <div className="w-64 h-40 border-2 border-indigo-500 rounded-2xl relative">
                                <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-indigo-400 -mt-1 -ml-1 rounded-tl-md"></div>
                                <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-indigo-400 -mt-1 -mr-1 rounded-tr-md"></div>
                                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-indigo-400 -mb-1 -ml-1 rounded-bl-md"></div>
                                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-indigo-400 -mb-1 -mr-1 rounded-br-md"></div>
                                <motion.div
                                    animate={{ top: ["0%", "100%", "0%"] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                    className="absolute left-0 right-0 h-0.5 bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.8)]"
                                />
                            </div>
                            <p className="text-white/60 mt-8 text-sm font-medium tracking-widest uppercase">Align Barcode within frame</p>
                        </div>
                    )}

                    {/* Manual Input Overlay */}
                    <AnimatePresence>
                        {showManualInput && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                className="absolute inset-0 z-30 bg-black/80 backdrop-blur-xl flex items-center justify-center p-8"
                            >
                                <div className="w-full max-w-sm bg-white rounded-[40px] p-8 shadow-2xl">
                                    <h3 className="text-2xl font-black text-slate-800 mb-2">Manual Entry</h3>
                                    <p className="text-slate-500 text-sm mb-8">Type the barcode number found below the lines.</p>

                                    <form onSubmit={handleManualSubmit} className="space-y-6">
                                        <div className="relative">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                                            <input
                                                type="text"
                                                placeholder="Enter Barcode Number"
                                                value={manualBarcode}
                                                onChange={(e) => setManualBarcode(e.target.value)}
                                                autoFocus
                                                className="w-full pl-12 pr-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-mono"
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <button
                                                type="button"
                                                onClick={() => setShowManualInput(false)}
                                                className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl"
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                type="submit"
                                                className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-100"
                                            >
                                                Find Item
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Product Details Sheet */}
                <AnimatePresence>
                    {scannedProduct && (
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-[40px] p-8 z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.2)]"
                        >
                            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-8"></div>
                            <div className="flex gap-6 mb-8">
                                <div className="w-24 h-24 bg-slate-100 rounded-3xl overflow-hidden flex-shrink-0">
                                    <img src={scannedProduct.image} alt={scannedProduct.name} className="w-full h-full object-cover" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-slate-800 mb-1">{scannedProduct.name}</h3>
                                    <p className="text-slate-500 text-sm mb-2">{scannedProduct.weight}g</p>
                                    <div className="flex items-center gap-2">
                                        <span className="text-2xl font-black text-indigo-600">₹{scannedProduct.price}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-4">
                                <button
                                    onClick={() => { setScannedProduct(null); setIsScanning(true); }}
                                    className="flex-1 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleAddToCart}
                                    className="flex-[2] py-4 bg-indigo-600 text-white font-bold rounded-2xl shadow-lg shadow-indigo-200 flex items-center justify-center gap-2"
                                >
                                    <ShoppingCart size={20} />
                                    Add to Cart
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Error Toast */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            className="absolute bottom-8 left-6 right-6 bg-red-500 text-white p-4 rounded-2xl shadow-xl flex items-center justify-between z-40"
                        >
                            <p className="text-sm font-medium">{error}</p>
                            <button onClick={() => setError(null)} className="p-1 hover:bg-white/20 rounded-full">
                                <X size={18} />
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
