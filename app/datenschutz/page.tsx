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
              Diese Website erhebt nur die Daten, die für den technischen Betrieb notwendig sind.
              Es werden keine personenbezogenen Daten ohne Einwilligung weitergegeben.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">2. Verantwortliche Stelle</h2>
            <p className="text-slate-500 italic">[Verantwortliche Person und Kontaktdaten eintragen]</p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">3. Cookies</h2>
            <p>
              Diese Website verwendet keine Tracking-Cookies. Es werden ausschließlich technisch
              notwendige Daten verarbeitet.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">4. Hosting</h2>
            <p>
              Diese Website wird über Vercel gehostet. Die Datenschutzerklärung von Vercel findest
              du unter{" "}
              <span className="text-blue-600">vercel.com/legal/privacy-policy</span>.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">5. Datenbank</h2>
            <p>
              Produktdaten werden über Supabase (supabase.com) gespeichert. Es werden keine
              personenbezogenen Daten in der Datenbank gespeichert.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">6. Affiliate-Links</h2>
            <p>
              Diese Website enthält Affiliate-Links zu Drittanbietern. Beim Klick auf diese Links
              können die jeweiligen Anbieter Cookies setzen. Bitte beachte die
              Datenschutzerklärungen der jeweiligen Anbieter.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-slate-900 mb-2">7. Deine Rechte</h2>
            <p>
              Du hast das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der
              Verarbeitung deiner personenbezogenen Daten. Kontaktiere uns dafür über die im
              Impressum angegebene Adresse.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
