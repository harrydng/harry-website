import { useState } from "react";
import type { ElementType } from "react";
import { projects } from "../../../data/projects";

import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaDocker,
  FaSpotify,
} from "react-icons/fa";

import {
  SiNextdotjs,
  SiFlask,
  SiMongodb,
  SiGooglemaps,
  SiTypescript,
  SiKotlin,
  SiAndroid,
  SiSqlite,
  SiMysql,
  SiOpenai,
} from "react-icons/si";

import { TbApi, TbPlugConnected } from "react-icons/tb";
import { MdRestaurantMenu } from "react-icons/md";
import { VscCode, VscBeaker } from "react-icons/vsc";

type TechIcon = {
  Icon: ElementType;
  label: string;
};

function getTechIcon(tech: string): TechIcon {
  const normalized = tech.toLowerCase();

  if (normalized.includes("next")) return { Icon: SiNextdotjs, label: tech };
  if (normalized.includes("node")) return { Icon: FaNodeJs, label: tech };
  if (normalized.includes("python")) return { Icon: FaPython, label: tech };
  if (normalized.includes("flask")) return { Icon: SiFlask, label: tech };
  if (normalized.includes("hume")) return { Icon: SiOpenai, label: tech };
  if (normalized.includes("mongo")) return { Icon: SiMongodb, label: tech };
  if (normalized.includes("google maps"))
    return { Icon: SiGooglemaps, label: tech };
  if (normalized.includes("spotify")) return { Icon: FaSpotify, label: tech };

  if (normalized.includes("react")) return { Icon: FaReact, label: tech };
  if (normalized.includes("typescript"))
    return { Icon: SiTypescript, label: tech };
  if (normalized.includes("websocket"))
    return { Icon: TbPlugConnected, label: tech };

  if (normalized.includes("kotlin")) return { Icon: SiKotlin, label: tech };
  if (normalized.includes("jetpack")) return { Icon: SiAndroid, label: tech };
  if (normalized.includes("mvvm")) return { Icon: VscCode, label: tech };
  if (normalized.includes("room")) return { Icon: SiSqlite, label: tech };
  if (normalized.includes("mealdb"))
    return { Icon: MdRestaurantMenu, label: tech };
  if (normalized.includes("spoonacular"))
    return { Icon: MdRestaurantMenu, label: tech };
  if (normalized.includes("junit")) return { Icon: VscBeaker, label: tech };
  if (normalized.includes("pythonanywhere"))
    return { Icon: FaPython, label: tech };

  if (normalized.includes("mysql")) return { Icon: SiMysql, label: tech };
  if (normalized.includes("docker")) return { Icon: FaDocker, label: tech };
  if (normalized.includes("lightfm")) return { Icon: VscBeaker, label: tech };
  if (normalized.includes("rest")) return { Icon: TbApi, label: tech };
  if (normalized.includes("api")) return { Icon: TbApi, label: tech };

  return { Icon: VscCode, label: tech };
}

