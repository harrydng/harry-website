import { navItems } from "../data/nav";
import { socials } from "../data/socials";

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

import { FaLinkedinIn, FaInstagram, FaGithub, FaDev } from "react-icons/fa";

function Home() {
  return null;
}

const getSocialIcon = (id: string) => {
  switch (id) {
    case "linkedin":
      return <FaLinkedinIn />;
    case "instagram":
      return <FaInstagram />;
    case "github":
      return <FaGithub />;
    case "devpost":
      return <FaDev />;
    default:
      return null;
  }
};

const leftSocials = socials.slice(0, 2);
const rightSocials = socials.slice(2, 4);

export default function HarryWeb() {
  const navigate = useNavigate();
  const location = useLocation();

  const fullText = "Welcome to Harry's Mind !";

  const [typedText, setTypedText] = useState("");
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [introLeaving, setIntroLeaving] = useState(false);

  const shouldShowIntro = location.pathname === "/" && !hasPlayedIntro;
  const showNav = !shouldShowIntro;

  useEffect(() => {
    if (!shouldShowIntro) return;

    let index = 0;
    let redTimeout: number | undefined;
    let finishTimeout: number | undefined;

    const typing = window.setInterval(() => {
      const nextText = fullText.slice(0, index + 1);
      setTypedText(nextText);
      index++;

      if (nextText === fullText) {
        window.clearInterval(typing);

        // Wait a little so the full sentence appears first
        redTimeout = window.setTimeout(() => {
          setTypingDone(true);

          // Then remove intro after Mind has been red for a bit
          finishTimeout = window.setTimeout(() => {
            setIntroLeaving(true);
            window.setTimeout(() => {
              setHasPlayedIntro(true);
            }, 1000); // When the nav will be shown
          }, 200); // fading back into the background after the line is typed
        }, 1000); // when it turns red
      }
    }, 170);

    return () => {
      window.clearInterval(typing);

      if (redTimeout) {
        window.clearTimeout(redTimeout);
      }

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
      {/* Top nav */}
      <nav
        className={`fixed left-1/2 top-6 z-40 w-[min(92vw,900px)] -translate-x-1/2
  transition-all duration-700
  ${showNav ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
      >
        {/* Left socials */}
        <div className="absolute left-[-173px] top-1/2 flex -translate-y-1/2 items-center gap-15">
          {leftSocials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="text-[25px] text-white/60 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-red-400 hover:drop-shadow-[0_0_10px_rgba(248,113,113,0.9)]"
            >
              {getSocialIcon(social.id)}
            </a>
          ))}
        </div>

        <div className="flex items-center justify-between rounded-full px-4 py-10">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (location.pathname === "/" && item.path === "/home");

            return (
              <button
                key={item.id}
                onClick={() => navigate(item.path)}
                className={`font-pixel text-[10px] uppercase tracking-[0.16em] transition-all duration-300
          hover:scale-105 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]
          md:text-[10px]
          ${
            isActive
              ? "text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]"
              : "text-white/85"
          }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Right socials */}
        <div className="absolute right-[-173px] top-1/2 flex -translate-y-1/2 items-center gap-15">
          {rightSocials.map((social) => (
            <a
              key={social.id}
              href={social.link}
              target="_blank"
              rel="noreferrer"
              aria-label={social.name}
              className="text-[25px] text-white/60 transition-all duration-300 hover:-translate-y-1 hover:scale-110 hover:text-red-400 hover:drop-shadow-[0_0_10px_rgba(248,113,113,0.9)]"
            >
              {getSocialIcon(social.id)}
            </a>
          ))}
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
        <div
          className={`pointer-events-none absolute inset-0 z-50 flex items-center justify-center overflow-hidden
    transition-all duration-[1600ms] ease-in-out
    ${
      introLeaving
        ? "opacity-0 scale-90 blur-md"
        : "opacity-100 scale-100 blur-0"
    }`}
        >
          <h1
            className={`relative whitespace-nowrap font-pixel text-center text-2xl leading-[1.6] tracking-[0.04em] md:text-4xl
      transition-all duration-[1600ms] ease-in-out
      ${
        introLeaving
          ? "text-white/0 drop-shadow-[0_0_35px_rgba(255,255,255,0.15)]"
          : "text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.55)]"
      }`}
          >
            {typedText === fullText ? (
              <>
                Welcome to Harry&apos;s{" "}
                <span
                  className={`transition-all duration-700 ease-out ${
                    typingDone
                      ? "text-red-500 drop-shadow-[0_0_14px_rgba(239,68,68,0.9)]"
                      : "text-white drop-shadow-none"
                  }`}
                >
                  Mind
                </span>{" "}
                !
              </>
            ) : (
              typedText
            )}

            <span className="absolute left-full ml-2 animate-pulse text-white">
              |
            </span>
          </h1>
        </div>
      )}
    </main>
  );
}
