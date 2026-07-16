# Project Overview

## Building AI Apps Fast: From Idea to MVP

This workshop teaches participants how to move from an AI idea to a deployable MVP in **90 minutes** by using AI coding agents, reusable skills and workflows.

Instead of building a chatbot from scratch, participants assemble an AI product from prepared building blocks:

- **Agents** decide how to solve a user problem.
- **Skills** perform focused tasks such as parsing M-PESA text, categorising expenses, generating a budget summary or calling Daraja Sandbox.
- **Workflows** connect agents and skills into an end-to-end product journey.
- **AI providers** connect the app to hosted models such as Gemini.

The workshop app is an **AI-powered M-PESA Expense Advisor**. A user can paste M-PESA statement text, ask financial questions and receive structured spending insights, savings recommendations and budgeting guidance.

## Why this project matters

Many AI prototypes fail because the model call is mixed directly into the UI or backend route. That makes the app hard to reuse for another domain. This workshop shows a cleaner pattern:

```text
User idea
  ↓
Workflow
  ↓
Agent
  ↓
Skills
  ↓
Hosted AI model
  ↓
Deployable MVP
```

The same structure can later support Health, Agriculture, Education or Customer Support by swapping the agent and skills while keeping the frontend and deployment flow mostly unchanged.

## Successful outcome

A successful participant demo should show:

1. A deployed Next.js interface.
2. An Express API running as the app backend.
3. A Gemini-powered expense workflow.
4. Pasted M-PESA statement text converted into categories and advice.
5. A GitHub repository containing the working MVP.
6. Optional Daraja Sandbox STK Push extension.

## What the app does once working

1. The user opens the web app.
2. The user enters a question or pastes M-PESA statement text.
3. The Next.js frontend sends the request to the Express API.
4. The Express API runs the `ExpenseAnalysisWorkflow`.
5. The workflow calls the `ExpenseAdvisorAgent`.
6. The agent uses reusable skills:
   - `ParseMpesaSkill`
   - `CategorizeSkill`
   - `BudgetMathSkill`
   - optional `DarajaStkPushSkill`
7. Gemini generates a structured response.
8. The frontend displays the analysis and recommendations.

## Example user journey

```text
Participant pastes:
NAIVAS SUPERMARKET - KES 2,400
UBER - KES 680
JAVA HOUSE - KES 1,250
SAFARICOM AIRTIME - KES 500

The app responds with:
- Food and restaurants are the largest variable expense.
- Transport is moderate but can be optimised.
- Airtime/data should be budgeted weekly.
- Suggested monthly savings target: KES 3,000–5,000.
- Practical actions: meal planning, fare comparison, weekly spending caps.
```

## Workshop positioning

This is not only a Next.js or Gemini workshop. It is an **AI engineering workflow** workshop. Participants learn how to use coding agents and prepared skills to scaffold software faster, while still understanding the architecture they are deploying.
