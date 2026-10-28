import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { site, type Project } from "@/data/site";
import { Lightbox, Media, Reveal, ext } from "@/components/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sean Butler | Data Analytics Portfolio" },
      { name: "description", content: "Sean Butler — data analytics student building ML models, dashboards, and data platforms. Graduating April 2027." },
      { property: "og:title", content: "Sean Butler | Data Analytics Portfolio" },
      { property: "og:description", content: "Projects in data analytics, data science, and AI/data engineering." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main>
      <Hero />
      <Projects />
      <About />
      <Contact />
    </main>
  );
}

function Hero() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-6 py-20">
      <Reveal>
        <Media image={site.headshot} className="h-28 w-28 rounded-full sm:h-36 sm:w-36" />
        <h1 className="mt-10 text-5xl font-semibold tracking-tight sm:text-7xl">{site.name}</h1>
        <p className="mt-4 font-mono text-sm text-primary sm:text-base">{site.tagline}</p>
        <blockquote className="quote mt-10 max-w-xl">
          <p className="italic text-foreground/85">“{site.quote.text}”</p>
          <footer className="mt-2 font-mono text-xs text-muted-foreground">— {site.quote.author}</footer>
        </blockquote>
        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-muted-foreground">{site.graduation}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#projects" className="btn-primary">View Projects</a>
          <Link to="/resume" className="btn-outline">Resume</Link>
          <a href={site.githubUrl} {...ext(site.githubUrl)} className="btn-ghost">GitHub</a>
          <a href={site.linkedinUrl} {...ext(site.linkedinUrl)} className="btn-ghost">LinkedIn</a>
        </div>
      </Reveal>
    </section>
  );
}

function SectionHead({ num, title }: { num: string; title: string }) {
  return (
    <div className="mb-14 flex items-baseline gap-4">
      <span className="font-mono text-xs text-primary">{num}</span>
      <h2 className="section-title text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h2>
    </div>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHead num="01" title="Projects" />
      <div className="flex flex-col gap-28">
        {site.projects.map((p, i) => (
          <ProjectRow key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState<number | null>(null);
  const hasImages = project.images.some((im) => im.src);
  const flip = index % 2 === 1;
  const Shot = ({ i, className }: { i: number; className: string }) => (
    <button
      type="button"
      className={`shot ${className}`}
      onClick={() => hasImages && setOpen(i)}
      aria-label={`Open ${project.images[i]!.alt}`}
      disabled={!hasImages}
    >
      <Media image={project.images[i]!} className="h-full w-full" />
    </button>
  );
  return (
    <Reveal>
      <article className="grid items-center gap-10 lg:grid-cols-12">
        <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
          <Shot i={0} className="aspect-video w-full" />
          <div className="mt-3 grid grid-cols-2 gap-3">
            <Shot i={1} className="aspect-video" />
            <Shot i={2} className="aspect-video" />
          </div>
        </div>
        <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
          <span className="font-mono text-xs text-muted-foreground">PROJECT_{String(index + 1).padStart(2, "0")}</span>
          <h3 className="mt-2 text-2xl font-semibold tracking-tight sm:text-3xl">{project.title}</h3>
          <p className="mt-4 leading-relaxed text-foreground/80">{project.description}</p>
          <p className="mt-4 text-sm text-muted-foreground">
            <span className="font-mono text-xs text-primary">WHY I BUILT IT →</span> {project.why}
          </p>
          <ul className="stat-strip mt-6" aria-label="Project stats">
            {project.stats.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
          <a href={project.githubUrl} {...ext(project.githubUrl)} className="btn-outline mt-8">View code on GitHub</a>
        </div>
      </article>
      {open !== null && (
        <Lightbox images={project.images} index={open} onIndex={setOpen} onClose={() => setOpen(null)} />
      )}
    </Reveal>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-24">
      <SectionHead num="02" title="About" />
      <Reveal className="grid gap-12 md:grid-cols-2 md:items-center">
        <Media image={site.aboutPhoto} className="aspect-[4/5] w-full max-w-sm rounded-lg" />
        <div>
          {site.about.map((t, i) => (
            <p key={i} className="mb-5 text-lg leading-relaxed text-foreground/85">{t}</p>
          ))}
          <p className="mt-8 font-mono text-sm text-muted-foreground">
            <span className="text-primary">Currently:</span> {site.currently}
          </p>
        </div>
      </Reveal>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl scroll-mt-20 px-6 py-32">
      <Reveal>
        <span className="font-mono text-xs text-primary">03</span>
        <h2 className="section-title mt-2 text-4xl font-semibold tracking-tight sm:text-6xl">Let's connect.</h2>
        <p className="mt-6 max-w-lg text-lg text-muted-foreground">
          Open to data analytics internships, roles, and project conversations.
        </p>
        <a href={site.emailUrl} className="email-link mt-10 inline-block font-mono text-xl sm:text-2xl">{site.email}</a>
        <div className="mt-8 flex gap-3">
          <a href={site.githubUrl} {...ext(site.githubUrl)} className="btn-ghost">GitHub</a>
          <a href={site.linkedinUrl} {...ext(site.linkedinUrl)} className="btn-ghost">LinkedIn</a>
        </div>
      </Reveal>
    </section>
  );
}
