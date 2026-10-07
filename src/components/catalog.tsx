"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type ReactNode } from "react";
import assetFundBanner from "../../public/Images/assets-fund-banner.webp";
import rentYourGearBanner from "../../public/Images/rent-your-gear-banner.png";
import {
  CATEGORIES,
  categoryOf,
  type CategoryId,
  type Product,
} from "@/lib/products";
import { SmileIcon } from "./icons";
import { ProductCard } from "./product-card";

// Cards are ordered 0 (first row), 2 (second row) or 4 (the rest) so the
// promo banners (orders 1 and 3) land after rows one and two at every
// column count.
const ROW_ORDER = {
  base: ["order-0", "order-2", "order-4"],
  sm: ["sm:order-0", "sm:order-2", "sm:order-4"],
  lg: ["lg:order-0", "lg:order-2", "lg:order-4"],
  xl: ["xl:order-0", "xl:order-2", "xl:order-4"],
};

function rowOrder(index: number) {
  const row = (columns: number) => Math.min(Math.floor(index / columns), 2);
  return `${ROW_ORDER.base[row(1)]} ${ROW_ORDER.sm[row(2)]} ${ROW_ORDER.lg[row(3)]} ${ROW_ORDER.xl[row(4)]}`;
}

function PromoBanner({
  src,
  alt,
  className,
}: {
  src: StaticImageData;
  alt: string;
  className: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      sizes="(min-width: 1024px) 1100px, 100vw"
      className={`col-span-full h-auto w-full rounded-2xl ${className}`}
    />
  );
}

function SidebarItem({
  label,
  active,
  onSelect,
  children,
}: {
  label: string;
  active: boolean;
  onSelect: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className="flex w-24 shrink-0 flex-col items-center gap-2"
    >
      <span
        className={`grid size-16 place-items-center overflow-hidden rounded-xl bg-white ${
          active
            ? "border-2 border-brand-blue text-brand-blue"
            : "border border-gray-200"
        }`}
      >
        {children}
      </span>
      <span
        className={`text-center text-[15px] leading-tight font-semibold ${
          active
            ? "text-brand-blue underline decoration-2 underline-offset-[6px]"
            : "text-ink"
        }`}
      >
        {label}
      </span>
    </button>
  );
}

export function Catalog({
  products,
  banner,
}: {
  products: Product[];
  banner: ReactNode;
}) {
  const [category, setCategory] = useState<CategoryId | "all">("all");
  const visible =
    category === "all"
      ? products
      : products.filter((product) => categoryOf(product) === category);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-8">
      <aside className="flex shrink-0 gap-4 self-start overflow-x-auto rounded-2xl bg-white p-3 max-lg:w-full lg:sticky lg:top-4 lg:max-h-[calc(100vh-2rem)] lg:flex-col lg:gap-5 lg:overflow-y-auto">
        <SidebarItem
          label="All"
          active={category === "all"}
          onSelect={() => setCategory("all")}
        >
          <SmileIcon className="size-8" />
        </SidebarItem>
        {CATEGORIES.map(({ id, label }) => {
          const thumbnail = products.find(
            (product) => categoryOf(product) === id,
          );
          return (
            <SidebarItem
              key={id}
              label={label}
              active={category === id}
              onSelect={() => setCategory(id)}
            >
              {thumbnail && (
                <Image
                  src={thumbnail.image}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 object-contain"
                />
              )}
            </SidebarItem>
          );
        })}
      </aside>

      <div className="min-w-0 flex-1">
        {banner}

        <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-b border-gray-300 pb-5">
          <h1 className="text-2xl font-bold">Gaming Gadgets On Rent</h1>
          <p className="text-[17px] font-medium text-gray-400">
            Total items:{" "}
            <span className="text-gray-600">{visible.length} items</span>
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 py-9 sm:grid-cols-2 sm:px-3 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-10 xl:gap-y-8">
          {visible.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              className={rowOrder(index)}
            />
          ))}
          <PromoBanner
            src={assetFundBanner}
            alt="Become an Asset Partner. Earn monthly from rental assets."
            className="order-1"
          />
          <PromoBanner
            src={rentYourGearBanner}
            alt="Got gear you don't use anymore? Rent out your gear on SharePal."
            className="order-3"
          />
        </div>
      </div>
    </div>
  );
}
