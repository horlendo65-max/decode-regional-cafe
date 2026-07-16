# Lab 02 — Local Setup

## Goal

Run the web and API locally.

## Steps

```bash
cd starter/api
cp .env.example .env
npm install
npm run dev
```

In another terminal:

```bash
cd starter/web
cp .env.example .env.local
npm install
npm run dev
```

## Checkpoint

- API health endpoint works.
- Web app opens on localhost.
