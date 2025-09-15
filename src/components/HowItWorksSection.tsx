import React from 'react';

interface HowItWorksSectionProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    title: "Dein möglicher Weg",
    steps: [
      {
        title: "Erstgespräch (kostenlos & unverbindlich)",
        description: "Wir sprechen über deine aktuelle Situation und deine Ziele."
      },
      {
        title: "Entscheidung",
        description: "Gemeinsam klären wir, ob und wie wir dich begleiten können."
      },
      {
        title: "Begleitung starten",
        description: "Du lernst Schritt für Schritt, wie Verkauf funktioniert – mit Praxis, Feedback und Austausch."
      }
    ]
  },
  en: {
    title: "Your Possible Path",
    steps: [
      {
        title: "Initial Consultation (free & non-binding)",
        description: "We talk about your current situation and your goals."
      },
      {
        title: "Decision",
        description: "Together we clarify if and how we can support you."
      },
      {
        title: "Start Coaching",
        description: "You will learn step by step how sales works – with practice, feedback and exchange."
      }
    ]
  }
};

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ language }) => {
  const texts = content[language];

  return (
    <section id="how-it-works" className="py-16 md:py-24 bg-gradient-trust">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="section-headline mb-6 text-neutral-900">
              {texts.title}
            </h2>
            <p className="body-large text-neutral-600 max-w-2xl mx-auto">
              {language === 'de' 
                ? "Drei einfache Schritte zu deiner neuen Zukunft"
                : "Three simple steps to your new future"
              }
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {texts.steps.map((step, index) => (
              <div key={index} className="step-card">
                <div className="step-number">
                  {index + 1}
                </div>
                <h3 className="font-bold text-xl mb-4 text-neutral-900 mt-4">
                  {step.title}
                </h3>
                <p className="body-medium text-neutral-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};