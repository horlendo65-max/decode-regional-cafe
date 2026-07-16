# Architecture

The browser calls a separate Express API. Secrets remain server-side. The workflow combines deterministic skills with one generative agent call.

- **Parse skill:** extracts candidate transactions from pasted text.
- **Category skill:** applies transparent workshop rules.
- **Budget math skill:** calculates totals and category percentages.
- **Advisor agent:** asks Gemini for narrative insights using already-calculated figures.
- **Daraja skill:** optional sandbox STK Push; not part of the default analysis path.

For production, use a robust statement parser, explicit consent, data minimization, retention controls, rate limiting, authentication, audit logging and human review appropriate to the domain.
