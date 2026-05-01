import Link from "next/link";

export const metadata = {
  title: "Impressum",
};

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-slate-50 px-4 py-12">
      <div className="max-w-lg mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-800 transition-colors mb-8 group"
        >
          <span className="group-hover:-translate-x-0.5 transition-transform">←</span>
          Zurück
        </Link>

        <h1 className="text-2xl font-bold text-slate-900 mb-8">Impressum</h1>

        <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 space-y-6 text-sm text-slate-700 leading-relaxed">
          <section>
            <h2 className="font-semibold text-slate-900 mb-2">Angaben gemäß § 5 TMG</h2>
            <p className="text-slate-500 italic">
              [Name und Anschrift des Betreibers eintragen]
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">Kontakt</h2>
            <p className="text-slate-500 italic">[E-Mail-Adresse eintragen]</p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">Haftungsausschluss</h2>
            <p>
              Die Inhalte dieser Seite wurden mit größter Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">Affiliate-Links</h2>
            <p>
              Diese Website enthält Affiliate-Links. Wenn du über diese Links einkaufst, erhalten
              wir eine Provision. Dir entstehen dabei keine Mehrkosten.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
