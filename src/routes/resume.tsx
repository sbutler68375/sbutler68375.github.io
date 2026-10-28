import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/site";
import { Placeholder } from "@/components/site";

export const Route = createFileRoute("/resume")({
  head: () => ({
    meta: [
      { title: "Resume | Sean Butler" },
      { name: "description", content: "Resume of Sean Butler, data analytics student graduating April 2027." },
      { property: "og:title", content: "Resume | Sean Butler" },
      { property: "og:description", content: "View or download Sean Butler's data analytics resume." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Resume,
});

function Resume() {
  const pdf = site.resumePdf || "#";
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="font-mono text-xs text-primary">RESUME.PDF</span>
          <h1 className="section-title mt-2 text-4xl font-semibold tracking-tight">Resume</h1>
        </div>
        <div className="flex gap-3">
          <a href={pdf} download={site.resumePdf ? "" : undefined} className="btn-primary">Download PDF</a>
          <a href={pdf} target={site.resumePdf ? "_blank" : undefined} rel="noreferrer" className="btn-outline md:hidden">Open PDF</a>
        </div>
      </div>
      <div className="mt-10 hidden md:block">
        {site.resumePdf ? (
          <iframe src={site.resumePdf} title="Sean Butler resume" className="h-[80vh] w-full rounded-lg border border-border" />
        ) : (
          <Placeholder label="RESUME PDF" className="h-[80vh] w-full rounded-lg" />
        )}
      </div>
    </main>
  );
}
