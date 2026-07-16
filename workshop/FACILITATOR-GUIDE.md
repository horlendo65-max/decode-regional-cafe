# Facilitator Guide

[#facilitator-guide](#facilitator-guide)

## Minute-by-minute

[#minute-by-minute](#minute-by-minute)

| Time | Block | Facilitator notes |
|---|---|---|
| 0:00–0:03 | Welcome | Set expectations: "By the end you'll have a live URL that takes a savings goal and triggers a real M-Pesa prompt." |
| 0:03–0:10 | Idea framing | Show the PesaBot flow end-to-end (pre-recorded video or your own deployed instance) before anyone writes code — people build faster when they've seen the target |
| 0:10–0:20 | [01 — Scaffold & deploy](01-scaffold-and-deploy/README.md) | This is the highest-risk step for "getting stuck on tooling." Walk the room, don't just present |
| 0:20–0:45 | [02 — AI integration](02-ai-integration/README.md) | Live-code the route yourself while attendees follow; pause for the "try it" moment around minute 40. Note out loud that everyone's provider may differ — that's fine, the code doesn't change |
| 0:45–1:10 | [03 — Daraja integration](03-daraja-integration/README.md) | Hardest module. Get everyone's OAuth token working (2 min check) before moving to STK Push |
| 1:10–1:25 | [04 — Test & wrap-up](04-test-and-wrap-up/README.md) | Have 2-3 people test live on their phones as a group moment |
| 1:25–1:30 | Close | Resources, feedback, how to keep building |

## Checkpoints (don't skip these)

[#checkpoints-dont-skip-these](#checkpoints-dont-skip-these)

Stop and visually confirm before moving to the next module:

1. **End of Module 01:** everyone has a `*.vercel.app` URL open and loading
2. **Mid Module 02:** everyone's `/api/chat` returns JSON, not an error, for at least one message — regardless of provider
3. **Mid Module 03:** everyone's OAuth token call succeeds (a raw `access_token` string, not a 401)

If more than ~20% of the room is stuck at a checkpoint, address it as a group before continuing — one person's fix is usually everyone's fix (wrong env var name, missing `NEXT_PUBLIC_APP_URL`, a deprecated model id, etc.).

## What to cut if you're running behind

[#what-to-cut-if-youre-running-behind](#what-to-cut-if-youre-running-behind)

In priority order — cut from the bottom up:

1. Live phone testing in Module 04 (demo it yourself instead, on your own phone, projected)
2. The "adapting to Health/Agri" discussion — send it as a follow-up doc instead
3. Deep debugging of individual Daraja errors — collect names, follow up 1:1 after
4. Never cut the Module 01 deploy step — everything downstream depends on it

## Known rough edges to warn people about upfront

[#known-rough-edges-to-warn-people-about-upfront](#known-rough-edges-to-warn-people-about-upfront)

- Venue Wi-Fi sometimes blocks `developer.safaricom.co.ke` or a specific AI provider's console — this should have surfaced in prep, but have a hotspot as backup, and remind people they can switch providers (`switch-ai-provider` skill) if theirs is blocked
- Free-tier AI model ids get deprecated with little notice — if someone's "model not found" error doesn't match anything in the workshop guide, check the provider's current model list rather than assuming the code is wrong
- Vercel free tier cold-starts can make the first request after deploy feel slow — mention it so it doesn't read as broken
- The Daraja OAuth token expires after ~1 hour — if the workshop overruns, tokens generated early may need refreshing
- Sandbox STK Push only prompts the shared test number `254708374149` — real personal numbers will not receive a prompt in sandbox, this trips people up every time

## Using Copilot Free and temporary licenses as a facilitator

[#using-copilot-free-and-temporary-licenses-as-a-facilitator](#using-copilot-free-and-temporary-licenses-as-a-facilitator)

Have everyone run `/workshop-status` first, then one module prompt at a time. This uses fewer Copilot Free requests than broad requests to finish the repository. Attendees with a temporary paid license can select **Daraja Debugger** or **Prompt Reviewer** from the agent picker; Free attendees can use the ordinary-chat fallbacks in [COPILOT-GUIDE.md](COPILOT-GUIDE.md). Keep pairs ready so anyone who reaches a usage limit can continue from the written module guide without losing workshop time.

## After the workshop

[#after-the-workshop](#after-the-workshop)

Send: the repo link (with attendees' forks), [FREE-AI-MODELS.md](FREE-AI-MODELS.md), and a short list of "what's next" (database, auth, moving Daraja to production). A feedback form with 3 questions (what worked, what didn't, what they'd build next) is more useful than a long survey.
