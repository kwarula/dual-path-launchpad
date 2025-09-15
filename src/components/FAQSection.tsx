import React from 'react';

interface FAQSectionProps {
  language: 'de' | 'en';
}

const faqContent = {
  de: {
    title: "Wichtig zu wissen",
    faqs: [
      {
        question: "Was ist das für ein Coaching?",
        answer: "Wir sind kein staatlich anerkanntes Fernstudium. Unser Coaching ist eine praxisorientierte Begleitung, die dir direkt im Alltag weiterhelfen soll. Es geht nicht um Titel oder Diplome – sondern darum, dass du echte Fähigkeiten entwickelst, die dir neue Chancen eröffnen."
      }
    ]
  },
  en: {
    title: "Important to know",
    faqs: [
      {
        question: "What kind of coaching is this?",
        answer: "We are not a state-recognized distance learning program. Our coaching is a practice-oriented support that is intended to help you directly in everyday life. It is not about titles or diplomas - but about developing real skills that open up new opportunities for you."
      }
    ]
  }
};

export const FAQSection: React.FC<FAQSectionProps> = ({ language }) => {
  const content = faqContent[language];

  return (
    <section className="py-16 bg-neutral-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="section-headline mb-6 text-neutral-900">
              {content.title}
            </h2>
            <p className="body-large text-neutral-600">
              {language === 'de' 
                ? "Die wichtigsten Antworten auf einen Blick"
                : "The most important answers at a glance"
              }
            </p>
          </div>

          {/* FAQ Items */}
          <div className="space-y-1">
            {content.faqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3 className="faq-question">
                  {faq.question}
                </h3>
                <p className="faq-answer">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Questions CTA */}
          <div className="text-center mt-12">
            <p className="body-medium text-neutral-600 mb-4">
              {language === 'de' 
                ? "Weitere Fragen? Wir beantworten sie gerne im persönlichen Gespräch."
                : "More questions? We'll be happy to answer them in a personal conversation."
              }
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};