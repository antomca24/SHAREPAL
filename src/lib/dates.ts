// Dates are handled as "YYYY-MM-DD" strings, which compare correctly with
// < and > and avoid time zone drift.

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAY_MS = 86_400_000;

export type Month = { year: number; month: number };

function toUTC(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return Date.UTC(year, month - 1, day);
}

function fromUTC(time: number) {
  return new Date(time).toISOString().slice(0, 10);
}

function parts(iso: string) {
  const [year, month, day] = iso.split("-").map(Number);
  return { year, month: MONTHS[month - 1].slice(0, 3), day };
}

export function todayISO() {
  const now = new Date();
  return fromUTC(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()));
}

export function addDays(iso: string, days: number) {
  return fromUTC(toUTC(iso) + days * DAY_MS);
}

// "10 Oct"
export function formatShortDate(iso: string) {
  const { month, day } = parts(iso);
  return `${day} ${month}`;
}

// "Oct 10, 2026"
export function formatLongDate(iso: string) {
  const { year, month, day } = parts(iso);
  return `${month} ${day}, ${year}`;
}

// "11th Oct"
export function formatOrdinalDate(iso: string) {
  const { month, day } = parts(iso);
  const teens = day % 100 >= 11 && day % 100 <= 13;
  const suffix = teens ? "th" : (["th", "st", "nd", "rd"][day % 10] ?? "th");
  return `${day}${suffix} ${month}`;
}

export function monthOf(iso: string): Month {
  const [year, month] = iso.split("-").map(Number);
  return { year, month: month - 1 };
}

export function shiftMonth({ year, month }: Month, by: number): Month {
  const index = year * 12 + month + by;
  return { year: Math.floor(index / 12), month: index % 12 };
}

export function monthTitle({ year, month }: Month) {
  return `${MONTHS[month]} ${year}`;
}

// Every day in the full Sunday-to-Saturday weeks that cover the month.
export function monthDays({ year, month }: Month) {
  const first = Date.UTC(year, month, 1);
  const last = Date.UTC(year, month + 1, 0);
  const start = first - new Date(first).getUTCDay() * DAY_MS;
  const end = last + (6 - new Date(last).getUTCDay()) * DAY_MS;
  const days: { iso: string; day: number; inMonth: boolean }[] = [];
  for (let time = start; time <= end; time += DAY_MS) {
    days.push({
      iso: fromUTC(time),
      day: new Date(time).getUTCDate(),
      inMonth: time >= first && time <= last,
    });
  }
  return days;
}

// The earliest pickup leaves one chargeable day after the delivery day.
export function earliestPickup(delivery: string) {
  return addDays(delivery, 2);
}

// Delivery and pickup days are not charged.
export function rentalDaysBetween(delivery: string, pickup: string) {
  const days = Math.round((toUTC(pickup) - toUTC(delivery)) / DAY_MS) - 1;
  return Math.max(1, days);
}
