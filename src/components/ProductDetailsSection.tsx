import React from 'react';
import trainingImg from '@/assets/training-scene.jpg';

interface ProductDetailsSectionProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    title: "Das Sales Coaching Programm",
    subtitle: "Strukturiertes Training für deinen Erfolg im Vertrieb",
    features: [
      {
        title: "Praxisorientierte Module",
        description: "Lerne die wichtigsten Verkaufstechniken in strukturierten Einheiten, die du sofort anwenden kannst.",
        icon: "📚"
      },
      {
        title: "1:1 Mentoring",
        description: "Persönliche Betreuung durch erfahrene Sales-Profis, die dir bei deinen individuellen Herausforderungen helfen.",
        icon: "👥"
      },
      {
        title: "Flexibles Lernen",
        description: "Online-Training, das sich deinem Zeitplan anpasst. Lerne wann und wo es für dich passt.",
        icon: "⏰"
      },
      {
        title: "Praktische Tools",
        description: "Bewährte Skripte, Templates und Techniken, die du direkt in deinem Job einsetzen kannst.",
        icon: "🛠️"
      },
      {
        title: "Community Support",
        description: "Vernetze dich mit anderen Teilnehmern und profitiere vom Austausch mit Gleichgesinnten.",
        icon: "🤝"
      },
      {
        title: "Zertifizierung",
        description: "Erhalte ein anerkanntes Zertifikat, das deine erworbenen Sales-Kompetenzen bestätigt.",
        icon: "🏆"
      }
    ],
    learningPath: {
      title: "Dein Lernweg",
      steps: [
        "Grundlagen des professionellen Verkaufens",
        "Kundenpsychologie und Bedarfsanalyse", 
        "Gesprächsführung und Präsentationstechniken",
        "Einwandbehandlung und Abschlusstechniken",
        "Digitale Sales-Tools und CRM-Systeme",
        "Langfristige Kundenbeziehungen aufbauen"
      ]
    },
    guarantee: {
      title: "Unsere Garantie",
      text: "Falls du nach 30 Tagen nicht zufrieden bist, erhältst du dein Geld zurück. Wir sind überzeugt von der Qualität unseres Programms."
    }
  },
  en: {
    title: "The Sales Coaching Program",
    subtitle: "Structured training for your success in sales",
    features: [
      {
        title: "Practice-Oriented Modules", 
        description: "Learn the most important sales techniques in structured units that you can apply immediately.",
        icon: "📚"
      },
      {
        title: "1:1 Mentoring",
        description: "Personal support from experienced sales professionals who help you with your individual challenges.",
        icon: "👥"
      },
      {
        title: "Flexible Learning",
        description: "Online training that adapts to your schedule. Learn when and where it suits you.",
        icon: "⏰"
      },
      {
        title: "Practical Tools",
        description: "Proven scripts, templates and techniques that you can use directly in your job.",
        icon: "🛠️"
      },
      {
        title: "Community Support",
        description: "Network with other participants and benefit from exchange with like-minded people.",
        icon: "🤝"
      },
      {
        title: "Certification",
        description: "Receive a recognized certificate that confirms your acquired sales skills.",
        icon: "🏆"
      }
    ],
    learningPath: {
      title: "Your Learning Path",
      steps: [
        "Fundamentals of professional selling",
        "Customer psychology and needs analysis",
        "Conversation management and presentation techniques", 
        "Objection handling and closing techniques",
        "Digital sales tools and CRM systems",
        "Building long-term customer relationships"
      ]
    },
    guarantee: {
      title: "Our Guarantee",
      text: "If you're not satisfied after 30 days, you get your money back. We are convinced of the quality of our program."
    }
  }
};

export const ProductDetailsSection: React.FC<ProductDetailsSectionProps> = ({ language }) => {
  const texts = content[language];

  return (
    <section className="py-16 md:py-24 bg-neutral-50">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
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

          {/* Learning Path */}
          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-neutral-200 mb-12">
            <h3 className="text-2xl font-bold mb-8 text-center text-neutral-900">
              {texts.learningPath.title}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {texts.learningPath.steps.map((step, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-trust-primary text-white rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                    {index + 1}
                  </div>
                  <p className="text-neutral-700 leading-relaxed">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Guarantee */}
          <div className="bg-gradient-to-r from-trust-primary/5 to-cta-accent/5 rounded-2xl p-8 text-center border border-trust-primary/20">
            <h3 className="text-xl font-bold mb-4 text-trust-primary">
              {texts.guarantee.title}
            </h3>
            <p className="text-neutral-700 max-w-2xl mx-auto">
              {texts.guarantee.text}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};