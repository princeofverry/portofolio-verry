import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Code2, Contact, House } from "lucide-react";
import Link from "next/link";

const nav = [
  {
    icon: <House />,
    name: "Home",
    href: "#home",
  },
  {
    icon: <Code2 />,
    name: "Project",
    href: "#project",
  },
  {
    icon: <Contact />,
    name: "Contact Me",
    href: "#contact",
  },
];

export default function Navbar() {
  return (
    <>
      <div className="fixed flex z-30 h-10 py-10 w-full items-center justify-center">
        <div className="absolute top-0 z-30 h-20 w-full bg-gradient-to-b from-black to-transparent dark:from-zinc-950"></div>
        <div className="top-0 h-10 z-40 w-fit p-1 rounded-3xl bg-gradient-to-r from-red-400 via-green-400  to-blue-600">
          <div className="flex h-full gap-x-2 px-2 items-center justify-center rounded-2xl bg-gray-800 text-white">
            {nav.map((item, i) => (
              <Tooltip delayDuration={100} key={i}>
                <TooltipTrigger asChild>
                  <Link href={item.href || "#"}>
                    <Button variant={"navlink"} className="rounded-full">
                      {item.icon}
                    </Button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{item.name}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
