# 01 — Scaffold & Deploy First
### 0:10 – 0:20 (10 min)

[#01-scaffold--deploy-first](#01-scaffold--deploy-first)

Goal for this module: **a public HTTPS URL, live, before we write any real logic.** This is the single habit that makes rapid prototyping actually rapid — every module after this one ships into something already deployed instead of deploying once at the very end and debugging in front of everyone.

## Confirm the app runs locally

[#confirm-the-app-runs-locally](#confirm-the-app-runs-locally)

If you haven't already (see `workshop/00-prep`):

```
npm run dev
```

Open `http://localhost:3000` — bare chat UI, nothing wired yet.

## Push to your own GitHub repo

[#push-to-your-own-github-repo](#push-to-your-own-github-repo)

If you cloned `decode-regional-cafe` directly and want your own copy to deploy from, fork it on GitHub first, then:

```
git remote set-url origin https://github.com/YOUR-USERNAME/decode-regional-cafe.git
git push -u origin main
```

If you're working straight off the shared repo with write access, you can skip this and deploy from it directly.

## Deploy to Vercel

[#deploy-to-vercel](#deploy-to-vercel)

1. In the Vercel dashboard, click **Add New → Project**
2. Import your repo
3. Leave build settings as default (Vercel auto-detects Next.js)
4. Under **Environment Variables**, add the values from your `.env.local`:

```
AI_PROVIDER=gemini
GEMINI_API_KEY=your_key_here
GEMINI_MODEL=gemini-3.5-flash
MPESA_CONSUMER_KEY=your_key_here
MPESA_CONSUMER_SECRET=your_secret_here
MPESA_SHORTCODE=174379
MPESA_PASSKEY=your_passkey_here
```

(Only switch the `AI_PROVIDER`/key pair if Gemini was unavailable during prep.)

5. Click **Deploy**

In about a minute you'll have a live URL like `https://decode-regional-cafe-yourname.vercel.app`. Open it — same bare chat UI, but now on the public internet.

## Set NEXT_PUBLIC_APP_URL

[#set-next_public_app_url](#set-next_public_app_url)

Back in Vercel's Environment Variables, add one more:

```
NEXT_PUBLIC_APP_URL=https://decode-regional-cafe-yourname.vercel.app
```

(your actual deployed URL, no trailing slash) — then redeploy so it takes effect. This is what Module 03's Daraja callback will use.

## Why this matters for the Daraja step

[#why-this-matters-for-the-daraja-step](#why-this-matters-for-the-daraja-step)

Safaricom's STK Push callback must be a real, publicly reachable **HTTPS** URL — `localhost` will never receive it. By deploying now, `https://your-deployed-url/api/mpesa/callback` already exists and is reachable, so in Module 03 we're just filling in a route that's already live rather than fighting with tunnels mid-workshop.

> **Checkpoint:** everyone should have a working `*.vercel.app` URL open in a browser tab before moving on. This is the moment to catch anyone who got stuck in prep.
