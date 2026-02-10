"use client";

import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

type ProjectItem = {
  title: string;
  image: string;
  description: string;
  stack?: string[];
  role?: string;
  highlights?: string[];
  link?: string;
  repo?: string | null;
};

export function ProjectDetailDialog({
  project,
  trigger,
}: {
  project: ProjectItem;
  trigger: React.ReactNode;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{trigger}</AlertDialogTrigger>

      <AlertDialogContent
        className="
    max-w-2xl
    border border-white/10
    bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950
    text-white
    shadow-2xl shadow-black/80
    backdrop-blur-xl
  "
      >
        <AlertDialogHeader className="space-y-4">
          {/* Image */}
          <div className="relative w-full h-52 rounded-lg overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>

          <AlertDialogTitle className="text-2xl font-bold">
            {project.title}
          </AlertDialogTitle>

          {project.role && (
            <p className="text-sm text-gray-400">
              Role: <span className="text-gray-200">{project.role}</span>
            </p>
          )}

          <AlertDialogDescription className="text-gray-300">
            {project.description}
          </AlertDialogDescription>

          {/* Tech stack */}
          {project.stack?.length && (
            <div className="flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}

          {/* Highlights */}
          {project.highlights?.length && (
            <ul className="space-y-2 text-sm text-gray-300">
              {project.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
        </AlertDialogHeader>

        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel>Close</AlertDialogCancel>

          {project.repo && (
            <Button variant="outline" asChild>
              <Link href={project.repo} target="_blank">
                GitHub
              </Link>
            </Button>
          )}

          {project.link && project.link !== "/" && (
            <Button asChild>
              <Link href={project.link} target="_blank">
                Live Demo
              </Link>
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
