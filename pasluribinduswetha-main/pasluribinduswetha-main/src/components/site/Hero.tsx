import { motion } from "motion/react";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { orbitTopics, profile } from "@/data/profile";
import bindu from "@/assets/bindu.jpeg";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-10">
      <div className="pointer-events-none absolute inset-0 grid-backdrop" />
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5 text-xs font-medium text-secondary-foreground"
          >
            <GraduationCap className="h-3.5 w-3.5 text-primary" />
            Professor | Researcher | Innovation Mentor | Academic Leader
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="mt-6 text-5xl font-bold leading-[1.05] sm:text-6xl lg:text-7xl tracking-tight"
          >
            Dr. P. Bindu <span className="text-gradient">Swetha</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.14 }}
            className="mt-6 flex flex-wrap gap-2"
          >
            <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Artificial Intelligence & Machine Learning
            </span>
            <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Biomedical Electronics
            </span>
            <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Signal Processing
            </span>
            <span className="rounded-md bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
              Innovation & Emerging Technologies
            </span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground"
          >
            {profile.summary}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <Button asChild size="lg" className="group">
              <a href="#research">
                Explore My Research
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#publications">
                View Publications <BookOpen className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="relative mx-auto aspect-square w-full max-w-[440px] px-2 mt-10 lg:mt-0"
        >
          <div
            className="absolute inset-6 rounded-full opacity-70 blur-2xl"
            style={{ background: "radial-gradient(circle at 50% 40%, oklch(0.88 0.07 285), transparent 65%)" }}
          />
          <div className="orbit-ring absolute inset-0">
            <div className="absolute inset-4 rounded-full border border-dashed border-primary/25" />
            <div className="absolute inset-14 rounded-full border border-primary/15" />
            {orbitTopics.map((topic, i) => {
              const angle = (i / orbitTopics.length) * Math.PI * 2 - Math.PI / 2;
              const r = 45;
              return (
                <div
                  key={topic}
                  className="absolute"
                  style={{
                    left: `${50 + r * Math.cos(angle)}%`,
                    top: `${50 + r * Math.sin(angle)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="orbit-counter">
                    <span className="whitespace-nowrap rounded-full border border-border bg-card px-3 py-1.5 text-[10px] font-semibold shadow-[var(--shadow-soft)] sm:text-xs">
                      {topic}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="float-soft absolute inset-[18%] overflow-hidden rounded-full border border-border bg-card shadow-[var(--shadow-float)]">
            <img
              src={bindu}
              alt="Dr. Pasuluri Bindu Swetha, Professor of ECE and Dean of Innovation"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
