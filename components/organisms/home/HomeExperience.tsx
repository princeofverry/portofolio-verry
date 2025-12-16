import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Experiece } from "@/data/data";

export default function HomeExperience() {
  return (
    <>
      <section className="text-white pad-x pt-24 space-y-4">
        <div className="flex flex-row items-center gap-x-2">
          <h1 className="font-semibold text-2xl cursor-pointer">Experience</h1>
          <Image
            src="/images/stars.svg"
            alt="stars"
            width={30}
            height={30}
            className="animate-pulse"
          />
        </div>
        <p>
          I have a broad background in software engineering, gained through
          part-time roles as a developer, independent learning initiatives, and
          hands-on experience during internships.
        </p>
        {Experiece.map((item, i) => (
          <Accordion key={i} type="single" collapsible>
            <AccordionItem value={item.id}>
              <AccordionTrigger>
                <div className="flex flex-row items-center gap-x-4">
                  <Image
                    alt={item.alt}
                    height={1000}
                    width={1000}
                    src={item.image}
                    className="max-w-[50px]"
                  />
                  <div>
                    <h1 className="font-semibold">{item.title}</h1>
                    <p className="font-base text-sm text-muted-foreground">
                      {item.position}
                    </p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>{item.description}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </section>
    </>
  );
}
