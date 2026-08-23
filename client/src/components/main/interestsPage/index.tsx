import { useRef, useState } from "react";
import type { ElementType, TouchEvent } from "react";

import {
  FaDumbbell,
  FaPlaneDeparture,
  FaDice,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import { GiCookingPot } from "react-icons/gi";

import {
  bake,
  cooking,
  travel,
  randomActivities,
  gym,
} from "../../../data/interests";

type Interest = {
  id: string;
  title: string;
  subtitle: string;
  Icon: ElementType;
};

type InterestImage = {
  src: string;
  caption: string;
};

/*
  Your data can temporarily contain either:

  "/image.jpg"

  OR

  {
    src: "/image.jpg",
    caption: "Description"
  }

  This lets you migrate your data gradually.
*/
type RawInterestImage =
  | string
  | {
      src: string;
      caption?: string;
    };

type InterestSlide = {
  id: string;
  name: string;
  location?: string;
  image: InterestImage[];
  description: string | string[];
  details?: string[];
};

const interests: Interest[] = [
  {
    id: "gym",
    title: "Gym",
    subtitle: "Training, progress, and staying active.",
    Icon: FaDumbbell,
  },
  {
    id: "cooking",
    title: "Baking & Cooking",
    subtitle: "Things I make when I'm not debugging.",
    Icon: GiCookingPot,
  },
  {
    id: "travel",
    title: "Traveling",
    subtitle: "Places, food, people, and questionable itineraries.",
    Icon: FaPlaneDeparture,
  },
  {
    id: "random",
    title: "Random Activities",
    subtitle: "Everything that doesn't belong anywhere else.",
    Icon: FaDice,
  },
];

/*
  Converts both old and new image formats into:

  {
    src: "...",
    caption: "..."
  }
*/
function normalizeImages(images: RawInterestImage[]): InterestImage[] {
  return images.map((image) => {
    if (typeof image === "string") {
      return {
        src: image,
        caption: "",
      };
    }

    return {
      src: image.src,
      caption: image.caption ?? "",
    };
  });
}

function getSlides(category: string): InterestSlide[] {
  if (category === "cooking") {
    const bakingSlides: InterestSlide[] = bake.map((item) => ({
      id: item.id,
      name: item.name,
      image: normalizeImages(item.image ?? []),
      description: item.description ?? "",
      details: item.recipe ?? [],
    }));

    const cookingSlides: InterestSlide[] = cooking.map((item) => ({
      id: item.id,
      name: item.name,
      image: normalizeImages(item.image ?? []),
      description: item.description ?? [],
      details: item.cook ?? [],
    }));

    return [...bakingSlides, ...cookingSlides];
  }

  if (category === "travel") {
    return travel.map((item) => ({
      id: item.id,
      name: item.city,
      location: item.country,
      image: normalizeImages(item.image ?? []),
      description: item.description ?? "",
      details: [],
    }));
  }

  if (category === "gym") {
    return gym.map((item) => ({
      id: item.id,
      name: item.name,
      image: normalizeImages(item.image ?? []),
      description: item.description ?? "",
      details: item.details ?? [],
    }));
  }

  if (category === "random") {
    return randomActivities.map((item) => ({
      id: item.id,
      name: item.name,
      image: normalizeImages(item.image ?? []),
      description: item.description ?? "",
      details: item.details ?? [],
    }));
  }

  return [];
}

export default function Interests() {
  const [selectedInterestId, setSelectedInterestId] =
    useState<string>("cooking");

  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentImage, setCurrentImage] = useState(0);

  const touchStartX = useRef<number | null>(null);

  const selectedInterest =
    interests.find((interest) => interest.id === selectedInterestId) ??
    interests[0];

  const SelectedIcon = selectedInterest.Icon;

  const slides = getSlides(selectedInterestId);

  const activeSlide = slides[currentSlide];

  const activeImage =
    activeSlide && activeSlide.image.length > 0
      ? activeSlide.image[currentImage]
      : null;

  /*
    We reset the indexes here instead of inside useEffect.
  */
  const selectInterest = (id: string) => {
    setSelectedInterestId(id);
    setCurrentSlide(0);
    setCurrentImage(0);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setCurrentImage(0);
  };

  const nextSlide = () => {
    if (slides.length === 0) return;

    setCurrentImage(0);

    setCurrentSlide((current) => {
      if (current === slides.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  const previousSlide = () => {
    if (slides.length === 0) return;

    setCurrentImage(0);

    setCurrentSlide((current) => {
      if (current === 0) {
        return slides.length - 1;
      }

      return current - 1;
    });
  };

  const nextImage = () => {
    if (!activeSlide) return;
    if (activeSlide.image.length <= 1) return;

    setCurrentImage((current) => {
      if (current === activeSlide.image.length - 1) {
        return 0;
      }

      return current + 1;
    });
  };

  const previousImage = () => {
    if (!activeSlide) return;
    if (activeSlide.image.length <= 1) return;

    setCurrentImage((current) => {
      if (current === 0) {
        return activeSlide.image.length - 1;
      }

      return current - 1;
    });
  };

  const handleTouchStart = (event: TouchEvent<HTMLElement>) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event: TouchEvent<HTMLElement>) => {
    if (touchStartX.current === null) return;

    const touchEndX = event.changedTouches[0].clientX;
    const difference = touchStartX.current - touchEndX;

    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        nextSlide();
      } else {
        previousSlide();
      }
    }

    touchStartX.current = null;
  };

  return (
    <section className="pointer-events-auto min-h-screen px-6 pb-24 pt-14 text-white md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Top line */}
        <div className="border-t-2 border-red-400/80" />

        {/* Header */}
        <header className="border-b border-red-400/40 py-5 text-center">
          <p className="mb-3 font-serif text-[9px] uppercase tracking-[0.55em] text-red-300/70 md:text-[10px]">
            Personal Archives · Off The Clock · 2026
          </p>

          <h1 className="font-serif text-5xl font-black uppercase leading-none tracking-[-0.035em] text-white md:text-7xl lg:text-[88px]">
            Me In The Wild
          </h1>

          <div className="mx-auto mt-5 flex max-w-5xl items-center gap-4">
            <div className="h-px flex-1 bg-red-400/40" />

            <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-red-300/80">
              Beyond The Resume
            </p>

            <div className="h-px flex-1 bg-red-400/40" />
          </div>
        </header>

        {/* Intro */}
        <div className="border-b border-red-400/40 py-7 text-center">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-white md:text-5xl">
            A collection of my life outside school and work
            <br className="hidden md:block" />
          </h2>

          <p className="mx-auto mt-5 max-w-3xl font-serif text-sm italic leading-6 text-white/80 md:text-base">
            Food, travel, training, spontaneous plans, and my hobbies
          </p>
        </div>

        {/* Categories */}
        <div className="grid border-b border-red-400/40 sm:grid-cols-2 lg:grid-cols-4">
          {interests.map((interest) => {
            const Icon = interest.Icon;
            const isSelected = selectedInterestId === interest.id;

            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => selectInterest(interest.id)}
                className={`
                  group
                  relative
                  border-b border-red-400/20
                  px-5 py-5
                  text-left
                  transition-all duration-300
                  sm:border-r
                  lg:border-b-0
                  ${
                    isSelected
                      ? "bg-red-500/[0.08]"
                      : "hover:bg-red-500/[0.04]"
                  }
                `}
              >
                <div className="flex items-start gap-4">
                  <span
                    className={`
                      mt-0.5
                      text-xl
                      transition-all duration-300
                      ${
                        isSelected
                          ? "scale-110 text-red-300"
                          : "text-red-400/70 group-hover:scale-110 group-hover:text-red-300"
                      }
                    `}
                  >
                    <Icon />
                  </span>

                  <div>
                    <p
                      className={`
                        font-serif
                        text-sm
                        font-semibold
                        transition-colors
                        ${
                          isSelected
                            ? "text-white"
                            : "text-white/85 group-hover:text-white"
                        }
                      `}
                    >
                      {interest.title}
                    </p>

                    <p className="mt-1 font-serif text-[10px] leading-4 text-white/65">
                      {interest.subtitle}
                    </p>
                  </div>
                </div>

                <div
                  className={`
                    absolute bottom-0 left-0
                    h-[2px]
                    bg-red-400
                    transition-all duration-500
                    ${
                      isSelected
                        ? "w-full opacity-100"
                        : "w-0 opacity-0"
                    }
                  `}
                />
              </button>
            );
          })}
        </div>

        {/* Current category */}
        <div className="flex flex-col gap-5 border-b border-red-400/40 py-7 md:flex-row md:items-end md:justify-between">
          <div className="flex items-center gap-5">
            <span className="text-3xl text-red-300">
              <SelectedIcon />
            </span>

            <div>
              <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/70">
                Currently Browsing
              </p>

              <h2 className="mt-2 font-serif text-4xl font-semibold text-white md:text-5xl">
                {selectedInterest.title}
              </h2>
            </div>
          </div>

          {slides.length > 0 && (
            <p className="font-serif text-[10px] uppercase tracking-[0.3em] text-white/70">
              {String(currentSlide + 1).padStart(2, "0")} /{" "}
              {String(slides.length).padStart(2, "0")}
            </p>
          )}
        </div>

        {/* Main viewer */}
        {activeSlide ? (
          <article
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="border-b border-red-400/40 py-8"
          >
            <div className="grid items-start gap-8 lg:grid-cols-12">
              {/* Image side */}
              <div className="lg:col-span-8">
                <div className="group relative overflow-hidden border border-red-400/30">
                  {activeImage ? (
                    <img
                      src={activeImage.src}
                      alt={activeImage.caption || activeSlide.name}
                      className="
                        block
                        max-h-[650px]
                        w-full
                        object-contain
                        transition-transform
                        duration-700
                        ease-out
                        group-hover:scale-[1.02]
                      "
                    />
                  ) : (
                    <div className="flex min-h-[500px] flex-col items-center justify-center gap-5">
                      <span className="text-5xl text-red-400/40">
                        <SelectedIcon />
                      </span>

                      <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-white/55">
                        Add Photograph
                      </p>
                    </div>
                  )}

                  {/* Archive number */}
                  <div className="absolute left-4 top-4 bg-black/60 px-3 py-2 font-serif text-[9px] uppercase tracking-[0.3em] text-red-300 backdrop-blur-sm">
                    Archive{" "}
                    {String(currentSlide + 1).padStart(2, "0")}
                  </div>

                  {/* Previous photo */}
                  {activeSlide.image.length > 1 && (
                    <button
                      type="button"
                      onClick={previousImage}
                      aria-label="Previous photo"
                      className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-red-400/40 bg-black/60 text-red-300 backdrop-blur-sm transition-all hover:border-red-300 hover:text-red-200"
                    >
                      <span className="text-sm">
                        <FaChevronLeft />
                      </span>
                    </button>
                  )}

                  {/* Next photo */}
                  {activeSlide.image.length > 1 && (
                    <button
                      type="button"
                      onClick={nextImage}
                      aria-label="Next photo"
                      className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-red-400/40 bg-black/60 text-red-300 backdrop-blur-sm transition-all hover:border-red-300 hover:text-red-200"
                    >
                      <span className="text-sm">
                        <FaChevronRight />
                      </span>
                    </button>
                  )}

                  {/* Photo counter */}
                  {activeSlide.image.length > 1 && (
                    <div className="absolute bottom-4 right-4 border border-red-400/50 bg-black/60 px-3 py-2 font-serif text-[9px] uppercase tracking-[0.25em] text-red-300 backdrop-blur-sm">
                      Photo {currentImage + 1} / {activeSlide.image.length}
                    </div>
                  )}
                </div>

                {/* Individual photo caption */}
                {activeImage && (
                  <div className="border-b border-red-400/30 py-3">
                    <div className="flex items-start gap-3">
                      <span className="shrink-0 font-serif text-[10px] font-bold uppercase tracking-[0.25em] text-red-300">
                        {String(currentImage + 1).padStart(2, "0")}
                      </span>

                      <p className="font-serif text-[13px] italic leading-5 text-white/90">
                        {activeImage.caption ||
                          "A moment from the personal archive."}
                      </p>
                    </div>
                  </div>
                )}

                {/* Photo navigation bars */}
                {activeSlide.image.length > 1 && (
                  <div className="mt-3 flex gap-2">
                    {activeSlide.image.map((image, index) => (
                      <button
                        key={`${image.src}-${index}`}
                        type="button"
                        onClick={() => setCurrentImage(index)}
                        aria-label={`View photo ${index + 1}`}
                        className={`
                          h-[2px]
                          flex-1
                          transition-all duration-300
                          ${
                            currentImage === index
                              ? "bg-red-400"
                              : "bg-white/25 hover:bg-white/60"
                          }
                        `}
                      />
                    ))}
                  </div>
                )}

                <p className="mt-3 font-serif text-[10px] uppercase tracking-[0.25em] text-white/55">
                  Personal Archive · {selectedInterest.title}
                </p>
              </div>

              {/* Story */}
              <div className="lg:col-span-4 lg:border-l lg:border-red-400/30 lg:pl-8">
                {activeSlide.location && (
                  <p className="font-serif text-[10px] font-semibold uppercase tracking-[0.35em] text-red-300">
                    {activeSlide.location}
                  </p>
                )}

                <h3 className="mt-3 font-serif text-4xl font-semibold leading-[0.95] text-white md:text-5xl">
                  {activeSlide.name}
                </h3>

                {/* Description */}
                <div className="mt-6 font-serif text-[15px] leading-7 text-white/85">
                  {Array.isArray(activeSlide.description) ? (
                    activeSlide.description.length > 0 ? (
                      activeSlide.description.map((paragraph, index) => (
                        <p
                          key={index}
                          className={index > 0 ? "mt-5" : ""}
                        >
                          {paragraph}
                        </p>
                      ))
                    ) : (
                      <p className="italic text-white/60">
                        Description coming soon.
                      </p>
                    )
                  ) : activeSlide.description ? (
                    <p>{activeSlide.description}</p>
                  ) : (
                    <p className="italic text-white/60">
                      Description coming soon.
                    </p>
                  )}
                </div>

                {/* Details */}
                {activeSlide.details &&
                  activeSlide.details.length > 0 && (
                    <div className="mt-7 border-t border-red-400/30 pt-5">
                      <p className="font-serif text-[9px] font-bold uppercase tracking-[0.35em] text-red-300">
                        Notes
                      </p>

                      <div className="mt-4 divide-y divide-red-400/20 border-y border-red-400/20">
                        {activeSlide.details.map((detail, index) => (
                          <div
                            key={index}
                            className="grid grid-cols-[35px_1fr] gap-3 py-3"
                          >
                            <span className="font-serif text-lg text-red-400/80">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <p className="font-serif text-sm leading-6 text-white/80">
                              {detail}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                {/* Next / previous item */}
                {slides.length > 1 && (
                  <div className="mt-8 flex items-center justify-between border-y border-red-400/30 py-4">
                    <button
                      type="button"
                      onClick={previousSlide}
                      className="group flex items-center gap-2 font-serif text-[9px] uppercase tracking-[0.25em] text-red-300 transition hover:text-red-200"
                    >
                      <span className="transition-transform duration-300 group-hover:-translate-x-1">
                        <FaChevronLeft />
                      </span>

                      Previous
                    </button>

                    <button
                      type="button"
                      onClick={nextSlide}
                      className="group flex items-center gap-2 font-serif text-[9px] uppercase tracking-[0.25em] text-red-300 transition hover:text-red-200"
                    >
                      Next

                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <FaChevronRight />
                      </span>
                    </button>
                  </div>
                )}

                {slides.length > 1 && (
                  <p className="mt-4 text-center font-serif text-[9px] italic text-white/60 md:hidden">
                    Swipe left or right to explore
                  </p>
                )}
              </div>
            </div>
          </article>
        ) : (
          /* Empty category */
          <div className="border-b border-red-400/40 py-24 text-center">
            <span className="mx-auto block w-fit text-5xl text-red-400/50">
              <SelectedIcon />
            </span>

            <h3 className="mt-6 font-serif text-3xl text-white">
              Nothing here yet.
            </h3>

            <p className="mt-3 font-serif text-sm italic text-white/65">
              This archive is still being assembled.
            </p>
          </div>
        )}

        {/* Browse archive */}
        {slides.length > 1 && (
          <div className="border-b border-red-400/40 py-6">
            <p className="mb-4 font-serif text-[9px] font-bold uppercase tracking-[0.35em] text-red-300">
              Browse Archive
            </p>

            <div className="flex gap-5 overflow-x-auto pb-3">
              {slides.map((slide, index) => {
                const isCurrent = currentSlide === index;
                const thumbnail = slide.image[0];

                return (
                  <button
                    key={slide.id}
                    type="button"
                    onClick={() => goToSlide(index)}
                    className="group min-w-[160px] max-w-[200px] text-left"
                  >
                    {thumbnail ? (
                      <div
                        className={`
                          overflow-hidden
                          border
                          transition-all duration-300
                          ${
                            isCurrent
                              ? "border-red-400"
                              : "border-red-400/25 group-hover:border-red-400/70"
                          }
                        `}
                      >
                        <img
                          src={thumbnail.src}
                          alt={thumbnail.caption || slide.name}
                          className="
                            h-24
                            w-full
                            object-cover
                            transition-transform
                            duration-500
                            group-hover:scale-105
                          "
                        />
                      </div>
                    ) : (
                      <div
                        className={`
                          flex
                          h-24
                          items-center
                          justify-center
                          border
                          transition-all
                          ${
                            isCurrent
                              ? "border-red-400"
                              : "border-red-400/25 group-hover:border-red-400/70"
                          }
                        `}
                      >
                        <span className="text-2xl text-red-400/50 transition-transform duration-300 group-hover:scale-110">
                          <SelectedIcon />
                        </span>
                      </div>
                    )}

                    <p
                      className={`
                        mt-2
                        font-serif
                        text-xs
                        transition-colors
                        ${
                          isCurrent
                            ? "text-red-300"
                            : "text-white/75 group-hover:text-white"
                        }
                      `}
                    >
                      {slide.name}
                    </p>

                    {slide.location && (
                      <p className="mt-1 font-serif text-[9px] uppercase tracking-[0.2em] text-white/55">
                        {slide.location}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="flex flex-col gap-3 py-6 font-serif text-[9px] uppercase tracking-[0.25em] text-red-300/70 sm:flex-row sm:items-center sm:justify-between">
          <span>Harry Duong · Personal Archives</span>
          <span>Food · Travel · Training · Life</span>
          <span>Me In The Wild</span>
        </footer>
      </div>
    </section>
  );
}