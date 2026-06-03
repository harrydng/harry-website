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

import { useState, useEffect, useRef } from "react";

import { FaLinkedinIn, FaInstagram, FaGithub, FaDev } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

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

const audio = "/sound/capture.mp3";

export default function HarryWeb() {
  const navigate = useNavigate();
  const location = useLocation();

  const fullText = "Welcome to Harry's Mind !";

  const [typedText, setTypedText] = useState("");
  const [hasPlayedIntro, setHasPlayedIntro] = useState(false);
  const [typingDone, setTypingDone] = useState(false);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const shouldShowIntro = location.pathname === "/" && !hasPlayedIntro;
  const showNav = !shouldShowIntro;

  const clickSoundRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const sound = new Audio(audio);
    sound.volume = 0.4;
    sound.preload = "auto";

    clickSoundRef.current = sound;
  }, []);

  useEffect(() => {
    if (!shouldShowIntro) return;

    let index = 0;
    let redTimeout: number | undefined;
    let finishTimeout: number | undefined;
    let hideTimeout: number | undefined;

    setTypedText("");
    setTypingDone(false);
    setIntroLeaving(false);

    const typing = window.setInterval(() => {
      const nextText = fullText.slice(0, index + 1);
      setTypedText(nextText);
      index++;

      if (nextText === fullText) {
        window.clearInterval(typing);

        redTimeout = window.setTimeout(() => {
          setTypingDone(true);

          finishTimeout = window.setTimeout(() => {
            setIntroLeaving(true);

            hideTimeout = window.setTimeout(() => {
              setHasPlayedIntro(true);
            }, 800);
          }, 200);
        }, 800);
      }
    }, 120);

    return () => {
      window.clearInterval(typing);

      if (redTimeout) window.clearTimeout(redTimeout);
      if (finishTimeout) window.clearTimeout(finishTimeout);
      if (hideTimeout) window.clearTimeout(hideTimeout);
    };
  }, [shouldShowIntro, fullText]);

  const playClickSound = () => {
    const sound = clickSoundRef.current;
    if (!sound) return;

    sound.pause();
    sound.currentTime = 0;

    sound.play().catch((error) => {
      console.log("Sound play failed:", error);
    });
  };

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
        {/* Desktop nav */}
        <div className="hidden md:block">
          {/* Left socials */}
          <div className="absolute left-[-173px] top-1/2 flex -translate-y-1/2 items-center gap-15">
            {leftSocials.map((social) => (
              <a
                key={social.id}
                href={social.link}
                target="_blank"
                rel="noreferrer"
                aria-label={social.name}
                style={
                  {
                    "--social-color": social.color,
                  } as React.CSSProperties
                }
                className="text-[25px] text-white/60 transition-all duration-300
                hover:-translate-y-1 hover:scale-110
                hover:text-[var(--social-color)]
                hover:drop-shadow-[0_0_10px_var(--social-color)]"
              >
                {getSocialIcon(social.id)}
              </a>
            ))}
          </div>

          {/* Main desktop nav items */}
          <div className="flex items-center justify-between rounded-full px-4 py-10">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    playClickSound();
                    navigate(item.path);
                  }}
                  className={`font-pixel text-[10px] uppercase tracking-[0.16em] transition-all duration-300
                  hover:scale-105 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]
                  ${
                    isActive
                      ? "text-white/85"
                      : "text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            <a
              href="/harry_resume.pdf"
              target="_blank"
              rel="noreferrer"
              onClick={playClickSound}
              className="font-pixel text-[10px] uppercase tracking-[0.16em] text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)] transition-all duration-300 hover:scale-105 hover:text-white hover:drop-shadow-[0_0_10px_rgba(255,255,255,1)]"
            >
              Resume
            </a>
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
                style={
                  {
                    "--social-color": social.color,
                  } as React.CSSProperties
                }
                className="text-[25px] text-white/60 transition-all duration-300
                hover:-translate-y-1 hover:scale-110
                hover:text-[var(--social-color)]
                hover:drop-shadow-[0_0_10px_var(--social-color)]"
              >
                {getSocialIcon(social.id)}
              </a>
            ))}
          </div>
        </div>

        {/* Mobile nav */}
        <div className="md:hidden">
          <div className="flex items-center justify-between rounded-full border border-white/10 bg-black/40 px-5 py-4 backdrop-blur-md">
            <button
              onClick={() => {
                playClickSound();
                navigate("/");
              }}
              className="font-pixel text-[10px] uppercase tracking-[0.25em] text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]"
            >
              Harry
            </button>

            <button
              onClick={() => {
                playClickSound();
                setMobileMenuOpen((prev) => !prev);
              }}
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              className="text-2xl text-white/80 transition hover:scale-110 hover:text-red-300"
            >
              {mobileMenuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>

          <div
            className={`mt-3 overflow-hidden rounded-2xl border border-white/10 bg-black/70 backdrop-blur-md
            transition-all duration-300 ease-in-out
            ${mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"}`}
          >
            <div className="flex flex-col gap-4 px-5 py-5">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;

                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      playClickSound();
                      navigate(item.path);
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left font-pixel text-[10px] uppercase tracking-[0.18em] transition-all duration-300
                    hover:translate-x-1 hover:text-white
                    ${
                      isActive
                        ? "text-white"
                        : "text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}

              {/* Resume inside mobile menu */}
              <a
                href="/harry_resume.pdf"
                target="_blank"
                rel="noreferrer"
                onClick={() => {
                  playClickSound();
                  setMobileMenuOpen(false);
                }}
                className="text-left font-pixel text-[10px] uppercase tracking-[0.18em] text-red-400 drop-shadow-[0_0_10px_rgba(248,113,113,0.8)] transition-all duration-300 hover:translate-x-1 hover:text-white"
              >
                Resume
              </a>

              <div className="mt-2 flex items-center justify-center gap-6 border-t border-white/10 pt-5">
                {socials.map((social) => (
                  <a
                    key={social.id}
                    href={social.link}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.name}
                    style={
                      {
                        "--social-color": social.color,
                      } as React.CSSProperties
                    }
                    className="text-[22px] text-white/60 transition-all duration-300
                    hover:-translate-y-1 hover:scale-110
                    hover:text-[var(--social-color)]
                    hover:drop-shadow-[0_0_10px_var(--social-color)]"
                  >
                    {getSocialIcon(social.id)}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Page content, pushed down so nav does not block it */}
      <section className="pointer-events-none relative z-10 min-h-screen px-6 pt-20 md:px-10 md:pt-24">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/professionals" element={<Professionals />} />
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
            className={`relative max-w-[90vw] whitespace-normal break-words px-4 font-pixel text-center text-2xl leading-[1.6] tracking-[0.04em] md:max-w-[80vw] md:text-4xl
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

            <span className="ml-2 animate-pulse text-white">|</span>
          </h1>
        </div>
      )}
    </main>
  );
}