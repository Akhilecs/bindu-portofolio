import { motion } from "motion/react";
import { ShieldCheck, ShieldAlert } from "lucide-react";
import { Route } from "@/routes/index";
import { Reveal, SectionHeading } from "./Reveal";

export function Patents() {
  const data = Route.useLoaderData();
  const patents = data.patents || [];
  return (
    <section id="patents" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-16">
      <SectionHeading eyebrow="Intellectual Property" title="Patents Filed & Granted" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {patents.map((p, i) => {
          const isGranted = p.status.toLowerCase().includes("granted");
          const Icon = isGranted ? ShieldCheck : ShieldAlert;
          
          return (
            <Reveal key={p.no} delay={i * 0.05}>
              <motion.div 
                whileHover={{ y: -4 }}
                className="surface-card flex h-full flex-col p-6"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${isGranted ? 'bg-primary/10 text-primary' : 'bg-secondary text-muted-foreground'}`}>
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${isGranted ? 'bg-primary/15 text-primary' : 'bg-secondary border border-border/50 text-muted-foreground'}`}>
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-5 text-sm font-bold leading-snug text-foreground/90 flex-1">{p.title}</h3>
                
                <div className="mt-5 flex items-center justify-between border-t border-border/50 pt-4 text-xs">
                  <div>
                    <span className="text-muted-foreground">App No: </span>
                    <span className="font-semibold text-foreground">{p.no}</span>
                  </div>
                  <span className="font-medium text-muted-foreground">{p.year}</span>
                </div>
              </motion.div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
