import React from 'react';
import sarahImg from '@/assets/testimonial-sarah-new.jpg';
import marcusImg from '@/assets/testimonial-marcus-new.jpg';

interface SocialProofStripProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    main: "Stimmen aus dem Coaching",
    testimonials: [
      {
        text: "Ich hätte nie gedacht, dass ich mal gerne im Vertrieb arbeite. Nach dem Coaching habe ich mein Einkommen in 6 Monaten um 40 % gesteigert – und das ohne Vorerfahrung.",
        name: "Sarah M.",
        location: "München",
        role: "Account Managerin",
        image: sarahImg
      },
      {
        text: "Vorher war ich arbeitslos. Heute habe ich einen Job im Vertrieb, der mir wirklich liegt. Das Coaching hat mir Struktur gegeben und gezeigt, wie ich meine Stärken einsetzen kann.",
        name: "Marcus L.",
        location: "Hamburg", 
        role: "Sales Representative",
        image: marcusImg
      }
    ]
  },
  en: {
    main: "Voices from the Coaching",
    testimonials: [
      {
        text: "I never thought I would enjoy working in sales. After the coaching, I increased my income by 40% in 6 months – with no prior experience.",
        name: "Sarah M.",
        location: "Munich",
        role: "Account Manager",
        image: sarahImg
      },
      {
        text: "Before, I was unemployed. Today I have a job in sales that I really like. The coaching gave me structure and showed me how to use my strengths.",
        name: "Marcus L.",
        location: "Hamburg",
        role: "Sales Representative", 
        image: marcusImg
      }
    ]
  }
};

export const SocialProofStrip: React.FC<SocialProofStripProps> = ({ language }) => {
  const texts = content[language];

  return (
    <section className="trust-strip py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Social Proof Statement */}
          <h2 className="section-headline mb-12 text-neutral-900">
            {texts.main}
          </h2>

          {/* Testimonials Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {texts.testimonials.map((testimonial, index) => (
              <div key={index} className="social-proof-card">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full overflow-hidden mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={`${testimonial.name} - Testimonial`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <blockquote className="body-medium italic mb-4 text-neutral-600 max-w-md">
                    "{testimonial.text}"
                  </blockquote>
                  <cite className="font-semibold text-trust-primary">
                    — {testimonial.name}, {testimonial.location}
                  </cite>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};