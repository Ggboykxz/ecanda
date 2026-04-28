import { create } from 'zustand';
import type { Product } from '../types/product.types';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  setDeliveryFee: (fee: number) => void;
  recalculateTotals: () => void;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  subtotal: 0,
  deliveryFee: 0,
  total: 0,

  addItem: (product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find((item) => item.product.id === product.id);

    if (existingItem) {
      const updatedItems = items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
      set({ items: updatedItems });
    } else {
      set({ items: [...items, { product, quantity }] });
    }

    get().recalculateTotals();
  },

  removeItem: (productId) => {
    const items = get().items.filter((item) => item.product.id !== productId);
    set({ items });
    get().recalculateTotals();
  },

  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }

    const items = get().items.map((item) =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    set({ items });
    get().recalculateTotals();
  },

  clearCart: () => {
    set({
      items: [],
      totalItems: 0,
      subtotal: 0,
      deliveryFee: 0,
      total: 0,
    });
  },

  setDeliveryFee: (deliveryFee) => {
    set({ deliveryFee });
    get().recalculateTotals();
  },

  recalculateTotals: () => {
    const items = get().items;
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );
    const { deliveryFee } = get();
    const total = subtotal + deliveryFee;

    set({ totalItems, subtotal, total });
  },
}));