import { useState } from "react";
import { professional } from "../../../data/professional";

type ProfessionalExperience = (typeof professional)[number];

const VIEWBOX_WIDTH = 1920;
const VIEWBOX_HEIGHT = 1080;

const TIMELINE_START_YEAR = 2023;
const TIMELINE_END_YEAR = 2026;

const TIMELINE_START_X = 100;
const TIMELINE_END_X = 1840;
const TIMELINE_Y_OFFSET = 60;

function milkyWayCenterY(x: number) {
  return (
    720 -
    120 * Math.sin((x / 1920) * Math.PI * 1.1) +
    55 * Math.sin((x / 1920) * Math.PI * 2.4)
  );
}

function getDecimalYear(month: number, year: number) {
  return year + (month - 1) / 12;
}

function getMiddleTimelineYear(experience: ProfessionalExperience) {
  const start = getDecimalYear(experience.from_month, experience.from_year);
  const end = getDecimalYear(experience.to_month, experience.to_year);

  return (start + end) / 2;
}

function getTimelineProgress(timelineYear: number) {
  const progress =
    (timelineYear - TIMELINE_START_YEAR) /
    (TIMELINE_END_YEAR - TIMELINE_START_YEAR);

  return Math.max(0, Math.min(1, progress));
}

function getTimelineX(timelineYear: number) {
  const progress = getTimelineProgress(timelineYear);

  return TIMELINE_START_X + progress * (TIMELINE_END_X - TIMELINE_START_X);
}

function getTimelineY(timelineYear: number) {
  return milkyWayCenterY(getTimelineX(timelineYear)) + TIMELINE_Y_OFFSET;
}

function getMilkyWayTimelinePoints() {
  const points: string[] = [];

  for (let x = TIMELINE_START_X; x <= TIMELINE_END_X; x += 24) {
    points.push(`${x},${milkyWayCenterY(x) + TIMELINE_Y_OFFSET}`);
  }

  return points.join(" ");
}

function getCardPosition(index: number, x: number, y: number) {
  const isAbove = index % 2 === 0;

  return {
    x: x - 155,
    y: isAbove ? y - 220 : y + 65,
  };
}

function formatDateRange(experience: ProfessionalExperience) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const from = `${months[experience.from_month - 1]} ${experience.from_year}`;
  const to = `${months[experience.to_month - 1]} ${experience.to_year}`;

  return `${from} — ${to}`;
}

