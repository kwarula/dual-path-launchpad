import React, { useState, useRef } from 'react';

interface SocialProofStripProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    main: "Bereits hunderte junge Menschen in Deutschland, Österreich und der Schweiz haben diesen Skill erlernt – und ihr Leben verändert.",
    testimonial: {
      text: "Innerhalb von 3 Monaten konnte ich meinen Job kündigen und arbeite jetzt flexibel von überall.",
      name: "Sarah",
      location: "München"
    },
    disclaimer: "Ergebnisse variieren. Einsatz ist nötig."
  },
  en: {
    main: "Hundreds of young people in Germany, Austria and Switzerland have already learned this skill – and changed their lives.",
    testimonial: {
      text: "Within 3 months I was able to quit my job and now work flexibly from anywhere.",
      name: "Sarah",
      location: "Munich"
    },
    disclaimer: "Results vary. Commitment is necessary."
  }
};

export const SocialProofStrip: React.FC<SocialProofStripProps> = ({ language }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const texts = content[language];

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="trust-strip">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Social Proof Statement */}
          <p className="body-large mb-8 font-semibold text-neutral-700">
            {texts.main}
          </p>

          {/* Testimonial Card */}
          <div className="social-proof-card max-w-2xl mx-auto mb-6">
            <blockquote className="body-medium italic mb-4 text-neutral-600">
              "{texts.testimonial.text}"
            </blockquote>
            <cite className="font-semibold text-trust-primary">
              — {texts.testimonial.name}, {texts.testimonial.location}
            </cite>
          </div>

          {/* Trust Video Preview */}
          <div className="max-w-xs mx-auto mb-4">
            <div className="video-container aspect-[9/16] bg-neutral-100 rounded-xl overflow-hidden relative">
              <video
                ref={videoRef}
                src="https://res.cloudinary.com/doprdld4l/video/upload/v1757339766/WhatsApp_Video_2025-09-04_at_08.36.40_qt2qyn.mp4"
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
              <button
                onClick={togglePlayPause}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-all"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                <div className="w-12 h-12 bg-trust-primary/80 hover:bg-trust-primary rounded-full flex items-center justify-center transition-all">
                  {isPlaying ? (
                    <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                    </svg>
                  ) : (
                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </div>
              </button>
              <div className="absolute bottom-2 left-2 right-2">
                <p className="text-xs text-white font-medium drop-shadow-lg text-center">
                  {language === 'de' ? 'Ergebnisse variieren. Einsatz ist nötig.' : 'Results vary. Effort required.'}
                </p>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="body-small text-neutral-500 italic">
            {texts.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
};