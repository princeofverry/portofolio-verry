import Marquee from "@/components/ui/marquee";
import Image from "next/image";

import { techStack } from "@/data/data";

export default function HomeMarquee() {
  return (
    <>
      <section>
        <div className="relative mt-7 overflow-hidden">
          <Marquee pauseOnHover className="[--duration:20s]">
            {techStack.map((item, i) => (
              <div
                key={i}
                className="mx-2 flex max-w-none cursor-default items-center gap-x-2 text-sm text-white"
              >
                <Image
                  src={item.image || "/vercel.svg"}
                  alt="logo"
                  width={20}
                  height={20}
                  className="rounded"
                />
                {item.name}
              </div>
            ))}
          </Marquee>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-1/5 bg-gradient-to-r from-black dark:from-background"></div>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/5 bg-gradient-to-l from-black dark:from-background"></div>
        </div>
      </section>
    </>
  );
}
