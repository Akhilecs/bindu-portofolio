import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "motion/react";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Stats } from "@/components/site/Stats";
import { About } from "@/components/site/About";
import { Research } from "@/components/site/Research";
import { Publications } from "@/components/site/Publications";
import { Patents } from "@/components/site/Patents";
import { Journey } from "@/components/site/Journey";
import { Gallery } from "@/components/site/Gallery";
import { Awards } from "@/components/site/Awards";
import { Collaborations } from "@/components/site/Collaborations";
import { AcademicProfiles } from "@/components/site/AcademicProfiles";
import { CollaborateCTA } from "@/components/site/CollaborateCTA";
import { Contact } from "@/components/site/Contact";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Dr. P. Bindu Swetha — VLSI Researcher & Innovation Dean" },
      {
        name: "description",
        content:
          "Portfolio of Dr. Pasuluri Bindu Swetha: 17+ years in ECE teaching and research, 51+ papers, 15 patents, 10 books in VLSI, Vedic multipliers and AI.",
      },
      { property: "og:title", content: "Dr. P. Bindu Swetha — VLSI Researcher & Innovation Dean" },
      {
        property: "og:description",
        content:
          "Research, patents, publications and awards of Dr. Pasuluri Bindu Swetha, Professor of ECE and Dean of Innovation.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 26, restDelta: 0.001 });

  return (
    <div className="min-h-screen bg-background">
      <motion.div
        style={{ scaleX: progress, background: "var(--gradient-primary)" }}
        className="fixed inset-x-0 top-0 z-[60] h-1 origin-left"
      />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Research />
        <Publications />
        <Patents />
        <Journey />
        <Awards />
        <Collaborations />
        <Gallery />
        <AcademicProfiles />
        <CollaborateCTA />
        <Contact />
      </main>
      <footer className="border-t border-border py-8 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Dr. Pasuluri Bindu Swetha · Professor of ECE &amp; Dean, Innovation
      </footer>
    </div>
  );
}
