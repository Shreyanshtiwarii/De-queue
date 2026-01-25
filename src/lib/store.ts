import { create } from 'zustand';
import { Product, initialProducts } from './mockData';

interface CartItem extends Product {
    quantity: number;
}

interface StoreState {
    products: Product[];
    cart: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, delta: number) => void;
    clearCart: () => void;
    getTotalPrice: () => number;
    getTotalWeight: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
    products: initialProducts,
    cart: [],
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
}));
