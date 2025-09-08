import React from 'react';

interface SocialProofStripProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    main: "Bereits hunderte junge Menschen in Deutschland, Österreich und der Schweiz haben diesen Skill erlernt – und ihr Leben verändert.",
    testimonial: {
      text: "Innerhalb von 3 Monaten konnte ich meinen Job kündigen und arbeite jetzt flexibel von überall.",
      name: "Sarah",
      location: "München"
    },
    disclaimer: "Ergebnisse variieren. Einsatz ist nötig."
  },
  en: {
    main: "Hundreds of young people in Germany, Austria and Switzerland have already learned this skill – and changed their lives.",
    testimonial: {
      text: "Within 3 months I was able to quit my job and now work flexibly from anywhere.",
      name: "Sarah",
      location: "Munich"
    },
    disclaimer: "Results vary. Commitment is necessary."
  }
};

export const SocialProofStrip: React.FC<SocialProofStripProps> = ({ language }) => {
  const texts = content[language];

  return (
    <section className="trust-strip">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Social Proof Statement */}
          <p className="body-large mb-8 font-semibold text-neutral-700">
            {texts.main}
          </p>

          {/* Testimonial Card */}
          <div className="social-proof-card max-w-2xl mx-auto mb-6">
            <blockquote className="body-medium italic mb-4 text-neutral-600">
              "{texts.testimonial.text}"
            </blockquote>
            <cite className="font-semibold text-trust-primary">
              — {texts.testimonial.name}, {texts.testimonial.location}
            </cite>
          </div>

          {/* Trust Video Preview (Placeholder for mentor clip) */}
          <div className="max-w-md mx-auto mb-4">
            <div className="video-container aspect-video bg-neutral-100 rounded-xl flex items-center justify-center">
              <div className="text-center">
                <div className="w-16 h-16 bg-trust-primary rounded-full flex items-center justify-center mb-3 mx-auto">
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
                <p className="body-small text-neutral-600">
                  {language === 'de' ? 'Vertrauens-Video' : 'Trust Video'}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="body-small text-neutral-500 italic">
            {texts.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};