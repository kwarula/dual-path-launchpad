import React from 'react';

interface PainPointsSectionProps {
  variant: 'A' | 'B';
  language: 'de' | 'en';
}

const painContent = {
  A: {
    de: {
      points: [
        "40–50 Stunden arbeiten, nur um 1.500 € netto zu verdienen",
        "Kein Raum für deine eigenen Träume",
        "Abhängig vom Chef und seinen Launen"
      ],
      transition: "Es gibt einen anderen Weg – mit einem Skill, der gefragt ist und dir Kontrolle über deine Zukunft gibt."
    },
    en: {
      points: [
        "Work 40–50 hours just to earn €1,500 net",
        "No room for your own dreams",
        "Dependent on your boss and their moods"
      ],
      transition: "There's another way – with a skill that's in demand and gives you control over your future."
    }
  },
  B: {
    de: {
      points: [
        "40–50 Stunden Arbeit für einen Hungerlohn",
        "Keine Perspektive, keine Freiheit",
        "Frust statt Zukunft"
      ],
      transition: "Mit einem Skill kannst du sofort einen neuen Weg einschlagen – und dein Leben in Bewegung bringen."
    },
    en: {
      points: [
        "40–50 hours of work for starvation wages",
        "No perspective, no freedom",
        "Frustration instead of future"
      ],
      transition: "With a skill you can immediately take a new path – and get your life moving."
    }
  }
};

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({ variant, language }) => {
  const content = painContent[variant][language];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Pain Points */}
          <div className="mb-12">
            <h2 className="section-headline text-center mb-10 text-neutral-900">
              {language === 'de' 
                ? (variant === 'A' ? 'Kennst du das Gefühl?' : 'Reicht es dir nicht auch?')
                : (variant === 'A' ? 'Do you know that feeling?' : 'Aren\'t you tired of it too?')
              }
            </h2>
            
            <ul className="pain-list max-w-2xl mx-auto">
              {content.points.map((point, index) => (
                <li key={index}>{point}</li>
              ))}
            </ul>
          </div>

          {/* Transition Statement */}
          <div className="text-center">
            <div className="inline-block bg-gradient-to-r from-trust-primary/10 to-cta-accent/10 rounded-2xl p-8">
              <p className="body-large font-semibold text-trust-primary max-w-3xl">
                {content.transition}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};