import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { Linkedin, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { profile } from "@/data/profile";
import { Reveal, SectionHeading } from "./Reveal";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error("Please fill in every field before sending.");
      return;
    }
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setForm({ name: "", email: "", message: "" });
      toast.success("Thanks! Your collaboration note has been noted.");
    }, 900);
  };

  return (
    <section id="contact" className="scroll-mt-24 bg-secondary/40 py-16">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading eyebrow="Get in touch" title="Let's Collaborate" />
        <div className="grid gap-4 lg:grid-cols-[1fr_1.1fr]">
          <Reveal>
            <div className="surface-card h-full p-7">
              <p className="text-sm leading-relaxed text-muted-foreground">
                Always open to research collaborations, innovation programmes, guest lectures and
                student mentoring initiatives.
              </p>
              <div className="mt-6 space-y-3 text-sm">
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:bg-accent"
                >
                  <Linkedin className="h-4 w-4 text-primary" /> Dr. P. Bindu Swetha
                </a>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <MapPin className="h-4 w-4 text-primary" /> {profile.location}
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-3">
                  <Mail className="h-4 w-4 text-primary" /> ORCID {profile.orcid}
                </div>
              </div>
              <blockquote className="mt-6 rounded-xl border border-border bg-card p-4 text-sm italic text-muted-foreground">
                "Learning is a continuous journey that should enrich professional growth and make a
                meaningful impact on society."
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <form onSubmit={submit} className="surface-card h-full space-y-4 p-7">
              <div className="grid gap-4 sm:grid-cols-2">
                <Input
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <Input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </div>
              <Textarea
                rows={6}
                placeholder="Tell me about your research idea or collaboration…"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
              />
              <motion.div whileTap={{ scale: 0.98 }}>
                <Button type="submit" size="lg" disabled={sending} className="w-full">
                  {sending ? "Sending…" : "Send Message"}
                  <Send className="ml-1 h-4 w-4" />
                </Button>
              </motion.div>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
