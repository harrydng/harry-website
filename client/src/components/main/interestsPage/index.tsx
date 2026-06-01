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
  return (
    <section className="pointer-events-auto min-h-[calc(100vh-8rem)] px-6 py-10 text-white">
      {/* Header */}
      <div className="relative z-20 flex w-full justify-center pt-10">
        <h1 className="font-pixel text-center text-2xl leading-relaxed text-white md:text-4xl">
          Me in the Wild
        </h1>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 md:grid-cols-2">
        {interests.map((interest) => {
          const Icon = interest.Icon;

          return (
            <button
              key={interest.id}
              type="button"
              className="group rounded-2xl border border-red-400/20 bg-black/[0.35] px-6 py-6 text-left backdrop-blur-[3px]
              shadow-[0_0_35px_rgba(0,0,0,0.45)] transition-all duration-300
              hover:-translate-y-1 hover:border-red-400/50 hover:bg-red-500/[0.06]
              hover:shadow-[0_0_35px_rgba(248,113,113,0.18)]"
            >
              <div className="flex items-start gap-5">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-red-400/30 bg-red-500/10 text-white/80
                  shadow-[0_0_18px_rgba(248,113,113,0.18)] transition-all duration-300
                  group-hover:scale-105 group-hover:text-red-200 group-hover:shadow-[0_0_25px_rgba(248,113,113,0.35)]"
                >
                  <span className="text-3xl leading-none">
                    <Icon />
                  </span>
                </div>

                <div>
                  <h2 className="font-pixel text-sm leading-relaxed text-white md:text-base">
                    {interest.title}
                  </h2>

                </div>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
