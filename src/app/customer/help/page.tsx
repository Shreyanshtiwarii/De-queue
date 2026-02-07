"use client";

import { useState } from 'react';
import {
    ArrowLeft,
    HelpCircle,
    Mail,
    MessageCircle,
    Phone,
    ChevronDown,
    ChevronRight,
    Scan,
    ShoppingCart,
    CreditCard,
    Shield,
    BookOpen,
    Video
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

export default function HelpPage() {
    const [openFAQ, setOpenFAQ] = useState<number | null>(null);
    const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });

    const faqs = [
        {
            category: 'Getting Started',
            icon: <BookOpen size={20} />,
            color: 'bg-indigo-50 text-indigo-600',
            questions: [
                {
                    q: 'How do I start using Dequeue?',
                    a: 'Simply scan items using the scanner in the app, add them to your cart, and pay at checkout. No more waiting in long queues!'
                },
                {
                    q: 'Is registration required?',
                    a: 'Yes, you need to create an account to use Dequeue. This helps us personalize your shopping experience and track your orders.'
                }
            ]
        },
        {
            category: 'Scanning Items',
            icon: <Scan size={20} />,
            color: 'bg-amber-50 text-amber-600',
            questions: [
                {
                    q: 'How do I scan items?',
                    a: 'Tap the Scan button on the home screen, point your camera at the barcode, and the item will be automatically added to your cart.'
                },
                {
                    q: 'What if the barcode doesn\'t scan?',
                    a: 'Make sure the barcode is clean and well-lit. You can also enter the product code manually by tapping the manual entry option.'
                }
            ]
        },
        {
            category: 'Payment & Checkout',
            icon: <CreditCard size={20} />,
            color: 'bg-emerald-50 text-emerald-600',
            questions: [
                {
                    q: 'What payment methods are accepted?',
                    a: 'We accept UPI, Credit/Debit Cards, Net Banking, and Cash at the counter. Choose your preferred method at checkout.'
                },
                {
                    q: 'Is my payment information secure?',
                    a: 'Absolutely! We use industry-standard encryption to protect your payment information. Your data is never stored on our servers.'
                }
            ]
        },
        {
            category: 'Security & Exit',
            icon: <Shield size={20} />,
            color: 'bg-blue-50 text-blue-600',
            questions: [
                {
                    q: 'How do I exit the store?',
                    a: 'After payment, you\'ll receive an exit QR code. Show this code at the security gate to exit the store.'
                },
                {
                    q: 'What if security stops me?',
                    a: 'Simply show your exit QR code and receipt. Our system verifies all purchases automatically.'
                }
            ]
        }
    ];

    const contactOptions = [
        {
            icon: <Mail size={24} />,
            title: 'Email Support',
            description: 'support@dequeue.com',
            color: 'bg-indigo-50 text-indigo-600',
            action: () => window.location.href = 'mailto:support@dequeue.com'
        },
        {
            icon: <Phone size={24} />,
            title: 'Call Us',
            description: '1800-123-4567',
            color: 'bg-amber-50 text-amber-600',
            action: () => window.location.href = 'tel:18001234567'
        },
        {
            icon: <MessageCircle size={24} />,
            title: 'Live Chat',
            description: 'Chat with our team',
            color: 'bg-emerald-50 text-emerald-600',
            action: () => alert('Live chat feature coming soon!')
        }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Thank you for contacting us! We\'ll get back to you soon.');
        setContactForm({ name: '', email: '', message: '' });
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
                        <h1 className="text-white font-black text-xl flex-1">Help & Support</h1>
                    </div>
                </header>

                <main className="p-6 space-y-8">
                    {/* Quick Contact Options */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2">
                            Contact Us
                        </h2>
                        <div className="grid grid-cols-1 gap-3">
                            {contactOptions.map((option, index) => (
                                <motion.button
                                    key={index}
                                    initial={{ x: -20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: index * 0.1 }}
                                    onClick={option.action}
                                    className="flex items-center gap-4 p-4 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-all active:scale-95"
                                >
                                    <div className={`w-12 h-12 ${option.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                                        {option.icon}
                                    </div>
                                    <div className="flex-1 text-left">
                                        <p className="font-bold text-slate-800 text-sm">{option.title}</p>
                                        <p className="text-xs text-slate-500">{option.description}</p>
                                    </div>
                                    <ChevronRight size={20} className="text-slate-400" />
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* FAQs */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2">
                            Frequently Asked Questions
                        </h2>
                        {faqs.map((category, categoryIndex) => (
                            <div key={categoryIndex} className="space-y-3">
                                <div className="flex items-center gap-2 px-2">
                                    <div className={`w-8 h-8 ${category.color} rounded-lg flex items-center justify-center`}>
                                        {category.icon}
                                    </div>
                                    <h3 className="font-bold text-slate-700 text-sm">{category.category}</h3>
                                </div>
                                {category.questions.map((faq, faqIndex) => {
                                    const globalIndex = categoryIndex * 10 + faqIndex;
                                    return (
                                        <div
                                            key={faqIndex}
                                            className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden"
                                        >
                                            <button
                                                onClick={() => setOpenFAQ(openFAQ === globalIndex ? null : globalIndex)}
                                                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="font-bold text-slate-800 text-sm pr-4">{faq.q}</span>
                                                <ChevronDown
                                                    size={20}
                                                    className={`text-slate-400 flex-shrink-0 transition-transform ${openFAQ === globalIndex ? 'rotate-180' : ''
                                                        }`}
                                                />
                                            </button>
                                            <AnimatePresence>
                                                {openFAQ === globalIndex && (
                                                    <motion.div
                                                        initial={{ height: 0 }}
                                                        animate={{ height: 'auto' }}
                                                        exit={{ height: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="p-4 pt-0 text-sm text-slate-600 leading-relaxed">
                                                            {faq.a}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="space-y-4"
                    >
                        <h2 className="text-xs font-black text-slate-500 uppercase tracking-widest px-2">
                            Send Us a Message
                        </h2>
                        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    value={contactForm.name}
                                    onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-100"
                                    placeholder="Enter your name"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    value={contactForm.email}
                                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                                    required
                                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-100"
                                    placeholder="your.email@example.com"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-600 mb-2">Message</label>
                                <textarea
                                    value={contactForm.message}
                                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                                    required
                                    rows={4}
                                    className="w-full px-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 border border-slate-100 resize-none"
                                    placeholder="How can we help you?"
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black shadow-lg active:scale-95 transition-all"
                            >
                                Send Message
                            </button>
                        </form>
                    </motion.div>

                    {/* Tutorial Section */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200"
                    >
                        <div className="relative z-10">
                            <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md mb-4">
                                <Video size={28} />
                            </div>
                            <h3 className="text-xl font-black mb-2">Video Tutorials</h3>
                            <p className="text-indigo-100 text-sm mb-6 opacity-80">
                                Watch step-by-step guides on how to use Dequeue effectively.
                            </p>
                            <button className="inline-flex items-center gap-2 bg-amber-400 text-indigo-900 px-6 py-3 rounded-2xl font-black shadow-lg active:scale-95 transition-all">
                                Watch Now
                                <ChevronRight size={18} />
                            </button>
                        </div>
                        <div className="absolute -right-10 -bottom-10 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                    </motion.div>
                </main>
            </div>
        </div>
    );
}
