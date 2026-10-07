"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { formatRupees, products, type Product } from "@/lib/products";
import { Drawer } from "./drawer";
import { ArrowRightIcon, SearchIcon, StarIcon, TrendIcon } from "./icons";
import { useStore } from "./store-provider";

// Prices are shown for this many days until rental dates are chosen.
const DEFAULT_DAYS = 10;

const popular = products
  .filter((product) => !product.out_of_stock && product.rating > 0)
  .sort((a, b) => b.booked_count - a.booked_count)
  .slice(0, 8);

function Stars({ rating }: { rating: number }) {
  const row = Array.from({ length: 5 }, (_, star) => (
    <StarIcon key={star} className="size-3 shrink-0" />
  ));
  return (
    <span className="relative flex text-gray-300">
      {row}
      <span
        className="absolute inset-y-0 left-0 flex overflow-hidden text-brand-navy"
        style={{ width: `${(rating / 5) * 100}%` }}
      >
        {row}
      </span>
    </span>
  );
}

function ResultCard({ product, days }: { product: Product; days: number }) {
  return (
    <li className="w-[132px] shrink-0">
      <div className="relative aspect-square rounded-lg bg-white">
        <Image
          src={product.image}
          alt=""
          fill
          sizes="132px"
          className="object-contain p-5"
        />
      </div>
      <p className="mt-3 truncate text-[15px] font-semibold">{product.name}</p>
      <p className="mt-1.5 text-[11px] font-medium text-gray-500">
        Rent for <span className="text-[13px] text-ink">{days}</span>{" "}
        {days === 1 ? "day" : "days"}
      </p>
      <p className="font-bold">{formatRupees(product.per_day_rent * days)}</p>
      <p className="mt-0.5 flex items-center gap-1.5 text-[13px] font-semibold text-emerald-600">
        <TrendIcon className="size-4" />
        {product.booked_count} booked
      </p>
      {product.rating > 0 && (
        <p
          className="mt-0.5 flex items-center gap-2 text-[13px]"
          aria-label={`Rated ${product.rating} out of 5`}
        >
          <Stars rating={product.rating} />({product.rating})
        </p>
      )}
    </li>
  );
}

export function SearchDrawer() {
  const { openDrawer, closeDrawer, rentalDays } = useStore();
  const open = openDrawer === "search";
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const days = rentalDays ?? DEFAULT_DAYS;

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const term = query.trim().toLowerCase();
  const results = products.filter((product) =>
    product.name.toLowerCase().includes(term),
  );

  return (
    <Drawer open={open} onClose={closeDrawer} title="Search Products">
      <form
        role="search"
        onSubmit={(event) => event.preventDefault()}
        className="shrink-0 bg-white px-4 py-4"
      >
        <label className="flex h-[52px] items-center gap-2.5 rounded-2xl border-2 border-gray-200 px-3.5 focus-within:border-brand-blue">
          <SearchIcon className="size-5 shrink-0 text-gray-600" />
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search for products"
            aria-label="Search for products"
            className="min-w-0 flex-1 bg-transparent text-[15px] font-medium outline-none placeholder:text-gray-500"
          />
          <ArrowRightIcon className="size-4 shrink-0 text-gray-400" />
        </label>
      </form>

      <div className="flex-1 overflow-y-auto px-4 py-4">
        {term ? (
          <>
            <p className="text-[11px] font-semibold text-gray-500">
              {results.length} {results.length === 1 ? "result" : "results"} for
              “{query.trim()}”
            </p>
            {results.length > 0 ? (
              <ul className="mt-5 grid grid-cols-[repeat(auto-fill,132px)] justify-between gap-x-6 gap-y-8 px-2">
                {results.map((product) => (
                  <ResultCard key={product.id} product={product} days={days} />
                ))}
              </ul>
            ) : (
              <p className="mt-16 text-center font-medium text-gray-500">
                No products found. Try a different search.
              </p>
            )}
          </>
        ) : (
          <>
            <div className="flex items-center gap-5 rounded-2xl border border-white bg-[linear-gradient(100deg,#e8f1ff,#f3f0ff_45%,#f1ffe6)] px-5 py-4">
              <span className="text-4xl" aria-hidden="true">
                🎉
              </span>
              <div>
                <p className="text-[17px] leading-6 font-semibold">
                  <span className="text-pink-500">
                    Use code SHAREPAL & get 10%
                  </span>{" "}
                  on orders above ₹1500. Maximum discount: ₹300
                </p>
                <p className="mt-2 text-sm font-semibold text-gray-700">
                  Use Coupon - SHAREPAL
                </p>
              </div>
            </div>

            <p className="mt-6 flex items-center gap-2 text-[11px] font-semibold text-gray-500 after:h-px after:flex-1 after:bg-gray-300">
              Popular Items
            </p>
            <ul className="mt-4 flex gap-12 overflow-x-auto px-6 py-6">
              {popular.map((product) => (
                <ResultCard key={product.id} product={product} days={days} />
              ))}
            </ul>
          </>
        )}
      </div>
    </Drawer>
  );
}
