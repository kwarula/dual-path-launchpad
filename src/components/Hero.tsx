import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import heroBackground from '@/assets/hero-new.jpg';

interface HeroProps {
  variant: 'A' | 'B';
  language: 'de' | 'en';
}

const heroContent = {
  A: {
    de: {
      headline: "🚀 Dein Weg in eine erfolgreiche Karriere im Vertrieb",
      subhead: "Stell dir vor: Du arbeitest Woche für Woche hart. 40 Stunden, manchmal mehr. Und trotzdem bleibt am Ende des Monats kaum etwas übrig. Keine Freiheit, keine Perspektive – nur das Gefühl, im Kreis zu laufen.",
      primaryCta: "Kostenloses Erstgespräch sichern",
      secondaryCta: "Mehr erfahren",
      videoCaption: "Neue Karrierewege entdecken"
    },
    en: {
      headline: "🚀 Your Path to a Successful Career in Sales",
      subhead: "Imagine working hard week after week. 40 hours, sometimes more. And yet, at the end of the month, there's hardly anything left. No freedom, no perspective – just the feeling of running in circles.",
      primaryCta: "Secure Free Consultation",
      secondaryCta: "Learn More",
      videoCaption: "Discover new career paths"
    }
  },
  B: {
    de: {
      headline: "🚀 Dein Weg in eine erfolgreiche Karriere im Vertrieb",
      subhead: "Stell dir vor: Du arbeitest Woche für Woche hart. 40 Stunden, manchmal mehr. Und trotzdem bleibt am Ende des Monats kaum etwas übrig. Keine Freiheit, keine Perspektive – nur das Gefühl, im Kreis zu laufen.",
      primaryCta: "Kostenloses Erstgespräch sichern",
      secondaryCta: "Mehr erfahren",
      videoCaption: "Weg aus dem Mindestlohn"
    },
    en: {
      headline: "🚀 Your Path to a Successful Career in Sales",
      subhead: "Imagine working hard week after week. 40 hours, sometimes more. And yet, at the end of the month, there's hardly anything left. No freedom, no perspective – just the feeling of running in circles.",
      primaryCta: "Secure Free Consultation",
      secondaryCta: "Learn More",
      videoCaption: "Escape low wages"
    }
  }
};

export const Hero: React.FC<HeroProps> = ({ variant, language }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const content = heroContent[variant][language];

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBackground})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Headlines */}
          <h1 className="hero-headline mb-6 text-white">
            {content.headline}
          </h1>
          
          <p className="hero-subhead mb-8 text-white/90 max-w-3xl mx-auto">
            {content.subhead}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button variant="cta" size="xl" className="w-full sm:w-auto sm:min-w-[240px] max-w-[320px]">
                  {content.primaryCta}
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
              onClick={scrollToHowItWorks}
              className="w-full sm:w-auto sm:min-w-[180px] max-w-[240px] border-white/30 text-white hover:bg-white/10"
            >
              {content.secondaryCta}
            </Button>
          </div>

          {/* Trust Microcopy */}
          <p className="text-sm text-white/80">
            {language === 'de' 
              ? "Keine versteckten Kosten. Kostenloses Erstgespräch."
              : "No hidden costs. Free initial consultation."
            }
          </p>
        </div>
      </div>
    </section>
  );
};