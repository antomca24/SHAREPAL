"use client";

import Image from "next/image";
import { formatRupees, type Product } from "@/lib/products";
import { CheckIcon, HeartIcon, PlusIcon } from "./icons";
import { useStore } from "./store-provider";

const TAG_STYLES: Record<string, string> = {
  Trending: "border-brand-orange text-brand-orange",
  New: "border-emerald-600 text-emerald-600",
  "Vote to Launch": "border-brand-violet text-brand-violet",
};

export function ProductCard({
  product,
  className = "",
}: {
  product: Product;
  className?: string;
}) {
  const {
    rentalDays,
    openDatePicker,
    cart,
    toggleCart,
    wishlist,
    toggleWishlist,
  } = useStore();
  const { id, name, image, tag, per_day_rent, out_of_stock } = product;
  const inCart = cart.includes(id);
  const wishlisted = wishlist.includes(id);

  return (
    <article
      className={`group flex flex-col rounded-[28px] p-4 transition-[background-color,box-shadow] duration-300 ease-out hover:bg-white hover:shadow-lg ${className}`}
    >
      <div className="relative aspect-square rounded-3xl bg-white">
        <div className="absolute inset-4 top-6">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1280px) 230px, (min-width: 640px) 33vw, 80vw"
            className={`object-contain ${out_of_stock ? "opacity-40 grayscale" : ""}`}
          />
        </div>
        {tag && (
          <span
            className={`absolute top-2 left-2 rounded-lg border-2 bg-white px-2.5 py-px text-[13px] font-semibold ${TAG_STYLES[tag] ?? "border-gray-400 text-gray-500"}`}
          >
            {tag}
          </span>
        )}
        <button
          type="button"
          onClick={() => toggleWishlist(id)}
          aria-pressed={wishlisted}
          aria-label={`${wishlisted ? "Remove from" : "Add to"} wishlist: ${name}`}
          className={`absolute top-2 right-2 transition-opacity duration-300 group-focus-within:opacity-100 group-hover:opacity-100 pointer-coarse:opacity-100 ${
            wishlisted ? "text-rose-500" : "text-gray-500 opacity-0"
          }`}
        >
          <HeartIcon
            className="size-6"
            fill={wishlisted ? "currentColor" : "none"}
          />
        </button>
        {out_of_stock && (
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-navy px-3 py-1 text-sm font-semibold whitespace-nowrap text-white">
            Out of Stock
          </span>
        )}
      </div>

      <h3 className="mt-3 line-clamp-2 min-h-14 text-lg leading-7 font-bold">
        {name}
      </h3>

      <hr className="my-2 border-gray-300" />

      <div className="mt-auto flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-[15px] leading-5 font-semibold text-gray-500">
            {rentalDays
              ? `${rentalDays} ${rentalDays === 1 ? "day" : "days"} · ${formatRupees(per_day_rent)}/day`
              : "Select Dates to view price"}
          </p>
          <p className="mt-0.5 text-lg font-bold">
            {rentalDays ? (
              formatRupees(per_day_rent * rentalDays)
            ) : (
              <>
                ₹
                <span className="blur-[5px] select-none" aria-hidden="true">
                  {per_day_rent}
                </span>
              </>
            )}
          </p>
        </div>
        <button
          type="button"
          // Rental dates come first; the price depends on them.
          onClick={() => (rentalDays ? toggleCart(id) : openDatePicker())}
          disabled={out_of_stock}
          aria-pressed={inCart}
          aria-label={`${inCart ? "Remove from" : "Add to"} cart: ${name}`}
          className={`grid size-12 shrink-0 place-items-center rounded-full border-2 border-brand-navy transition-colors disabled:border-gray-300 disabled:text-gray-300 ${
            inCart
              ? "bg-brand-navy text-white"
              : "text-brand-navy enabled:hover:bg-brand-navy enabled:hover:text-white"
          }`}
        >
          {inCart ? (
            <CheckIcon className="size-6" />
          ) : (
            <PlusIcon className="size-6" />
          )}
        </button>
      </div>
    </article>
  );
}
