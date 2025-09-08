import React from 'react';

interface FAQSectionProps {
  language: 'de' | 'en';
}

const faqContent = {
  de: {
    title: "Häufige Fragen",
    faqs: [
      {
        question: "Ist das ein Schnell-Reich-Programm?",
        answer: "Nein. Es ist ein strukturiertes Training. Ergebnisse brauchen Einsatz."
      },
      {
        question: "Kann ich das nebenbei machen?",
        answer: "Ja, das Programm ist so aufgebaut, dass es auch neben einem Job funktioniert."
      },
      {
        question: "Was kostet der Einstieg?",
        answer: "Das klären wir im kostenlosen Erstgespräch — ohne Verpflichtung."
      }
    ]
  },
  en: {
    title: "Frequently Asked Questions",
    faqs: [
      {
        question: "Is this a get-rich-quick program?",
        answer: "No. It's structured training. Results require commitment."
      },
      {
        question: "Can I do this on the side?",
        answer: "Yes, the program is designed to work alongside a job."
      },
      {
        question: "What does entry cost?",
        answer: "We'll clarify that in the free initial consultation — without obligation."
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