import { navItems } from "../data/nav";
// import { socials } from "../data/socials";

import ZodiacMapBackground from "./main/zodiacMapBackground";

import AboutMe from "./main/aboutMePage";
import Projects from "./main/projectsPage";
import Professionals from "./main/professionalsPage";
import Interests from "./main/interestsPage";

import {
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useState, useEffect } from "react";

function Home() {
  return null;
}

export default function HarryWeb() {
  const navigate = useNavigate();
  const location = useLocation();

  const fullText = "Welcome to Harry's Mind !";

  const [typedText, setTypedText] = useState("");
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);

  const shouldShowIntro = location.pathname === "/" && !hasPlayedIntro;
  const showNav = !shouldShowIntro;

  useEffect(() => {
    if (!shouldShowIntro) return;

    let index = 0;
    let finishTimeout: number | undefined;

    const typing = window.setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        window.clearInterval(typing);

        finishTimeout = window.setTimeout(() => {
          setHasPlayedIntro(true);
        }, 900);
      }
    }, 100);

    return () => {
      window.clearInterval(typing);

      if (finishTimeout) {
        window.clearTimeout(finishTimeout);
      }
    };
  }, [shouldShowIntro]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background always visible */}
      <div className="fixed inset-0 z-0">
        <ZodiacMapBackground />
      </div>

      {/* Top nav */}
      <nav
        className={`fixed left-1/2 top-6 z-40 w-[min(92vw,900px)] -translate-x-1/2
        transition-all duration-700
        ${showNav ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
      >
        <div
          className="flex items-center justify-between rounded-full border border-white/10 
          bg-black/25 px-4 py-3 backdrop-blur-md md:px-8"
        >
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (location.pathname === "/" && item.path === "/home");

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`font-pixel text-[8px] uppercase tracking-[0.16em] transition-all duration-300
                hover:scale-105 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.85)]
                md:text-[10px]
                ${
                  isActive
                    ? "text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]"
                    : "text-white/65"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      {/* Page content, pushed down so nav does not block it */}
      <section className="pointer-events-none relative z-10 min-h-screen px-6 pt-28 md:px-10 md:pt-32">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/professionals" element={<Professionals />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/interests" element={<Interests />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </section>

      {/* Intro text only on first landing */}
      {shouldShowIntro && (
        <div className="pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-hidden">
          <h1 className="relative whitespace-nowrap font-pixel text-center text-2xl leading-[1.6] tracking-[0.04em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.55)] md:text-4xl">
            {typedText}

            <span className="absolute left-full ml-2 animate-pulse text-white">
              |
            </span>
          </h1>
        </div>
      )}
    </main>
  );
}
