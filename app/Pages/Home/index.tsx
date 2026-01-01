import PageLayout from "@/app/components/PageLayout";
import { Divider } from "@/app/components";
import Hero from "./Hero";
import About from "@/app/Pages/About/About";
import Videos from "@/app/Pages/Videos/Videos";
import Events from "@/app/Pages/Events/Events";
import Contact from "@/app/Pages/Contact/Contact";

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <About />
      <Divider />
      <Videos />
      <Divider flipped />
      <Events />
      <Divider />
      <Contact />
    </PageLayout>
  );
}

