"use client";

import { useState } from 'react';
import {
    ArrowLeft,
    Bell,
    Mail,
    MessageSquare,
    Moon,
    Globe,
    CreditCard,
    Shield,
    FileText,
    ChevronRight
} from 'lucide-react';
import { useStore } from '@/lib/store';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Settings = {
    notifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    theme: 'light' | 'dark' | 'auto';
    language: string;
};

type SettingItem = {
    icon: React.ReactNode;
    label: string;
    description: string;
    color: string;
    type: 'toggle' | 'select' | 'link';
    key?: keyof Settings;
};

export default function SettingsPage() {
    const settings = useStore((state) => state.settings);
    const updateSettings = useStore((state) => state.updateSettings);

    const toggleSetting = (key: keyof Settings) => {
        const value = settings[key];
        if (typeof value === 'boolean') {
            updateSettings({ [key]: !value });
        }
    };

    const settingsSections: { title: string; items: SettingItem[] }[] = [
        {
            title: 'Notifications',
            items: [
                {
                    icon: <Bell size={20} />,
                    label: 'Push Notifications',
                    description: 'Get notified about offers and updates',
                    key: 'notifications' as keyof typeof settings,
                    type: 'toggle',
                    color: 'bg-indigo-50 text-indigo-600'
                },
                {
                    icon: <Mail size={20} />,
                    label: 'Email Notifications',
                    description: 'Receive updates via email',
                    key: 'emailNotifications' as keyof typeof settings,
                    type: 'toggle',
                    color: 'bg-amber-50 text-amber-600'
                },
                {
                    icon: <MessageSquare size={20} />,
                    label: 'SMS Notifications',
                    description: 'Get SMS alerts for orders',
                    key: 'smsNotifications' as keyof typeof settings,
                    type: 'toggle',
                    color: 'bg-emerald-50 text-emerald-600'
                }
            ]
        },
        {
            title: 'Preferences',
            items: [
                {
                    icon: <Moon size={20} />,
                    label: 'Theme',
                    description: settings.theme === 'light' ? 'Light Mode' : settings.theme === 'dark' ? 'Dark Mode' : 'Auto',
                    key: 'theme' as keyof typeof settings,
                    type: 'select',
                    color: 'bg-blue-50 text-blue-600'
                },
                {
                    icon: <Globe size={20} />,
                    label: 'Language',
                    description: settings.language,
                    key: 'language' as keyof typeof settings,
                    type: 'select',
                    color: 'bg-violet-50 text-violet-600'
                }
            ]
        },
        {
            title: 'Account',
            items: [
                {
                    icon: <CreditCard size={20} />,
                    label: 'Payment Methods',
                    description: 'Manage your payment options',
                    type: 'link',
                    color: 'bg-pink-50 text-pink-600'
                },
                {
                    icon: <Shield size={20} />,
                    label: 'Privacy & Security',
                    description: 'Control your data and security',
                    type: 'link',
                    color: 'bg-red-50 text-red-600'
                }
            ]
        },
        {
            title: 'Legal',
            items: [
                {
                    icon: <FileText size={20} />,
                    label: 'Terms & Conditions',
                    description: 'Read our terms of service',
                    type: 'link',
                    color: 'bg-slate-50 text-slate-600'
                },
                {
                    icon: <FileText size={20} />,
                    label: 'Privacy Policy',
                    description: 'How we protect your data',
                    type: 'link',
                    color: 'bg-slate-50 text-slate-600'
                }
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 pb-32 flex flex-col items-center">
            <div className="w-full max-w-2xl bg-white min-h-screen shadow-2xl shadow-slate-200">
                {/* Header */}
                <header className="bg-indigo-600 p-4 sticky top-0 z-30 shadow-lg">
                    <div className="flex items-center gap-4">
                        <Link href="/customer" className="text-white p-2 hover:bg-white/10 rounded-xl transition-colors">
                            <ArrowLeft size={24} />
                        </Link>
                        <h1 className="text-white font-black text-xl flex-1">Settings</h1>
                    </div>
                </header>

                <main className="p-6 space-y-8">
                    {settingsSections.map((section, sectionIndex) => (
                        <motion.div
                            key={section.title}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: sectionIndex * 0.1 }}
                            className="space-y-4"
                        >
                            <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2">
                                {section.title}
                            </h2>
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                                {section.items.map((item, itemIndex) => (
                                    <div
                                        key={itemIndex}
                                        className="flex items-center gap-4 p-4 border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors"
                                    >
                                        <div className={`w-10 h-10 ${item.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                            {item.icon}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-bold text-slate-800 text-sm">{item.label}</p>
                                            <p className="text-xs text-slate-500">{item.description}</p>
                                        </div>
                                        {item.type === 'toggle' && item.key && (
                                            <button
                                                onClick={() => toggleSetting(item.key!)}
                                                className={`relative w-12 h-7 rounded-full transition-colors ${settings[item.key] ? 'bg-indigo-600' : 'bg-slate-200'
                                                    }`}
                                            >
                                                <span
                                                    className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${settings[item.key] ? 'translate-x-5' : 'translate-x-0'
                                                        }`}
                                                />
                                            </button>
                                        )}
                                        {item.type === 'select' && (
                                            <ChevronRight size={20} className="text-slate-400" />
                                        )}
                                        {item.type === 'link' && (
                                            <ChevronRight size={20} className="text-slate-400" />
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}

                    {/* App Info */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-center space-y-2 pt-8"
                    >
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black italic">
                                D
                            </div>
                        </div>
                        <p className="text-sm font-black text-slate-800">Dequeue</p>
                        <p className="text-xs text-slate-500">Version 1.0.0</p>
                        <p className="text-xs text-slate-400 mt-4">© 2024 Dequeue. All rights reserved.</p>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
