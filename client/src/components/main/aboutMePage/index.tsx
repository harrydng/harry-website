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
            Curiosity & Side Quests
          </h2>

          <p className="mx-auto mt-5 max-w-4xl font-serif text-sm italic leading-6 text-white/65 md:text-base">
            Computer science, finance, food, travel, unfinished ideas, and the
            occasional decision made far too late at night.
          </p>
        </div>

        {/* Metadata row */}
        <div className="grid border-b border-red-400/40 text-center font-serif sm:grid-cols-3">
          <div className="border-b border-red-400/20 px-4 py-4 sm:border-b-0 sm:border-r">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/60">
              University
            </p>
            <p className="mt-2 text-sm font-semibold text-white/90">
              Northeastern University
            </p>
          </div>

          <div className="border-b border-red-400/20 px-4 py-4 sm:border-b-0 sm:border-r">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/60">
              Year
            </p>
            <p className="mt-2 text-sm font-semibold text-white/90">5th Year</p>
          </div>

          <div className="px-4 py-4">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/60">
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
            {/* Left story column */}
            <div className="lg:col-span-4 lg:border-r lg:border-red-400/30 lg:pr-8">
              <p className="mb-3 font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/70">
                The Profile
              </p>

              <h3 className="font-serif text-3xl font-semibold leading-[1.05] text-white md:text-4xl">
                Somewhere between a resume and everything that doesn&apos;t fit
                on one.
              </h3>

              <p className="mt-4 font-serif text-sm italic leading-6 text-white/60">
                By Harry Duong · Boston
              </p>

              <div className="mt-6 font-serif text-[15px] leading-7 text-white/80">
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
                  thought they would be fun to build.
                </p>
              </div>
            </div>

            {/* Center image */}
            <figure className="lg:col-span-5">
              <div className="relative aspect-[3.5/3] w-full overflow-hidden border border-red-400/40">

                <img
                  src="/about_me_profile.jpg"
                  alt="Harry"
                  className="h-full w-full object-cover object-[50%_80%]"
                />
              </div>

              <figcaption className="mt-3 border-b border-red-400/20 pb-3 font-serif text-[11px] italic leading-5 text-white/50">
                A small glimpse into the life behind the code — usually
                somewhere between building something, traveling somewhere, or
                deciding what to bake next.
              </figcaption>
            </figure>

            {/* Right column */}
            <div className="font-serif text-[15px] leading-7 text-white/80 lg:col-span-3 lg:border-l lg:border-red-400/30 lg:pl-8">
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
                creativity, people, places, and experiences that have absolutely
                nothing to do with a computer.
              </p>
            </div>
          </div>
        </article>

        {/* Second newspaper section */}
        <section className="grid border-b border-red-400/40 py-8 lg:grid-cols-12">
          <aside className="mb-8 lg:col-span-3 lg:mb-0 lg:border-r lg:border-red-400/30 lg:pr-8">
            <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/70">
              Philosophy
            </p>

            <blockquote className="mt-5 font-serif text-2xl font-semibold italic leading-[1.3] text-white md:text-3xl">
              “I&apos;d rather do it and laugh about it later than wonder what
              would&apos;ve happened.”
            </blockquote>

            <div className="mt-6 h-px bg-red-400/30" />

            <p className="mt-5 font-serif text-xs leading-5 text-white/50">
              An unofficial rule for projects, travel plans, hobbies, and most
              decisions made with friends.
            </p>
          </aside>

          {/* Long body */}
          <div className="lg:col-span-9 lg:pl-8">
            <h3 className="font-serif text-3xl font-semibold leading-tight text-white md:text-4xl">
              Beyond the Screen
            </h3>

            <div className="mt-5 font-serif text-[15px] leading-7 text-white/80 md:columns-2 md:gap-10 lg:columns-3">
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
                eat, or convincing everyone that a completely unnecessary
                detour will probably be worth it.
              </p>

              <p className="mt-5 md:mt-0">
                Hiking and being outdoors give me a break from constantly
                thinking about what needs to be built, fixed, submitted, or
                debugged. The gym does something similar, although with
                significantly fewer scenic views.
              </p>

              <p className="mt-5">
                Technology is still one of the biggest parts of my life. I enjoy
                figuring out how systems work, designing products, solving
                problems, and turning an idea into something people can
                actually interact with.
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

        {/* Bottom strip */}
        <footer className="flex flex-col gap-3 py-5 font-serif text-[9px] uppercase tracking-[0.25em] text-red-300/60 sm:flex-row sm:items-center sm:justify-between">
          <span>Harry Duong · Personal Archives</span>
          <span>Computer Science · Finance · Everything Else</span>
          <span>Est. 2026</span>
        </footer>
      </div>
    </section>
  );
}