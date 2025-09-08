import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { LeadForm } from '@/components/LeadForm';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface StickyCtaBarProps {
  variant: 'A' | 'B';
  language: 'de' | 'en';
}

const content = {
  de: {
    cta: {
      A: "Kostenloses Gespräch",
      B: "Kostenlos starten"
    }
  },
  en: {
    cta: {
      A: "Free Consultation",
      B: "Start Free"
    }
  }
};

export const StickyCtaBar: React.FC<StickyCtaBarProps> = ({ variant, language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  
  const texts = content[language];

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after user scrolls past hero section
      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY > heroHeight * 0.5;
      setIsVisible(scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="sticky-cta">
      <div className="container mx-auto px-4">
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="cta" 
              size="lg" 
              className="w-full max-w-sm mx-auto block"
            >
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
      </div>
    </div>
  );
};