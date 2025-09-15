import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';

interface LeadFormProps {
  variant: 'A' | 'B';
  language: 'de' | 'en';
  onSuccess?: () => void;
  className?: string;
}

const formContent = {
  de: {
    firstName: "Vorname",
    email: "E-Mail-Adresse",
    situation: "Aktuelle Situation",
    urgency: "Wie dringend möchtest du starten?",
    consent: "Ich stimme zu, dass meine Daten zur Kontaktaufnahme und für Werbezwecke verarbeitet werden. Datenschutz & Widerruf:",
    privacyPolicy: "Datenschutzerklärung",
    disclaimer: "Ergebnisse variieren. Einsatz und Lernbereitschaft sind erforderlich.",
    submitA: "Kostenloses Gespräch sichern",
    submitB: "Jetzt kostenlos starten",
    situations: {
      employed: "Angestellt",
      student: "Student",
      jobseeking: "Arbeitssuchend",
      selfemployed: "Selbstständig"
    },
    urgencies: {
      immediately: "Sofort",
      oneToThree: "1–3 Monate",
      moreThanThree: "Mehr als 3 Monate"
    },
    errors: {
      required: "Dieses Feld ist erforderlich",
      emailInvalid: "Bitte geben Sie eine gültige E-Mail-Adresse ein",
      consentRequired: "Bitte stimmen Sie der Datenverarbeitung zu"
    },
    success: "Vielen Dank! Wir melden uns innerhalb von 24 Stunden bei Ihnen."
  },
  en: {
    firstName: "First Name",
    email: "Email Address",
    situation: "Current Situation",
    urgency: "How urgently do you want to start?",
    consent: "I agree that my data may be processed for contact and advertising purposes. Privacy & Withdrawal:",
    privacyPolicy: "Privacy Policy",
    disclaimer: "Results vary. Effort and willingness to learn are required.",
    submitA: "Secure Free Consultation",
    submitB: "Start Free Now",
    situations: {
      employed: "Employed",
      student: "Student",
      jobseeking: "Job Seeking",
      selfemployed: "Self-Employed"
    },
    urgencies: {
      immediately: "Immediately",
      oneToThree: "1–3 Months",
      moreThanThree: "More than 3 Months"
    },
    errors: {
      required: "This field is required",
      emailInvalid: "Please enter a valid email address",
      consentRequired: "Please agree to data processing"
    },
    success: "Thank you! We'll contact you within 24 hours."
  }
};

