import { techStack } from "../../../data/tech-stack";

export default function AboutMe() {
  return (
    <section className="pointer-events-auto min-h-screen px-6 pb-24 pt-14 text-white md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Top newspaper rule */}
        <div className="border-t-2 border-red-400/80" />

        {/* Masthead */}
        <header className="border-b border-red-400/40 py-5 text-center">
          <p className="mb-3 font-serif text-[9px] uppercase tracking-[0.55em] text-red-300/70 md:text-[10px]">
            Vol. 01 · No. 01 · Personal Edition · 2026
          </p>

          <h1 className="font-serif text-[42px] font-black uppercase leading-none tracking-[-0.03em] text-white sm:text-6xl md:text-7xl lg:text-[92px]">
            The Harry Times
          </h1>

          <div className="mx-auto mt-5 flex max-w-5xl items-center gap-4">
            <div className="h-px flex-1 bg-red-400/40" />

            <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-red-300/70">
              About Me
            </p>

            <div className="h-px flex-1 bg-red-400/40" />
          </div>
        </header>

        {/* Main headline */}
        <div className="border-b border-red-400/40 py-7 text-center">
          <h2 className="font-serif text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.025em] text-white md:text-6xl lg:text-7xl">
            A Life Built From
            <br />
            Curiosity &amp; Side Quests
          </h2>

          <p className="mx-auto mt-5 max-w-4xl font-serif text-sm italic leading-6 text-white/75 md:text-base">
            Computer science, finance, food, travel, and a personality shaped by
            curiosity, optimism, rational thinking, and a willingness to try
            things.
          </p>
        </div>

        {/* Metadata row */}
        <div className="grid border-b border-red-400/40 text-center font-serif sm:grid-cols-3">
          <div className="border-b border-red-400/20 px-4 py-4 sm:border-b-0 sm:border-r">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/70">
              University
            </p>

            <p className="mt-2 text-sm font-semibold text-white/90">
              Northeastern University
            </p>
          </div>

          <div className="border-b border-red-400/20 px-4 py-4 sm:border-b-0 sm:border-r">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/70">
              Year
            </p>

            <p className="mt-2 text-sm font-semibold text-white/90">5th Year</p>
          </div>

          <div className="px-4 py-4">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/70">
              Studies
            </p>

            <p className="mt-2 text-sm font-semibold text-white/90">
              Computer Science &amp; Finance
            </p>
          </div>
        </div>

        {/* Feature story */}
        <article className="border-b border-red-400/40 py-8">
          <div className="grid gap-8 lg:grid-cols-12">
            {/* Left column */}
            <div className="lg:col-span-4 lg:border-r lg:border-red-400/30 lg:pr-8">
              <p className="mb-3 font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/80">
                The Profile
              </p>

              <h3 className="font-serif text-3xl font-semibold leading-[1.05] text-white md:text-4xl">
                Somewhere between a resume and everything that doesn&apos;t fit
                on one.
              </h3>

              <p className="mt-4 font-serif text-sm italic leading-6 text-white/70">
                By Harry Duong · Boston
              </p>

              <div className="mt-6 font-serif text-[15px] leading-7 text-white/85">
                <p>
                  <span className="float-left mr-3 mt-1 font-serif text-7xl font-bold leading-[0.7] text-red-400">
                    W
                  </span>
                  elcome to my little corner of the internet. I originally built
                  this website because I wanted somewhere to put my projects and
                  experiences, but somewhere along the way it became something
                  much more personal.
                </p>

                <p className="mt-5">
                  It&apos;s part portfolio, part digital scrapbook, and part
                  record of whatever I happen to be interested in at the moment.
                  Some sections are serious. Others exist simply because I
                  thought they would describe me as a person.
                </p>
              </div>
            </div>

            {/* Center image */}
            <figure className="lg:col-span-5">
              <div className="group relative aspect-[3.5/3] w-full overflow-hidden border border-red-400/40">
                <img
                  src="/about_me_profile.jpg"
                  alt="Harry"
                  className="h-full w-full object-cover object-[50%_80%] transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <figcaption className="mt-3 border-b border-red-400/20 pb-3 font-serif text-[11px] italic leading-5 text-white/70">
                A small glimpse into my life.
              </figcaption>
            </figure>

            {/* Right column */}
            <div className="font-serif text-[15px] leading-7 text-white/85 lg:col-span-3 lg:border-l lg:border-red-400/30 lg:pl-8">
              <p>
                Growing up has taught me that there&apos;s very little value in
                spending life worrying about looking embarrassing, making the
                wrong choice, or wondering what other people might think.
              </p>

              <p className="mt-5">
                I&apos;d rather try something and have a story about it than
                spend years wondering what might have happened if I had.
                Curiosity has taken me into computer science, finance, design,
                hackathons, travel, photography, and a concerning number of
                baking experiments.
              </p>

              <p className="mt-5">
                I don&apos;t think everything I do needs to fit neatly into one
                category. I like technology, but I also care about food,
                creativity, people, places, and experiences.
              </p>
            </div>
          </div>
        </article>

        {/* Second newspaper section */}
        <section className="grid border-b border-red-400/40 py-8 lg:grid-cols-12">
          {/* Philosophy */}
          <aside className="mb-8 lg:col-span-3 lg:mb-0 lg:border-r lg:border-red-400/30 lg:pr-8">
            <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/80">
              Philosophy
            </p>

            <blockquote className="mt-5 font-serif text-2xl font-semibold italic leading-[1.3] text-white md:text-3xl">
              “I&apos;d rather do it and laugh about it later than wonder what
              would&apos;ve happened.”
            </blockquote>

            <div className="mt-6 h-px bg-red-400/30" />

            <p className="mt-5 font-serif text-xs leading-5 text-white/70">
              An unofficial rule for projects, travel plans, hobbies, and most
              decisions made with friends.
            </p>
          </aside>

          {/* Beyond screen */}
          <div className="lg:col-span-9 lg:pl-8">
            <h3 className="font-serif text-3xl font-semibold leading-tight text-white md:text-4xl">
              Beyond the Screen
            </h3>

            <div className="mt-5 font-serif text-[15px] leading-7 text-white/85 md:columns-2 md:gap-10 lg:columns-3">
              <p>
                Outside of school and work, I spend a lot of time cooking and
                baking. There&apos;s something satisfying about starting with a
                pile of ingredients and ending up with something completely
                different a few hours later. Sometimes it&apos;s macarons.
                Sometimes focaccia. Sometimes it&apos;s evidence that a recipe
                definitely needed one more test run.
              </p>

              <p className="mt-5 md:mt-0">
                I also love traveling and exploring new places. I&apos;m usually
                the person stopping for photos, looking for somewhere good to
                eat, or convincing everyone that a completely unnecessary detour
                will probably be worth it.
              </p>

              <p className="mt-5 md:mt-0">
                Hiking and being outdoors give me a break from constantly
                thinking about what needs to be built or submitted. The gym does something similar, although with
                significantly fewer scenic views.
              </p>

              <p className="mt-5">
                Technology is still one of the biggest parts of my life. I enjoy
                figuring out how systems work, designing products, solving
                problems, and figuring out what can be made better.
              </p>

              <p className="mt-5">
                What interests me most is the process between having an idea and
                making it real. There&apos;s usually a period where nothing
                works, everything looks terrible, and you question why you
                started. Then eventually the pieces begin fitting together.
              </p>

              <p className="mt-5">
                This website is kind of the same thing. It&apos;s always
                changing because I&apos;m always changing. New projects get
                added, interests shift, designs get rebuilt, and occasionally I
                decide the entire thing needs to look like a newspaper floating
                through space.
              </p>
            </div>
          </div>
        </section>

        {/* Technical Index */}
        <section className="border-b border-red-400/40 py-8">
          {/* Section header */}
          <div className="flex flex-col gap-4 border-b border-red-400/30 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-serif text-[9px] font-bold uppercase tracking-[0.4em] text-red-300/80">
                Technical Index
              </p>

              <h3 className="mt-2 font-serif text-3xl font-semibold text-white md:text-4xl">
                Languages, Frameworks &amp; Tools
              </h3>
            </div>

            <p className="font-serif text-[9px] uppercase tracking-[0.3em] text-white/60">
              {String(techStack.length).padStart(2, "0")} Technologies
            </p>
          </div>

          {/* Tech grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {techStack.map((tech, index) => {
              const Icon = tech.Icon;

              return (
                <div
                  key={tech.id}
                  className="
                    group
                    flex items-center justify-between
                    border-b border-red-400/20
                    px-4 py-5
                    transition-all duration-300
                    hover:bg-red-500/[0.04]
                    sm:border-r
                  "
                >
                  <div className="flex items-center gap-4">
                    {/* Icon */}
                    <span className="text-xl text-red-400/80 transition-all duration-300 group-hover:scale-110 group-hover:text-red-300">
                      <Icon />
                    </span>

                    {/* Name */}
                    <div>
                      <p className="font-serif text-sm font-semibold text-white/90 transition-colors group-hover:text-white">
                        {tech.name}
                      </p>

                      <p className="mt-1 font-serif text-[8px] uppercase tracking-[0.25em] text-white/45">
                        Technology
                      </p>
                    </div>
                  </div>

                  {/* Number */}
                  <span className="font-serif text-[10px] text-red-400/50">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bottom strip */}
        <footer className="flex flex-col gap-3 py-5 font-serif text-[9px] uppercase tracking-[0.25em] text-red-300/70 sm:flex-row sm:items-center sm:justify-between">
          <span>Harry Duong · Personal Archives</span>
          <span>Computer Science · Finance · Everything Else</span>
          <span>Est. 2026</span>
        </footer>
      </div>
    </section>
  );
}
