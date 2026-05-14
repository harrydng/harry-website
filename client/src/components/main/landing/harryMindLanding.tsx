import { useEffect, useState } from "react";
import ZodiacMapBackground from "../zodiacMapBackground";
import "../../../index.css";

export default function HarryMindLanding() {
  const fullText = "Welcome to Harry's Mind !";

  const [typedText, setTypedText] = useState("");
  const [introFinished, setIntroFinished] = useState(false);

  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      setTypedText(fullText.slice(0, index + 1));
      index++;

      if (index === fullText.length) {
        clearInterval(typing);

        setTimeout(() => {
          setIntroFinished(true);
        }, 900);
      }
    }, 150);

    return () => clearInterval(typing);
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-black text-white">
      {/* Background is visible immediately */}
      <div className="absolute inset-0">
        <ZodiacMapBackground />
      </div>

      {/* Intro text running on top */}
      {!introFinished && (
        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center overflow-hidden">
          <h1 className="relative whitespace-nowrap font-pixel text-center text-2xl leading-[1.6] tracking-[0.04em] text-white drop-shadow-[0_0_18px_rgba(255,255,255,0.55)] md:text-4xl">
            {typedText}

            <span className="absolute left-full ml-2 animate-pulse text-white">
              |
            </span>
          </h1>
        </div>
      )}
    </section>
  );
}