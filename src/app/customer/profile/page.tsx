"use client";

import { useState } from 'react';
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Calendar,
    Award,
    ShoppingBag,
    TrendingDown,
    Edit2,
    Check,
    X,
    Camera
} from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function ProfilePage() {
    const userProfile = useStore((state) => state.userProfile);
    const updateUserProfile = useStore((state) => state.updateUserProfile);

    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: userProfile.name,
        email: userProfile.email,
        phone: userProfile.phone,
    });

    const handleSave = () => {
        updateUserProfile(formData);
        setIsEditing(false);
    };

    const handleCancel = () => {
        setFormData({
            name: userProfile.name,
            email: userProfile.email,
            phone: userProfile.phone,
        });
        setIsEditing(false);
    };

    return (
        <div className="min-h-screen bg-slate-50 pb-32 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white min-h-screen shadow-2xl shadow-slate-200">
                {/* Header */}
                <header className="bg-indigo-600 p-4 sticky top-0 z-30 shadow-lg">
                    <div className="flex items-center gap-4">
                        <Link href="/customer" className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-white font-black text-xl flex-1">My Profile</h1>
                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <Edit2 size={20} />
                            </button>
                        ) : (
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <Check size={20} />
                                </button>
                                <button
                                    onClick={handleCancel}
                                    className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>
                        )}
                    </div>
                </header>

                <main className="p-6 space-y-6">
                    {/* Profile Card */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200"
                    >
                        <div className="relative z-10 flex flex-col items-center">
                            <div className="relative mb-4">
                                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md border-4 border-white/30">
                                    <User size={40} />
                                </div>
                                {isEditing && (
                                    <button className="absolute bottom-0 right-0 w-8 h-8 bg-amber-400 text-indigo-900 rounded-full flex items-center justify-center shadow-lg">
                                        <Camera size={16} />
                                    </button>
                                )}
                            </div>
                            <h2 className="text-2xl font-black mb-1">{userProfile.name}</h2>
                            <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-400 text-indigo-900 rounded-full text-sm font-black">
                                <Award size={16} />
                                {userProfile.membership} Member
                            </div>
                        </div>
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    </motion.div>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-4">
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
                        >
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-3">
                                <ShoppingBag size={24} />
                            </div>
                            <p className="text-3xl font-black text-slate-800 mb-1">{userProfile.totalOrders}</p>
                            <p className="text-xs text-slate-500 font-bold">Total Orders</p>
                        </motion.div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100"
                        >
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-3">
                                <TrendingDown size={24} />
                            </div>
                            <p className="text-3xl font-black text-slate-800 mb-1">₹{userProfile.totalSavings}</p>
                            <p className="text-xs text-slate-500 font-bold">Total Savings</p>
                        </motion.div>
                    </div>

                    {/* Profile Details */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4"
                    >
                        <h3 className="font-black text-slate-800 text-lg mb-4">Personal Information</h3>

                        {/* Name */}
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <div className="w-10 h-10 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <User size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 font-bold mb-1">Full Name</p>
                                {isEditing ? (
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-800">{userProfile.name}</p>
                                )}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Mail size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 font-bold mb-1">Email Address</p>
                                {isEditing ? (
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-800">{userProfile.email}</p>
                                )}
                            </div>
                        </div>

                        {/* Phone */}
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Phone size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 font-bold mb-1">Phone Number</p>
                                {isEditing ? (
                                    <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    />
                                ) : (
                                    <p className="text-sm font-bold text-slate-800">{userProfile.phone}</p>
                                )}
                            </div>
                        </div>

                        {/* Joined Date */}
                        <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                                <Calendar size={20} />
                            </div>
                            <div className="flex-1">
                                <p className="text-xs text-slate-500 font-bold mb-1">Member Since</p>
                                <p className="text-sm font-bold text-slate-800">
                                    {new Date(userProfile.joinedDate).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {isEditing && (
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex gap-4"
                        >
                            <button
                                onClick={handleSave}
                                className="flex-1 bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all"
                            >
                                Save Changes
                            </button>
                            <button
                                onClick={handleCancel}
                                className="flex-1 bg-slate-200 text-slate-700 py-4 rounded-2xl font-black active:scale-95 transition-all"
                            >
                                Cancel
                            </button>
                        </motion.div>
                    )}
                </main>
            </div>
        </div>
    );
}
