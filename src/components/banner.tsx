import Image from "next/image";
import gamingLeft from "../../public/Images/gaming-left.webp";
import gamingRight from "../../public/Images/gaming-right.webp";

const BRANDS = ["XBOX", "PS5", "Meta"];

const ART = "absolute -bottom-8 hidden h-[108%] w-auto min-[1100px]:block";

export function Banner() {
  return (
    <section className="relative overflow-hidden rounded-xl bg-[radial-gradient(ellipse_at_center,#9a3df0_0%,#7424c9_45%,#4f1a96_100%)] px-6 py-9 text-center text-white">
      <Image
        src={gamingLeft}
        alt=""
        sizes="260px"
        loading="eager"
        className={`${ART} left-0`}
      />
      <Image
        src={gamingRight}
        alt=""
        sizes="260px"
        loading="eager"
        className={`${ART} right-0`}
      />

      <div className="relative mx-auto max-w-[640px] min-[1100px]:max-w-[540px]">
        <h2 className="font-display text-3xl font-bold sm:text-[40px] sm:leading-tight">
          Gaming Consoles
        </h2>
        <p className="mt-3 text-base leading-7 font-bold sm:text-lg">
          Rent the latest gaming gadgets from{" "}
          <span className="font-display tracking-tight italic">SharePal</span>{" "}
          PS5, Xbox, Oculus VR, Racing Wheel on rent.
        </p>
        <ul className="mt-5 flex items-center justify-center divide-x divide-white/30 text-xl font-semibold tracking-wide">
          {BRANDS.map((brand) => (
            <li key={brand} className="px-4">
              {brand}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
