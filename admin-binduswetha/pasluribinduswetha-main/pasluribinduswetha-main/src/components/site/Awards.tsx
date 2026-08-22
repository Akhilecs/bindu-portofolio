import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import { Route } from "@/routes/index";
import { Reveal, SectionHeading } from "./Reveal";

export function Awards() {
  const data = Route.useLoaderData();
  const awards = data.awards || [];
  return (
    <section id="awards" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading eyebrow="Recognition" title="Awards & Honours" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {awards.map((a, i) => (
          <Reveal key={a.title} delay={i * 0.06}>
            <motion.div whileHover={{ y: -6, rotate: -0.4 }} className="surface-card flex flex-col h-full p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Trophy className="h-24 w-24 text-primary" />
              </div>
              <div className="flex items-start justify-between relative z-10">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Trophy className="h-6 w-6" />
                </span>
                <span className="inline-flex items-center rounded-full bg-secondary px-3 py-1 text-xs font-bold text-foreground border border-border/50 shadow-sm">{a.year}</span>
              </div>
              <div className="mt-8 relative z-10 flex-1">
                <h3 className="text-base font-bold leading-snug text-foreground/90">{a.title}</h3>
                <p className="mt-3 text-sm font-medium text-muted-foreground">{a.by}</p>
              </div>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
