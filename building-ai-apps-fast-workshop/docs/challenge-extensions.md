# Challenge Extensions

These are optional extensions for fast finishers or follow-up hackathon sessions.

## Challenge 1 — Daraja Sandbox STK Push

Add a button: **Save KES 500**.

Flow:

```text
Expense analysis
  ↓
Suggested savings amount
  ↓
User clicks Save
  ↓
Daraja Sandbox STK Push
```

Files to inspect:

- `starter/api/src/skills/daraja-stk-push.skill.ts`
- `.github/skills/integrate-daraja-sandbox/SKILL.md`

## Challenge 2 — Health Decision Tool

Create a `HealthAgent` and `SymptomSkill`.

Inputs:

- symptoms;
- duration;
- severity;
- age range.

Output:

- possible causes;
- self-care guidance;
- emergency warning signs;
- recommendation to consult a qualified clinician.

Important: include medical safety disclaimers.

## Challenge 3 — Agriculture Advisor

Create an `AgricultureAgent` and `CropAdviceSkill`.

Inputs:

- crop;
- county/region;
- symptoms;
- season;
- farm size.

Output:

- likely issue;
- practical next steps;
- questions to ask an extension officer;
- prevention tips.

## Challenge 4 — PDF or CSV Statement Upload

Replace pasted text with file upload.

Possible path:

1. Upload CSV.
2. Parse rows.
3. Convert rows to normalized transaction objects.
4. Send summarized transaction data to the workflow.

Avoid sending unnecessary personal details to the model.

## Challenge 5 — Prompt Evaluation

Create a simple test file with three sample statements and compare:

- vague prompt;
- structured prompt;
- Kenyan-context prompt.

Score the response using:

- clarity;
- correctness;
- usefulness;
- safety.

## Challenge 6 — Multi-domain Switcher

Add a dropdown in the UI:

- Expense Advisor
- Health Assistant
- Crop Advisor

Route the request to a matching workflow.
