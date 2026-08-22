import { useEffect, useState } from "react";
import { motion } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/site/Reveal";
import { Route } from "@/routes/index";

export function Gallery() {
  const data = Route.useLoaderData();
  const gallery = data.gallery || [];
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    const timer = setInterval(() => api.scrollNext(), 4200);
    return () => {
      clearInterval(timer);
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <section id="gallery" className="relative py-20">
      <div className="mx-auto max-w-6xl px-5">
        <Reveal>
          <h2 className="text-3xl font-bold sm:text-4xl">
            Moments in <span className="text-gradient">Innovation</span>
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Glimpses from research visits, hackathons, industry collaborations and mentoring engagements.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            className="mt-10"
          >
            <CarouselContent className="-ml-4">
              {gallery.map((s, i) => (
                <CarouselItem key={s.src} className="pl-4 sm:basis-1/2 lg:basis-1/3">
                  <motion.figure
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 260, damping: 22 }}
                    className="group overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]"
                  >
                    <div className="aspect-[4/3] overflow-hidden bg-secondary/50 flex items-center justify-center p-2">
                      <img
                        src={`/gallery/${s.src}`}
                        alt={s.caption}
                        loading="lazy"
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                    <figcaption className="px-4 py-3 text-xs leading-relaxed text-muted-foreground">
                      {s.caption}
                    </figcaption>
                  </motion.figure>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-3 hidden sm:flex" />
            <CarouselNext className="-right-3 hidden sm:flex" />
          </Carousel>
        </Reveal>

        <div className="mt-6 flex justify-center gap-2">
          {gallery.map((s, i) => (
            <button
              key={s.src}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => api?.scrollTo(i)}
              className={`h-1.5 rounded-full transition-all ${current === i ? "w-7 bg-primary" : "w-2.5 bg-border hover:bg-primary/40"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
