import { Mandala } from "@/app/components";
import Section from "@/app/components/Section";
import Image from "next/image";

interface HeroProps {
  imageSrc?: string;
  mandalaColor?: string;
}

export default function Hero({ 
  imageSrc = "/updog-hero-5.png",
  mandalaColor = "#798777"
}: HeroProps) {
  return (
    <Section
      className="relative flex min-h-[325px] items-start justify-start overflow-x-clip overflow-y-visible"
      style={{ backgroundColor: "#F8EDE3", padding: "30px" }}
    >
      <div className="relative z-10 flex h-full min-h-[600px] w-[80vw] items-center max-[500px]:h-[300px] max-[500px]:min-h-0 max-[500px]:items-end max-[750px]:mt-40 xl:translate-x-[20%]">
        <Image
          src={imageSrc}
          alt="Hero image"
          width={1920}
          height={1080}
          className="h-auto w-full object-contain"
          priority
        />
      </div>
      <div className="absolute right-24 top-1/4 z-10 -translate-y-1/2 text-right max-[1200px]:right-12 lg:-translate-x-[20%]">
        <h1 className="font-serif text-5xl font-bold tracking-tight text-primary-text md:text-6xl lg:text-7xl">
          Megan Blevins
        </h1>
        <h3 className="mt-4 font-serif text-2xl font-light tracking-wide text-primary-text md:text-3xl lg:text-4xl">
          Align, Strengthen and Thrive <br/>On and Off the Mat
        </h3>
      </div>
      <div 
        className="pointer-events-none absolute right-0 top-3/4 z-[1] h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 opacity-10 md:h-[720px] md:w-[720px] lg:-translate-y-[30%] lg:h-[90vw] lg:w-[90vw] xl:-translate-y-[50%] xl:translate-x-[30%]"
        aria-hidden="true"
      >
        <Mandala color={mandalaColor} />
      </div>
    </Section>
  );
}

