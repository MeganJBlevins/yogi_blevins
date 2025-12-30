import Section from "@/app/components/Section";

interface HeroProps {
  title?: string;
}

export default function Hero({ 
  title = "Yogi Blevins"
}: HeroProps) {
  return (
    <Section
      className="flex min-h-screen items-center justify-center bg-primary-bg"
    >
      <h1 className="font-serif text-5xl font-bold tracking-tight text-primary-text md:text-7xl lg:text-8xl">
        {title}
      </h1>
    </Section>
  );
}

