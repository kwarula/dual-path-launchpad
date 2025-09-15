import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface BOFUSectionProps {
  variant: 'A' | 'B';
  language: 'de' | 'en';
}

const content = {
  de: {
    title: "Bereit für den ersten Schritt?",
    subtitle: "👉 Sichere dir jetzt ein kostenloses Erstgespräch.\n👉 15 Minuten, die dir Klarheit geben können.\n👉 100 % unverbindlich.",
    cta: {
      A: "Sichere dir jetzt ein kostenloses Erstgespräch",
      B: "Sichere dir jetzt ein kostenloses Erstgespräch"
    },
    calendar: "📅 Hier Termin auswählen"
  },
  en: {
    title: "Ready for the first step?",
    subtitle: "👉 Secure your free initial consultation now.\n👉 15 minutes that can give you clarity.\n👉 100% non-binding.",
    cta: {
      A: "Secure your free initial consultation now",
      B: "Secure your free initial consultation now"
    },
    calendar: "📅 Select date here"
  }
};

export const BOFUSection: React.FC<BOFUSectionProps> = ({ variant, language }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const texts = content[language];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-br from-trust-primary to-trust-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headlines */}
          <h2 className="section-headline mb-6 text-white">
            {texts.title}
          </h2>
          
          <p className="body-large mb-8 text-white/90 max-w-2xl mx-auto whitespace-pre-line">
            {texts.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button variant="cta" size="xl" className="min-w-[280px]">
                  {texts.cta[variant]}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <LeadForm 
                  variant={variant}
                  language={language}
                  onSuccess={() => setIsFormOpen(false)}
                />
              </DialogContent>
            </Dialog>

            <Button 
              variant="cta-outline" 
              size="xl" 
              className="min-w-[240px] border-white/30 text-white hover:bg-white/10"
            >
              {texts.calendar}
            </Button>
          </div>

          {/* Trust Elements */}
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <p className="font-semibold text-white">
                {language === 'de' ? '100% Datenschutz' : '100% Privacy'}
              </p>
              <p className="text-sm text-white/80">
                {language === 'de' ? 'Deine Daten sind sicher.' : 'Your data is secure.'}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <p className="font-semibold text-white">
                {language === 'de' ? 'Unverbindlich' : 'No Obligation'}
              </p>
              <p className="text-sm text-white/80">
                {language === 'de' ? 'Komplett kostenfrei.' : 'Completely free.'}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              </div>
              <p className="font-semibold text-white">
                {language === 'de' ? '15 Min. Gespräch' : '15 Min. Call'}
              </p>
              <p className="text-sm text-white/80">
                {language === 'de' ? 'Kurz und präzise.' : 'Short and precise.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};