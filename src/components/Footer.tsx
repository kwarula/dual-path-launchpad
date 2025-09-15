import React from 'react';

interface FooterProps {
  language: 'de' | 'en';
  onLanguageChange: (lang: 'de' | 'en') => void;
}

const content = {
  de: {
    company: "K2K Consulting UG",
    contact: "Kontakt",
    email: "info@k2k-consulting.de",
    address: "Süderbrokerstr 16, 28259 Bremen",
    legal: "Rechtliches",
    privacy: "Datenschutzerklärung",
    imprint: "Impressum",
    terms: "AGB",
    gdprStatement: "Deine Daten sind bei uns sicher. Keine Weitergabe an Dritte. Du kannst jederzeit Löschung oder Auskunft verlangen.",
    dataProtectionOfficer: "Datenschutzbeauftragter: privacy@k2k-consulting.de",
    languageSwitch: "Sprache: Deutsch"
  },
  en: {
    company: "K2K Consulting UG", 
    contact: "Contact",
    email: "info@k2k-consulting.de",
    address: "Süderbrokerstr 16, 28259 Bremen",
    legal: "Legal",
    privacy: "Privacy Policy",
    imprint: "Imprint",
    terms: "Terms",
    gdprStatement: "Your data is secure with us. No sharing with third parties. You can request deletion or information at any time.",
    dataProtectionOfficer: "Data Protection Officer: privacy@k2k-consulting.de",
    languageSwitch: "Language: English"
  }
};

export const Footer: React.FC<FooterProps> = ({ language, onLanguageChange }) => {
  const texts = content[language];

  return (
    <footer className="bg-neutral-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-bold text-lg mb-4 text-white">
              {texts.company}
            </h3>
            <p className="text-neutral-300 mb-4">
              {language === 'de' 
                ? "Professionelles Sales Training für den DACH-Raum"
                : "Professional Sales Training for the DACH Region"
              }
            </p>
            <div className="flex space-x-4">
              <button
                onClick={() => onLanguageChange(language === 'de' ? 'en' : 'de')}
                className="text-cta-accent hover:text-cta-accent-light transition-colors"
              >
                {language === 'de' ? '🇬🇧 EN' : '🇩🇪 DE'}
              </button>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              {texts.contact}
            </h4>
            <div className="space-y-2 text-neutral-300">
              <p>
                <a href={`mailto:${texts.email}`} className="hover:text-cta-accent transition-colors">
                  {texts.email}
                </a>
              </p>
              <p className="text-sm">
                {texts.address}
              </p>
            </div>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              {texts.legal}
            </h4>
            <div className="space-y-2">
              <p>
                <a href="/datenschutz" className="text-neutral-300 hover:text-cta-accent transition-colors">
                  {texts.privacy}
                </a>
              </p>
              <p>
                <a href="/impressum" className="text-neutral-300 hover:text-cta-accent transition-colors">
                  {texts.imprint}
                </a>
              </p>
              <p>
                <a href="/agb" className="text-neutral-300 hover:text-cta-accent transition-colors">
                  {texts.terms}
                </a>
              </p>
            </div>
          </div>

          {/* GDPR Info */}
          <div>
            <h4 className="font-semibold mb-4 text-white">
              {language === 'de' ? 'Datenschutz' : 'Privacy'}
            </h4>
            <p className="text-sm text-neutral-400 leading-relaxed mb-3">
              {texts.gdprStatement}
            </p>
            <p className="text-xs text-neutral-500">
              {texts.dataProtectionOfficer}
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-neutral-800 mt-8 pt-8 text-center">
          <p className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} {texts.company}. {language === 'de' ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};