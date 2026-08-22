import { motion } from "motion/react";
import { GraduationCap, Briefcase } from "lucide-react";
import { Route } from "@/routes/index";
import { Reveal, SectionHeading } from "./Reveal";

export function Journey() {
  const data = Route.useLoaderData();
  const timeline = data.timeline || [];
  return (
    <section id="journey" className="scroll-mt-24 py-16">
      <div className="mx-auto max-w-4xl px-5">
        <SectionHeading eyebrow="17+ Years" title="Academic & Professional Journey" />
        
        <div className="relative mt-10">
          {/* Vertical Line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute left-[27px] top-0 bottom-0 w-px origin-top sm:left-1/2 sm:-translate-x-1/2"
            style={{ background: "var(--gradient-primary)" }}
          />

          <div className="flex flex-col gap-10">
            {timeline.map((t, i) => {
              const isEven = i % 2 === 0;
              return (
                <Reveal key={t.year} delay={i * 0.1}>
                  <div className={`relative flex items-center gap-6 sm:gap-0 ${isEven ? 'sm:flex-row' : 'sm:flex-row-reverse'}`}>
                    
                    {/* Icon */}
                    <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-border bg-card shadow-[var(--shadow-soft)] sm:absolute sm:left-1/2 sm:-translate-x-1/2">
                      {t.title.includes('Dean') || t.title.includes('Professor') || t.title.includes('Head') ? (
                        <Briefcase className="h-5 w-5 text-primary" />
                      ) : (
                        <GraduationCap className="h-5 w-5 text-primary" />
                      )}
                    </div>
                    
                    {/* Content */}
                    <div className={`flex-1 sm:w-1/2 ${isEven ? 'sm:pr-14 sm:text-right' : 'sm:pl-14 sm:text-left'}`}>
                      <div className="surface-card p-6 relative inline-block w-full">
                        <span className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-sm font-bold text-primary mb-3">
                          {t.year}
                        </span>
                        <h3 className="text-base font-bold text-foreground/90">{t.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.detail}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
