import { motion } from "motion/react";
import {
  AudioWaveform,
  BrainCircuit,
  Cpu,
  HeartPulse,
  Lightbulb,
  Sigma,
  type LucideIcon,
  GraduationCap,
  Code2,
  Network,
} from "lucide-react";
import { Route } from "@/routes/index";
import { Reveal, SectionHeading } from "./Reveal";

const icons: Record<string, LucideIcon> = {
  Cpu,
  Sigma,
  AudioWaveform,
  BrainCircuit,
  HeartPulse,
  Lightbulb,
  GraduationCap,
  Code2,
  Network,
};

export function Research() {
  const data = Route.useLoaderData();
  const researchAreas = data.researchAreas || [];
  const skills = data.skills || [];
  const memberships = data.memberships || [];
  return (
    <section id="research" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading eyebrow="Focus" title="Research Areas" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {researchAreas.map((area, i) => {
          const Icon = icons[area.icon] ?? Cpu;
          return (
            <Reveal key={area.title} delay={i * 0.07}>
              <motion.article
                whileHover={{ y: -6 }}
                className="surface-card group flex h-full flex-col p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="text-xl font-bold leading-tight">{area.title}</h3>
                </div>
                <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{area.desc}</p>
                {area.keywords && (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {area.keywords.map((kw) => (
                      <span key={kw} className="rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground border border-border/50">
                        {kw}
                      </span>
                    ))}
                  </div>
                )}
              </motion.article>
            </Reveal>
          );
        })}
      </div>

      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <Reveal>
          <div className="surface-card h-full p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Core Skills</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((s) => (
                <motion.span
                  key={s}
                  whileHover={{ scale: 1.06 }}
                  className="rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-medium text-secondary-foreground"
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="surface-card h-full p-6">
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
              Professional Memberships
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {memberships.map((m) => (
                <li key={m} className="flex gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
