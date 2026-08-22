import { motion } from "motion/react";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CollaborateCTA() {
  return (
    <section className="mx-auto max-w-4xl px-5 py-20 text-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-primary/20 bg-card p-10 shadow-[var(--shadow-float)] sm:p-16"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ background: "var(--gradient-primary)" }}
        />
        <div className="relative z-10">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Let's Collaborate on the <span className="text-gradient">Future of Tech</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Whether you're looking for R&amp;D partnerships, institutional mentoring, or speaking
            engagements, I'm always open to driving meaningful innovation.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="group rounded-full px-8">
              <a href="#contact">
                <Mail className="mr-2 h-4 w-4" />
                Reach Out Now
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="group rounded-full px-8 bg-transparent">
              <a href="#research">
                View My Research
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </Button>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
