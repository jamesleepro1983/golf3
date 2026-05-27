# Reach.golf — Golf Influencer Matchmaking

Built with Next.js 14, TypeScript, and Tailwind CSS.

## Setup

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

## Deploy to Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `.next`
5. Add environment variable: `NETLIFY_NEXT_PLUGIN_SKIP=true`

Or use the Netlify CLI:
```bash
npm install -g netlify-cli
netlify deploy --build
```

## Project Structure

```
reachgolf/
├── app/
│   ├── globals.css
│   ├── layout.tsx      ← fonts, metadata
│   └── page.tsx        ← imports all sections
├── components/
│   ├── Nav.tsx         ← fixed nav, scroll effect
│   ├── Hero.tsx        ← full viewport hero image
│   ├── Ticker.tsx      ← scrolling marquee strip
│   ├── WhatWeDo.tsx
│   ├── HowItWorks.tsx
│   ├── WhoItsFor.tsx
│   ├── WhyMicro.tsx
│   ├── BriefForm.tsx   ← multi-step form with state
│   ├── Footer.tsx
│   └── NextJsBadge.tsx ← fixed badge bottom right
├── public/
│   └── hero.png        ← hero background image
├── tailwind.config.ts
└── next.config.js
```

## Colours
- Coral: `#E8542A`
- Background: `#0d0d0d`
- Off-white: `#f7f5f0`
