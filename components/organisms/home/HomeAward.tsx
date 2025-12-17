import { Award } from "@/data/data";
import Image from "next/image";

export default function HomeAward() {
  return (
    <section className="text-white pad-x pt-4">
      <div className="space-y-4">
        <div className="flex flex-row items-center gap-x-2">
          <h1 className="font-semibold text-2xl">Awards</h1>
          <Image
            src="/images/stars.svg"
            alt="stars"
            width={30}
            height={30}
            className="animate-pulse"
          />
        </div>
        <p className="pb-4 text-justify">
          Awards represent significant milestones in my career that I take pride
          in. These achievements highlight my dedication, skills, and the impact
          I have made in various projects over time. Each award showcases my
          commitment to excellence and my continuous growth in my professional
          journey.
        </p>
      </div>

      <ul className="space-y-4">
        {Award.map((item) => (
          <li key={item.id}>
            <div className="flex justify-between text-sm gap-4">
              <h1 className="flex-1">{item.name}</h1>
              <p className="shrink-0">{item.year}</p>
            </div>
            <hr className="mt-4" />
          </li>
        ))}
      </ul>
    </section>
  );
}
