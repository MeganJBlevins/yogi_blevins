import { Divider } from "@/app/components";
import PageLayout from "@/app/components/PageLayout";
import About from "@/app/Pages/About/About";
import Contact from "@/app/Pages/Contact/Contact";
import Videos from "@/app/Pages/Videos/Videos";
import Hero from "./Hero";

export default function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <About />
      <Divider />
      <Videos />
      <Divider flipped />
      {/* <Events /> */}
      <Contact />
    </PageLayout>
  );
}

