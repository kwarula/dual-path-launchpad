import React from 'react';

interface HowItWorksSectionProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    title: "So funktioniert's",
    steps: [
      {
        title: "Kostenloses Erstgespräch sichern",
        description: "In einem unverbindlichen Gespräch lernen wir uns kennen und besprechen deine Situation."
      },
      {
        title: "Gemeinsam prüfen, ob das Modell zu dir passt",
        description: "Wir schauen ehrlich, ob unser Programm zu deinen Zielen und deiner Lebenssituation passt."
      },
      {
        title: "Skill lernen – und neue Chancen eröffnen",
        description: "Mit strukturiertem Training und persönlicher Betreuung entwickelst du die Fähigkeiten für deine neue Zukunft."
      }
    ]
  },
  en: {
    title: "How It Works",
    steps: [
      {
        title: "Secure Free Initial Consultation",
        description: "In a non-binding conversation, we get to know each other and discuss your situation."
      },
      {
        title: "Together Check If The Model Fits You",
        description: "We honestly look at whether our program fits your goals and life situation."
      },
      {
        title: "Learn Skill – And Open New Opportunities",
        description: "With structured training and personal support, you develop the skills for your new future."
      }
    ]
  }
};

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({ language }) => {
  const texts = content[language];

  return (
    <section id="how-it-works" className="py-20 bg-gradient-trust">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
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
          <div className="grid md:grid-cols-3 gap-8">
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

          {/* Arrow Connectors (Desktop) */}
          <div className="hidden md:flex justify-center items-center mt-8 -mb-8">
            <div className="flex items-center space-x-8">
              <div className="w-16 h-0.5 bg-cta-accent"></div>
              <svg className="w-6 h-6 text-cta-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
              <div className="w-16 h-0.5 bg-cta-accent"></div>
              <svg className="w-6 h-6 text-cta-accent" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/>
              </svg>
              <div className="w-16 h-0.5 bg-cta-accent"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};