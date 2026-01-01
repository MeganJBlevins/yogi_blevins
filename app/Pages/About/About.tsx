import { Mandala } from "@/app/components";
import Section from "@/app/components/Section";
import Image from "next/image";

interface AboutProps {
  imageSrc?: string;
  mandalaColor?: string;
}

export default function About({ 
  imageSrc = "/about-headshot.png",
  mandalaColor = "#798777"
}: AboutProps) {
  return (
    <Section
      id="about"
      className="relative py-20 lg:py-32"
      style={{ backgroundColor: "#F8EDE3" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" aria-hidden="true">
        <div className="absolute left-0 top-3/4 h-[800px] w-[800px] -translate-x-1/4 -translate-y-1/2">
          <Mandala color={mandalaColor} />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-8">
          <div className="flex-1 lg:w-1/2 lg:max-w-[50%]">
            <h2 className="font-serif text-4xl font-bold tracking-tight text-primary-text md:text-5xl lg:text-6xl">
              About Megan
            </h2>
            
            <div className="mt-8 space-y-6">
              <p className="text-lg leading-relaxed text-primary-text md:text-xl">
              Megan turned to yoga after years of desk jobs, long hours of sitting, and carrying more stress than her body knew what to do with. The practice became a powerful source of strength, confidence, and calm that transformed the way she moves through her life and relationships. Her classes are designed to help students find their own version of balance — whether they're seeking grounding, growth, or simply an hour to breathe and move. Megan brings an encouraging, down-to-earth energy to the mat and is excited to share the peace and inner steadiness yoga has brought her with anyone ready to explore it.
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-3 text-base font-medium text-primary-text shadow-sm transition-all duration-200 hover:bg-accent-hover hover:shadow-md active:bg-accent-active"
              >
                Get in Touch
              </a>
              <a
                href="#videos"
                className="inline-flex items-center justify-center rounded-full border-2 border-accent bg-transparent px-8 py-3 text-base font-medium text-primary-text transition-all duration-200 hover:bg-accent/10"
              >
                Watch Videos
              </a>
            </div>
          </div>
          
          <div className="relative flex-shrink-0 lg:w-1/2">
            <div className="relative w-full max-w-md rounded-2xl lg:max-w-none">
              <Image
                src={imageSrc}
                alt="Megan Blevins"
                width={400}
                height={600}
                className="h-auto w-full rounded-2xl object-contain"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* <div 
              className="absolute -bottom-8 -left-8 -z-10 h-full w-full rounded-2xl bg-accent/30"
              aria-hidden="true"
            /> */}
          </div>
        </div>
      </div>
    </Section>
  );
}

