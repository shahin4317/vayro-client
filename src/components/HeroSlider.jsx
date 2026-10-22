
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { heroBanners } from "@/data/heroBanners";

// Animation settings
const slideVariants = {
  enter: (direction) => ({
    opacity: 0,
    x: direction * 60,
  }),

  center: {
    opacity: 1,
    x: 0,
  },

  exit: (direction) => ({
    opacity: 0,
    x: direction * -60,
  }),
};

export default function HeroSlider() {
  const [[selectedItem, direction], setSelected] = useState([0, 1]);
  const [isPaused, setIsPaused] = useState(false);

  const totalSlides = heroBanners.length;

  // Previous / Next slide
  function setSlide(newDirection) {
    if (totalSlides <= 1) return;

    setSelected(([current]) => [
      (current + newDirection + totalSlides) % totalSlides,
      newDirection,
    ]);
  }

  // Automatic sliding every 5 seconds
  useEffect(() => {
    if (totalSlides <= 1 || isPaused) return;

    const timer = setTimeout(() => {
      setSelected(([current]) => [
        (current + 1) % totalSlides,
        1,
      ]);
    }, 4000);

    return () => clearTimeout(timer);
  }, [selectedItem, totalSlides, isPaused]);

  if (totalSlides === 0) return null;

  const currentBanner = heroBanners[selectedItem];

  return (
    <section
      className="relative w-full overflow-hidden bg-[#F7F7F7]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Responsive image container */}
      <div
        className="
          relative w-full overflow-hidden
          aspect-[16/9]
        
          
        "
      >
        <AnimatePresence
          initial={false}
          custom={direction}
          mode="wait"
        >
          <motion.div
            key={currentBanner.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.65,
              ease: "easeInOut",
            }}
            className="absolute inset-0"
          >
            <Image
              src={currentBanner.image}
              alt={currentBanner.alt}
              fill
              sizes="100vw"
              priority={selectedItem === 0}
              className="object-contain object-center"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation buttons */}
      {totalSlides > 1 && (
        <>
          <button
            type="button"
            onClick={() => setSlide(-1)}
            aria-label="Previous slide"
            className="
              absolute left-2 top-1/2 z-20
              -translate-y-1/2
              rounded-full bg-white/85
              px-3 py-2 text-black shadow-md
              transition hover:bg-white
              md:left-5 md:px-4 md:py-3
            "
          >
            &#8592;
          </button>

          <button
            type="button"
            onClick={() => setSlide(1)}
            aria-label="Next slide"
            className="
              absolute right-2 top-1/2 z-20
              -translate-y-1/2
              rounded-full bg-white/85
              px-3 py-2 text-black shadow-md
              transition hover:bg-white
              md:right-5 md:px-4 md:py-3
            "
          >
            &#8594;
          </button>

          {/* Pagination dots */}
          <div
            className="
              absolute bottom-2 left-1/2 z-20
              flex -translate-x-1/2 gap-2
              md:bottom-5
            "
          >
            {heroBanners.map((banner, index) => (
              <button
                key={banner.id}
                type="button"
                onClick={() =>
                  setSelected([
                    index,
                    index >= selectedItem ? 1 : -1,
                  ])
                }
                aria-label={`Go to slide ${index + 1}`}
                aria-current={
                  selectedItem === index ? "true" : undefined
                }
                className={`h-2 rounded-full transition-all duration-300 ${
                  selectedItem === index
                    ? "w-8 bg-black"
                    : "w-2 bg-white shadow-sm ring-1 ring-black/30"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
