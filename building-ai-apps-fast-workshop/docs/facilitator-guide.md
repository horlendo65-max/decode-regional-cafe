# Facilitator Guide

## Session title

**Building AI Apps Fast: From Idea to MVP**

## Audience

Mixed audience: beginner developers, intermediate developers and experienced engineers. The repo is scaffolded so beginners can complete the lab, while advanced participants can extend the agent architecture.

## Duration

90 minutes.

## Facilitator goals

By the end, participants should understand that fast AI MVP development comes from composing reusable components, not writing a large app from scratch.

Emphasise:

- agents coordinate tasks;
- skills do one reusable thing;
- workflows define the product journey;
- prompts are product assets;
- hosted AI APIs make prototyping fast;
- deployment is part of the MVP, not an afterthought.

## Room setup

Before the session:

1. Confirm Wi-Fi is stable.
2. Share the repo URL or ZIP.
3. Ask participants to create a Gemini API key.
4. Ask participants to create a Vercel account.
5. Confirm Node.js 20+ is installed.
6. Prepare a fallback demo using `reference/`.
7. Have the slide deck open from `slides/building-ai-apps-fast-workshop.pptx`.

## Recommended timing

| Time | Activity | Facilitator action |
|---:|---|---|
| 0–5 | Welcome | Explain the live outcome |
| 5–15 | Concept framing | Introduce agents, skills and workflows |
| 15–25 | Repo walkthrough | Show `starter/`, `reference/`, `.github/skills/` |
| 25–35 | Local setup | Help participants run web + API |
| 35–50 | Agent-assisted build | Use prompt workflow 03 |
| 50–62 | M-PESA analysis | Test sample statement text |
| 62–72 | Improve prompts | Add Kenyan context and output structure |
| 72–82 | Deployment | Push to GitHub and deploy to Vercel |
| 82–90 | Demo + reflection | Show live URLs and lessons learned |

## Teaching notes

### Concept explanation

Use this line:

> An agent is the decision-maker, a skill is a capability, and a workflow is the route from user intent to useful output.

### Common beginner issue

Some participants may try to modify too many files. Redirect them to only touch:

- `starter/api/src/workflows/expense-analysis.workflow.ts`
- `starter/api/src/agents/expense-advisor.agent.ts`
- prompt text inside the agent
- `starter/web/.env.local`

### Common advanced issue

Advanced participants may want to add uploads, OCR, RAG or payments immediately. Encourage them to first finish the base workflow, then choose one challenge extension.

## Facilitator demo checklist

- Show the architecture slide.
- Paste sample M-PESA text.
- Show local API request.
- Show frontend response.
- Open code for the workflow.
- Show how `reference/` can rescue broken work.
- Show a deployed URL.

## Backup plan

If many participants are blocked:

1. Switch everyone to `reference/`.
2. Ask them to modify only the prompt.
3. Deploy the reference project.
4. Use challenge extensions as discussion instead of implementation.
