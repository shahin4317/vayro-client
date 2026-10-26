
import Link from "next/link";

export default function EditorialIntro() {
  return (
    <section
      aria-labelledby="editorial-title"
      className="
        w-full bg-white
        px-5 py-16
        sm:px-8 sm:py-20
        lg:px-12 lg:py-24
      "
    >
      <div className="mx-auto flex max-w-[1300px] flex-col items-center text-center">

        {/* Small Top Heading */}
        <p
          className="
            mb-5 text-[10px] font-bold
            uppercase tracking-[0.24em]
            text-[#555555]
            sm:text-xs
            md:mb-6
          "
        >
          MODERN. RELAXED. UNCOMPLICATED.
        </p>

        {/* Main Heading */}
        <h2
          id="editorial-title"
          className="
            max-w-[1250px]
            text-[clamp(32px,5vw,76px)]
            font-extrabold
            uppercase
            leading-[1.08]
            tracking-[-0.055em]
            text-[#111111]
          "
        >
          MADE FOR YOUR EVERYDAY.
        </h2>

        {/* Description */}
        <p
          className="
            mx-auto mt-5
            max-w-[720px]
            text-sm leading-7
            text-[#666666]
            sm:mt-6 sm:text-base
            md:text-lg md:leading-8
          "
        >
          Discover the essentials that feel like you.
          Contemporary clothing, considered details
          and effortless everyday style.
        </p>

        {/* Explore Collection Button */}
        <Link
          href="/shop"
          className="
            group mt-9
            inline-flex items-center justify-center
            gap-4 border-b border-black
            pb-2 text-[12px] font-bold
            uppercase tracking-[0.14em]
            text-black transition-colors
            hover:text-[#555555]
            sm:mt-10 sm:text-sm
          "
        >
          <span>EXPLORE THE COLLECTION</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="
              transition-transform duration-300
              group-hover:translate-x-1.5
            "
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </Link>

      </div>
    </section>
  );
}
