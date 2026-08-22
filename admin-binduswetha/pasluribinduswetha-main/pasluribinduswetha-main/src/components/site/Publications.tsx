import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ExternalLink, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { Publication } from "@/data/profile";
import { Route } from "@/routes/index";
import { SectionHeading } from "./Reveal";

const filters = ["All", "Journal", "Conference", "Book", "Chapter"] as const;
const yearFilters = ["All Years", "2026", "2025", "2024", "2023", "Previous"] as const;

export function Publications() {
  const data = Route.useLoaderData();
  const publications = data.publications || [];
  
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const [yearFilter, setYearFilter] = useState<(typeof yearFilters)[number]>("All Years");
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return publications
      .filter((p: Publication) => (filter === "All" ? true : p.type === filter))
      .filter((p: Publication) => {
        if (yearFilter === "All Years") return true;
        if (yearFilter === "Previous") return p.year < 2023;
        return p.year.toString() === yearFilter;
      })
      .filter((p) =>
        needle ? (p.title + p.venue + (p.index ?? "")).toLowerCase().includes(needle) : true,
      )
      .sort((a, b) => b.year - a.year);
  }, [filter, yearFilter, q]);

  return (
    <section id="publications" className="scroll-mt-24 bg-secondary/40 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Scholarship"
          title="Publications & Books"
          action={
            <div className="relative w-full max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search titles, venues, indexing…"
                className="bg-card pl-9"
              />
            </div>
          }
        />

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`relative rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                  filter === f
                    ? "border-transparent text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:text-foreground"
                }`}
              >
                {filter === f && (
                  <motion.span
                    layoutId="pub-filter"
                    className="absolute inset-0 rounded-full"
                    style={{ background: "var(--gradient-primary)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {yearFilters.map((y) => (
              <button
                key={y}
                onClick={() => setYearFilter(y)}
                className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                  yearFilter === y
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-muted-foreground hover:bg-secondary"
                }`}
              >
                {y}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-3 md:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {list.map((p) => (
              <motion.article
                layout
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.35 }}
                className="surface-card flex flex-col p-6"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider">
                  <span className="rounded-md bg-accent px-2 py-0.5 text-accent-foreground">{p.type}</span>
                  <span className="text-muted-foreground font-medium">{p.year}</span>
                  {p.index && <span className="text-primary bg-primary/5 px-2 py-0.5 rounded-md">{p.index}</span>}
                </div>
                <h3 className="mt-4 text-base font-bold leading-snug text-foreground/90">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground flex-1">{p.venue}</p>
                {p.link && (
                  <div className="mt-6">
                    <a
                      href={p.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-2 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-secondary/80 border border-border/50"
                    >
                      View Publication <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                )}
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {list.length === 0 && (
          <p className="py-12 text-center text-sm text-muted-foreground">No publications match that search.</p>
        )}
      </div>
    </section>
  );
}
