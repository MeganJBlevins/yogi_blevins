import { Mandala } from "@/app/components";
import Section from "@/app/components/Section";
import Image from "next/image";

interface HeroProps {
  imageSrc?: string;
  mandalaColor?: string;
}

export default function Hero({ 
  imageSrc = "/Hero-Grasshopper.png",
  mandalaColor = "#798777"
}: HeroProps) {
  return (
    <Section
      className="relative flex min-h-[600px] items-start justify-start overflow-x-clip overflow-y-visible"
      style={{ backgroundColor: "#F8EDE3" }}
    >
      <div className="relative z-10 flex h-full min-h-[600px] items-center lg:translate-y-[20%]">
        <Image
          src={imageSrc}
          alt="Hero image"
          width={800}
          height={600}
          className="h-auto w-auto max-h-[600px] min-w-[75vw] object-contain lg:origin-left lg:scale-[0.8]"
          priority
        />
      </div>
      <div className="absolute right-12 top-1/4 z-10 -translate-y-1/2 text-right">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-primary-text md:text-6xl lg:text-7xl">
          Megan Blevins
        </h1>
        <h3 className="mt-4 font-serif text-2xl font-light tracking-wide text-primary-text md:text-3xl lg:text-4xl">
          Inner and Outer Strength
        </h3>
      </div>
      <div 
        className="pointer-events-none absolute right-0 top-3/4 z-[1] h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 opacity-10 md:h-[720px] md:w-[720px] lg:-translate-y-[30%] lg:h-[90vw] lg:w-[90vw]"
        aria-hidden="true"
      >
        <Mandala color={mandalaColor} />
      </div>
    </Section>
  );
}

