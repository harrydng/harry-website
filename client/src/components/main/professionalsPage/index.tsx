import { useState } from "react";
import { professional } from "../../../data/professional";

type ProfessionalExperience = (typeof professional)[number];

const VIEWBOX_WIDTH = 1920;
const VIEWBOX_HEIGHT = 1080;

const TIMELINE_START_YEAR = 2023;
const TIMELINE_END_YEAR = 2026;

const TIMELINE_START_X = 80;
const TIMELINE_END_X = 1850;
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
    x: x - 145,
    y: isAbove ? y - 205 : y + 65,
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

  return `${from} - ${to}`;
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
    <section className="pointer-events-auto min-h-[calc(100vh-8rem)] px-6 py-10">
      {/* Header */}
      <div className="relative z-20 flex w-full justify-center pt-10">
        <h1 className="font-pixel text-center text-2xl leading-relaxed text-white md:text-4xl">
          My Career Timeline
        </h1>
      </div>

      {/* Desktop timeline */}
      <div className="pointer-events-none fixed inset-0 z-20 hidden md:block">
        <svg
          className="h-full w-full"
          viewBox={`0 0 ${VIEWBOX_WIDTH} ${VIEWBOX_HEIGHT}`}
          preserveAspectRatio="xMidYMid slice"
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

          {/* Soft red glow line */}
          <polyline
            points={getMilkyWayTimelinePoints()}
            fill="none"
            stroke="rgba(248,113,113,0.055)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Thin dashed timeline */}
          <polyline
            points={getMilkyWayTimelinePoints()}
            fill="none"
            stroke="rgba(248,113,113,0.22)"
            strokeWidth="2"
            strokeDasharray="12 18"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Year labels */}
          {years.map((year) => {
            const x = getTimelineX(year);
            const y = getTimelineY(year);

            return (
              <text
                key={year}
                x={x}
                y={y + 52}
                textAnchor="middle"
                dominantBaseline="middle"
                className="font-pixel"
                fontSize="24"
                letterSpacing="8"
                fill="rgba(255, 255, 255, 0.72)"
              >
                {year}
              </text>
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
                {/* Dot */}
                <circle
                  cx={x}
                  cy={y}
                  r="13"
                  fill="rgba(248,113,113,0.10)"
                  stroke="rgba(252,165,165,0.55)"
                  strokeWidth="2"
                />

                <circle cx={x} cy={y} r="6" fill="white" />

                {/* Card */}
                <foreignObject
                  x={card.x}
                  y={card.y}
                  width="290"
                  height="150"
                  className="pointer-events-auto overflow-visible"
                >
                  <button
                    type="button"
                    onClick={() => openModal(experience)}
                    className="group h-full w-full rounded-2xl border border-red-400/25 bg-black/[0.38] px-4 py-4 text-center backdrop-blur-[3px]
                    shadow-[0_0_35px_rgba(0,0,0,0.55)] transition-all duration-300
                    hover:-translate-y-1 hover:border-red-400/60 hover:bg-red-500/10 hover:shadow-[0_0_35px_rgba(248,113,113,0.32)]"
                  >
                    <p className="font-pixel text-[8px] tracking-[0.22em] text-red-300">
                      {formatDateRange(experience)}
                    </p>

                    <p className="mt-3 font-pixel text-[13px] leading-5 text-white/90">
                      {experience.role}
                    </p>

                    <p className="mt-2 text-[15px] text-red-300/90">
                      {experience.company_name}
                    </p>
                  </button>
                </foreignObject>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile timeline */}
      <div className="relative z-20 mt-12 flex flex-col gap-8 border-l border-red-400/35 pl-6 md:hidden">
        {sortedProfessional.map((experience) => (
          <button
            key={`${experience.id}-${experience.role}`}
            type="button"
            onClick={() => openModal(experience)}
            className="group relative text-left"
          >
            <div className="absolute -left-[33px] top-1 flex h-4 w-4 items-center justify-center rounded-full border border-red-300/70 bg-red-500/20 shadow-[0_0_18px_rgba(248,113,113,0.45)]">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>

            <p className="font-pixel text-[8px] tracking-[0.2em] text-red-300">
              {formatDateRange(experience)}
            </p>

            <div className="mt-3 rounded-2xl border border-red-400/20 bg-black/[0.28] px-4 py-3 backdrop-blur-[3px] shadow-[0_0_35px_rgba(0,0,0,0.45)]">
              <p className="font-pixel text-[9px] leading-5 text-white/90">
                {experience.role}
              </p>

              <p className="mt-2 text-[10px] text-red-300/90">
                {experience.company_name}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Popup modal */}
      {selectedExperience && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6 font-['Times_New_Roman'] backdrop-blur-sm transition-all duration-350 ease-out
    ${
      isModalClosing
        ? "opacity-0 backdrop-blur-0"
        : "opacity-100 backdrop-blur-sm"
    }`}
          onClick={closeModal}
        >
          <div
            className={`relative max-h-[85vh] w-full max-w-[900px] overflow-y-auto rounded-3xl border border-red-400/30 bg-black/85 px-6 py-6 shadow-[0_0_60px_rgba(248,113,113,0.22)] backdrop-blur-md transition-all duration-350 ease-out
  ${
    isModalClosing
      ? "scale-75 rotate-[-8deg] opacity-0"
      : "scale-100 rotate-0 opacity-100 animate-[modalRotateIn_350ms_ease-out]"
  }`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-5 top-4 text-xl text-white/50 transition hover:text-red-300"
              aria-label="Close popup"
            >
              ×
            </button>

            <div className="grid gap-1 md:grid-cols-[0.8fr_1.2fr]">
              {/* LEFT SIDE: company / role info */}
              <div className="flex flex-col">
                <div>
                  <p className="mt-5 font-pixel text-[8px] uppercase tracking-[0.25em] text-red-300">
                    {formatDateRange(selectedExperience)}
                  </p>

                  <h2 className="mt-4 font-pixel text-xl leading-relaxed text-white md:text-2xl">
                    {selectedExperience.role}
                  </h2>
                </div>

                <a
                  href={selectedExperience.link}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${selectedExperience.company_name} website`}
                  className="mt-1 inline-block w-fit transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:drop-shadow-[0_0_18px_rgba(248,113,113,0.45)]"
                >
                  <img
                    src={selectedExperience.logo}
                    alt={`${selectedExperience.company_name} logo`}
                    className="h-40 w-40 rounded-xl object-contain"
                  />
                </a>
              </div>

              {/* RIGHT SIDE: description */}
              <div className="space-y-3">
                {selectedExperience.description.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-2xl border border-white/10 bg-black/[0.35] px-5 py-4 backdrop-blur-[2px] shadow-[0_0_25px_rgba(0,0,0,0.35)]"
                  >
                    <p className="text-sm leading-7 text-white/80">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
