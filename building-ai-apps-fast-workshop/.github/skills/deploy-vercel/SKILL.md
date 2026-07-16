---
name: deploy-vercel
description: Prepare and verify the Next.js frontend and Express API for separate Vercel deployments, including environment variables, CORS, build commands, and smoke tests.
---

# Deploy to Vercel

## Target deployment
- Project 1: `starter/api` or `reference/api`.
- Project 2: `starter/web` or `reference/web`.

## Procedure
1. Confirm both projects build locally.
2. Confirm the API exports the Express application in the form expected by Vercel.
3. Add `GEMINI_API_KEY` to the API project only.
4. Deploy the API and copy its HTTPS URL.
5. Set `NEXT_PUBLIC_API_URL` in the web project to the API URL.
6. Confirm CORS allows the deployed frontend.
7. Deploy the web project.
8. Test health endpoint, analysis request, loading state, and failure state.
9. Never commit `.env` or `.env.local`.

## Demo check
Use the provided sample statement and verify a complete response before presenting.
