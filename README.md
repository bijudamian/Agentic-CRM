# Agentic CRM

> AI-powered CRM with agentic workflows — built on Next.js & Firebase

[![Live Demo](https://img.shields.io/badge/Live%20Demo-crm--murex--zeta.vercel.app-blue?style=for-the-badge&logo=vercel)](https://crm-murex-zeta.vercel.app)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=firebase)](https://firebase.google.com)

## Overview

Agentic CRM is a modern customer relationship management platform enhanced with AI agentic workflows. It enables intelligent automation of sales pipelines, customer follow-ups, and data enrichment through autonomous AI agents.

## Features

- **Agentic AI Workflows** — autonomous agents handle lead scoring, follow-up scheduling, and task generation
- **Real-time Database** — powered by Firebase for instant sync across sessions
- **Customer Pipeline** — visual kanban-style deal tracker
- **Smart Insights** — AI-generated summaries and action items per contact
- **Middleware Auth** — protected routes with Next.js middleware
- **Responsive UI** — mobile-first design with modern component architecture

## Tech Stack

| Layer | Tech |
|---|---|
| Frontend | Next.js 14, TypeScript, TailwindCSS |
| Backend | Firebase Firestore, Firebase Auth |
| AI | OpenAI API (agentic workflows) |
| Deployment | Vercel |

## Getting Started

```bash
# Clone the repo
git clone https://github.com/bijudamian/Agentic-CRM.git
cd Agentic-CRM

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env.local
# Add your Firebase config and OpenAI API key

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
OPENAI_API_KEY=
```

## Project Structure

```
Agentic-CRM/
├── app/          # Next.js app router pages
├── components/   # Reusable UI components
├── hooks/        # Custom React hooks
├── lib/          # Firebase config & utilities
├── styles/       # Global styles
└── middleware.ts  # Auth route protection
```

## License

MIT © [Biju Damian](https://github.com/bijudamian)
