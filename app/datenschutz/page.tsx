import Link from "next/link";

export const metadata = {
  title: "Datenschutzerklärung",
};

export default function DatenschutzPage() {
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

        <h1 className="text-2xl font-bold text-slate-900 mb-8">Datenschutzerklärung</h1>

        <div className="bg-white rounded-2xl border-2 border-slate-100 p-6 space-y-6 text-sm text-slate-700 leading-relaxed">

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">1. Datenschutz auf einen Blick</h2>
            <p>
              Die Nutzung dieser Website ist in der Regel ohne Angabe
              personenbezogener Daten möglich. Soweit Daten erhoben werden,
              behandeln wir diese vertraulich und entsprechend den gesetzlichen
              Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">2. Verantwortlicher</h2>
            <p>
              Ahmed Amin Maatalla<br />
              Frankfurter Str. 13<br />
              57074 Siegen<br />
              E-Mail:{" "}
              <a
                href="mailto:amarex06@outlook.com"
                className="text-blue-600 hover:underline"
              >
                amarex06@outlook.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">3. Hosting</h2>
            <p>
              Diese Website wird gehostet von{" "}
              <span className="font-medium">Vercel Inc.</span>, USA. Beim Aufruf
              der Website werden Server-Logs erfasst, die technisch notwendige
              Verbindungsdaten enthalten (IP-Adresse, Browsertyp, Zeitstempel).
              Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f
              DSGVO (berechtigtes Interesse am sicheren und stabilen Betrieb der
              Website).
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">4. Cookies & Tracking</h2>
            <p>
              Diese Website verwendet <span className="font-medium">keine Cookies</span> und
              kein Tracking. Es werden keine Analyse- oder Werbe-Tools eingesetzt.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">5. Affiliate-Links</h2>
            <p>
              Diese Website nimmt am Amazon Partnerprogramm teil. Beim Kauf über
              unsere Links erhalten wir eine Provision — für dich entstehen keine
              Mehrkosten. Amazon verarbeitet beim Klick auf Affiliate-Links eigene
              Daten gemäß seiner Datenschutzrichtlinie:{" "}
              <a
                href="https://www.amazon.de/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                amazon.de/privacy
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">6. Deine Rechte</h2>
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung,
              Einschränkung der Verarbeitung sowie Widerspruch gegen die
              Verarbeitung deiner personenbezogenen Daten (Art. 15–21 DSGVO).
            </p>
            <p className="mt-2">
              Anfragen richtest du an:{" "}
              <a
                href="mailto:amarex06@outlook.com"
                className="text-blue-600 hover:underline"
              >
                amarex06@outlook.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
