import { useState } from "react";
import { FaDumbbell, FaPlaneDeparture, FaDice } from "react-icons/fa";
import { GiCookingPot } from "react-icons/gi";

const interests = [
  {
    id: "gym",
    title: "Gym",
    Icon: FaDumbbell,
  },
  {
    id: "cooking",
    title: "Baking & Cooking",
    Icon: GiCookingPot,
  },
  {
    id: "travel",
    title: "Traveling",
    Icon: FaPlaneDeparture,
  },
  {
    id: "random",
    title: "Random Activities",
    Icon: FaDice,
  },
];

export default function Interests() {
  const [selectedInterestId, setSelectedInterestId] = useState(interests[0].id);

  const selectedInterest =
    interests.find((interest) => interest.id === selectedInterestId) ??
    interests[0];

  const leftInterests = interests.slice(0, 2);
  const rightInterests = interests.slice(2, 4);

  return (
    <section className="pointer-events-auto min-h-[calc(100vh-8rem)] px-6 py-10 text-white">
      {/* Header */}
      <div className="relative z-20 flex w-full justify-center pt-10">
        <h1 className="font-pixel text-center text-2xl leading-relaxed text-white md:text-4xl">
          Me in the Wild
        </h1>
      </div>

      <h3 className="font-pixel text-center text-xl leading-relaxed text-red md:text-4xl">
        This page is still in construction.
      </h3>

      {/* Desktop layout */}
      <div className="mx-auto mt-10 hidden max-w-7xl grid-cols-[0.8fr_2fr_0.8fr] items-center gap-12 md:grid">
        {/* Left side buttons */}
        <div className="flex flex-col gap-6">
          {leftInterests.map((interest) => {
            const Icon = interest.Icon;
            const isSelected = selectedInterestId === interest.id;

            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => setSelectedInterestId(interest.id)}
                className={`group rounded-2xl border px-6 py-6 text-left backdrop-blur-[3px]
                shadow-[0_0_35px_rgba(0,0,0,0.45)] transition-all duration-300
                hover:-translate-y-1 hover:border-red-400/50 hover:bg-red-500/[0.06]
                ${
                  isSelected
                    ? "border-red-400/60 bg-red-500/[0.10] shadow-[0_0_35px_rgba(248,113,113,0.22)]"
                    : "border-red-400/20 bg-black/[0.35]"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10 text-white/80
                    shadow-[0_0_18px_rgba(248,113,113,0.18)] transition-all duration-300
                    group-hover:scale-105 group-hover:text-red-200 group-hover:shadow-[0_0_25px_rgba(248,113,113,0.35)]"
                  >
                    <span className="text-3xl leading-none">
                      <Icon />
                    </span>
                  </div>

                  <h2 className="font-pixel text-sm leading-relaxed text-white md:text-base">
                    {interest.title}
                  </h2>
                </div>
              </button>
            );
          })}
        </div>
        {/* Middle view */}
        <div className="min-h-[520px] rounded-3xl border border-red-400/25 bg-black/[0.38] px-8 py-10 text-center backdrop-blur-[4px] shadow-[0_0_55px_rgba(0,0,0,0.55)]">
          <div className="mx-auto flex h-50 w-24 items-center justify-center rounded-3xl border border-red-400/30 bg-red-500/10 text-white/85 shadow-[0_0_28px_rgba(248,113,113,0.22)]">
            <span className="text-5xl leading-none">
              <selectedInterest.Icon />
            </span>
          </div>

          <h2 className="mt-8 font-pixel text-xl leading-relaxed text-white">
            {selectedInterest.title}
          </h2>
        </div>
        {/* Right side buttons */}
        <div className="flex flex-col gap-6">
          {rightInterests.map((interest) => {
            const Icon = interest.Icon;
            const isSelected = selectedInterestId === interest.id;

            return (
              <button
                key={interest.id}
                type="button"
                onClick={() => setSelectedInterestId(interest.id)}
                className={`group rounded-2xl border px-2 py-2 text-left backdrop-blur-[3px]
                shadow-[0_0_35px_rgba(0,0,0,0.45)] transition-all duration-300
                hover:-translate-y-1 hover:border-red-400/50 hover:bg-red-500/[0.06]
                ${
                  isSelected
                    ? "border-red-400/60 bg-red-500/[0.10] shadow-[0_0_35px_rgba(248,113,113,0.22)]"
                    : "border-red-400/20 bg-black/[0.35]"
                }`}
              >
                <div className="flex items-center gap-5">
                  <div
                    className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10 text-white/80
                    shadow-[0_0_18px_rgba(248,113,113,0.18)] transition-all duration-300
                    group-hover:scale-105 group-hover:text-red-200 group-hover:shadow-[0_0_25px_rgba(248,113,113,0.35)]"
                  >
                    <span className="text-3xl leading-none">
                      <Icon />
                    </span>
                  </div>

                  <h2 className="font-pixel text-sm leading-relaxed text-white md:text-base">
                    {interest.title}
                  </h2>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile layout */}
      <div className="mx-auto mt-12 flex max-w-2xl flex-col gap-5 md:hidden">
        {interests.map((interest) => {
          const Icon = interest.Icon;
          const isSelected = selectedInterestId === interest.id;

          return (
            <div
              key={interest.id}
              className="overflow-hidden rounded-2xl border border-red-400/20 bg-black/[0.35] backdrop-blur-[3px] shadow-[0_0_35px_rgba(0,0,0,0.45)]"
            >
              <button
                type="button"
                onClick={() =>
                  setSelectedInterestId((current) =>
                    current === interest.id ? "" : interest.id
                  )
                }
                className="group flex w-full items-center justify-between gap-5 px-5 py-5 text-left"
              >
                <div className="flex items-center gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10 text-white/80
                    shadow-[0_0_18px_rgba(248,113,113,0.18)]"
                  >
                    <span className="text-2xl leading-none">
                      <Icon />
                    </span>
                  </div>

                  <h2 className="font-pixel text-sm leading-relaxed text-white">
                    {interest.title}
                  </h2>
                </div>

                <span
                  className={`text-xl text-white/60 transition-transform duration-300 ${
                    isSelected ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>

              <div
                className={`grid transition-all duration-500 ease-in-out ${
                  isSelected
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-white/10 px-5 py-5"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
