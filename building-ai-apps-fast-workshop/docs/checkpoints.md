# Workshop Checkpoints

Use these checkpoints to confirm participants are on track.

## Checkpoint 1 — Repo ready

Expected:

- repo cloned or unzipped;
- `starter/` opened;
- Node.js 20+ available;
- `.env` and `.env.local` files created.

Quick command:

```bash
node -v
```

## Checkpoint 2 — API running

Expected:

```bash
cd starter/api
npm install
npm run dev
```

Visit:

```text
http://localhost:4000/health
```

## Checkpoint 3 — Web running

Expected:

```bash
cd starter/web
npm install
npm run dev
```

Visit:

```text
http://localhost:3000
```

## Checkpoint 4 — Workflow completed

Expected:

- the intentional TODO in `expense-analysis.workflow.ts` is completed;
- the workflow calls the agent;
- TypeScript build passes.

## Checkpoint 5 — M-PESA analysis works

Paste sample statement text and confirm the app returns:

- categories;
- spending summary;
- recommendations;
- a safe disclaimer.

## Checkpoint 6 — GitHub repo pushed

Expected:

```bash
git add .
git commit -m "Build AI expense advisor MVP"
git push
```

## Checkpoint 7 — Vercel deployed

Expected:

- API deployed;
- frontend deployed;
- frontend environment variable points to API URL;
- live demo works.
