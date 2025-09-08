import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CookieConsentProps {
  language: 'de' | 'en';
}

const content = {
  de: {
    title: "Cookie-Einstellungen",
    description: "Wir verwenden Cookies und ähnliche Technologien, um unsere Website zu verbessern und Ihnen personalisierte Inhalte anzubieten. Einige sind für die Funktionalität erforderlich, andere helfen uns bei der Analyse und Verbesserung.",
    necessary: "Notwendige Cookies",
    necessaryDesc: "Diese Cookies sind für die Grundfunktionen der Website erforderlich.",
    marketing: "Marketing & Analytics",
    marketingDesc: "Diese Cookies helfen uns dabei, die Leistung zu messen und personalisierte Werbung anzuzeigen.",
    acceptAll: "Alle akzeptieren",
    acceptNecessary: "Nur notwendige",
    settings: "Einstellungen"
  },
  en: {
    title: "Cookie Settings",
    description: "We use cookies and similar technologies to improve our website and offer you personalized content. Some are required for functionality, others help us with analysis and improvement.",
    necessary: "Necessary Cookies",
    necessaryDesc: "These cookies are required for the basic functions of the website.",
    marketing: "Marketing & Analytics",
    marketingDesc: "These cookies help us measure performance and display personalized advertising.",
    acceptAll: "Accept All",
    acceptNecessary: "Only Necessary",
    settings: "Settings"
  }
};

export const CookieConsent: React.FC<CookieConsentProps> = ({ language }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    marketing: false
  });

  const texts = content[language];

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPrefs = JSON.parse(consent);
      setPreferences(savedPrefs);
      initializeTracking(savedPrefs.marketing);
    }
  }, []);

  const initializeTracking = (allowMarketing: boolean) => {
    if (allowMarketing && typeof window !== 'undefined') {
      // Initialize Meta Pixel
      if (!window.fbq) {
        (function(f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) {
          if (f.fbq) return;
          n = f.fbq = function() {
            n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
          };
          if (!f._fbq) f._fbq = n;
          n.push = n;
          n.loaded = !0;
          n.version = '2.0';
          n.queue = [];
          t = b.createElement(e);
          t.async = !0;
          t.src = v;
          s = b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t, s);
        })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
        
        window.fbq('init', 'YOUR_PIXEL_ID'); // Replace with actual pixel ID
        window.fbq('track', 'PageView');
      }

      // Initialize TikTok Pixel
      if (!window.ttq) {
        (function(w: any, d: any, t: any) {
          w.TiktokAnalyticsObject = t;
          var ttq = w[t] = w[t] || [];
          ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
          ttq.setAndDefer = function(t: any, e: any) {
            t[e] = function() {
              t.push([e].concat(Array.prototype.slice.call(arguments, 0)))
            }
          };
          for (var i = 0; i < ttq.methods.length; i++) ttq.setAndDefer(ttq, ttq.methods[i]);
          ttq.instance = function(t: any) {
            for (var e = ttq._i[t] || [], n = 0; n < ttq.methods.length; n++) ttq.setAndDefer(e, ttq.methods[n]);
            return e
          };
          ttq.load = function(e: any, n: any) {
            var i = "https://analytics.tiktok.com/i18n/pixel/events.js";
            ttq._i = ttq._i || {};
            ttq._i[e] = [];
            ttq._t = ttq._t || {};
            ttq._t[e] = +new Date;
            ttq._o = ttq._o || {};
            ttq._o[e] = n || {};
            var o = document.createElement("script");
            o.type = "text/javascript";
            o.async = !0;
            o.src = i + "?sdkid=" + e + "&lib=" + t;
            var a = document.querySelectorAll("script")[0];
            a.parentNode.insertBefore(o, a)
          };
          ttq.load('YOUR_TIKTOK_PIXEL_ID'); // Replace with actual pixel ID
          ttq.page();
        })(window, document, 'ttq');
      }

      // Initialize GA4
      if (!window.gtag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=YOUR_GA4_ID'; // Replace with actual GA4 ID
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        window.gtag = function() {
          window.dataLayer.push(arguments);
        };
        window.gtag('js', new Date());
        window.gtag('config', 'YOUR_GA4_ID'); // Replace with actual GA4 ID
      }
    }
  };

  const handleAcceptAll = () => {
    const newPrefs = { necessary: true, marketing: true };
    setPreferences(newPrefs);
    localStorage.setItem('cookie-consent', JSON.stringify(newPrefs));
    initializeTracking(true);
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    const newPrefs = { necessary: true, marketing: false };
    setPreferences(newPrefs);
    localStorage.setItem('cookie-consent', JSON.stringify(newPrefs));
    initializeTracking(false);
    setIsVisible(false);
  };

  const handleSaveSettings = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    initializeTracking(preferences.marketing);
    setIsVisible(false);
    setShowSettings(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50 p-4">
      <Card className="w-full max-w-2xl p-6 shadow-modal">
        <div className="space-y-4">
          <h3 className="font-bold text-xl text-neutral-900">
            {texts.title}
          </h3>
          
          <p className="body-medium text-neutral-600">
            {texts.description}
          </p>

          {showSettings && (
            <div className="space-y-4 border-t pt-4">
              {/* Necessary Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 mb-1">
                    {texts.necessary}
                  </h4>
                  <p className="body-small text-neutral-600">
                    {texts.necessaryDesc}
                  </p>
                </div>
                <div className="ml-4">
                  <div className="w-12 h-6 bg-neutral-300 rounded-full relative">
                    <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow-sm"></div>
                  </div>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-neutral-900 mb-1">
                    {texts.marketing}
                  </h4>
                  <p className="body-small text-neutral-600">
                    {texts.marketingDesc}
                  </p>
                </div>
                <div className="ml-4">
                  <button
                    onClick={() => setPreferences(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`w-12 h-6 rounded-full relative transition-colors ${
                      preferences.marketing ? 'bg-trust-primary' : 'bg-neutral-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 shadow-sm transition-transform ${
                      preferences.marketing ? 'translate-x-6' : 'translate-x-0.5'
                    }`}></div>
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            {showSettings ? (
              <>
                <Button 
                  variant="trust" 
                  size="lg" 
                  onClick={handleSaveSettings}
                  className="flex-1"
                >
                  {language === 'de' ? 'Einstellungen speichern' : 'Save Settings'}
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={() => setShowSettings(false)}
                  className="flex-1"
                >
                  {language === 'de' ? 'Zurück' : 'Back'}
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="cta" 
                  size="lg" 
                  onClick={handleAcceptAll}
                  className="flex-1"
                >
                  {texts.acceptAll}
                </Button>
                <Button 
                  variant="trust-outline" 
                  size="lg" 
                  onClick={handleAcceptNecessary}
                  className="flex-1"
                >
                  {texts.acceptNecessary}
                </Button>
                <Button 
                  variant="ghost" 
                  size="lg" 
                  onClick={() => setShowSettings(true)}
                >
                  {texts.settings}
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

// Global type declarations
declare global {
  interface Window {
    fbq?: any;
    ttq?: any;
    gtag?: any;
    dataLayer?: any[];
  }
}