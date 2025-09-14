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

const VariantA: React.FC = () => {
  const [language, setLanguage] = useState<'de' | 'en'>('de');

  useEffect(() => {
    // Set page metadata
    document.title = language === 'de' 
      ? "Bist du bereit, dein 9–5 hinter dir zu lassen? | Sales Coaching"
      : "Ready to leave your 9-5 behind? | Sales Coaching";
    
    document.querySelector('meta[name="description"]')?.setAttribute('content', 
      language === 'de'
        ? "Lerne eine Fähigkeit, die dir neue Karrierechancen und echte Freiheit bringt – egal ob Zeit oder Ort. Kostenloses Erstgespräch sichern."
        : "Learn a skill that brings you new career opportunities and real freedom – regardless of time or place. Secure free consultation."
    );

    document.documentElement.lang = language;

    // Track page view
    if (typeof window !== 'undefined') {
      // Meta Pixel
      if (window.fbq) {
        window.fbq('track', 'PageView', {
          content_name: 'Landing Page Variant A',
          content_category: 'Sales Coaching'
        });
      }

      // TikTok Pixel
      if (window.ttq) {
        window.ttq.track('ViewContent', {
          content_type: 'landing_page',
          content_id: 'variant_a'
        });
      }

      // GA4
      if (window.gtag) {
        window.gtag('event', 'page_view', {
          page_title: 'Landing Page Variant A',
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
      <Hero variant="A" language={language} />
      
      {/* Social Proof Strip */}
      <SocialProofStrip language={language} />
      
      {/* Pain Points Section */}
      <PainPointsSection variant="A" language={language} />
      
      {/* Product Details Section */}
      <ProductDetailsSection language={language} />
      
      {/* How It Works Section */}
      <HowItWorksSection language={language} />
      
      {/* BOFU Close Section */}
      <BOFUSection variant="A" language={language} />
      
      {/* FAQ Section */}
      <FAQSection language={language} />
      
      {/* Footer */}
      <Footer language={language} onLanguageChange={handleLanguageChange} />
      
      {/* Sticky CTA Bar (Mobile) */}
      <StickyCtaBar variant="A" language={language} />
      
      {/* Cookie Consent */}
      <CookieConsent language={language} />
    </div>
  );
};

export default VariantA;