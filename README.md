# Digital Sales Coaching - A/B Landing Pages

Production-ready, high-converting landing page system with two variants for DACH-targeted digital sales coaching product.

## 🎯 Project Overview

This project contains two A/B test variants optimized for different personas:

- **Variant A**: "Ambitious Career Changer" (Lisa) - `/variant-a`
- **Variant B**: "Job Seeker / Unemployed Youth" (Marco) - `/variant-b`

Both variants feature identical structure with persona-tailored copy and hooks, fully localized German content (Du-form) with English language toggle.

## 🚀 Quick Setup

### Prerequisites
- Node.js 18+ and npm
- Recommended: Use with Netlify, Vercel, or similar static hosting

### Installation
```bash
# Clone and install
git clone <YOUR_GIT_URL>
cd <PROJECT_NAME>
npm install

# Development
npm run dev

# Production build
npm run build
npm run preview
```

## 📊 A/B Testing Setup

### URL Structure
- **Variant A**: `/variant-a` or `/a`
- **Variant B**: `/variant-b` or `/b`
- **Auto-routing**: `/` with UTM parameters

### UTM Blueprint for Campaign Targeting
```
# Variant A (Career Changer) Campaigns
utm_source=facebook&utm_medium=cpc&utm_campaign=career_ambitious&creative_id=123&ad_id=456

# Variant B (Low-wage Escape) Campaigns  
utm_source=tiktok&utm_medium=cpc&utm_campaign=lowwage_escape&creative_id=789&ad_id=101112
```

### Auto-routing Logic
The root `/` automatically redirects users based on:
1. `?variant=a` or `?variant=b` parameter
2. UTM campaign detection (career/ambitious → A, lowwage/escape → B)
3. Random 50/50 split as fallback

## 🔍 Tracking & Analytics Setup

### 1. Meta Pixel Setup
```html
<!-- Add to index.html head -->
<script>
!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', 'YOUR_PIXEL_ID');
fbq('track', 'PageView');
</script>
```

Replace `YOUR_PIXEL_ID` in:
- `src/components/CookieConsent.tsx` (line 90)

### 2. TikTok Pixel Setup
```html
<!-- Add to index.html head -->
<script>
!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie"];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e};ttq.load=function(e,n){var i="https://analytics.tiktok.com/i18n/pixel/events.js";ttq._i=ttq._i||{};ttq._i[e]=[];ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]=n||{};var o=document.createElement("script");o.type="text/javascript";o.async=!0;o.src=i+"?sdkid="+e+"&lib="+t;var a=document.querySelectorAll("script")[0];a.parentNode.insertBefore(o,a)};
ttq.load('YOUR_TIKTOK_PIXEL_ID');
ttq.page();
}(window,document,'ttq');
</script>
```

Replace `YOUR_TIKTOK_PIXEL_ID` in:
- `src/components/CookieConsent.tsx` (line 115)

