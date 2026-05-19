# Aditya Sahai — Portfolio

Premium cinematic portfolio for an AI Brand & Content Specialist.

## Setup

```bash
npm install
cp .env.local.example .env.local
# Add your RESEND_API_KEY to .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Your Resend API key from [resend.com](https://resend.com) |

## Replacing Placeholder Content

- **Work images**: Search for `<!-- TODO: REPLACE with real project mockup -->` in `components/ui/WorkCard.tsx`
- **Social URLs**: Search for `TODO: ADD social URLs` in `components/ui/BookCallCard.tsx`
- **Email sender**: Update `from:` in `app/api/contact/route.ts` once you have a verified domain

## Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push to GitHub
2. Import repo in Vercel dashboard
3. Add `RESEND_API_KEY` environment variable
4. Deploy
