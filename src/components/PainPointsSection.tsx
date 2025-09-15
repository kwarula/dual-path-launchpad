import React from 'react';

interface PainPointsSectionProps {
  variant: 'A' | 'B';
  language: 'de' | 'en';
}

const painContent = {
  A: {
    de: {
      points: [
        "Du arbeitest Woche für Woche hart. 40 Stunden, manchmal mehr.",
        "Und trotzdem bleibt am Ende des Monats kaum etwas übrig.",
        "Keine Freiheit, keine Perspektive – nur das Gefühl, im Kreis zu laufen."
      ],
      transition: "Ich habe selbst erlebt, wie befreiend es ist, Verkaufen zu können. Es geht nicht nur ums Geld – es geht darum, zu wissen, dass man unabhängig ist. Dass man nicht mehr auf „Glück“ im Job hoffen muss, sondern einen Skill hat, der überall gebraucht wird."
    },
    en: {
      points: [
        "You work hard week after week. 40 hours, sometimes more.",
        "And yet, at the end of the month, there's hardly anything left.",
        "No freedom, no perspective – just the feeling of running in circles."
      ],
      transition: "I have experienced for myself how liberating it is to be able to sell. It's not just about money – it's about knowing that you are independent. That you no longer have to hope for 'luck' in your job, but have a skill that is needed everywhere."
    }
  },
  B: {
    de: {
      points: [
        "Du arbeitest Woche für Woche hart. 40 Stunden, manchmal mehr.",
        "Und trotzdem bleibt am Ende des Monats kaum etwas übrig.",
        "Keine Freiheit, keine Perspektive – nur das Gefühl, im Kreis zu laufen."
      ],
      transition: "Ich habe selbst erlebt, wie befreiend es ist, Verkaufen zu können. Es geht nicht nur ums Geld – es geht darum, zu wissen, dass man unabhängig ist. Dass man nicht mehr auf „Glück“ im Job hoffen muss, sondern einen Skill hat, der überall gebraucht wird."
    },
    en: {
      points: [
        "You work hard week after week. 40 hours, sometimes more.",
        "And yet, at the end of the month, there's hardly anything left.",
        "No freedom, no perspective – just the feeling of running in circles."
      ],
      transition: "I have experienced for myself how liberating it is to be able to sell. It's not just about money – it's about knowing that you are independent. That you no longer have to hope for 'luck' in your job, but have a skill that is needed everywhere."
    }
  }
};

export const PainPointsSection: React.FC<PainPointsSectionProps> = ({ variant, language }) => {
  const content = painContent[variant][language];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-b from-neutral-50 to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-20 left-10 w-32 h-32 bg-trust-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-cta-accent rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-neutral-200/50 mb-6">
              <div className="w-2 h-2 bg-gradient-to-r from-trust-primary to-cta-accent rounded-full animate-pulse"></div>
              <span className="text-sm font-medium text-neutral-600">
                {language === 'de' ? 'Deine aktuelle Situation' : 'Your Current Situation'}
              </span>
            </div>
            
            <h2 className="section-headline text-center text-neutral-900 mb-4">
              {language === 'de' 
                ? (variant === 'A' ? 'Kennst du das Gefühl?' : 'Reicht es dir nicht auch?')
                : (variant === 'A' ? 'Do you know that feeling?' : 'Aren\'t you tired of it too?')
              }
            </h2>
            
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              {language === 'de' 
                ? 'Viele Menschen stecken in diesem Kreislauf fest. Du bist nicht allein.'
                : 'Many people are stuck in this cycle. You are not alone.'
              }
            </p>
          </div>

          {/* Pain Points Grid */}
          <div className="grid gap-6 md:gap-8 mb-16 md:mb-20">
            {content.points.map((point, index) => (
              <div 
                key={index}
                className="group relative"
              >
                <div className="relative bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-neutral-200/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  {/* Pain Point Icon */}
                  <div className="flex items-start gap-4 md:gap-6">
                    <div className="flex-shrink-0 mt-1">
                      <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-red-50 to-red-100 rounded-xl flex items-center justify-center border border-red-200/50">
                        <svg className="w-6 h-6 md:w-7 md:h-7 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Pain Point Content */}
                    <div className="flex-1">
                      <div className="h-px bg-gradient-to-r from-red-200 to-transparent mb-4"></div>
                      
                      <p className="text-lg md:text-xl font-semibold text-neutral-800 leading-relaxed">
                        {point}
                      </p>
                    </div>
                  </div>
                  
                  {/* Hover Effect Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-r from-red-500/[0.02] to-orange-500/[0.02] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Transition Statement */}
          <div className="text-center">
            <div className="relative">
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-trust-primary/20 to-cta-accent/20 rounded-3xl blur-xl scale-105"></div>
              
              {/* Content Card */}
              <div className="relative bg-gradient-to-br from-white via-white to-trust-primary/5 rounded-3xl p-8 md:p-12 border border-trust-primary/20 shadow-lg">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-trust-primary to-cta-accent rounded-2xl flex items-center justify-center shadow-lg">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                </div>
                
                <p className="text-xl md:text-2xl font-bold text-trust-primary mb-4 leading-relaxed max-w-4xl mx-auto">
                  {content.transition}
                </p>
                
                <div className="flex items-center justify-center gap-2 text-sm text-neutral-600">
                  <div className="w-2 h-2 bg-trust-primary rounded-full animate-pulse"></div>
                  <span>
                    {language === 'de' ? 'Dein Weg zur Veränderung beginnt hier' : 'Your path to change starts here'}
                  </span>
                  <div className="w-2 h-2 bg-cta-accent rounded-full animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};