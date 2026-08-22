import { motion } from "motion/react";
import { ExternalLink, BookOpen, GraduationCap, Library, LineChart } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const profiles = [
  {
    name: "Vidwan Profile",
    url: "https://vidwan.inflibnet.ac.in/profile/200676",
    icon: Library,
  },
  {
    name: "ORCID ID",
    url: "https://orcid.org/0000-0002-6014-9844",
    icon: BookOpen,
  },
  {
    name: "Scopus Author ID",
    url: "https://www.scopus.com/authid/detail.uri?authorId=57190013917",
    icon: LineChart,
  },
  {
    name: "OpenAlex",
    url: "https://openalex.org/A5049514785",
    icon: GraduationCap,
  },
];

export function AcademicProfiles() {
  return (
    <section id="profiles" className="mx-auto max-w-5xl scroll-mt-24 px-5 py-16">
      <SectionHeading eyebrow="Identifiers" title="Verified Academic Profiles" />
      <div className="flex flex-wrap justify-center gap-4 mt-8">
        {profiles.map((profile, i) => {
          const Icon = profile.icon;
          return (
            <Reveal key={profile.name} delay={i * 0.1}>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={profile.url}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-3 rounded-full border border-border/50 bg-secondary px-6 py-3 shadow-[var(--shadow-soft)] transition-colors hover:border-primary/30 hover:bg-card"
              >
                <Icon className="h-5 w-5 text-primary" />
                <span className="font-semibold text-foreground/90">{profile.name}</span>
                <ExternalLink className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
              </motion.a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
