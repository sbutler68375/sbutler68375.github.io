import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback, type ReactNode } from "react";
import { site, type SiteImage } from "@/data/site";

export function Placeholder({ label, className = "" }: { label: string; className?: string }) {
  return (
    <div className={`placeholder ${className}`} role="img" aria-label={`${label} placeholder`}>
      <span className="font-mono text-xs tracking-widest text-muted-foreground">{label}</span>
    </div>
  );
}

export function Media({ image, className = "" }: { image: SiteImage; className?: string }) {
  if (!image.src) return <Placeholder label={image.label} className={className} />;
  return <img src={image.src} alt={image.alt} className={`object-cover ${className}`} loading="lazy" />;
}

export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e?.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${shown ? "reveal-in" : ""} ${className}`}>
      {children}
    </div>
  );
}

export function Lightbox({
  images,
  index,
  onClose,
  onIndex,
}: {
  images: SiteImage[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const n = images.length;
  const prev = useCallback(() => onIndex((index - 1 + n) % n), [index, n, onIndex]);
  const next = useCallback(() => onIndex((index + 1) % n), [index, n, onIndex]);
  useEffect(() => {
    const last = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      last?.focus();
    };
  }, [onClose, prev, next]);
  const img = images[index]!;
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={img.alt}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 p-4 backdrop-blur"
      onClick={onClose}
    >
      <div className="relative flex w-full max-w-5xl flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <Media image={img} className="max-h-[78vh] w-full rounded-lg aspect-video" />
        <div className="flex items-center gap-3 font-mono text-xs text-muted-foreground">
          <button className="btn-ghost" onClick={prev} aria-label="Previous image">←</button>
          <span>{index + 1} / {n}</span>
          <button className="btn-ghost" onClick={next} aria-label="Next image">→</button>
          <button ref={closeRef} className="btn-ghost" onClick={onClose} aria-label="Close gallery">ESC ✕</button>
        </div>
      </div>
    </div>
  );
}

const ext = (url: string) => (url === "#" ? {} : { target: "_blank", rel: "noreferrer" });

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6" aria-label="Main">
        <Link to="/" className="font-mono text-lg font-semibold text-foreground">
          SB<span className="text-highlight">.</span>
        </Link>
        <ul className="flex items-center gap-5 text-sm sm:gap-8">
          <li><a className="nav-link" href="/#projects">Projects</a></li>
          <li><a className="nav-link" href="/#about">About</a></li>
          <li><a className="nav-link" href="/#contact">Contact</a></li>
          <li><Link className="nav-link" to="/resume" activeProps={{ className: "nav-link text-primary" }}>Resume</Link></li>
        </ul>
      </nav>
    </header>
  );
}

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.11.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.68.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}
function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-muted-foreground">
        <span>{site.name} · Data analytics</span>
        <div className="flex gap-4">
          <a href={site.githubUrl} {...ext(site.githubUrl)} aria-label="GitHub" className="icon-link"><GithubIcon /></a>
          <a href={site.linkedinUrl} {...ext(site.linkedinUrl)} aria-label="LinkedIn" className="icon-link"><LinkedinIcon /></a>
        </div>
      </div>
    </footer>
  );
}

export { ext };
