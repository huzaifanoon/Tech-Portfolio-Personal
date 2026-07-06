# Muhammad Huzaifa Portfolio

Personal portfolio for Muhammad Huzaifa, focused on mobile engineering, full-stack project work, and selected achievements.

## Highlights

- Porcelain/deep teal/clay light theme plus an aubergine black/moss dark theme.
- Recruiter-first structure: hero proof chips, selected projects, achievements, skills, work experience, education, and contact.
- Secure AI portfolio assistant routed through `/api/chat` so the Groq API key stays server-side.
- Project cards with public repository links where available and honest GitHub/profile backlinks where a repo is not public.
- Responsive layout for desktop and mobile screens.

## Stack

- HTML5
- CSS3 with custom properties
- Tailwind CDN utilities
- Vanilla JavaScript
- Vercel-style serverless chat endpoint

## Local Development

Create `.env.local` with:

```text
GROQ_API_KEY=your_key_here
```

Run:

```bash
node dev.mjs
```

Open the URL printed in the terminal:

```text
http://localhost:8080
```

If another process is already using 8080, the dev server automatically tries the next port, such as `http://localhost:8081`.

## Notes

The AI assistant depends on the local `/api/chat` endpoint in development and the same endpoint when deployed on Vercel. Do not place API keys in client-side JavaScript.
