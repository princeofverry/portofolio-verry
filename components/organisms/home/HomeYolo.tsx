import Image from "next/image";

export default function HomeYolo() {
  return (
    <>
      <section className="text-white pad-x mb-8 pt-24 space-y-8">
        <div className="flex flex-row items-center gap-x-2">
          <h1 className="font-semibold text-2xl">Object Detection</h1>
          <Image
            src="/images/stars.svg"
            alt="stars"
            width={30}
            height={30}
            className="animate-pulse"
          />
        </div>
        <div id="yolo"></div>
      </section>
    </>
  );
}
