import { faqs } from "@/data/content";
import { ChevronDownIcon } from "./icons";

export function Faq() {
  return (
    <section className="mt-10 rounded-[28px] bg-white px-5 pt-10 pb-8 sm:px-10">
      <h2 className="text-2xl font-bold">Frequently Asked Questions (FAQs)</h2>

      <div className="mt-4">
        {faqs.map(({ question, answer }) => (
          <details key={question} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-4 text-[17px] font-semibold hover:bg-gray-100 hover:underline [&::-webkit-details-marker]:hidden">
              {question}
              <ChevronDownIcon className="size-4 shrink-0 text-gray-500 transition-transform group-open:rotate-180" />
            </summary>
            <p className="px-4 pb-4 text-[15px] leading-6 text-gray-600">
              {answer}
            </p>
          </details>
        ))}
      </div>

      <button
        type="button"
        className="mt-2 h-11 w-full rounded-full bg-gray-100 text-[17px] font-semibold hover:bg-gray-200"
      >
        View more FAQ&apos;s
      </button>
    </section>
  );
}
