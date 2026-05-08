# Dopamine - Discipline Made Satisfying

A dopamine-driven productivity platform focused on emotional reward and addictive completion feedback.

## Project Structure

```
dopamine-platform/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # Express backend
└── package.json      # Root workspace config
```

## Tech Stack

### Frontend
- Next.js 16 (App Router)
- TypeScript
- TailwindCSS 4
- Framer Motion
- Zustand
- Lucide React

### Backend
- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL

## Getting Started

### Prerequisites
- Node.js 20+
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:

**Frontend** (`apps/web/.env`):
```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

**Backend** (`apps/api/.env`):
```
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/dopamine_db?schema=public"
```

### Development

Run both frontend and backend:
```bash
npm run dev
```

Run individually:
```bash
npm run dev:web   # Frontend only
npm run dev:api   # Backend only
```

### Build

```bash
npm run build        # Build all
npm run build:web    # Build frontend
npm run build:api    # Build backend
```

## Architecture

### Frontend Structure
```
apps/web/src/
├── app/              # Next.js pages
├── components/
│   ├── ui/          # Reusable UI components
│   ├── layout/      # Layout components
│   └── features/    # Feature-specific components
├── stores/          # Zustand state management
├── hooks/           # Custom React hooks
├── lib/
│   ├── animations/  # Framer Motion utilities
│   ├── api/         # API client
│   └── utils/       # Utility functions
├── types/           # TypeScript definitions
├── styles/          # Design tokens
└── config/          # App configuration
```

### Backend Structure
```
apps/api/src/
├── modules/
│   ├── auth/
│   ├── users/
│   ├── tasks/
│   ├── streaks/
│   └── xp/
├── config/          # Environment config
├── lib/             # Prisma client
├── middlewares/     # Express middlewares
├── utils/           # Utility functions
└── types/           # TypeScript definitions
```

## Design Philosophy

This is NOT a basic todo app. This is a dopamine-driven productivity platform focused on:
- Emotional reward
- Visual progression
- Addictive completion feedback
- Smooth interactions
- Cinematic UI feedback
- Habit reinforcement through motion and gamification

**Core principle:** Make discipline emotionally satisfying.

## Development Status

✅ Phase 1: Foundation Setup (Complete)
- Frontend architecture configured
- Backend architecture configured
- Design system foundation
- Animation system ready
- Development tooling configured

🔜 Phase 2: Core Features (Upcoming)
- Task management
- Completion animations
- Progress tracking
- XP system
- Streak tracking

## License

Private project
