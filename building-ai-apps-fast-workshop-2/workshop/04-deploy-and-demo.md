# Step 4 — Deploy and demo (22 min)

## Push to GitHub
```bash
git add .
git commit -m "Build AI expense advisor workflow"
git push
```

## Deploy API
Create a Vercel project with root directory `starter/api`. Set `GEMINI_API_KEY`, `GEMINI_MODEL` and `ALLOWED_ORIGIN`. Vercel can detect an exported Express application from `src/app.ts`.

## Deploy web
Create a second Vercel project with root directory `starter/web`. Set:
```text
NEXT_PUBLIC_API_URL=https://YOUR-API.vercel.app
```
Update API `ALLOWED_ORIGIN` to the deployed web URL and redeploy.

## 60-second demo script
1. State the user problem.
2. Show the workflow diagram.
3. Paste sample transactions.
4. Run analysis and verify totals.
5. Show one prompt or skill customization.
6. Share the GitHub and live URLs.
