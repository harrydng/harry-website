import type { ElementType } from "react";

import {
  FaJava,
  FaJs,
  FaPython,
  FaReact,
} from "react-icons/fa";

import {
  SiTypescript,
  SiKotlin,
  SiFlask,
  SiSpringboot,
  SiSqlite,
  SiGnubash,
  SiC,
} from "react-icons/si";

export type TechStackItem = {
  id: string;
  name: string;
  Icon: ElementType;
};

export const techStack: TechStackItem[] = [
  { id: "java", name: "Java", Icon: FaJava },
  { id: "javascript", name: "JavaScript", Icon: FaJs },
  { id: "python", name: "Python", Icon: FaPython },
  { id: "sql", name: "SQL", Icon: SiSqlite },
  { id: "kotlin", name: "Kotlin", Icon: SiKotlin },
  { id: "c", name: "C", Icon: SiC },
  { id: "assembly", name: "Assembly", Icon: SiGnubash },
  { id: "flask", name: "Flask", Icon: SiFlask },
  { id: "springboot", name: "Spring Boot MVC", Icon: SiSpringboot },
  { id: "typescript", name: "TypeScript", Icon: SiTypescript },
  { id: "react", name: "React", Icon: FaReact },
];