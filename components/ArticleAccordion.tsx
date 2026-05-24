"use client";

import { useState, type ReactNode } from "react";

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden="true"
      className={`text-slate-400 transition-transform duration-300 ease-out shrink-0 ${
        open ? "rotate-180" : "rotate-0"
      }`}
    >
      <path
        d="M6 8l4 4 4-4"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function Section({
  title,
  defaultOpen,
  children,
  contentClassName,
}: {
  title: string;
  defaultOpen: boolean;
  children: ReactNode;
  contentClassName?: string;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="rounded-2xl border-2 border-slate-100 bg-white overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left hover:bg-slate-50 transition-colors"
      >
        <span className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
          {title}
        </span>
        <Chevron open={open} />
      </button>
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-out ${
          open ? "max-h-[20000px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-5 sm:px-6 pb-5">
          <div
            className={`border-t border-slate-100 pt-5 ${contentClassName ?? ""}`}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ArticleAccordion({
  summary,
  details,
}: {
  summary: ReactNode;
  details: ReactNode;
}) {
  return (
    <div className="not-prose space-y-4 my-6">
      <Section
        title="Schnellübersicht"
        defaultOpen
        contentClassName="prose prose-slate max-w-none prose-p:text-slate-700 prose-p:leading-relaxed prose-strong:text-slate-900"
      >
        {summary}
      </Section>
      <Section
        title="Ausführlicher Vergleich"
        defaultOpen={false}
        contentClassName="prose prose-slate max-w-none prose-p:mb-5 prose-p:leading-relaxed prose-p:text-base prose-p:text-slate-700 prose-strong:text-slate-900 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h2]:mt-10 [&_h2]:mb-4 [&_h2]:pt-8 [&_h2]:border-t [&_h2]:border-slate-200 [&_h2:first-child]:border-t-0 [&_h2:first-child]:pt-0 [&_h2:first-child]:mt-0"
      >
        {details}
      </Section>
    </div>
  );
}
