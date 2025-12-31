import PageLayout from "@/app/components/PageLayout";
import Hero from "./Hero";
import About from "@/app/Pages/About/About";

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <About />
    </PageLayout>
  );
}

