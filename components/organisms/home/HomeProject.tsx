import Image from "next/image";
import stars from "/public/images/stars.svg";
import CardProject from "@/components/molecules/card/CardProject";

export default function HomeProject() {
  return (
    <>
      <section className="text-white pad-x pt-24 space-y-8">
        <div className="flex flex-row items-center gap-x-2">
          <h1 className="font-semibold text-2xl">Some Featured projects</h1>
          <Image
            src={stars}
            alt="stars"
            height={30}
            width={30}
            className="animate-pulse"
          />
        </div>
        <CardProject />
        <div id="project"></div>
      </section>
    </>
  );
}
