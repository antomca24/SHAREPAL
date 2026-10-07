"use client";

import Link from "next/link";
import { formatShortDate } from "@/lib/dates";
import {
  CalendarIcon,
  CartIcon,
  ChevronDownIcon,
  PinIcon,
  SearchIcon,
  UserIcon,
} from "./icons";
import { Logo } from "./logo";
import { useStore } from "./store-provider";

function DateButton({
  label,
  value,
  onClick,
}: {
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-full items-center gap-2 px-2.5 text-[15px] font-semibold whitespace-nowrap text-[#2f2f3a] hover:text-black"
    >
      <CalendarIcon className="size-[18px]" />
      {value ? formatShortDate(value) : label}
    </button>
  );
}

export function Navbar() {
  const {
    deliveryDate,
    pickupDate,
    rentalDays,
    openDatePicker,
    cart,
    openCart,
    openSearch,
  } = useStore();

  return (
    <header className="bg-brand-purple text-white">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center gap-x-6 gap-y-3 px-4 pb-4 lg:h-[88px] lg:flex-nowrap lg:px-11 lg:pb-0">
        <Link
          href="/"
          aria-label="SharePal home"
          className="flex h-[72px] w-40 items-center justify-center self-start rounded-b-2xl bg-brand-blue shadow-md"
        >
          <Logo />
        </Link>

        <div className="order-3 flex w-full justify-center lg:order-none lg:w-auto lg:flex-1">
          <div className="flex h-10 max-w-full items-center overflow-x-auto rounded-full border-2 border-brand-violet bg-white text-brand-navy">
            <button
              type="button"
              className="flex h-full items-center gap-1.5 bg-[#e1e4e8] pr-3 pl-3.5 text-[15px] font-semibold"
            >
              <PinIcon className="size-[18px]" />
              Bangalore
              <ChevronDownIcon className="size-4" strokeWidth={2.5} />
            </button>
            <DateButton
              label="Delivery Date"
              value={deliveryDate}
              onClick={openDatePicker}
            />
            <DateButton
              label="Pickup Date"
              value={pickupDate}
              onClick={openDatePicker}
            />
            <button
              type="button"
              onClick={openDatePicker}
              className="flex h-full items-center gap-2 rounded-full bg-brand-navy px-3.5 text-[15px] font-semibold whitespace-nowrap text-white"
            >
              <CalendarIcon className="size-[18px]" />
              {rentalDays
                ? `${rentalDays} ${rentalDays === 1 ? "Day" : "Days"}`
                : "Select"}
            </button>
          </div>
        </div>

        <div className="ml-auto flex items-center gap-6">
          <button type="button" onClick={openSearch} aria-label="Search">
            <SearchIcon className="size-7" />
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart, ${cart.length} items`}
            className="relative"
          >
            <CartIcon className="size-7" />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 grid size-5 place-items-center rounded-full bg-brand-lime text-xs font-bold text-brand-navy">
                {cart.length}
              </span>
            )}
          </button>
          <button
            type="button"
            className="flex items-center gap-3 text-[17px] font-semibold"
          >
            <span className="grid size-11 place-items-center rounded-full border-2 border-brand-violet bg-white text-brand-navy">
              <UserIcon className="size-6" />
            </span>
            <span className="hidden sm:inline">Hi, Login</span>
          </button>
        </div>
      </div>
    </header>
  );
}
