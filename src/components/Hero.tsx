import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import video3 from '@/assets/video-3.mp4';
import video4 from '@/assets/video-4.mp4';

interface HeroProps {
  variant: 'A' | 'B';
  language: 'de' | 'en';
}

const heroContent = {
  A: {
    de: {
      headline: "Bist du bereit, dein 9–5 hinter dir zu lassen?",
      subhead: "Lerne eine Fähigkeit, die dir neue Karrierechancen und echte Freiheit bringt – egal ob Zeit oder Ort.",
      primaryCta: "Kostenloses Erstgespräch sichern",
      secondaryCta: "Mehr erfahren",
      videoCaption: "Neue Karrierewege entdecken"
    },
    en: {
      headline: "Ready to leave your 9-5 behind?",
      subhead: "Learn a skill that brings you new career opportunities and real freedom – regardless of time or place.",
      primaryCta: "Secure Free Consultation",
      secondaryCta: "Learn More",
      videoCaption: "Discover new career paths"
    }
  },
  B: {
    de: {
      headline: "Reicht es dir, für 1.500 € netto dein Leben zu verschwenden?",
      subhead: "Es gibt einen Weg raus. Eine Fähigkeit, die dich aus dem Niedriglohn rausführt – und neue Türen öffnet.",
      primaryCta: "Jetzt kostenlos starten",
      secondaryCta: "Mehr erfahren",
      videoCaption: "Weg aus dem Niedriglohn"
    },
    en: {
      headline: "Tired of wasting your life for €1,500 net?",
      subhead: "There's a way out. A skill that leads you out of low wages – and opens new doors.",
      primaryCta: "Start Free Now",
      secondaryCta: "Learn More",
      videoCaption: "Escape low wages"
    }
  }
};

export const Hero: React.FC<HeroProps> = ({ variant, language }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const content = heroContent[variant][language];
  
  // Video URLs - using Cloudinary direct URLs for larger files and local for smaller
  const heroVideo = variant === 'A' 
    ? 'https://res.cloudinary.com/doprdld4l/video/upload/v1757339770/WhatsApp_Video_2025-09-04_at_08.39.13_lkboa5.mp4'
    : 'https://res.cloudinary.com/doprdld4l/video/upload/v1757339769/WhatsApp_Video_2025-09-04_at_08.39.01_ep8ywz.mp4';

  const scrollToHowItWorks = () => {
    const element = document.getElementById('how-it-works');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video with Overlay */}
      <div className="absolute inset-0 z-0">
        <video
          src={heroVideo}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
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
                <Button variant="cta" size="xl" className="min-w-[280px]">
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
              className="min-w-[200px] border-white/30 text-white hover:bg-white/10"
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

      {/* Video Caption Overlay */}
      <div className="absolute bottom-8 left-8 right-8 z-20">
        <div className="text-center">
          <p className="text-white font-semibold text-lg drop-shadow-lg">
            {content.videoCaption}
          </p>
        </div>
      </div>
    </section>
  );
};