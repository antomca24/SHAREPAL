"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  addDays,
  earliestPickup,
  formatLongDate,
  formatOrdinalDate,
  monthDays,
  monthOf,
  monthTitle,
  rentalDaysBetween,
  shiftMonth,
  todayISO,
  type Month,
} from "@/lib/dates";
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  InfoIcon,
} from "./icons";
import { useStore } from "./store-provider";

const WEEKDAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

function isBefore(a: Month, b: Month) {
  return a.year * 12 + a.month < b.year * 12 + b.month;
}

function MonthNavButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
  children: ReactNode;
}) {
  if (!onClick) return <span className="size-8" />;
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="grid size-8 place-items-center rounded-full border border-gray-300 text-gray-600 enabled:hover:bg-gray-100 disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function MonthGrid({
  view,
  min,
  delivery,
  pickup,
  onPick,
  onPrev,
  onNext,
  prevDisabled,
}: {
  view: Month;
  min: string;
  delivery: string;
  pickup: string;
  onPick: (iso: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  prevDisabled?: boolean;
}) {
  const days = monthDays(view);
  const inRange = (iso: string) =>
    delivery !== "" && pickup !== "" && iso > delivery && iso < pickup;

  return (
    <div>
      <div className="flex items-center justify-between">
        <MonthNavButton
          label="Previous month"
          onClick={onPrev}
          disabled={prevDisabled}
        >
          <ChevronLeftIcon className="size-4" />
        </MonthNavButton>
        <p className="text-[15px] font-medium">{monthTitle(view)}</p>
        <MonthNavButton label="Next month" onClick={onNext}>
          <ChevronRightIcon className="size-4" />
        </MonthNavButton>
      </div>

      <div className="mt-3 grid grid-cols-7 text-center">
        {WEEKDAYS.map((weekday) => (
          <span key={weekday} className="py-2 text-sm text-gray-500">
            {weekday}
          </span>
        ))}
        {days.map(({ iso, day, inMonth }, index) => {
          const column = index % 7;
          const selected = inMonth && (iso === delivery || iso === pickup);
          const ranged = inMonth && inRange(iso);
          const previous = days[index - 1];
          const next = days[index + 1];
          const roundLeft =
            column === 0 || !previous.inMonth || !inRange(previous.iso);
          const roundRight =
            column === 6 || !next.inMonth || !inRange(next.iso);
          return (
            <div
              key={iso}
              className={`my-1 ${ranged ? "bg-[#dcfcae]" : ""} ${
                ranged && roundLeft ? "rounded-l-lg" : ""
              } ${ranged && roundRight ? "rounded-r-lg" : ""}`}
            >
              <button
                type="button"
                disabled={!inMonth || iso < min}
                onClick={() => onPick(iso)}
                aria-pressed={selected}
                className={`grid h-11 w-full place-items-center rounded-lg text-[15px] font-medium transition-colors disabled:text-gray-400 ${
                  selected
                    ? "bg-[#9dff00] font-semibold shadow-sm"
                    : ranged
                      ? "hover:bg-[#c5f587]"
                      : "enabled:hover:bg-gray-100"
                }`}
              >
                {day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DateField({
  label,
  placeholder,
  value,
  onToggle,
  children,
}: {
  label: string;
  placeholder: string;
  value: string;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div className="relative">
      <p className="text-[15px] font-medium">
        {label} <span className="text-red-500">*</span>
      </p>
      <button
        type="button"
        onClick={onToggle}
        className="mt-2 flex h-11 w-full items-center gap-2 rounded-2xl border border-gray-300 bg-white px-3 text-[15px] font-medium shadow-sm"
      >
        <CalendarIcon className="size-[18px] shrink-0" />
        {value ? (
          formatLongDate(value)
        ) : (
          <span className="font-normal text-gray-400">{placeholder}</span>
        )}
      </button>
      {children}
    </div>
  );
}

function DateDialog() {
  const { deliveryDate, pickupDate, setDates, closeDatePicker } = useStore();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [today] = useState(todayISO);
  const [delivery, setDelivery] = useState(deliveryDate);
  const [pickup, setPickup] = useState(pickupDate);
  const [view, setView] = useState(() => monthOf(deliveryDate || today));
  const [openField, setOpenField] = useState<"delivery" | "pickup" | null>(
    null,
  );
  const [fieldView, setFieldView] = useState(view);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    dialog.showModal();
    // Keep focus on the dialog itself rather than ringing the close button.
    dialog.focus();
  }, []);

  const days = delivery && pickup ? rentalDaysBetween(delivery, pickup) : 0;
  const fieldMin =
    openField === "pickup" && delivery ? earliestPickup(delivery) : today;

  function pickDelivery(iso: string) {
    setDelivery(iso);
    if (pickup && pickup < earliestPickup(iso)) setPickup("");
  }

  // On the main calendar the first click sets delivery and the second sets
  // pickup; a click that cannot be a pickup starts a new range.
  function pickFromCalendar(iso: string) {
    if (delivery && !pickup && iso >= earliestPickup(delivery)) {
      setPickup(iso);
    } else {
      setDelivery(iso);
      setPickup("");
    }
  }

  function pickFromField(iso: string) {
    if (openField === "pickup") setPickup(iso);
    else pickDelivery(iso);
    setOpenField(null);
  }

  function toggleField(requested: "delivery" | "pickup") {
    // A pickup date cannot be chosen before a delivery date.
    const field = requested === "pickup" && !delivery ? "delivery" : requested;
    if (openField === field) return setOpenField(null);
    const start =
      field === "pickup"
        ? pickup || earliestPickup(delivery)
        : delivery || today;
    setFieldView(monthOf(start));
    setOpenField(field);
  }

  const fieldCalendar = (
    <div className="absolute top-full left-0 z-20 mt-1 w-[325px] rounded-xl bg-white p-4 shadow-[0_8px_30px_rgb(16_24_40/0.2)]">
      <MonthGrid
        view={fieldView}
        min={fieldMin}
        delivery={delivery}
        pickup={pickup}
        onPick={pickFromField}
        onPrev={() => setFieldView(shiftMonth(fieldView, -1))}
        onNext={() => setFieldView(shiftMonth(fieldView, 1))}
        prevDisabled={!isBefore(monthOf(fieldMin), fieldView)}
      />
    </div>
  );

  return (
    <dialog
      ref={dialogRef}
      onClose={closeDatePicker}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      aria-labelledby="date-modal-title"
      tabIndex={-1}
      className="m-auto outline-none max-h-[calc(100dvh-2rem)] w-[calc(100vw-2rem)] max-w-[1216px] overflow-y-auto rounded-[28px] bg-[#f1f1f1] text-ink shadow-2xl backdrop:bg-black/30 backdrop:backdrop-blur-sm"
    >
      <div className="p-6">
        <div className="flex items-center justify-between">
          <h2 id="date-modal-title" className="text-2xl font-semibold">
            Select your Dates
          </h2>
          <button
            type="button"
            onClick={() => dialogRef.current?.close()}
            aria-label="Close"
            className="grid size-9 place-items-center rounded-full hover:bg-gray-200"
          >
            <CloseIcon className="size-4" strokeWidth={2.5} />
          </button>
        </div>

        <div className="mt-4 grid gap-6 lg:grid-cols-[minmax(0,447px)_1fr]">
          <div>
            {openField && (
              <div
                className="fixed inset-0 z-10"
                onClick={() => setOpenField(null)}
              />
            )}
            <div className="grid grid-cols-2 gap-3">
              <DateField
                label="Delivery Date"
                placeholder="Select delivery date"
                value={delivery}
                onToggle={() => toggleField("delivery")}
              >
                {openField === "delivery" && fieldCalendar}
              </DateField>
              <DateField
                label="Pickup Date"
                placeholder="Select pickup date"
                value={pickup}
                onToggle={() => toggleField("pickup")}
              >
                {openField === "pickup" && fieldCalendar}
              </DateField>
            </div>

            <p className="mt-5 flex gap-2.5 rounded-xl bg-[#e3e8ff] p-3 text-[13px] leading-[1.35] font-medium text-[#1a2a8a]">
              <InfoIcon className="mt-1 size-[18px] shrink-0 text-brand-blue" />
              <span>
                <strong>Same-day delivery</strong> between{" "}
                <strong>5PM and 11PM</strong> For future dates, you can select a
                specific time slot available at checkout. We pickup between{" "}
                <strong>9AM to 1PM</strong>.
              </span>
            </p>

            <p className="mt-5 text-[15px] font-medium">Your Rental Period:</p>
            <div className="mt-2 flex items-center gap-6 rounded-2xl border border-gray-300 bg-white px-4 py-2.5 shadow-sm">
              <p className="flex items-baseline gap-1.5">
                <span className="text-[44px] leading-none font-semibold">
                  {String(days).padStart(2, "0")}
                </span>
                <span className="text-gray-500">
                  {days > 1 ? "Days" : "Day"}
                </span>
              </p>
              <div>
                <p className="text-[13px] font-medium">Chargeable Period:</p>
                <p className="mt-1 flex items-center gap-2 text-[15px] font-medium">
                  <CalendarIcon className="size-[18px]" />
                  {days ? (
                    `${formatOrdinalDate(addDays(delivery, 1))} - ${formatOrdinalDate(addDays(pickup, -1))}`
                  ) : (
                    <span className="text-gray-400">--</span>
                  )}
                </p>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-brand-navy px-5 pt-3 pb-5 text-white">
              <p className="flex items-center gap-3 text-2xl font-bold text-[#dff35c] italic">
                <span className="grid size-9 -rotate-12 place-items-center rounded-full border-2 border-dashed border-[#dff35c] text-base not-italic">
                  %
                </span>
                Save more with us!
              </p>
              <p className="mt-3 text-[13px] leading-[1.4] font-semibold">
                Longer rental periods mean bigger savings—enjoy discounts of up
                to 12%. We don’t charge you for deliver and pickup days!
              </p>
            </div>

            <button
              type="button"
              disabled={!days}
              onClick={() => {
                setDates(delivery, pickup);
                closeDatePicker();
              }}
              className="mt-5 h-12 w-full rounded-full bg-brand-blue text-lg font-semibold text-white transition-colors enabled:hover:bg-[#1a3fc7] disabled:bg-[#e2e6e6] disabled:text-gray-400"
            >
              Continue
            </button>
          </div>

          <div className="grid gap-10 self-start rounded-3xl bg-white p-7 md:grid-cols-2">
            {/* One month with both arrows on small screens, two side by side
                with an arrow each from md up. */}
            <div className="md:hidden">
              <MonthGrid
                view={view}
                min={today}
                delivery={delivery}
                pickup={pickup}
                onPick={pickFromCalendar}
                onPrev={() => setView(shiftMonth(view, -1))}
                onNext={() => setView(shiftMonth(view, 1))}
                prevDisabled={!isBefore(monthOf(today), view)}
              />
            </div>
            <div className="hidden md:block">
              <MonthGrid
                view={view}
                min={today}
                delivery={delivery}
                pickup={pickup}
                onPick={pickFromCalendar}
                onPrev={() => setView(shiftMonth(view, -1))}
                prevDisabled={!isBefore(monthOf(today), view)}
              />
            </div>
            <div className="hidden md:block">
              <MonthGrid
                view={shiftMonth(view, 1)}
                min={today}
                delivery={delivery}
                pickup={pickup}
                onPick={pickFromCalendar}
                onNext={() => setView(shiftMonth(view, 1))}
              />
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function DateModal() {
  const { datePickerOpen } = useStore();
  // Mounted only while open, so the draft dates start from the saved ones.
  return datePickerOpen ? <DateDialog /> : null;
}
