import { Fingerprint, Landmark, MapPin, Users } from "lucide-react";
import { profile } from "@/data/profile";
import { Reveal, SectionHeading } from "./Reveal";

const roles = [
  {
    icon: Landmark,
    title: "Dean, Innovation (CIIE)",
    detail: "Ravindra College of Engineering for Women — June 2025 to date.",
  },
  {
    icon: Users,
    title: "Innovation Ambassador",
    detail: "Institution Innovation Council; 90+ IIC events coordinated across campuses.",
  },
  {
    icon: Fingerprint,
    title: "Research Supervisor",
    detail: "33+ UG/PG scholars mentored in micro-electronics, Vedic mathematics and VLSI.",
  },
];

export function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading eyebrow="About" title="Academician, Researcher, Mentor" />
      <div className="grid gap-4 lg:grid-cols-3">
        {roles.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.08}>
            <div className="surface-card h-full p-6">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-accent text-accent-foreground">
                <r.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <div className="surface-card mt-4 flex flex-wrap items-center gap-x-8 gap-y-3 p-6 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> {profile.location}
          </span>
          <span>
            ORCID <span className="font-semibold text-foreground">{profile.orcid}</span>
          </span>
          <span>
            Scopus ID <span className="font-semibold text-foreground">{profile.scopus}</span>
          </span>
          <span>
            Vidwan ID <span className="font-semibold text-foreground">{profile.vidwan}</span>
          </span>
          <span>
            OpenAlex <span className="font-semibold text-foreground">{profile.openalex}</span>
          </span>
        </div>
      </Reveal>
    </section>
  );
}
