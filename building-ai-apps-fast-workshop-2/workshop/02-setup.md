# Step 2 — Set up (10 min)

```bash
git clone <your-fork-url>
cd building-ai-apps-fast-workshop/starter/api
cp .env.example .env
npm install
```
Add `GEMINI_API_KEY`. Then:
```bash
npm run dev
```
In another terminal:
```bash
cd starter/web
cp .env.example .env.local
npm install
npm run dev
```
Open `http://localhost:3000`. The interface is ready, but analysis intentionally fails until the workflow is assembled.

Checkpoint: `http://localhost:4000/api/health` returns `{"status":"ok"}`.
