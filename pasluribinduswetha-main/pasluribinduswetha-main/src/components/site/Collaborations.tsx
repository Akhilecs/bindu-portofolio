import { motion } from "motion/react";
import { Handshake, Target, Users } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const collaborations = [
  {
    title: "Industry Projects & Consulting",
    icon: Handshake,
    desc: "Partnering with leading tech firms to bridge the gap between academic research and real-world semiconductor applications, optimizing architectures for commercial use.",
  },
  {
    title: "Innovation Cell Leadership",
    icon: Target,
    desc: "Spearheading the Institution's Innovation Council (IIC) to foster a culture of entrepreneurship, hosting hackathons, and guiding early-stage tech incubations.",
  },
  {
    title: "Student Product Mentoring",
    icon: Users,
    desc: "Mentoring engineering students through EPICS (Engineering Projects in Community Service) to develop sustainable, community-focused technological products.",
  },
];

export function Collaborations() {
  return (
    <section id="collaborations" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading eyebrow="Partnerships" title="Research & Industry Collaboration" />
      <div className="grid gap-6 md:grid-cols-3">
        {collaborations.map((collab, i) => {
          const Icon = collab.icon;
          return (
            <Reveal key={collab.title} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -6 }} 
                className="surface-card flex h-full flex-col items-center text-center p-8"
              >
                <div className="mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold leading-snug">{collab.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {collab.desc}
                </p>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
