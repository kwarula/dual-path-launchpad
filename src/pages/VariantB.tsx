import React, { useState, useEffect } from 'react';
import { Hero } from '@/components/Hero';
import { SocialProofStrip } from '@/components/SocialProofStrip';
import { PainPointsSection } from '@/components/PainPointsSection';
import { ProductDetailsSection } from '@/components/ProductDetailsSection';
import { HowItWorksSection } from '@/components/HowItWorksSection';
import { BOFUSection } from '@/components/BOFUSection';
import { FAQSection } from '@/components/FAQSection';
import { Footer } from '@/components/Footer';
import { StickyCtaBar } from '@/components/StickyCtaBar';
import { CookieConsent } from '@/components/CookieConsent';

const VariantB: React.FC = () => {
  const [language, setLanguage] = useState<'de' | 'en'>('de');

  useEffect(() => {
    // Set page metadata
    document.title = language === 'de' 
      ? "Reicht es dir, für 1.500 € netto dein Leben zu verschwenden? | Sales Coaching"
      : "Tired of wasting your life for €1,500 net? | Sales Coaching";
    
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      language === 'de'
        ? "Es gibt einen Weg raus. Eine Fähigkeit, die dich aus dem Niedriglohn rausführt – und neue Türen öffnet. Jetzt kostenlos starten."
        : "There's a way out. A skill that leads you out of low wages – and opens new doors. Start free now."
    );

    document.documentElement.lang = language;

    // Track page view
    if (typeof window !== 'undefined') {
      // Meta Pixel
      if (window.fbq) {
        window.fbq('track', 'PageView', {
          content_name: 'Landing Page Variant B',
          content_category: 'Sales Coaching'
        });
      }

      // TikTok Pixel
      if (window.ttq) {
        window.ttq.track('ViewContent', {
          content_type: 'landing_page',
          content_id: 'variant_b'
        });
      }

      // GA4
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'Landing Page Variant B',
          page_location: window.location.href,
          content_group: 'Sales Coaching Landing'
        });
      }
    }
  }, [language]);

  const handleLanguageChange = (newLanguage: 'de' | 'en') => {
    setLanguage(newLanguage);
  };

  return (
    <div className="min-h-screen bg-white font-primary">
      {/* Hero Section */}
      <Hero variant="B" language={language} />
      
      {/* Social Proof Strip */}
      <SocialProofStrip language={language} />
      
      {/* Pain Points Section */}
      <PainPointsSection variant="B" language={language} />
      
      {/* Product Details Section */}
      <ProductDetailsSection language={language} />
      
      {/* How It Works Section */}
      <HowItWorksSection language={language} />
      
      {/* BOFU Close Section */}
      <BOFUSection variant="B" language={language} />
      
      {/* FAQ Section */}
      <FAQSection language={language} />
      
      {/* Footer */}
      <Footer language={language} onLanguageChange={handleLanguageChange} />
      
      {/* Sticky CTA Bar (Mobile) */}
      <StickyCtaBar variant="B" language={language} />
      
      {/* Cookie Consent */}
      <CookieConsent language={language} />
    </div>
  );
};

export default VariantB;