import React from 'react';
import trainingImg from '@/assets/training-scene.jpg';

interface ProductDetailsSectionProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    title: "Meine Mission",
    subtitle: "Ich habe selbst erlebt, wie befreiend es ist, Verkaufen zu können. Es geht nicht nur ums Geld – es geht darum, zu wissen, dass man unabhängig ist. Dass man nicht mehr auf „Glück“ im Job hoffen muss, sondern einen Skill hat, der überall gebraucht wird. Heute begleite ich Menschen wie dich dabei, diese Fähigkeit Schritt für Schritt aufzubauen. Kein Frontalunterricht. Keine graue Theorie. Sondern echtes, praxisnahes Coaching, das sich an deinem Alltag orientiert.",
    features: [
      {
        title: "Persönliche Begleitung",
        description: "Wir sprechen individuell über deine Situation und passen das Coaching darauf an.",
        icon: "👉"
      },
      {
        title: "Praxisnah statt Theorie",
        description: "Alles, was du lernst, kannst du sofort anwenden.",
        icon: "👉"
      },
      {
        title: "Flexibel",
        description: "Du entscheidest, wann und wo du lernst.",
        icon: "👉"
      },
      {
        title: "Community",
        description: "Austausch mit Menschen, die den gleichen Weg gehen.",
        icon: "👉"
      }
    ],
  },
  en: {
    title: "My Mission",
    subtitle: "I have experienced for myself how liberating it is to be able to sell. It's not just about money – it's about knowing that you are independent. That you no longer have to hope for 'luck' in your job, but have a skill that is needed everywhere. Today, I support people like you in building this ability step by step. No lectures. No gray theory. But real, practical coaching that is geared to your everyday life.",
    features: [
      {
        title: "Personal Support",
        description: "We talk individually about your situation and adapt the coaching accordingly.",
        icon: "👉"
      },
      {
        title: "Practical instead of theory",
        description: "Everything you learn, you can apply immediately.",
        icon: "👉"
      },
      {
        title: "Flexible",
        description: "You decide when and where you learn.",
        icon: "👉"
      },
      {
        title: "Community",
        description: "Exchange with people who are on the same path.",
        icon: "👉"
      }
    ]
  }
};

export const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({ language }) => {
  const texts = content[language];

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="section-headline mb-6 text-neutral-900">
              {texts.title}
            </h2>
            <p className="body-large text-neutral-600 max-w-3xl mx-auto mb-8">
              {texts.subtitle}
            </p>
            <div className="max-w-2xl mx-auto rounded-xl overflow-hidden">
              <img 
                src={trainingImg} 
                alt="Sales Training Session"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {texts.features.map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-neutral-200">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="font-bold text-lg mb-3 text-neutral-900">
                  {feature.title}
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};