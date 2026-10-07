"use client";

import { CalendarIcon } from "./icons";
import { useStore } from "./store-provider";

export function SelectDatesButton() {
  const { rentalDays, openDatePicker } = useStore();

  if (rentalDays) return null;

  return (
    <button
      type="button"
      onClick={openDatePicker}
      className="fixed bottom-6 left-1/2 z-20 flex h-12 -translate-x-1/2 items-center gap-2 rounded-full border-2 border-brand-lime bg-brand-navy px-5 text-[15px] font-semibold whitespace-nowrap text-white shadow-lg"
    >
      <CalendarIcon className="size-[18px]" />
      Select rental dates to view prices
    </button>
  );
}