export default function Professionals() {
  const [selectedExperience, setSelectedExperience] =
    useState<ProfessionalExperience | null>(null);

  const [isModalClosing, setIsModalClosing] = useState(false);

  const openModal = (experience: ProfessionalExperience) => {
    setIsModalClosing(false);
    setSelectedExperience(experience);
  };

  const closeModal = () => {
    setIsModalClosing(true);

    window.setTimeout(() => {
      setSelectedExperience(null);
      setIsModalClosing(false);
    }, 350);
  };

  const sortedProfessional = [...professional].sort((a, b) => {
    return getMiddleTimelineYear(a) - getMiddleTimelineYear(b);
  });

  const years = [2023, 2024, 2025, 2026];

  return (
    <section className="pointer-events-auto min-h-screen px-6 pb-24 pt-14 text-white md:px-10 lg:px-16">
      {/* Header */}
      <div className="relative z-30 mx-auto w-full max-w-[1400px]">
        <div className="border-t-2 border-red-400/80" />

        <header className="border-b border-red-400/40 py-5 text-center">
          <p className="mb-3 font-serif text-[9px] uppercase tracking-[0.55em] text-red-300/70 md:text-[10px]">
            Professional Archive · 2023 — Present
          </p>

          <h1 className="font-serif text-5xl font-black uppercase leading-none tracking-[-0.035em] text-white md:text-7xl lg:text-[86px]">
            Career Timeline
          </h1>

          <div className="mx-auto mt-5 flex max-w-5xl items-center gap-4">
            <div className="h-px flex-1 bg-red-400/40" />

            <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-red-300/80">
              Experience &amp; Growth
            </p>

            <div className="h-px flex-1 bg-red-400/40" />
          </div>
        </header>

        <p className="mx-auto mt-5 max-w-3xl text-center font-serif text-sm italic leading-6 text-white/75">
          A timeline of the places I&apos;ve worked, the systems I&apos;ve
          learned, and the experiences that shaped how I build software.
        </p>
      </div>

      {/* Desktop timeline */}
      <div className="pointer-events-none absolute inset-0 z-20 hidden md:block">
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <filter id="professionalTimelineGlow">
              <feGaussianBlur stdDeviation="4" result="blur" />

              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Large soft glow */}
          <polyline
            points={getMilkyWayTimelinePoints()}
            fill="none"
            stroke="rgba(248,113,113,0.07)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Main timeline */}
          <polyline
            points={getMilkyWayTimelinePoints()}
            fill="none"
            stroke="rgba(248,113,113,0.52)"
            strokeWidth="1.6"
            strokeDasharray="10 16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Years */}
          {years.map((year) => {
            const x = getTimelineX(year);
            const y = getTimelineY(year);

            return (
              <g key={year}>
                <circle
                  cx={x}
                  cy={y}
                  r="4"
                  fill="#f87171"
                  opacity="0.9"
                />

                <text
                  x={x}
                  y={y + 52}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="font-serif"
                  fontSize="24"
                  letterSpacing="5"
                  fill="rgba(255,255,255,0.85)"
                >
                  {year}
                </text>
              </g>
            );
          })}

          {/* Experience cards */}
          {sortedProfessional.map((experience, index) => {
            const timelineYear = getMiddleTimelineYear(experience);
            const x = getTimelineX(timelineYear);
            const y = getTimelineY(timelineYear);
            const card = getCardPosition(index, x, y);

            return (
              <g key={`${experience.id}-${experience.role}`}>
                {/* Outer dot glow */}
                <circle
                  cx={x}
                  cy={y}
                  r="15"
                  fill="rgba(248,113,113,0.10)"
                  stroke="rgba(248,113,113,0.55)"
                  strokeWidth="1.5"
                />

                {/* Inner dot */}
                <circle
                  cx={x}
                  cy={y}
                  r="5.5"
                  fill="#ffffff"
                  filter="url(#professionalTimelineGlow)"
                />

                {/* Card */}
                <foreignObject
                  x={card.x}
                  y={card.y}
                  width="310"
                  height="160"
                  className="pointer-events-auto overflow-visible"
                >
                  <button
                    type="button"
                    onClick={() => openModal(experience)}
                    className="
                      group
                      h-full w-full
                      border-y border-red-400/35
                      bg-black/25
                      px-5 py-4
                      text-left
                      backdrop-blur-[2px]
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-red-400/80
                      hover:bg-red-500/[0.05]
                    "
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-serif text-[9px] uppercase tracking-[0.25em] text-red-300">
                        {formatDateRange(experience)}
                      </p>

                      <span className="text-lg text-red-400 transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </div>

                    <p className="mt-4 font-serif text-[18px] font-semibold leading-5 text-white">
                      {experience.role}
                    </p>

                    <p className="mt-3 font-serif text-[14px] text-white/80">
                      {experience.company_name}
                    </p>

                    <p className="mt-3 font-serif text-[8px] uppercase tracking-[0.25em] text-red-300/70">
                      View Experience
                    </p>
                  </button>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile timeline */}
      <div className="relative z-20 mx-auto mt-12 max-w-2xl border-l border-red-400/50 pl-7 md:hidden">
        {sortedProfessional.map((experience, index) => (
          <button
            key={`${experience.id}-${experience.role}`}
            type="button"
            onClick={() => openModal(experience)}
            className="group relative mb-10 block w-full text-left"
          >
            {/* Timeline dot */}
            <div className="absolute -left-[36px] top-1 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-red-300/80 bg-black">
              <div className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]" />
            </div>

            <div className="flex items-center justify-between gap-4">
              <p className="font-serif text-[9px] uppercase tracking-[0.28em] text-red-300">
                {formatDateRange(experience)}
              </p>

              <span className="font-serif text-[10px] text-red-300/60">
                {String(index + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="mt-3 border-y border-red-400/30 py-4 transition-all duration-300 group-hover:border-red-400/70">
              <p className="font-serif text-xl font-semibold leading-6 text-white">
                {experience.role}
              </p>

              <p className="mt-2 font-serif text-sm text-white/80">
                {experience.company_name}
              </p>

              <p className="mt-4 font-serif text-[8px] uppercase tracking-[0.3em] text-red-300/70">
                Read Experience →
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Modal */}
      {selectedExperience && (
        <div
          className={`
            fixed inset-0 z-50
            flex items-center justify-center
            bg-black/70
            px-6
            backdrop-blur-sm
            transition-all duration-350
            ${
              isModalClosing
                ? "opacity-0 backdrop-blur-0"
                : "opacity-100 backdrop-blur-sm"
            }
          `}
          onClick={closeModal}
        >
          <div
            className={`
              relative
              max-h-[88vh]
              w-full max-w-[1000px]
              overflow-y-auto
              border-y-2 border-red-400/70
              bg-[#05090c]/95
              px-6 py-7
              shadow-[0_0_60px_rgba(248,113,113,0.12)]
              backdrop-blur-md
              transition-all duration-350
              md:px-10 md:py-9
              ${
                isModalClosing
                  ? "scale-95 opacity-0"
                  : "scale-100 opacity-100"
              }
            `}
            onClick={(event) => event.stopPropagation()}
          >
            {/* Close */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-4 font-serif text-2xl text-white/60 transition hover:text-red-300"
              aria-label="Close popup"
            >
              ×
            </button>

            {/* Modal top label */}
            <div className="border-b border-red-400/35 pb-5">
              <p className="font-serif text-[9px] uppercase tracking-[0.4em] text-red-300/80">
                Professional Experience
              </p>
            </div>

            <div className="mt-7 grid gap-8 md:grid-cols-[0.85fr_1.15fr]">
              {/* Left */}
              <div className="md:border-r md:border-red-400/30 md:pr-8">
                <p className="font-serif text-[10px] uppercase tracking-[0.28em] text-red-300">
                  {formatDateRange(selectedExperience)}
                </p>

                <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-white md:text-4xl">
                  {selectedExperience.role}
                </h2>

                <p className="mt-3 font-serif text-lg text-white/80">
                  {selectedExperience.company_name}
                </p>

                {/* Company logo */}
                <a
                  href={selectedExperience.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${selectedExperience.company_name} website`}
                  className="group/logo mt-8 inline-block"
                >
                  <img
                    src={selectedExperience.logo}
                    alt={`${selectedExperience.company_name} logo`}
                    className="
                      block
                      max-h-[180px]
                      max-w-[240px]
                      object-contain
                      transition-transform duration-500
                      group-hover/logo:scale-105
                    "
                  />
                </a>

                <div className="mt-8 h-px bg-red-400/30" />

                <a
                  href={selectedExperience.link}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-block font-serif text-[10px] uppercase tracking-[0.28em] text-red-300 transition hover:text-red-200"
                >
                  Visit Company ↗
                </a>
              </div>

              {/* Right */}
              <div>
                <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/80">
                  What I Worked On
                </p>

                <div className="mt-5 space-y-5">
                  {selectedExperience.description.map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[40px_1fr] gap-4 border-b border-red-400/20 pb-5"
                    >
                      <span className="font-serif text-3xl text-red-400/60">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <p className="font-serif text-[15px] leading-7 text-white/85">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom */}
            <div className="mt-8 flex items-center justify-between border-t border-red-400/30 pt-4 font-serif text-[8px] uppercase tracking-[0.25em] text-white/55">
              <span>Harry Duong · Professional Archive</span>
              <span>Career Timeline</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}