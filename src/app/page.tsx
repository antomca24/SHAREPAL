import { Banner } from "@/components/banner";
import { Catalog } from "@/components/catalog";
import { CategoryTabs } from "@/components/category-tabs";
import { Faq } from "@/components/faq";
import { ChevronRightIcon } from "@/components/icons";
import { Reviews } from "@/components/reviews";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="flex-1">
      <div className="mx-auto w-full max-w-[1400px] px-4 lg:px-7">
        <CategoryTabs />

        <div className="mt-1">
          <Catalog products={products} banner={<Banner />} />
        </div>

        <Faq />

        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-3 px-1 py-8 text-[15px] font-medium text-gray-600"
        >
          Bangalore
          <ChevronRightIcon className="size-4" />
          <span className="font-semibold text-ink">Gaming gadgets on rent</span>
        </nav>
      </div>

      <Reviews />
    </main>
  );
}
