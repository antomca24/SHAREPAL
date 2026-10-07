"use client";

import Image from "next/image";
import { formatRupees, products } from "@/lib/products";
import { Drawer } from "./drawer";
import { ChevronRightIcon, CloseIcon } from "./icons";
import { useStore } from "./store-provider";

function EmptyBasket() {
  return (
    <svg viewBox="0 0 120 104" className="w-[108px]" aria-hidden="true">
      <g stroke="#9dff00" strokeWidth={4} strokeLinecap="round">
        <path d="M60 6v12M38 14l8 9M82 14l-8 9" />
      </g>
      <path
        d="M16 44h88l-8 52a6 6 0 0 1-6 5H30a6 6 0 0 1-6-5l-8-52Z"
        fill="#3f63e6"
      />
      <g stroke="#b9c6ff" strokeWidth={4} strokeLinecap="round">
        <path d="M40 56v32M50 56v32M60 56v32M70 56v32M80 56v32" />
      </g>
      <rect x="8" y="34" width="104" height="11" rx="2" fill="#1d3fc4" />
      <g stroke="#9dff00" strokeWidth={7} strokeLinecap="round">
        <path d="M52 42 10 78M68 42l42 36" />
      </g>
    </svg>
  );
}

export function CartDrawer() {
  const { openDrawer, closeDrawer, cart, toggleCart, rentalDays } = useStore();
  const days = rentalDays ?? 1;
  const items = products.filter((product) => cart.includes(product.id));
  const total = items.reduce((sum, item) => sum + item.per_day_rent * days, 0);

  return (
    <Drawer
      open={openDrawer === "cart"}
      onClose={closeDrawer}
      title="Cart Items"
    >
      {items.length === 0 ? (
        <div className="flex flex-col items-center px-6 pt-24 text-center">
          <EmptyBasket />
          <p className="mt-12 text-2xl leading-8 font-semibold">
            Oops! Your Cart is
            <br />
            Feeling Lonely…
          </p>
          <p className="mt-3 leading-6 text-gray-500">
            Looks like you left your cart empty.
            <br />
            Give it some love and fill it up!
          </p>
          <button
            type="button"
            onClick={closeDrawer}
            className="mt-8 flex h-9 items-center gap-2 rounded-full border-2 border-brand-blue px-6 font-semibold text-brand-blue transition-colors hover:bg-brand-blue hover:text-white"
          >
            Explore All Products
            <ChevronRightIcon className="size-4" />
          </button>
        </div>
      ) : (
        <>
          <ul className="flex-1 space-y-3 overflow-y-auto p-5">
            {items.map((item) => (
              <li
                key={item.id}
                className="flex items-center gap-4 rounded-2xl bg-white p-3"
              >
                <Image
                  src={item.image}
                  alt=""
                  width={72}
                  height={72}
                  className="size-[72px] shrink-0 object-contain"
                />
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 leading-5 font-semibold">
                    {item.name}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    {days} {days === 1 ? "day" : "days"} ·{" "}
                    {formatRupees(item.per_day_rent)}/day
                  </p>
                </div>
                <p className="font-bold">
                  {formatRupees(item.per_day_rent * days)}
                </p>
                <button
                  type="button"
                  onClick={() => toggleCart(item.id)}
                  aria-label={`Remove from cart: ${item.name}`}
                  className="grid size-8 shrink-0 place-items-center rounded-full text-gray-500 hover:bg-gray-100 hover:text-ink"
                >
                  <CloseIcon className="size-4" />
                </button>
              </li>
            ))}
          </ul>
          <p className="flex shrink-0 items-center justify-between border-t border-gray-200 bg-white px-6 py-5 text-lg font-semibold">
            Total
            <span className="text-xl font-bold">{formatRupees(total)}</span>
          </p>
        </>
      )}
    </Drawer>
  );
}
