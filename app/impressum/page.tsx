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
            <p>
              Ahmed Amin Maatalla<br />
              Frankfurter Str. 13<br />
              57074 Siegen
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">Kontakt</h2>
            <p>
              Telefon: +49 (0) 176 30 34 34 14<br />
              E-Mail:{" "}
              <a
                href="mailto:kontakt@byamarex.com"
                className="text-blue-600 hover:underline"
              >
                kontakt@byamarex.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">
              Streitschlichtung
            </h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur
              Online-Streitbeilegung (OS) bereit:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://ec.europa.eu/consumers/odr/
              </a>
              .
            </p>
            <p className="mt-2">
              Wir sind nicht bereit oder verpflichtet, an
              Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">
              Affiliate-Links (Amazon Partnerprogramm)
            </h2>
            <p>
              Als Amazon-Partner verdiene ich an qualifizierten Verkäufen.
              Diese Website nimmt am Amazon Partnerprogramm teil, einem
              Affiliate-Programm, das es Websites ermöglicht, Werbeeinnahmen
              durch Verlinkung mit Amazon.de zu erzielen. Wenn du über einen
              solchen Link einkaufst, erhalten wir eine kleine Provision —
              für dich entstehen dabei keine Mehrkosten.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
