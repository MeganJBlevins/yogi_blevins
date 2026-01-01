import PageLayout from "@/app/components/PageLayout";
import { Divider } from "@/app/components";
import Hero from "./Hero";
import About from "@/app/Pages/About/About";
import Videos from "@/app/Pages/Videos/Videos";

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <About />
      <Divider />
      <Videos />
    </PageLayout>
  );
}

