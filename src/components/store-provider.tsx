"use client";

import { createContext, use, useState, type ReactNode } from "react";
import { rentalDaysBetween } from "@/lib/dates";

type DrawerName = "cart" | "search";

type Store = {
  deliveryDate: string;
  pickupDate: string;
  rentalDays: number | null;
  setDates: (delivery: string, pickup: string) => void;
  datePickerOpen: boolean;
  openDatePicker: () => void;
  closeDatePicker: () => void;
  openDrawer: DrawerName | null;
  openCart: () => void;
  openSearch: () => void;
  closeDrawer: () => void;
  cart: number[];
  toggleCart: (id: number) => void;
  wishlist: number[];
  toggleWishlist: (id: number) => void;
};

const StoreContext = createContext<Store | null>(null);

function toggle(ids: number[], id: number) {
  return ids.includes(id) ? ids.filter((other) => other !== id) : [...ids, id];
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [dates, setDates] = useState({ delivery: "", pickup: "" });
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [openDrawer, setOpenDrawer] = useState<DrawerName | null>(null);
  const [cart, setCart] = useState<number[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const rentalDays =
    dates.delivery && dates.pickup
      ? rentalDaysBetween(dates.delivery, dates.pickup)
      : null;

  return (
    <StoreContext
      value={{
        deliveryDate: dates.delivery,
        pickupDate: dates.pickup,
        rentalDays,
        setDates: (delivery, pickup) => setDates({ delivery, pickup }),
        datePickerOpen,
        openDatePicker: () => setDatePickerOpen(true),
        closeDatePicker: () => setDatePickerOpen(false),
        openDrawer,
        openCart: () => setOpenDrawer("cart"),
        openSearch: () => setOpenDrawer("search"),
        closeDrawer: () => setOpenDrawer(null),
        cart,
        toggleCart: (id) => setCart((ids) => toggle(ids, id)),
        wishlist,
        toggleWishlist: (id) => setWishlist((ids) => toggle(ids, id)),
      }}
    >
      {children}
    </StoreContext>
  );
}

export function useStore() {
  const store = use(StoreContext);
  if (!store) throw new Error("useStore must be used inside StoreProvider");
  return store;
}
