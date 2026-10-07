"use client";

import { useEffect, type ReactNode } from "react";
import { CloseIcon } from "./icons";

// Right-hand panel that slides over a dimmed, blurred page.
export function Drawer({
  open,
  onClose,
  title,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    // Always mounted so the panel can slide both in and out.
    <div
      data-scroll-lock={open || undefined}
      inert={!open}
      className={`fixed inset-0 z-40 ${open ? "" : "pointer-events-none"}`}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`absolute inset-y-0 right-0 flex w-full max-w-[605px] flex-col overflow-hidden rounded-l-[28px] bg-page shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex h-[78px] shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-5">
          <button
            type="button"
            onClick={onClose}
            aria-label={`Close ${title}`}
            className="grid size-9 place-items-center rounded-full hover:bg-gray-100"
          >
            <CloseIcon className="size-6" strokeWidth={2.2} />
          </button>
          <h2 className="text-[19px] font-semibold">{title}</h2>
        </header>
        {children}
      </aside>
    </div>
  );
}
