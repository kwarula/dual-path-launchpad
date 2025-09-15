import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Impressum = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-neutral-50 font-primary text-neutral-800">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-trust-primary cursor-pointer" onClick={() => navigate('/')}>
            Digital Sales Coaching
          </h1>
          <Button onClick={() => navigate('/')}>
            Zurück zur Hauptseite
          </Button>
        </div>
      </header>

      <main className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white p-8 md:p-12 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-8 border-b pb-4">Impressum</h2>

            <div className="space-y-6 prose prose-lg max-w-none">
              <p>Angaben gemäß § 5 TMG</p>
              <p>
                Elb Fusion Web & Trade GBR<br />
                Heinrich-Hertz-Str 141<br />
                22083 Hamburg<br />
                Deutschland
              </p>

              <p>
                <a href="https://elbfusiondigital.de" target="_blank" rel="noopener noreferrer" className="text-trust-primary hover:underline">
                  https://elbfusiondigital.de
                </a>
              </p>

              <p>
                Mail:<br />
                info@elbclosing.de
              </p>

              <p>
                Vertretungsberechtigter Geschäftsführer:<br />
                Alan Zimmermann
              </p>

              <p>
                Registergericht:<br />
                Amtsgericht Hamburg
              </p>

              <p>
                Umsatzsteuer-Identifikationsnummer(n):<br />
                DE359609353
              </p>

              <h3 className="text-2xl font-bold mt-12 mb-6">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h3>
              <p>
                Alan Zimmermann<br />
                Heinrich-Hertz-Str. 141<br />
                22083 Hamburg
              </p>

              <h3 className="text-2xl font-bold mt-12 mb-6">Foto & Film Credits</h3>
              <p>
                Elb Fusion<br />
                iStock<br />
                Fotolia
              </p>

              <h3 className="text-2xl font-bold mt-12 mb-6">Hinweis auf EU-Streitschlichtung</h3>
              <p>
                Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="http://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-trust-primary hover:underline">http://ec.europa.eu/consumers/odr</a>
              </p>

              <h3 className="text-2xl font-bold mt-12 mb-6">Haftung für Inhalte</h3>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>

              <h3 className="text-2xl font-bold mt-12 mb-6">Haftung für Links</h3>
              <p>
                Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>

              <h3 className="text-2xl font-bold mt-12 mb-6">Urheberrecht</h3>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Impressum;