export default function Projects() {
  const [openProjectId, setOpenProjectId] = useState<string | null>(null);

  const toggleProject = (id: string) => {
    setOpenProjectId((current) => (current === id ? null : id));
  };

  return (
    <section className="pointer-events-auto min-h-screen px-6 pb-24 pt-14 text-white md:px-10 lg:px-16">
      <div className="mx-auto w-full max-w-[1400px]">
        {/* Top rule */}
        <div className="border-t-2 border-red-400/80" />

        {/* Masthead */}
        <header className="border-b border-red-400/40 py-5 text-center">
          <p className="mb-3 font-serif text-[9px] uppercase tracking-[0.55em] text-red-300/70 md:text-[10px]">
            Selected Works · Personal Archive · 2026
          </p>

          <h1 className="font-serif text-5xl font-black uppercase leading-none tracking-[-0.035em] text-white md:text-7xl lg:text-[92px]">
            Projects
          </h1>

          <div className="mx-auto mt-5 flex max-w-5xl items-center gap-4">
            <div className="h-px flex-1 bg-red-400/40" />

            <p className="font-serif text-[10px] uppercase tracking-[0.35em] text-red-300/70">
              Things I&apos;ve Built
            </p>

            <div className="h-px flex-1 bg-red-400/40" />
          </div>
        </header>

        {/* Intro */}
        <div className="border-b border-red-400/40 py-8 text-center">
          <h2 className="mx-auto max-w-6xl font-serif text-2xl font-semibold leading-[1.05] text-white md:text-5xl lg:text-6xl">
            Experiments, products, and ideas
            <br className="hidden md:block" />
          </h2>
        </div>

        {/* Metadata */}
        <div className="grid border-b border-red-400/40 font-serif sm:grid-cols-3">
          <div className="border-b border-red-400/20 px-5 py-4 text-center sm:border-b-0 sm:border-r">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/60">
              Works Collected
            </p>

            <p className="mt-2 text-sm text-white/85">
              {projects.length} {"Projects"}
            </p>
          </div>

          <div className="border-b border-red-400/20 px-5 py-4 text-center sm:border-b-0 sm:border-r">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/60">
              Focus
            </p>

            <p className="mt-2 text-sm text-white/85">Software &amp; Product</p>
          </div>

          <div className="px-5 py-4 text-center">
            <p className="text-[8px] uppercase tracking-[0.35em] text-red-300/60">
              Status
            </p>

            <p className="mt-2 text-sm text-white/85">Continuously Building</p>
          </div>
        </div>

        {/* Projects */}
        <div>
          {projects.map((project, index) => {
            const isOpen = openProjectId === project.id;
            const isEven = index % 2 === 0;

            return (
              <article
                key={project.id}
                className="border-b border-white py-10"
              >
                {/* Project number / award */}
                <div className="mb-5 flex items-center justify-between gap-4 font-serif text-[12px] uppercase tracking-[0.25em]">
                  <span className="text-red-300/100 font-bold">
                    Project No. {String(index + 1).padStart(2, "0")}
                  </span>

                  {project.award && (
                    <span className="text-red-300/100 font-bold">
                      ★ {project.award}
                    </span>
                  )}
                </div>

                <div
                  className={`grid items-start gap-8 lg:grid-cols-12 ${
                    isEven ? "" : "lg:[&>*:first-child]:order-2"
                  }`}
                >
                  {/* Image */}
                  <div className="lg:col-span-7">
                    <button
                      type="button"
                      onClick={() => toggleProject(project.id)}
                      className="group block w-full text-left"
                    >
                      <div className="relative w-full overflow-hidden border border-red-400/30">
                        {project.image ? (
                          <img
                            src={project.image}
                            alt={project.project_name}
                            className="
        block
        h-auto
        w-full
        object-contain
        
        transition duration-700
        group-hover:-0
        group-hover:scale-105
      "
                          />
                        ) : (
                          <div className="flex min-h-[260px] w-full items-center justify-center font-serif text-xs uppercase tracking-[0.3em] text-white/25">
                            Project Image
                          </div>
                        )}

                        <div className="absolute left-4 top-4 bg-black/45 px-2 py-1 font-serif text-[10px] uppercase tracking-[0.3em] text-red-300/80 backdrop-blur-sm">
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <div
                          className="
      absolute bottom-4 right-4
      border border-red-400/50
      bg-black/55
      px-3 py-2
      font-serif text-[9px] uppercase tracking-[0.25em]
      text-red-300
      backdrop-blur-sm
      transition-all duration-300
      group-hover:border-red-400
      group-hover:text-red-200
      group-hover:shadow-[0_0_16px_rgba(248,113,113,0.2)]
    "
                        >
                          {isOpen ? "Close Story" : "Read Story"}
                        </div>
                      </div>
                    </button>

                    <p className="mt-3 border-b border-red-400/20 pb-3 font-serif text-[12px] italic leading-5 text-white/100">
                      A closer look at {project.project_name}, its development,
                      and the technology behind it.
                    </p>
                  </div>

                  {/* Description */}
                  <div
                    className={`lg:col-span-5 ${
                      isEven
                        ? "lg:border-l lg:border-red-400/30 lg:pl-8"
                        : "lg:border-r lg:border-red-400/30 lg:pr-8"
                    }`}
                  >
                    <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/100">
                      Featured Work
                    </p>

                    <h2 className="mt-3 font-serif text-4xl font-semibold leading-[0.95] tracking-[-0.025em] text-white md:text-5xl">
                      {project.project_name}
                    </h2>

                    <p className="mt-5 font-serif text-[15px] leading-7 text-white/80">
                      {project.project_description}
                    </p>

                    {/* Tech preview */}
                    <div className="mt-7 border-t border-red-400/25 pt-5">
                      <p className="font-serif text-[8px] uppercase tracking-[0.35em] text-red-300/100 font-bold">
                        Built With
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-3">
                        {project.hard_skills.slice(0, 5).map((tech) => {
                          const { Icon, label } = getTechIcon(tech);

                          return (
                            <div
                              key={tech}
                              className="group/tech flex items-center gap-2 font-serif text-xs text-white/100 transition-colors hover:text-white"
                            >
                              <Icon className="text-[15px] text-red-400/80 transition-colors duration-300 group-hover/tech:text-red-300" />
                              <span>{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Continue */}
                    <button
                      type="button"
                      onClick={() => toggleProject(project.id)}
                      className="
                        mt-7 flex items-center gap-3
                        border-y border-red-400/30
                        py-3
                        font-serif text-[10px] uppercase tracking-[0.3em]
                        text-red-300/80
                        transition-all duration-300
                        hover:border-red-400/60
                        hover:text-red-200
                      "
                    >
                      <span>
                        {isOpen ? "Close Article" : "Continue Reading"}
                      </span>

                      <span
                        className={`text-lg text-red-400 transition-transform duration-300 ${
                          isOpen ? "rotate-45" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>
                  </div>
                </div>

                {/* Expanded content */}
                <div
                  className={`grid transition-all duration-500 ease-in-out ${
                    isOpen
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="mt-8 border-t border-red-400/30 pt-8">
                      <div className="grid gap-8 lg:grid-cols-12">
                        {/* Left */}
                        <div className="lg:col-span-3 lg:border-r lg:border-red-400/25 lg:pr-8">
                          <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/100 font-bold">
                            Behind The Project
                          </p>

                          <h3 className="mt-3 font-serif text-3xl font-semibold leading-tight text-white">
                            What I worked on
                          </h3>

                          <p className="mt-4 font-serif text-sm italic leading-6 text-white/80">
                            Development notes, responsibilities, and technical
                            decisions from the project.
                          </p>

                          {project.link && (
                            <a
                              href={project.link}
                              target="_blank"
                              rel="noreferrer"
                              className="mt-6 inline-block border-b border-red-400/50 pb-1 font-serif text-[12px] uppercase tracking-[0.25em] text-red-300/100 transition hover:text-red-200"
                            >
                              View Project ↗
                            </a>
                          )}
                        </div>

                        {/* Contributions */}
                        <div className="lg:col-span-6 lg:border-r lg:border-red-400/25 lg:pr-8">
                          {project.contribution.length > 0 && (
                            <>
                              <p className="mb-4 font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/100 font-bold">
                                Contributions
                              </p>

                              <div className="space-y-5">
                                {project.contribution.map((item, itemIndex) => (
                                  <div
                                    key={itemIndex}
                                    className="grid grid-cols-[36px_1fr] gap-4 border-b border-red-400/20 pb-5"
                                  >
                                    <span className="font-serif text-3xl text-red-400/80">
                                      {String(itemIndex + 1).padStart(2, "0")}
                                    </span>

                                    <p className="font-serif text-[15px] leading-7 text-white/80">
                                      {item}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>

                        {/* Tech stack */}
                        <div className="lg:col-span-3">
                          <p className="font-serif text-[9px] uppercase tracking-[0.35em] text-red-300/100 font-bold">
                            Technology Index
                          </p>

                          <div className="mt-5 divide-y divide-red-400/20 border-y border-red-400/30">
                            {project.hard_skills.map((tech) => {
                              const { Icon, label } = getTechIcon(tech);

                              return (
                                <div
                                  key={tech}
                                  className="group/tech flex items-center justify-between py-3 font-serif text-sm text-white/80 transition-colors hover:text-white"
                                >
                                  <span>{label}</span>

                                  <Icon className="text-base text-red-400/80 transition-colors group-hover/tech:text-red-300" />
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer */}
        <footer className="flex flex-col gap-3 py-6 font-serif text-[9px] uppercase tracking-[0.25em] text-red-300/60 sm:flex-row sm:items-center sm:justify-between">
          <span>Harry Duong · Selected Works</span>
          <span>Software · Systems · Products</span>
          <span>End of Edition</span>
        </footer>
      </div>
    </section>
  );
}
