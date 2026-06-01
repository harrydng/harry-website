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
    <section className="pointer-events-auto min-h-screen px-6 py-10 text-white">
      <div className="relative z-20 flex w-full justify-center pt-10">
        <h1 className="font-pixel text-center text-2xl leading-relaxed text-white md:text-4xl">
          Projects
        </h1>
      </div>

      <div className="mx-auto mt-12 max-w-5xl">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => {
            const isOpen = openProjectId === project.id;

            return (
              <button
                key={project.id}
                type="button"
                onClick={() => toggleProject(project.id)}
                className="group overflow-hidden rounded-2xl border border-red-400/20 bg-black/[0.35] text-left backdrop-blur-[3px] shadow-[0_0_35px_rgba(0,0,0,0.45)]
              transition-all duration-300 hover:-translate-y-1 hover:border-red-400/50 hover:bg-red-500/[0.06]
              hover:shadow-[0_0_35px_rgba(248,113,113,0.18)]"
              >
                {/* Image on top */}
                <div className="relative h-56 w-full overflow-hidden bg-white/[0.06]">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.project_name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-sm text-white/35">
                      Project image coming soon
                    </div>
                  )}

                  {project.award && (
                    <div className="absolute left-4 top-4 rounded-full border border-red-400/30 bg-black/60 px-3 py-1 text-[10px] text-red-300 backdrop-blur-sm">
                      {project.award}
                    </div>
                  )}
                </div>

                {/* Bottom content */}
                <div className="border-t border-white/10 px-5 py-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="font-pixel text-lg text-white">
                        {project.project_name}
                      </h2>

                      <p className="mt-3 text-sm leading-6 text-white/65">
                        {project.project_description}
                      </p>
                    </div>

                    <span
                      className={`text-xl text-white/60 transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>

                  {/* Expands inside the card */}
                  <div
                    className={`grid transition-all duration-500 ease-in-out ${
                      isOpen
                        ? "grid-rows-[1fr] opacity-100"
                        : "grid-rows-[0fr] opacity-0"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="mt-5 border-t border-white/10 pt-5">
                        {project.contribution.length > 0 && (
                          <div>
                            <p className="font-pixel text-[8px] uppercase tracking-[0.22em] text-red-300">
                              Contribution
                            </p>

                            <div className="mt-4 space-y-3">
                              {project.contribution.map((item, index) => (
                                <div
                                  key={index}
                                  className="rounded-2xl border border-white/10 bg-black/[0.35] px-4 py-3 backdrop-blur-[2px] shadow-[0_0_25px_rgba(0,0,0,0.25)]"
                                >
                                  <p className="text-sm leading-6 text-white/75">
                                    {item}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech logos + names */}
                        <div className="mt-6 border-t border-white/10 pt-5">
                          <p className="font-pixel text-[8px] uppercase tracking-[0.22em] text-red-300">
                            Tech Stack
                          </p>

                          <div className="mt-4 flex flex-wrap gap-3">
                            {project.hard_skills.map((tech) => {
                              const { Icon, label } = getTechIcon(tech);

                              return (
                                <div
                                  key={tech}
                                  title={label}
                                  className="group/tech flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-3 py-2 text-white/75 backdrop-blur-sm
                                  shadow-[0_0_18px_rgba(248,113,113,0.12)]
                                  transition-all duration-300 hover:-translate-y-1 hover:border-red-400/50 hover:text-white
                                  hover:shadow-[0_0_22px_rgba(248,113,113,0.35)]"
                                >
                                  <span className="text-[16px] leading-none transition-transform duration-300 group-hover/tech:scale-110">
                                    <Icon />
                                  </span>

                                  <span className="text-[10px] leading-none">
                                    {label}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {project.link && (
                          <a
                            href={project.link}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="mt-5 inline-block text-sm text-red-300 underline underline-offset-4 transition hover:text-red-200"
                          >
                            View project
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
