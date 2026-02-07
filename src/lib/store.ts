import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, initialProducts } from './mockData';

interface CartItem extends Product {
    quantity: number;
}

interface UserProfile {
    name: string;
    email: string;
    phone: string;
    membership: 'Premium' | 'Regular';
    avatarUrl?: string;
    joinedDate: string;
    totalOrders: number;
    totalSavings: number;
}

interface Settings {
    notifications: boolean;
    emailNotifications: boolean;
    smsNotifications: boolean;
    theme: 'light' | 'dark' | 'auto';
    language: string;
}

interface StoreState {
    products: Product[];
    cart: CartItem[];
    userRole: 'admin' | 'user' | null;
    userProfile: UserProfile;
    settings: Settings;
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalWeight: () => number;
    setUserRole: (role: 'admin' | 'user' | null) => void;
    updateUserProfile: (profile: Partial<UserProfile>) => void;
    updateSettings: (settings: Partial<Settings>) => void;
    logout: () => void;
}

export const useStore = create<StoreState>()(
    persist(
        (set, get) => ({
            products: initialProducts,
            cart: [],
            userRole: null,
            userProfile: {
                name: 'Rahul Sharma',
                email: 'rahul.sharma@example.com',
                phone: '+91 98765 43210',
                membership: 'Premium',
                joinedDate: '2024-01-15',
                totalOrders: 42,
                totalSavings: 3240,
            },
            settings: {
                notifications: true,
                emailNotifications: true,
                smsNotifications: false,
                theme: 'light',
                language: 'English',
            },
            addToCart: (product) => {
                const { cart } = get();
                const existingItem = cart.find((item) => item.id === product.id);
                if (existingItem) {
                    set({
                        cart: cart.map((item) =>
                            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
                        ),
                    });
                } else {
                    set({ cart: [...cart, { ...product, quantity: 1 }] });
                }
            },
            removeFromCart: (productId) => {
                set({ cart: get().cart.filter((item) => item.id !== productId) });
            },
            updateQuantity: (productId, delta) => {
                const { cart } = get();
                set({
                    cart: cart
                        .map((item) =>
                            item.id === productId ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item
                        )
                        .filter((item) => item.quantity > 0),
                });
            },
            clearCart: () => set({ cart: [] }),
            getTotalPrice: () => {
                return get().cart.reduce((total, item) => total + item.price * item.quantity, 0);
            },
            getTotalWeight: () => {
                return get().cart.reduce((total, item) => total + item.weight * item.quantity, 0);
            },
            setUserRole: (role) => set({ userRole: role }),
            updateUserProfile: (profile) => set({ userProfile: { ...get().userProfile, ...profile } }),
            updateSettings: (settings) => set({ settings: { ...get().settings, ...settings } }),
            logout: () => set({ userRole: null, cart: [] }),
        }),
        {
            name: 'dequeue-storage',
            partialize: (state) => ({
                userProfile: state.userProfile,
                settings: state.settings,
            }),
        }
    )
);