### 3. GA4 Setup
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=YOUR_GA4_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'YOUR_GA4_ID');
</script>
```

Replace `YOUR_GA4_ID` in:
- `src/components/CookieConsent.tsx` (line 124, 130)

### 4. Server-side Event Forwarding

Create `/api/track` endpoint for server-side attribution:

#### Netlify Functions Example
```javascript
// netlify/functions/track.js
exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { event: eventName, data } = JSON.parse(event.body);

  // Forward to Meta Conversions API
  if (process.env.META_ACCESS_TOKEN) {
    try {
      await fetch(`https://graph.facebook.com/v18.0/${process.env.META_PIXEL_ID}/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.META_ACCESS_TOKEN}`
        },
        body: JSON.stringify({
          data: [{
            event_name: eventName,
            event_time: Math.floor(Date.now() / 1000),
            user_data: {
              em: data.email ? hashSha256(data.email) : undefined,
              ph: data.phone ? hashSha256(data.phone.replace(/\D/g, '')) : undefined,
            },
            custom_data: {
              content_name: `Sales Lead - Variant ${data.variant}`,
              value: 0,
              currency: 'EUR'
            }
          }]
        })
      });
    } catch (error) {
      console.error('Meta API error:', error);
    }
  }

  // Forward to TikTok Events API
  if (process.env.TIKTOK_ACCESS_TOKEN) {
    try {
      await fetch(`https://business-api.tiktok.com/open_api/v1.3/pixel/track/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Token': process.env.TIKTOK_ACCESS_TOKEN
        },
        body: JSON.stringify({
          pixel_code: process.env.TIKTOK_PIXEL_ID,
          event: eventName,
          timestamp: new Date().toISOString(),
          context: {
            user_agent: event.headers['user-agent'],
            ip: event.headers['client-ip']
          },
          properties: {
            content_type: 'lead_form',
            content_id: `variant_${data.variant.toLowerCase()}`
          }
        })
      });
    } catch (error) {
      console.error('TikTok API error:', error);
    }
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true })
  };
};

function hashSha256(input) {
  return require('crypto').createHash('sha256').update(input).digest('hex');
}
```

#### Environment Variables
```env
# .env.local (not committed to git)
META_PIXEL_ID=your_meta_pixel_id
META_ACCESS_TOKEN=your_meta_access_token
TIKTOK_PIXEL_ID=your_tiktok_pixel_id
TIKTOK_ACCESS_TOKEN=your_tiktok_access_token
```

## 🎣 CRM Webhook Integration

### Zapier Integration
1. Create a new Zap with "Webhooks by Zapier" trigger
2. Choose "Catch Hook" 
3. Copy the webhook URL
4. Set the webhook URL via:
   - Environment variable: `VITE_WEBHOOK_URL=your_zapier_webhook_url`
   - Or store in localStorage: `localStorage.setItem('webhook_url', 'your_url')`

### Make (Integromat) Integration
1. Create new scenario with HTTP webhook module
2. Copy the webhook URL
3. Configure the same way as Zapier

### n8n Integration
1. Create workflow with Webhook node
2. Set to POST method, JSON body
3. Copy the webhook URL and configure as above

### Webhook Payload Structure
```json
{
  "firstName": "John",
  "email": "john@example.com", 
  "phone": "+49123456789",
  "situation": "employed",
  "urgency": "immediately",
  "variant": "A",
  "language": "de",
  "timestamp": "2024-01-15T10:30:00.000Z",
  "url": "https://yourdomain.com/variant-a",
  "utm_source": "facebook",
  "utm_medium": "cpc",
  "utm_campaign": "career_ambitious",
  "creative_id": "123",
  "ad_id": "456"
}
```

## 🍪 GDPR & Cookie Management

### Cookie Consent Manager (CMP)
The built-in CMP blocks marketing pixels until consent:
- **Necessary cookies**: Always allowed (functionality)
- **Marketing & Analytics**: Requires explicit consent

### Double Opt-in Email Flow
Implement server-side double opt-in:

```javascript
// Example double opt-in flow
async function handleLeadSubmission(leadData) {
  // 1. Store lead with pending status
  await database.leads.create({
    ...leadData,
    status: 'pending_confirmation',
    confirmationToken: generateToken()
  });

  // 2. Send confirmation email
  await sendConfirmationEmail(leadData.email, confirmationToken);
  
  // 3. Only after email confirmation:
  // - Add to CRM
  // - Send to tracking pixels
  // - Schedule follow-up
}
```

### GDPR Compliance Checklist
- ✅ Cookie consent with granular controls
- ✅ Clear privacy policy links in forms
- ✅ Data processing consent checkbox (unchecked by default)
- ✅ Right to deletion and data portability mentioned
- ✅ Data protection officer contact provided
- ✅ Server-side tracking for attribution without client-side cookies

## 🎬 Video Asset Integration

### Video Clips Mapping (Replace with actual video URLs)
```javascript
// Update these URLs in components with your actual video assets
const videoAssets = {
  heroA: '/assets/videos/hero-a-loop.mp4',        // Clip 00:25-00:49 (8-12s loop)
  heroB: '/assets/videos/hero-b-loop.mp4',        // Clip 00:49-01:29 (8-12s loop)  
  trustClip: '/assets/videos/trust-proof.mp4',    // Clip 00:00-00:25 (with disclaimer)
  bofu: '/assets/videos/aspirational.mp4',        // Clip 01:29-01:56 (aspirational)
  reinforcement: '/assets/videos/reinforcement.mp4' // Clip 02:29-03:08 (variant B)
};
```

### Video Optimization Requirements
- Format: MP4 (H.264)
- Max file size: 2MB per clip
- Include poster images (WebP format)
- Add subtitle tracks (SRT files)
- Lazy loading implemented
- Autoplay muted with user interaction fallback

## 📱 Performance Optimization

### Core Web Vitals Targets
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms  
- **CLS (Cumulative Layout Shift)**: < 0.1

### Optimization Features
- ✅ Static site generation (SSG)
- ✅ Image optimization (WebP/AVIF with fallbacks)
- ✅ Lazy loading for videos and images
- ✅ Critical CSS inlined
- ✅ Font preloading (Inter from Google Fonts)
- ✅ Minimized JavaScript bundles
- ✅ Service worker for caching (production builds)

### Lighthouse Audit Commands
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Audit production build
lighthouse https://yourdomain.com --output html --output-path ./lighthouse-report.html

# Mobile audit
lighthouse https://yourdomain.com --preset=mobile --output json --output-path ./mobile-audit.json
```

## 🌍 Deployment Instructions

### Netlify Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login and deploy
netlify login
netlify init
netlify deploy --prod
```

**netlify.toml**:
```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

### Vercel Deployment
```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

**vercel.json**:
```json
{
  "rewrites": [
    {
      "source": "/api/(.*)",
      "destination": "/api/$1"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options", 
          "value": "nosniff"
        }
      ]
    }
  ]
}
```

## 📊 Event Tracking Reference

### Standardized Event Names
- `page_view` - Page load
- `video_view_50pct` - Video 50% completion
- `lead_submitted` - Form submission (client-side)
- `lead_submitted_ss` - Form submission (server-side)
- `consultation_booked` - Calendar booking
- `consultation_attended` - Meeting attendance

### Testing Tracking Events
```javascript
// Test in browser console
window.fbq('track', 'Lead', { test_event_code: 'TEST12345' });
window.ttq.track('SubmitForm', { test_event_code: 'TEST12345' });
window.gtag('event', 'lead_submitted', { debug_mode: true });
```

## 🔧 Customization Guide

### Brand Colors (Tailwind Config)
Update `src/index.css` with your brand colors:
```css
:root {
  --trust-primary: 217 91% 31%;     /* Deep blue #0b3d91 */
  --cta-accent: 22 100% 55%;        /* Orange #ff7a18 */
  /* Add your brand colors */
}
```

### Copy Localization
All German copy is in `copy-DE.md`. For additional languages:
1. Create `copy-EN.md`, `copy-FR.md`, etc.
2. Update language objects in components
3. Add language toggle logic

### Form Fields Customization
Edit `src/components/LeadForm.tsx`:
- Add/remove form fields
- Modify validation rules
- Customize success/error messages
- Add custom tracking events

## 🚨 Troubleshooting

### Common Issues

**Tracking pixels not firing:**
- Check cookie consent status in browser DevTools
- Verify pixel IDs are correctly replaced
- Test with Facebook Pixel Helper extension

**Forms not submitting:**
- Check webhook URL configuration
- Verify CORS settings for external webhooks
- Check browser network tab for failed requests

**Images not loading:**
- Ensure images are in `src/assets/` directory
- Check import statements use correct paths
- Verify image formats are supported (JPG, PNG, WebP)

**Build failures:**
- Run `npm run build` locally to debug
- Check for TypeScript errors: `npx tsc --noEmit`
- Verify all imports have correct paths

### Performance Issues
```bash
# Analyze bundle size
npm run build
npx vite-bundle-analyzer dist

# Check image optimization
npm install -g imagemin-cli
imagemin src/assets/*.jpg --out-dir=src/assets/optimized --plugin=imagemin-mozjpeg
```

## 📞 Support & Maintenance

### Regular Maintenance Tasks
- [ ] Update tracking pixel configurations
- [ ] Monitor Core Web Vitals in Search Console  
- [ ] Review and update GDPR compliance
- [ ] Test A/B split accuracy monthly
- [ ] Update video assets and thumbnails
- [ ] Backup form submissions and tracking data

### Key Metrics to Monitor
1. **Conversion Rate**: Form submissions per visitor
2. **Variant Performance**: A vs B conversion comparison
3. **Traffic Sources**: UTM campaign effectiveness
4. **Technical Performance**: Page speed, error rates
5. **GDPR Compliance**: Consent rates, data requests

---

## 📄 File Structure Reference

```
src/
├── assets/                 # Images, videos, fonts
├── components/
│   ├── ui/                # Shadcn components
│   ├── Hero.tsx           # Hero section with variants
│   ├── LeadForm.tsx       # Lead capture form
│   ├── SocialProofStrip.tsx
│   ├── PainPointsSection.tsx
│   ├── HowItWorksSection.tsx
│   ├── BOFUSection.tsx    # Bottom-of-funnel
│   ├── FAQSection.tsx
│   ├── Footer.tsx
│   ├── StickyCtaBar.tsx   # Mobile sticky CTA
│   └── CookieConsent.tsx  # GDPR compliance
├── pages/
│   ├── Index.tsx          # A/B router
│   ├── VariantA.tsx       # Career changer landing
│   ├── VariantB.tsx       # Low-wage escape landing
│   └── NotFound.tsx
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities
└── index.css             # Design system & global styles
```

---

**Production Checklist:**
- [ ] Replace all placeholder pixel IDs
- [ ] Configure webhook URLs for CRM integration
- [ ] Update domain names in meta tags and canonical URLs
- [ ] Test both variants on mobile and desktop
- [ ] Verify GDPR compliance and cookie consent
- [ ] Set up monitoring and analytics dashboards
- [ ] Configure server-side event tracking
- [ ] Test form submissions end-to-end
- [ ] Optimize images and video assets
- [ ] Enable HTTPS and security headers

For additional support, check the component documentation in each file's header comments.