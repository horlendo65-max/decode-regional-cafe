# Deployment Guide

## Deployment goal

Participants should finish with:

- a live web app URL;
- a live API URL;
- environment variables configured in Vercel;
- no secrets committed to GitHub.

## Recommended deployment structure

Deploy the API and web app as two Vercel projects.

```text
Vercel Project 1: API
Root directory: starter/api or reference/api

Vercel Project 2: Web
Root directory: starter/web or reference/web
```

## API environment variables

Set these in the API project:

```bash
GEMINI_API_KEY=your_key_here
AI_PROVIDER=gemini
```

Optional Daraja variables:

```bash
DARAJA_CONSUMER_KEY=
DARAJA_CONSUMER_SECRET=
DARAJA_SHORTCODE=
DARAJA_PASSKEY=
DARAJA_CALLBACK_URL=
```

## Web environment variables

Set this in the web project:

```bash
NEXT_PUBLIC_API_URL=https://your-api-project.vercel.app
```

## Deployment checklist

- Push code to GitHub.
- Import API project into Vercel.
- Add API environment variables.
- Deploy API.
- Test `/health`.
- Import web project into Vercel.
- Add `NEXT_PUBLIC_API_URL`.
- Deploy web.
- Test a full M-PESA analysis request.

## Troubleshooting deployment

If the frontend works locally but fails in production, the most common issue is a wrong `NEXT_PUBLIC_API_URL`.

If the API works locally but fails in production, the most common issue is a missing `GEMINI_API_KEY` in Vercel.
