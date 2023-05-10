import create from "zustand";
import { persist, devtools } from "zustand/middleware";
interface CartItem {
  product: any;
  quantity: number;
}

interface State {
  items: CartItem[];
}

const persistOptions = {
  name: "cart-storage", // unique name
  getStorage: () => localStorage, // (optional) by default, 'localStorage' is used
};
export const useCarts = create(
  persist(
    devtools((set: any, get: any) => ({
      items: [],
      add: ({ product, quantity }: CartItem) => {
        try {
          const items = get().items;
          // console.log(items);
          if (items || items.length !== 0) {
            const found = items.find(
              (itemCart: any) => itemCart.product._id === product._id
            );
            if (found) {
              found.quantity += quantity;
            } else {
              items.push({ product, quantity });
            }
          } else {
            items.push({ product, quantity });
          }
          return set({ items: items }, false, { type: "cart/addToCart" });
        } catch (error: unknown) {}
      },
      remove: (id: any) => {
        const items = get().items;
        const newItems = items.filter(
          (itemCart: any) => itemCart.product._id !== id
        );
        return set({ items: newItems }, false, { type: "cart/removeCart" });
      },
      removeAll: () => {
        return set({ items: [] }, false, { type: "cart/removeCartAll" });
      },
      increase: (id: any) => {
        const items = get().items;
        const found = items.find(
          (itemCart: any) => itemCart.product._id === id
        );
        if (found) {
          found.quantity++;
        }
        return set({ items: items }, false, { type: "cart/increase" });
      },
      decrease: (id: any) => {
        const items = get().items;
        const found = items.find(
          (itemCart: any) => itemCart.product._id === id
        );
        if (found.quantity === 1) {
          const newItems = items.filter(
            (itemCart: any) => itemCart.product._id !== found.product._id
          );
          return set({ items: newItems }, false, { type: "cart/decrease" });
        } else {
          found.quantity--;
          return set({ items: items }, false, { type: "cart/decrease" });
        }
      },
    })),
    persistOptions
  )
);
