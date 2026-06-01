export default function AboutMe() {
  return (
    <section className="pointer-events-auto min-h-[calc(100vh-8rem)] px-8 py-10">
      {/* Header */}
      <div className="relative z-20 flex w-full justify-center pt-10">
        <h1 className="font-pixel text-center text-2xl leading-relaxed text-white md:text-4xl">
          Hi, it&apos;s Harryyy.
        </h1>
      </div>

      {/* Content */}
      <div className="mx-auto mt-10 flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <div className="flex flex-wrap justify-center gap-3">
          <div className="font-pixel rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 backdrop-blur-sm shadow-[0_0_18px_rgba(248,113,113,0.18)]">
            <p className="text-[8px] uppercase tracking-[0.22em] text-red-300">
              School
            </p>
            <p className="mt-2 text-[10px] font-medium text-white/85">
              Northeastern University
            </p>
          </div>

          <div className="font-pixel rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 backdrop-blur-sm shadow-[0_0_18px_rgba(248,113,113,0.18)]">
            <p className="text-[8px] uppercase tracking-[0.22em] text-red-300">
              Year
            </p>
            <p className="mt-2 text-[10px] font-medium text-white/85">5th</p>
          </div>

          <div className="font-pixel rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 backdrop-blur-sm shadow-[0_0_18px_rgba(248,113,113,0.18)]">
            <p className="text-[8px] uppercase tracking-[0.22em] text-red-300">
              Major
            </p>
            <p className="mt-2 text-[10px] font-medium text-white/85">
              Computer Science &amp; Finance
            </p>
          </div>
        </div>

        <div className="font-pixel mt-10 max-w-[850px] space-y-5 rounded-2xl border border-white/[0.06] bg-black/[0.28] px-8 py-6 text-left text-[10px] leading-7 text-white/80 backdrop-blur-[3px] shadow-[0_0_45px_rgba(0,0,0,0.35)]">
          <p>
            Welcome to my little corner of the internet, also known as the place
            where I somehow turned my resume, personality, side quests, and
            late-night hobbies into a website.
          </p>

          <p>
            What I&apos;ve learned growing up is to take things as they are and
            live life to the fullest, without embarrassment or worrying about
            other people&apos;s opinions. I believe one of our greatest failures
            is regretting what could&apos;ve happened instead of simply going
            for it.
          </p>

          <p>
            Outside of school and work, I love baking, cooking, hiking,
            traveling, taking pictures, going to the gym, and finding fun things
            to do outdoors. I enjoy exploring new places, trying new recipes,
            and collecting small moments that make life feel more memorable.
          </p>

          <p>
            I hope you enjoy clicking around and seeing the things I’ve built,
            the things I care about, and the things I&apos;m curious about.
          </p>
        </div>
      </div>
    </section>
  );
}
