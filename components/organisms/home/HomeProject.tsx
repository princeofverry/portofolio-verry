import Image from "next/image";
import stars from "/public/images/stars.svg";

export default function HomeProject() {
  return (
    <>
      <section className="text-white pad-x pt-24 space-y-4">
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
        <h1>TBA...</h1>
        <div id="project"></div>
      </section>
    </>
  );
}
