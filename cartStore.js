import { create } from "zustand";

export const useCartStore = create((set, get) => ({
  items: [],

  addToCart: (product) => {
    const items = get().items;
    const existing = items.find((item) => item.id === product.id);
    if (existing) {
      set({
        items: items.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ items: [...items, { ...product, quantity: 1 }] });
    }
  },

  updateQuantity: (id, quantity) =>
    set({
      items: get().items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }),

  removeFromCart: (id) =>
    set({ items: get().items.filter((item) => item.id !== id) }),

  clearCart: () => set({ items: [] }),

  totalPrice: () =>
    get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),
}));
