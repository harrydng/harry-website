import { useMemo, useState } from "react";
import "../../../index.css";
import { zodiacConstellations } from "../../../data/zodiacConstellations";

type Star = {
  x: number;
  y: number;
  r: number;
  opacity: number;
};

type SvgPoint = {
  x: number;
  y: number;
};

type SvgConstellation = {
  id: string;
  name: string;
  stars: {
    x: number;
    y: number;
    size?: number;
  }[];
  lines: [number, number][];
  label: SvgPoint;
  boundary: SvgPoint[];
};

const zodiacOrder = [
  "aries",
  "taurus",
  "gemini",
  "cancer",
  "leo",
  "virgo",
  "libra",
  "scorpio",
  "sagittarius",
  "capricorn",
  "aquarius",
  "pisces",
];

const VIEWBOX_WIDTH = 1920;
const VIEWBOX_HEIGHT = 1080;

function getColumnBoundary(index: number): SvgPoint[] {
  const columnWidth = VIEWBOX_WIDTH / 12;
  const x1 = index * columnWidth;
  const x2 = (index + 1) * columnWidth;

  return [
    { x: x1, y: 0 },
    { x: x2, y: 0 },
    { x: x2, y: VIEWBOX_HEIGHT },
    { x: x1, y: VIEWBOX_HEIGHT },
  ];
}

function getConstellationsForSvg(): SvgConstellation[] {
  const columnWidth = VIEWBOX_WIDTH / 12;

  return zodiacConstellations.map((item, index) => {
    const columnStart = index * columnWidth;
    const columnCenter = columnStart + columnWidth / 2;

    const minX = Math.min(...item.stars.map((star) => star.x));
    const maxX = Math.max(...item.stars.map((star) => star.x));
    const minY = Math.min(...item.stars.map((star) => star.y));
    const maxY = Math.max(...item.stars.map((star) => star.y));

    const constellationWidth = Math.max(maxX - minX, 1);
    const constellationHeight = Math.max(maxY - minY, 1);

    const targetWidth = columnWidth * 0.58;
    const targetHeight = 150;

    const milkyCenterY = milkyWayCenterY(columnCenter);

    const stars = item.stars.map((star) => {
      const normalizedX = (star.x - minX) / constellationWidth - 0.5;
      const normalizedY = (star.y - minY) / constellationHeight - 0.5;

      return {
        x: columnCenter + normalizedX * targetWidth,
        y: milkyCenterY + normalizedY * targetHeight,
        size: star.size,
      };
    });

    return {
      id: item.id,
      name: item.name,
      stars,
      lines: item.lines,
      label: {
        x: columnCenter,
        y: milkyCenterY + 12,
      },
      boundary: getColumnBoundary(index),
    };
  });
}

