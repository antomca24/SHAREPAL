import { categoryMenus } from "@/data/content";

const ACTIVE_TAB = "Gaming";

export function CategoryTabs() {
  return (
    <nav
      aria-label="Categories"
      className="relative flex justify-start overflow-x-auto sm:justify-center lg:overflow-visible"
    >
      {categoryMenus.map(({ title, links }) => {
        // Menus with more than two columns span the full row; smaller ones
        // sit centred under their own tab.
        const wide = links.length > 8;
        return (
          <div
            key={title}
            className={`group shrink-0 sm:mx-6 ${wide ? "" : "lg:relative"}`}
          >
            <button
              type="button"
              aria-current={title === ACTIVE_TAB ? "page" : undefined}
              className={`w-32 border-b-2 py-2.5 text-[15px] font-semibold transition-colors group-hover:text-ink ${
                title === ACTIVE_TAB
                  ? "border-brand-violet text-ink"
                  : "border-transparent text-gray-600"
              }`}
            >
              {title}
            </button>

            <div
              className={`invisible absolute top-full z-30 hidden translate-y-2 pt-1 opacity-0 transition-all duration-300 ease-out group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 lg:block ${
                wide ? "left-0 w-full" : "left-1/2 w-max -translate-x-1/2"
              }`}
            >
              <ul
                className={`grid grid-flow-col grid-rows-[repeat(4,auto)] gap-y-[22px] rounded-3xl bg-white p-8 shadow-[0_8px_30px_rgb(16_24_40/0.18)] ${
                  wide
                    ? "auto-cols-fr gap-x-6"
                    : "auto-cols-[minmax(140px,max-content)] gap-x-20"
                }`}
              >
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[15px] leading-tight font-medium hover:text-brand-violet hover:underline"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </nav>
  );
}
