"use client";

import Link from "next/link";
import { translations, type Lang } from "@/lib/i18n";

export default function AffiliateDisclosure({ lang }: { lang: Lang }) {
  const t = translations[lang];
  return (
    <div className="border-t border-slate-200 bg-slate-50 px-4 py-5">
      <div className="max-w-lg mx-auto">
        <p className="text-xs text-slate-500 leading-relaxed mb-3">{t.affiliateNotice}</p>
        <div className="flex gap-4">
          <Link
            href="/impressum"
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
          >
            {t.footerImprint}
          </Link>
          <Link
            href="/datenschutz"
            className="text-xs text-slate-400 hover:text-slate-600 underline underline-offset-2 transition-colors"
          >
            {t.footerPrivacy}
          </Link>
        </div>
      </div>
    </div>
  );
}
