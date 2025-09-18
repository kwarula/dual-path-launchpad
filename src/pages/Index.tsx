import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    // Auto-redirect based on UTM parameters or random assignment
    const variant = searchParams.get('variant');
    const utmCampaign = searchParams.get('utm_campaign');
    
    if (variant === 'a' || variant === 'A') {
      navigate('/variant-a' + window.location.search);
      return;
    }
    
    if (variant === 'b' || variant === 'B') {
      navigate('/variant-b' + window.location.search);
      return;
    }

    // Auto-split based on campaign or random
    if (utmCampaign) {
      const isVariantA = utmCampaign.includes('career') || utmCampaign.includes('ambitious');
      const targetVariant = isVariantA ? '/variant-a' : '/variant-b';
      
      // Small delay to prevent flash
      setTimeout(() => {
        navigate(targetVariant + window.location.search);
      }, 100);
      return;
    }

    // Random split if no specific targeting
    const randomVariant = Math.random() < 0.5 ? '/variant-a' : '/variant-b';
    setTimeout(() => {
      navigate(randomVariant + window.location.search);
    }, 100);
  }, [navigate, searchParams]);

  // Fallback UI (rarely seen due to auto-redirect)
  return (
    <div className="min-h-screen bg-gradient-trust flex items-center justify-center p-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="hero-headline mb-8 text-neutral-900">
          Digital Sales Coaching
        </h1>
        <p className="body-large mb-12 text-neutral-600">
          Wähle deine Zielgruppe für die optimale Ansprache:
        </p>

        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Variant A - Ambitious Career Changer */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/variant-a' + window.location.search)}>
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Variant A - Karriere-Wechsler
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-medium text-neutral-600 mb-4">
                "Bist du bereit, dein 9–5 hinter dir zu lassen?"
              </p>
              <p className="body-small text-neutral-500">
                Persona: Lisa (Ambitious Career Changer)
              </p>
              <Button variant="trust" size="lg" className="w-full mt-4">
                Variant A ansehen
              </Button>
            </CardContent>
          </Card>

          {/* Variant B - Job Seeker / Unemployed */}
          <Card className="cursor-pointer hover:shadow-lg transition-shadow" onClick={() => navigate('/variant-b' + window.location.search)}>
            <CardHeader>
              <CardTitle className="text-neutral-900">
                Variant B - Niedriglohn-Ausbrecher
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="body-medium text-neutral-600 mb-4">
                "Reicht es dir, für 1.500 € netto dein Leben zu verschwenden?"
              </p>
              <p className="body-small text-neutral-500">
                Persona: Marco (Job Seeker / Unemployed Youth)
              </p>
              <Button variant="trust" size="lg" className="w-full mt-4">
                Variant B ansehen
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <p className="body-small text-neutral-500 mb-4">
            🔄 Auto-Redirect aktiv: UTM-Parameter oder Zufall bestimmen die Variante
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              variant="cta" 
              onClick={() => navigate('/variant-a?variant=a&utm_source=test&utm_campaign=career_ambitious')}
            >
              Test Variant A
            </Button>
            <Button 
              variant="cta" 
              onClick={() => navigate('/variant-b?variant=b&utm_source=test&utm_campaign=lowwage_escape')}
            >
              Test Variant B
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
