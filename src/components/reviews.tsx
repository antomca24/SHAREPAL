import { reviews, stats } from "@/data/content";
import { GoogleIcon, StarIcon } from "./icons";

function ReviewCards({ hidden }: { hidden?: boolean }) {
  return (
    <ul className="flex" aria-hidden={hidden}>
      {reviews.map((review) => (
        <li key={review.name} className="pr-4">
          <figure className="flex h-full w-[300px] flex-col rounded-3xl border border-gray-200 bg-[#fafafa] p-4 sm:w-[360px]">
            <div className="flex items-center gap-2">
              <GoogleIcon className="size-6" />
              <div className="flex gap-0.5 text-amber-400" aria-label="5 stars">
                {Array.from({ length: 5 }, (_, star) => (
                  <StarIcon key={star} className="size-[22px]" />
                ))}
              </div>
            </div>
            <blockquote className="mt-4 line-clamp-4 min-h-24 text-base leading-6 font-semibold">
              “ {review.text} ”
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-5">
              <span className="grid size-10 shrink-0 place-items-center rounded-full bg-[#dbe3ff] font-bold text-brand-blue">
                {review.initials}
              </span>
              <span className="text-[15px] leading-5">
                <span className="block font-medium text-gray-600">
                  {review.name}
                </span>
                <span className="text-gray-400">
                  {review.city} • {review.category}
                </span>
              </span>
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

export function Reviews() {
  return (
    <section className="bg-white pt-12 pb-12">
      <h2 className="px-4 text-center font-display text-4xl font-bold sm:text-5xl">
        Served more than <span className="text-brand-orange">1 Lakh Orders</span>
      </h2>

      <div className="mt-12 overflow-hidden motion-reduce:overflow-x-auto">
        {/* Two copies of the list, so sliding by half loops seamlessly. */}
        <div className="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
          <ReviewCards />
          <ReviewCards hidden />
        </div>
      </div>

      <dl className="mx-auto mt-16 grid max-w-[1400px] gap-y-8 border-y border-gray-200 px-4 py-9 text-center sm:grid-cols-3 lg:px-7">
        {stats.map(({ value, label }) => (
          <div key={label} className="flex flex-col-reverse gap-3">
            <dt className="text-xl text-gray-600">{label}</dt>
            <dd className="mx-auto w-fit bg-[linear-gradient(90deg,#0b2bd9_50%,#7ccb12_92%)] bg-clip-text font-display text-5xl font-bold text-transparent sm:text-[56px] sm:leading-none">
              {value}
            </dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
