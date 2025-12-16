import Image from "next/image";
import CardProject from "@/components/molecules/card/CardProject";

export default function HomeProject() {
  return (
    <>
      <section className="text-white pad-x mb-8 pt-24 space-y-8">
        <div className="flex flex-row items-center gap-x-2">
          <h1 className="font-semibold text-2xl">Some Featured projects</h1>
          <Image
            src="/images/stars.svg"
            alt="stars"
            width={30}
            height={30}
            className="animate-pulse"
          />
        </div>
        <div id="projects"></div>
        <CardProject />
      </section>
    </>
  );
}
