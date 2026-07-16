---
name: module-01-deploy
description: Verify the starter build and guide the attendee through the first Vercel deployment
agent: agent
tools: [read, edit, search, execute]
---

Complete every locally automatable part of Module 01 now. Follow
[the deployment guide](../../workshop/01-scaffold-and-deploy/README.md).

1. Confirm dependencies are installed and run `npm run build`.
2. Check Git status and report uncommitted work. Do not commit, push, change
   remotes, or deploy unless the attendee explicitly asks and approves those
   external actions.
3. Check only the presence of required environment variables; never display
   secret values.
4. If the attendee has not supplied a public Vercel URL, pause with the exact
   Vercel dashboard steps and the environment-variable names to add. Do not ask
   for secret values in chat.
5. Once the attendee provides a public `https://*.vercel.app` URL, set only
   `NEXT_PUBLIC_APP_URL` in `.env.local` after confirming the value, then
   remind them to set the same variable in Vercel and redeploy.
6. Verify that the final callback URL will be
   `<NEXT_PUBLIC_APP_URL>/api/mpesa/callback`.

Do not implement the AI or Daraja modules. Finish with a deployment checkpoint
and the next slash command, `/ai-chat-route`.

