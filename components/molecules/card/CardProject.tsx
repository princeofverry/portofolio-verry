import { Project } from "@/data/data";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ProjectDetailDialog } from "../detail/ProjectDetailDialog";

function TechBadges({ stack }: { stack?: string[] }) {
  if (!stack?.length) return null;

  const first2 = stack.slice(0, 2);
  const nextUpTo5 = stack.slice(2, 5);

  const hasMoreThan2 = stack.length > 2;
  const hasMoreThan5 = stack.length > 5;

  const badgeBase =
    "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] leading-none";

  return (
    <div className="flex flex-wrap items-center gap-2 pt-1">
      {first2.map((tech) => (
        <span key={tech} className={`${badgeBase} text-gray-200`}>
          {tech}
        </span>
      ))}

      {nextUpTo5.map((tech) => (
        <span
          key={tech}
          className={`hidden sm:inline-flex ${badgeBase} text-gray-200`}
        >
          {tech}
        </span>
      ))}

      {/* mobile indicator (badge style biar sejajar) */}
      {hasMoreThan2 && (
        <span className={`sm:hidden ${badgeBase} text-gray-400`}>
          +{stack.length - 2}
        </span>
      )}

      {/* desktop indicator */}
      {hasMoreThan5 && (
        <span className={`hidden sm:inline-flex ${badgeBase} text-gray-400`}>
          +{stack.length - 5}
        </span>
      )}
    </div>
  );
}

export default function CardProject() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
      {Project.map((item) => (
        <ProjectDetailDialog
          key={item.id}
          project={item}
          trigger={
            <div className="group relative cursor-pointer">
              <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 opacity-75 blur transition group-hover:opacity-100" />

              <Card className="relative h-full bg-black/90 text-white rounded-lg border border-gray-800 overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative w-full h-48 overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={400}
                      height={300}
                      className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                </CardContent>

                <CardHeader className="space-y-2">
                  <CardTitle className="text-xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                    {item.title}
                  </CardTitle>

                  <TechBadges stack={item.stack} />

                  <CardDescription className="text-gray-300 line-clamp-2">
                    {item.description}
                  </CardDescription>
                </CardHeader>

                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Card>
            </div>
          }
        />
      ))}
    </div>
  );
}