function seededRandom(seed: number) {
  let value = seed;
  return () => {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

function milkyWayCenterY(x: number) {
  // Curved band running across the screen similar to the reference
  return (
    720 -
    120 * Math.sin((x / 1920) * Math.PI * 1.1) +
    55 * Math.sin((x / 1920) * Math.PI * 2.4)
  );
}

function createStars(count: number): Star[] {
  const random = seededRandom(42);

  return Array.from({ length: count }, () => ({
    x: random() * 1920,
    y: random() * 1080,
    r: random() * 1.8 + 0.25,
    opacity: random() * 0.7 + 0.15,
  }));
}

function createMilkyWayStars(count: number): Star[] {
  const random = seededRandom(99);

  return Array.from({ length: count }, () => {
    const x = random() * 1920;
    const centerY = milkyWayCenterY(x);

    // Denser stars around the center of the band
    const spread = (random() - 0.5) * 220 + (random() - 0.5) * 100;
    const y = centerY + spread;

    return {
      x,
      y,
      r: random() * 1.9 + 0.35,
      opacity: random() * 0.55 + 0.2,
    };
  });
}

function getMilkyWayDrift(index: number) {
  const direction = index % 2 === 0 ? 1 : -1;

  return {
    x: `${direction * (6 + (index % 5) * 2)}px`,
    y: `${direction * -1 * (2 + (index % 4))}px`,
    duration: `${8 + (index % 8) * 2}s`,
    delay: `${-(index % 10)}s`,
  };
}

function getStarColor(index: number) {
  if (index % 7 === 0) return "#8fdcff"; // light blue
  if (index % 11 === 0) return "#5bb7ff"; // deeper blue
  if (index % 17 === 0) return "#b8ecff"; // icy blue
  return "white";
}

function shouldSparkle(index: number) {
  return index % 13 === 0 || index % 29 === 0;
}

function getSparkleDuration(index: number) {
  return `${15 + (index % 8)}s`;
}

function getSparkleDelay(index: number) {
  return `${-(index % 5)}s`;
}

export default function ZodiacMapBackground() {
  const [activeId, setActiveId] = useState<string | null>(null);

  const constellations = useMemo(() => getConstellationsForSvg(), []);
  const backgroundStars = useMemo(() => createStars(1300), []);
  const milkyWayStars = useMemo(() => createMilkyWayStars(600), []);

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-[#061116]">
      {/* deep sky base */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(4, 13, 15, 0.28),rgb(10, 38, 51)_78%)]" />

      {/* full-screen grid */}
      <div className="absolute inset-0 opacity-[0.5] bg-[linear-gradient(rgba(130,210,225,0.14)_1px,transparent_1px),linear-gradient(90deg,rgba(130,210,225,0.14)_1px,transparent_1px)] bg-[size:8.333%_11.111%]" />

      {/* dark blue glow layers */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-12%] top-[8%] h-[55%] w-[45%] rounded-full bg-[#2d3a5e]/25 blur-[300px]" />
        <div className="absolute right-[-10%] top-[18%] h-[48%] w-[42%] rounded-full bg-[#2d3a5e]/22 blur-[190px]" />
      </div>

      {/* Milky Way cloud, CSS version */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div className="absolute bottom-[-18%] left-[-12%] h-[58%] w-[130%] rotate-[-8deg] rounded-[40%] bg-[radial-gradient(ellipse_at_center,rgba(214,220,226,0.16),rgba(214,220,226,0.07)_30%,rgba(214,220,226,0.02)_55%,transparent_74%)] blur-[300px]" />
        <div className="absolute bottom-[5%] left-[2%] h-[30%] w-[95%] rotate-[-6deg] rounded-[50%] bg-[radial-gradient(ellipse_at_center,rgba(200,208,216,0.10),rgba(200,208,216,0.035)_45%,transparent_76%)] blur-[300px]" />
      </div>

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1920 1080"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="brightGlow">
            <feGaussianBlur stdDeviation="4.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          <linearGradient id="milkyBandGradient" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(255,255,255,0.00)" />
            <stop offset="15%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="32%" stopColor="rgba(255,255,255,0.12)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.18)" />
            <stop offset="68%" stopColor="rgba(255,255,255,0.10)" />
            <stop offset="85%" stopColor="rgba(255,255,255,0.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.00)" />
          </linearGradient>
        </defs>

        {/* background star field */}
        {backgroundStars.map((star, index) => {
          const sparkle = shouldSparkle(index);
          const color = getStarColor(index);
          const baseOpacity = Math.min(star.opacity + 0.5, 1);

          return (
            <g
              key={`bg-${index}`}
              style={
                sparkle
                  ? ({
                      transformBox: "fill-box",
                      transformOrigin: "center",
                      "--base-opacity": baseOpacity,
                      animation: `starSparkle ${getSparkleDuration(
                        index
                      )} ease-in-out infinite`,
                      animationDelay: getSparkleDelay(index),
                    } as React.CSSProperties)
                  : undefined
              }
            >
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r * 3.2}
                fill={color}
                opacity={star.opacity * 0.08}
              />

              <circle
                cx={star.x}
                cy={star.y}
                r={star.r}
                fill={color}
                opacity={baseOpacity}
              />
            </g>
          );
        })}

        {/* concentrated stars inside the white band */}
        {milkyWayStars.map((star, index) => {
          const drift = getMilkyWayDrift(index);

          return (
            <g
              key={`mw-${index}`}
              className="will-change-transform"
              style={
                {
                  "--drift-x": drift.x,
                  "--drift-y": drift.y,
                  animation: `driftAlongMilkyWay ${drift.duration} ease-in-out infinite`,
                  animationDelay: drift.delay,
                } as React.CSSProperties
              }
            >
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r * 3.5}
                fill={getStarColor(index + 1000)}
                opacity={star.opacity * 0.12}
              />
              <circle
                cx={star.x}
                cy={star.y}
                r={star.r * 1.2}
                fill={getStarColor(index + 1000)}
                opacity={Math.min(star.opacity + 0.3, 1)}
              />
            </g>
          );
        })}

        {/* constellation boundaries + lines + stars */}
        {constellations.map((item) => {
          const isActive = activeId === item.id;

          return (
            <g key={item.id} className="pointer-events-none">
              <polygon
                points={item.boundary.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="transparent"
                stroke="transparent"
              />

              {item.lines.map(([from, to], index) => {
                const start = item.stars[from];
                const end = item.stars[to];

                return (
                  <line
                    key={index}
                    x1={start.x}
                    y1={start.y}
                    x2={end.x}
                    y2={end.y}
                    stroke={
                      isActive
                        ? "rgba(245, 248, 250, 0.24)"
                        : "rgba(166,128,66,0.42)"
                    }
                    strokeWidth={isActive ? 2.4 : 1}
                    opacity={isActive ? 1 : 0.55}
                    filter={isActive ? "url(#brightGlow)" : undefined}
                  />
                );
              })}

              {/* Constellation stars */}
              {item.stars.map((star, index) => {
                const baseSize = star.size ?? 1.2;

                return (
                  <g key={index}>
                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={isActive ? baseSize * 9 : baseSize * 3.4}
                      fill={isActive ? "#f1f5f7" : "#c8b17a"}
                      opacity={isActive ? 0.22 : 0.08}
                    />

                    <circle
                      cx={star.x}
                      cy={star.y}
                      r={isActive ? baseSize * 4.3 : baseSize * 2.1}
                      fill={isActive ? "#f8fbff" : "#d7c18a"}
                      opacity={isActive ? 1 : 0.75}
                      filter={isActive ? "url(#brightGlow)" : undefined}
                    />
                  </g>
                );
              })}

              <text
                x={item.label.x}
                y={item.label.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#f4f4f0"
                fontSize="20"
                opacity={isActive ? 1 : 0}
                filter={isActive ? "url(#brightGlow)" : undefined}
                className="pointer-events-none select-none font-serif transition-opacity duration-300"
              >
                {item.name}
              </text>

              {/* larger hover area */}
              <polygon
                points={item.boundary.map((p) => `${p.x},${p.y}`).join(" ")}
                fill="transparent"
                stroke="transparent"
                strokeWidth="28"
              />
            </g>
          );
        })}
      </svg>
      {/* invisible 12-column horoscope hover layer */}
      <div className="absolute inset-0 z-[5] grid grid-cols-12">
        {zodiacOrder.map((zodiacId) => (
          <button
            key={zodiacId}
            type="button"
            aria-label={`Hover ${zodiacId}`}
            onMouseEnter={() => setActiveId(zodiacId)}
            onMouseLeave={() => setActiveId(null)}
            className="h-full w-full cursor-crosshair bg-transparent"
          />
        ))}
      </div>
    </div>
  );
}