export const LeadForm: React.FC<LeadFormProps> = ({ variant, language, onSuccess, className }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    email: '',
    situation: '',
    urgency: '',
    consent: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const content = formContent[language];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = content.errors.required;
    }

    if (!formData.email.trim()) {
      newErrors.email = content.errors.required;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = content.errors.emailInvalid;
    }

    if (!formData.situation) {
      newErrors.situation = content.errors.required;
    }

    if (!formData.urgency) {
      newErrors.urgency = content.errors.required;
    }

    if (!formData.consent) {
      newErrors.consent = content.errors.consentRequired;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Capture UTM parameters
      const urlParams = new URLSearchParams(window.location.search);
      const trackingData = {
        utm_source: urlParams.get('utm_source'),
        utm_medium: urlParams.get('utm_medium'),
        utm_campaign: urlParams.get('utm_campaign'),
        creative_id: urlParams.get('creative_id'),
        ad_id: urlParams.get('ad_id'),
      };

      // Prepare lead data
      const leadData = {
        ...formData,
        variant,
        language,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        ...trackingData
      };

      // Client-side tracking event
      if (typeof window !== 'undefined') {
        // Meta Pixel
        if (window.fbq) {
          window.fbq('track', 'Lead', {
            content_name: `Sales Coaching Lead - Variant ${variant}`,
            content_category: 'Lead Generation',
            value: 0,
            currency: 'EUR'
          });
        }

        // TikTok Pixel
        if (window.ttq) {
          window.ttq.track('SubmitForm', {
            content_type: 'lead_form',
            content_id: `variant_${variant.toLowerCase()}`
          });
        }

        // GA4
        if (window.gtag) {
          window.gtag('event', 'lead_submitted', {
            event_category: 'Lead Generation',
            event_label: `Variant ${variant}`,
            value: 1
          });
        }
      }

      // Server-side event (fallback for attribution)
      await fetch('/api/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          event: 'lead_submitted_ss',
          data: leadData
        })
      }).catch(() => {
        // Fallback to webhook if server-side tracking fails
        console.log('Server-side tracking unavailable, using client-side only');
      });

      // Webhook to CRM (Zapier/Make/n8n)
      const webhookUrl = process.env.VITE_WEBHOOK_URL || localStorage.getItem('webhook_url');
      if (webhookUrl) {
        await fetch(webhookUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          mode: 'no-cors',
          body: JSON.stringify(leadData)
        }).catch(() => {
          console.log('Webhook delivery failed, lead data logged locally');
        });
      }

      toast({
        title: language === 'de' ? "Erfolgreich gesendet!" : "Successfully sent!",
        description: content.success,
      });

      // Reset form
      setFormData({
        firstName: '',
        email: '',
        situation: '',
        urgency: '',
        consent: false
      });

      onSuccess?.();

    } catch (error) {
      console.error('Form submission error:', error);
      toast({
        title: language === 'de' ? "Fehler" : "Error",
        description: language === 'de' 
          ? "Es gab einen Fehler beim Senden. Bitte versuchen Sie es erneut."
          : "There was an error sending. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const updateFormData = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="space-y-4">
        {/* First Name */}
        <div>
          <Label htmlFor="firstName" className="form-label">
            {content.firstName} *
          </Label>
          <Input
            id="firstName"
            type="text"
            value={formData.firstName}
            onChange={(e) => updateFormData('firstName', e.target.value)}
            className={`form-field ${errors.firstName ? 'border-destructive' : ''}`}
            placeholder={content.firstName}
          />
          {errors.firstName && (
            <p className="text-sm text-destructive mt-1">{errors.firstName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="form-label">
            {content.email} *
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData('email', e.target.value)}
            className={`form-field ${errors.email ? 'border-destructive' : ''}`}
            placeholder={content.email}
          />
          {errors.email && (
            <p className="text-sm text-destructive mt-1">{errors.email}</p>
          )}
        </div>

        {/* Current Situation */}
        <div>
          <Label htmlFor="situation" className="form-label">
            {content.situation} *
          </Label>
          <Select value={formData.situation} onValueChange={(value) => updateFormData('situation', value)}>
            <SelectTrigger className={`form-field ${errors.situation ? 'border-destructive' : ''}`}>
              <SelectValue placeholder={content.situation} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="employed">{content.situations.employed}</SelectItem>
              <SelectItem value="student">{content.situations.student}</SelectItem>
              <SelectItem value="jobseeking">{content.situations.jobseeking}</SelectItem>
              <SelectItem value="selfemployed">{content.situations.selfemployed}</SelectItem>
            </SelectContent>
          </Select>
          {errors.situation && (
            <p className="text-sm text-destructive mt-1">{errors.situation}</p>
          )}
        </div>

        {/* Urgency */}
        <div>
          <Label htmlFor="urgency" className="form-label">
            {content.urgency} *
          </Label>
          <Select value={formData.urgency} onValueChange={(value) => updateFormData('urgency', value)}>
            <SelectTrigger className={`form-field ${errors.urgency ? 'border-destructive' : ''}`}>
              <SelectValue placeholder={content.urgency} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediately">{content.urgencies.immediately}</SelectItem>
              <SelectItem value="oneToThree">{content.urgencies.oneToThree}</SelectItem>
              <SelectItem value="moreThanThree">{content.urgencies.moreThanThree}</SelectItem>
            </SelectContent>
          </Select>
          {errors.urgency && (
            <p className="text-sm text-destructive mt-1">{errors.urgency}</p>
          )}
        </div>

        {/* Consent */}
        <div className="flex items-start space-x-2">
          <Checkbox
            id="consent"
            checked={formData.consent}
            onCheckedChange={(checked) => updateFormData('consent', checked as boolean)}
            className={errors.consent ? 'border-destructive' : ''}
          />
          <div className="grid gap-1.5 leading-none">
            <Label
              htmlFor="consent"
              className="text-sm font-normal leading-relaxed cursor-pointer"
            >
              {content.consent}{' '}
              <a href="/datenschutz" className="text-trust-primary hover:underline">
                {content.privacyPolicy}
              </a>
              .
            </Label>
            {errors.consent && (
              <p className="text-sm text-destructive">{errors.consent}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="space-y-4">
        <Button
          type="submit"
          variant="cta"
          size="xl"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting 
            ? (language === 'de' ? "Wird gesendet..." : "Sending...")
            : (variant === 'A' ? content.submitA : content.submitB)
          }
        </Button>

        {/* Disclaimer */}
        <p className="text-xs text-neutral-600 text-center leading-relaxed">
          {content.disclaimer}
        </p>
      </div>
    </form>
  );
};

// Global type declarations for tracking pixels
declare global {
  interface Window {
    fbq?: any;
    ttq?: any;
    gtag?: any;
  }
}