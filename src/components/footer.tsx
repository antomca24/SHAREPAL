import { footerCategories, footerColumns } from "@/data/content";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  FacebookIcon,
  HeadsetIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
} from "./icons";
import { Logo } from "./logo";

const LINK = "text-[15px] text-[#a9b0c6] hover:text-white hover:underline";
const HEADING = "text-[15px] font-bold text-white";

const SOCIALS = [
  { label: "Facebook", Icon: FacebookIcon },
  { label: "Instagram", Icon: InstagramIcon },
  { label: "LinkedIn", Icon: LinkedInIcon },
];

export function Footer() {
  return (
    <footer className="bg-[#020a2c] text-white">
      <div className="mx-auto max-w-[1400px] px-4 pt-14 pb-16 lg:px-11">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {footerCategories.map(({ title, links }) => (
            <div key={title}>
              <h3 className="text-lg leading-7 font-bold">{title}</h3>
              <ul className="mt-4 space-y-3.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className={`${LINK} leading-tight`}>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 text-[15px] leading-[1.5] text-[#a9b0c6]">
          <h3 className={`${HEADING} underline underline-offset-2`}>
            Renting from SharePal in Bangalore
          </h3>
          <p className="mt-2">
            Discover the convenience of renting from SharePal, your trusted
            partner in Bangalore for all your rental needs. Whether you&apos;re
            exploring the vibrant streets of Koramangala, setting up a shoot in
            Indiranagar, or planning a trek from the outskirts of Whitefield,
            SharePal has you covered. We offer a wide range of products,
            including cameras, action cameras, gaming consoles, projectors,
            speakers, trekking gear, riding gear, and creator gear. With free
            home delivery and pickup services, flexible rental tenures, and an
            easy-to-use platform, renting has never been easier. Experience the
            freedom to rent what you need, when you need it, without the
            commitment of buying.
          </p>
          <h3 className={`${HEADING} mt-7`}>Categories on Rent</h3>
          <h4 className={`${HEADING} mt-4 underline underline-offset-2`}>
            Action Cameras on Rent
          </h4>
          <p className="mt-2">
            Capture your adventures in stunning detail with our range of action
            cameras. Choose from top brands like GoPro, Insta360, and DJI,
            perfect for everything from extreme sports to casual vlogging.
            Whether you need high-quality video for your next trek or a
            360-degree camera to capture every angle, we&apos;ve got you
            covered.
          </p>
          <button
            type="button"
            className="mt-4 flex items-center gap-2 text-[13px] font-bold text-white"
          >
            Read More
            <ChevronDownIcon className="size-4" />
          </button>
        </div>

        <div className="mt-10 flex h-10 items-center bg-[linear-gradient(90deg,transparent_10%,#06145a)]">
          <Logo className="text-[#2046f5]" />
        </div>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {footerColumns.map(({ title, links }) => (
            <div key={title}>
              <h3 className={HEADING}>{title}</h3>
              <ul className="mt-9 space-y-7">
                {links.map(({ label, isNew }) => (
                  <li key={label} className="flex items-start gap-1">
                    <a href="#" className={LINK}>
                      {label}
                    </a>
                    {isNew && (
                      <span className="-mt-2 rounded-full bg-brand-lime px-2 py-0.5 text-[10px] leading-none font-bold text-brand-navy">
                        New
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className={HEADING}>Need Help</h3>
            <ul className="mt-9 space-y-7">
              <li>
                <a href="#" className={`${LINK} flex items-center gap-2`}>
                  <HeadsetIcon className="size-4" />
                  Contact Support
                </a>
              </li>
              <li>
                <a href="#" className={LINK}>
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="mailto:care@sharepal.in"
                  className={`${LINK} flex items-center gap-2.5`}
                >
                  <MailIcon className="size-6" />
                  care@sharepal.in
                </a>
              </li>
              <li className="flex gap-4 text-[#a9b0c6]">
                {SOCIALS.map(({ label, Icon }) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="hover:text-white"
                  >
                    <Icon className="size-8" />
                  </a>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#16297a] pt-7 text-[15px] text-[#6f7dff]">
          <a href="#top" className="flex items-center gap-3 hover:text-white">
            Go up
            <ChevronUpIcon className="size-5" strokeWidth={2.5} />
          </a>
          <p>© 2026. SWNAC E-Kiraya Services Pvt Ltd</p>
          <p>
            Made with <span className="text-rose-500">♥</span> in India
          </p>
        </div>
      </div>
    </footer>
  );
}
