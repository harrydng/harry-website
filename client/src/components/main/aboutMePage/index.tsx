import { useEffect, useRef } from "react";
import { techStack } from "../../../data/tech-stack";
import { aboutImages } from "../../../data/about-images";

type MovingImage = {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
};

export default function AboutMe() {
  const pictureAreaRef = useRef<HTMLDivElement | null>(null);
  const imageRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const imagesState = useRef<MovingImage[]>(
    aboutImages.map((image) => ({
      id: image.id,
      x: image.startX,
      y: image.startY,
      vx: image.vx,
      vy: image.vy,
      width: image.width,
      height: image.height,
    }))
  );

  useEffect(() => {
    let animationFrame: number;

    const animate = () => {
      const area = pictureAreaRef.current;
      if (!area) {
        animationFrame = requestAnimationFrame(animate);
        return;
      }

      const areaWidth = area.clientWidth;
      const areaHeight = area.clientHeight;

      imagesState.current.forEach((image) => {
        image.x += image.vx;
        image.y += image.vy;

        // bounce left / right inside picture area
        if (image.x <= 0 || image.x + image.width >= areaWidth) {
          image.vx *= -1;
          image.x = Math.max(0, Math.min(image.x, areaWidth - image.width));
        }

        // bounce top / bottom inside picture area
        if (image.y <= 0 || image.y + image.height >= areaHeight) {
          image.vy *= -1;
          image.y = Math.max(0, Math.min(image.y, areaHeight - image.height));
        }

        const element = imageRefs.current[image.id];

        if (element) {
          element.style.transform = `translate3d(${image.x}px, ${image.y}px, 0)`;
        }
      });

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <section className="pointer-events-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-8 py-6">
      <div className="flex w-full max-w-5xl flex-col items-center justify-center text-center">
        <h1 className="mt-5 font-pixel text-2xl leading-relaxed text-white md:text-4xl">
          Hi, it's Harryyy.
        </h1>

        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <div className="font-pixel rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 backdrop-blur-sm shadow-[0_0_18px_rgba(248,113,113,0.18)]">
            <p className="text- uppercase tracking-[0.22em] text-red-300">
              School
            </p>
            <p className="mt-2 text-[10px] font-medium text-white/85">
              Northeastern University
            </p>
          </div>
          <div className="font-pixel rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 backdrop-blur-sm shadow-[0_0_18px_rgba(248,113,113,0.18)]">
            <p className="text- uppercase tracking-[0.22em] text-red-300">
              Year
            </p>
            <p className="mt-2 text-[10px] font-medium text-white/85">5th</p>
          </div>
          <div className="font-pixel rounded-xl border border-red-400/30 bg-red-500/10 px-4 py-3 backdrop-blur-sm shadow-[0_0_18px_rgba(248,113,113,0.18)]">
            <p className="text- uppercase tracking-[0.22em] text-red-300">
              Major
            </p>
            <p className="mt-2 text-[10px] font-medium text-white/85">
              Computer Science &amp; Finance
            </p>
          </div>
        </div>

        <p className="font-pixel text-[10px] mt-4 max-w-[850px] rounded-2xl border border-white/[0.06] bg-black/[0.28] px-8 py-6 text-left text-sm leading-7 text-white/80 backdrop-blur-[3px] shadow-[0_0_45px_rgba(0,0,0,0.35)]">
          <div>
            Welcome to my little corner of the internet, also known as the place
            where I somehow turned my resume, personality, side quests, and
            late-night hobbies into a website.
          </div>
          <div>
            I'm known as someone quite spontaneous, I like jumping into new
            ideas, figuring things out as I go, and learning whatever the
            opportunity asks of me.
          </div>
          <div>
            I hope you enjoy clicking around and seeing the things I’ve built,
            the things I care about, and maybe a few things that made me go,
            “wait… what if...”
          </div>
        </p>

        <div className="mt-9 flex max-w-xxl flex-wrap justify-center gap-4">
          {techStack.map((tech) => {
            const Icon = tech.Icon;

            return (
              <div
                key={tech.id}
                title={tech.name}
                className="group flex h-12 w-12 items-center justify-center rounded-full border border-red-400/30 bg-red-500/10 text-white/75 backdrop-blur-sm
    shadow-[0_0_18px_rgba(248,113,113,0.18)]
    transition-all duration-300 hover:-translate-y-1 hover:border-red-400/50 hover:text-white
    hover:shadow-[0_0_22px_rgba(248,113,113,0.45)]"
              >
                <Icon className="text-2xl transition-transform duration-300 group-hover:scale-110" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
