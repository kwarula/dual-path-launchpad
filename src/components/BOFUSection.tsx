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
    title: "Bereit für den nächsten Schritt?",
    subtitle: "Sichere dir jetzt dein kostenloses Erstgespräch und erfahre, wie auch du diesen Skill lernen kannst.",
    cta: {
      A: "Kostenloses Gespräch sichern",
      B: "Jetzt kostenlos starten"
    },
    calendar: "📅 Verfügbare Termine anzeigen",
    urgency: "⏰ Nur noch wenige Plätze für diese Woche verfügbar"
  },
  en: {
    title: "Ready for the next step?",
    subtitle: "Secure your free initial consultation now and find out how you too can learn this skill.",
    cta: {
      A: "Secure Free Consultation",
      B: "Start Free Now"
    },
    calendar: "📅 Show available appointments",
    urgency: "⏰ Only a few spots left for this week"
  }
};

export const BOFUSection: React.FC<BOFUSectionProps> = ({ variant, language }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const texts = content[language];

  return (
    <section className="py-20 bg-gradient-to-br from-trust-primary to-trust-primary-dark text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Aspirational Video Background */}
          <div className="mb-12">
            <div className="max-w-sm mx-auto">
              <div className="video-container aspect-[9/16] bg-black/20 border border-white/20 rounded-xl overflow-hidden relative">
                <video
                  src="https://res.cloudinary.com/doprdld4l/video/upload/v1757339756/WhatsApp_Video_2025-09-04_at_08.36.58_v82yrw.mp4"
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onMouseEnter={(e) => e.currentTarget.play()}
                  onMouseLeave={(e) => e.currentTarget.pause()}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-3 left-3 right-3">
                  <p className="text-xs text-white font-medium drop-shadow-lg text-center">
                    {language === 'de' ? 'Individuelle Ergebnisse können stark variieren' : 'Individual results may vary significantly'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Headlines */}
          <h2 className="section-headline mb-6 text-white">
            {texts.title}
          </h2>
          
          <p className="body-large mb-8 text-white/90 max-w-2xl mx-auto">
            {texts.subtitle}
          </p>

          {/* Urgency Indicator */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-cta-accent/20 border border-cta-accent/30 rounded-full px-4 py-2">
              <span className="text-cta-accent-light font-medium">
                {texts.urgency}
              </span>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
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