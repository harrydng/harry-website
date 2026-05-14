export type StarPoint = {
  x: number;
  y: number;
  size?: number;
};

export type ZodiacConstellation = {
  id: string;
  name: string;
  stars: StarPoint[];
  lines: [number, number][];
  label: {
    x: number;
    y: number;
  };
};

export const zodiacConstellations: ZodiacConstellation[] = [
  {
    id: "aries",
    name: "Aries",
    stars: [
      { x: 8, y: 42, size: 1.6 },
      { x: 12, y: 38, size: 1.2 },
      { x: 16, y: 36, size: 1.4 },
      { x: 20, y: 31, size: 1.1 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
    ],
    label: { x: 14, y: 33 },
  },
  {
    id: "taurus",
    name: "Taurus",
    stars: [
      { x: 27, y: 36, size: 1.5 },
      { x: 32, y: 31, size: 1.1 },
      { x: 36, y: 28, size: 1.6 },
      { x: 41, y: 33, size: 1.2 },
      { x: 37, y: 39, size: 1.1 },
      { x: 31, y: 42, size: 1.2 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [4, 5],
      [5, 0],
    ],
    label: { x: 34, y: 35 },
  },
  {
    id: "gemini",
    name: "Gemini",
    stars: [
      { x: 48, y: 26, size: 1.3 },
      { x: 51, y: 34, size: 1.1 },
      { x: 54, y: 43, size: 1.3 },
      { x: 61, y: 27, size: 1.5 },
      { x: 64, y: 36, size: 1.1 },
      { x: 67, y: 45, size: 1.2 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [3, 4],
      [4, 5],
      [0, 3],
      [1, 4],
    ],
    label: { x: 57, y: 35 },
  },
  {
    id: "cancer",
    name: "Cancer",
    stars: [
      { x: 75, y: 31, size: 1.2 },
      { x: 79, y: 38, size: 1.4 },
      { x: 74, y: 45, size: 1.1 },
      { x: 83, y: 48, size: 1.1 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [1, 3],
    ],
    label: { x: 79, y: 41 },
  },
  {
    id: "leo",
    name: "Leo",
    stars: [
      { x: 10, y: 63, size: 1.1 },
      { x: 15, y: 57, size: 1.2 },
      { x: 21, y: 54, size: 1.6 },
      { x: 25, y: 60, size: 1.1 },
      { x: 29, y: 68, size: 1.3 },
      { x: 18, y: 70, size: 1.2 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
      [5, 0],
    ],
    label: { x: 20, y: 63 },
  },
  {
    id: "virgo",
    name: "Virgo",
    stars: [
      { x: 39, y: 63, size: 1.1 },
      { x: 44, y: 58, size: 1.2 },
      { x: 50, y: 61, size: 1.5 },
      { x: 55, y: 66, size: 1.1 },
      { x: 61, y: 63, size: 1.1 },
      { x: 67, y: 69, size: 1.2 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    label: { x: 52, y: 66 },
  },
  {
    id: "libra",
    name: "Libra",
    stars: [
      { x: 77, y: 62, size: 1.3 },
      { x: 84, y: 59, size: 1.1 },
      { x: 90, y: 64, size: 1.2 },
      { x: 82, y: 70, size: 1.2 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 0],
    ],
    label: { x: 84, y: 66 },
  },
  {
    id: "scorpio",
    name: "Scorpio",
    stars: [
      { x: 11, y: 82, size: 1.1 },
      { x: 17, y: 78, size: 1.2 },
      { x: 22, y: 83, size: 1.1 },
      { x: 27, y: 88, size: 1.4 },
      { x: 34, y: 86, size: 1.1 },
      { x: 39, y: 80, size: 1.2 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 5],
    ],
    label: { x: 27, y: 83 },
  },
  {
    id: "sagittarius",
    name: "Sagittarius",
    stars: [
      { x: 49, y: 82, size: 1.2 },
      { x: 54, y: 76, size: 1.3 },
      { x: 60, y: 80, size: 1.1 },
      { x: 65, y: 74, size: 1.1 },
      { x: 70, y: 82, size: 1.3 },
      { x: 62, y: 89, size: 1.1 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [2, 4],
      [4, 5],
      [5, 0],
    ],
    label: { x: 60, y: 82 },
  },
  {
    id: "capricorn",
    name: "Capricorn",
    stars: [
      { x: 82, y: 82, size: 1.2 },
      { x: 88, y: 77, size: 1.1 },
      { x: 94, y: 80, size: 1.4 },
      { x: 91, y: 88, size: 1.1 },
      { x: 84, y: 91, size: 1.2 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
      [4, 0],
    ],
    label: { x: 89, y: 85 },
  },
  {
    id: "aquarius",
    name: "Aquarius",
    stars: [
      { x: 19, y: 18, size: 1.1 },
      { x: 24, y: 15, size: 1.2 },
      { x: 30, y: 18, size: 1.1 },
      { x: 36, y: 14, size: 1.3 },
      { x: 43, y: 18, size: 1.1 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    label: { x: 31, y: 20 },
  },
  {
    id: "pisces",
    name: "Pisces",
    stars: [
      { x: 62, y: 15, size: 1.2 },
      { x: 67, y: 18, size: 1.1 },
      { x: 72, y: 15, size: 1.1 },
      { x: 78, y: 19, size: 1.3 },
      { x: 84, y: 16, size: 1.1 },
    ],
    lines: [
      [0, 1],
      [1, 2],
      [2, 3],
      [3, 4],
    ],
    label: { x: 73, y: 20 },
  },
];