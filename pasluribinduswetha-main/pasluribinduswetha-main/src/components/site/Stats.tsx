import { useEffect, useRef, useState } from "react";
import { useInView } from "motion/react";
import { FileText, ShieldCheck, BookOpen, Presentation, Award, Star } from "lucide-react";
import { stats } from "@/data/profile";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1400;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      setN(Math.round(value * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref} className="text-3xl font-bold text-gradient sm:text-4xl">
      {n}
      {suffix}
    </span>
  );
}

export function Stats() {
  const primaryStats = stats.filter(s => 
    ["Research Papers", "Patents", "Books / Chapters", "Conference Papers"].includes(s.label)
  ).sort((a, b) => {
    const order = ["Research Papers", "Patents", "Books / Chapters", "Conference Papers"];
    return order.indexOf(a.label) - order.indexOf(b.label);
  });

  const secondaryStats = stats.filter(s => 
    !["Research Papers", "Patents", "Books / Chapters", "Conference Papers"].includes(s.label)
  );

  // Rename labels to match user request
  const formatLabel = (label: string) => {
    if (label === "Research Papers") return "Research Publications";
    if (label === "Conference Papers") return "Conference Contributions";
    return label;
  };

  const iconMap: Record<string, any> = {
    "Research Papers": FileText,
    "Patents": ShieldCheck,
    "Books / Chapters": BookOpen,
    "Conference Papers": Presentation,
    "Certifications": Award,
    "IIC Events": Star,
  };

  return (
    <section className="mx-auto max-w-6xl px-5 py-6">
      <div className="surface-card p-8 sm:p-10">
        <div className="grid grid-cols-2 gap-y-10 sm:grid-cols-4 divide-x divide-border/50">
          {primaryStats.map((s, i) => {
            const Icon = iconMap[s.label];
            return (
              <div key={s.label} className="text-center px-4 flex flex-col items-center">
                <div className="flex items-center justify-center gap-3">
                  {Icon && <Icon className="h-6 w-6 text-primary/70" />}
                  <Counter value={s.value} suffix={s.suffix} />
                </div>
                <p className="mt-2 text-sm font-medium text-muted-foreground">{formatLabel(s.label)}</p>
              </div>
            );
          })}
        </div>
        
        {secondaryStats.length > 0 && (
          <div className="mt-8 pt-8 border-t border-border/50 flex flex-wrap justify-center gap-8">
            {secondaryStats.map(s => {
              const Icon = iconMap[s.label];
              return (
                <div key={s.label} className="text-center flex flex-col items-center">
                  <div className="flex items-center justify-center gap-2">
                    {Icon && <Icon className="h-5 w-5 text-primary/60" />}
                    <span className="text-xl font-bold text-foreground/80">
                      {s.value}{s.suffix}
                    </span>
                  </div>
                  <p className="mt-1 text-xs font-medium text-muted-foreground">{s.label}</p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
