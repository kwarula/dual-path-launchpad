import React from 'react';
import sarahImg from '@/assets/testimonial-sarah.jpg';
import marcusImg from '@/assets/testimonial-marcus.jpg';

interface SocialProofStripProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    main: "Bereits über 200 junge Menschen in Deutschland, Österreich und der Schweiz haben durch professionelle Sales-Skills neue Karrierewege eingeschlagen.",
    testimonials: [
      {
        text: "Nach dem Sales Training konnte ich innerhalb von 6 Monaten mein Einkommen um 40% steigern und arbeite jetzt in einem Bereich, der mir wirklich Spaß macht.",
        name: "Sarah M.",
        location: "München",
        role: "Account Managerin",
        image: sarahImg
      },
      {
        text: "Das strukturierte Sales Coaching hat mir geholfen, aus der Arbeitslosigkeit herauszufinden und eine Position im Vertrieb zu bekommen, wo ich meine Stärken nutzen kann.",
        name: "Marcus L.",
        location: "Hamburg", 
        role: "Sales Representative",
        image: marcusImg
      }
    ],
    disclaimer: "Individuelle Ergebnisse können variieren. Erfolg erfordert Einsatz und kontinuierliches Lernen."
  },
  en: {
    main: "Over 200 young people in Germany, Austria and Switzerland have already embarked on new career paths through professional sales skills.",
    testimonials: [
      {
        text: "After the sales training, I was able to increase my income by 40% within 6 months and now work in a field that I really enjoy.",
        name: "Sarah M.",
        location: "Munich",
        role: "Account Manager",
        image: sarahImg
      },
      {
        text: "The structured sales coaching helped me get out of unemployment and get a position in sales where I can use my strengths.",
        name: "Marcus L.",
        location: "Hamburg",
        role: "Sales Representative", 
        image: marcusImg
      }
    ],
    disclaimer: "Individual results may vary. Success requires effort and continuous learning."
  }
};

export const SocialProofStrip: React.FC<SocialProofStripProps> = ({ language }) => {
  const texts = content[language];

  return (
    <section className="trust-strip py-16 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-5xl mx-auto">
          {/* Main Social Proof Statement */}
          <p className="body-large mb-12 font-semibold text-neutral-700">
            {texts.main}
          </p>

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
                    — {testimonial.name}
                  </cite>
                  <p className="text-sm text-neutral-500">
                    {testimonial.role} • {testimonial.location}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="body-small text-neutral-500 italic max-w-2xl mx-auto">
            {texts.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};