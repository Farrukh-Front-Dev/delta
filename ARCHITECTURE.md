# Architecture Documentation

## Overview

This is a monorepo containing a dopamine-driven productivity platform with a Next.js frontend and Express backend.

## Project Structure

```
dopamine-platform/
├── apps/
│   ├── web/                    # Next.js frontend application
│   │   ├── app/               # Next.js App Router pages
│   │   │   ├── layout.tsx     # Root layout with fonts
│   │   │   ├── page.tsx       # Home page
│   │   │   └── globals.css    # Global styles with design tokens
│   │   └── src/
│   │       ├── components/
│   │       │   ├── ui/        # Atomic UI components (Button, Card, Input, Progress)
│   │       │   ├── layout/    # Layout components (Container, PageLayout)
│   │       │   └── features/  # Feature-specific components (Phase 2+)
│   │       ├── stores/        # Zustand state management
│   │       │   ├── useTaskStore.ts
│   │       │   └── useUserStore.ts
│   │       ├── hooks/         # Custom React hooks
│   │       │   └── useAnimatedCounter.ts
│   │       ├── lib/
│   │       │   ├── animations/
│   │       │   │   ├── constants.ts  # Spring configs, durations, easings
│   │       │   │   └── variants.ts   # Reusable animation variants
│   │       │   ├── api/
│   │       │   │   └── client.ts     # Type-safe API client
│   │       │   └── utils/
│   │       │       ├── cn.ts         # Tailwind class merger
│   │       │       └── glow.ts       # Glow effect utilities
│   │       ├── types/         # TypeScript definitions
│   │       │   └── index.ts
│   │       ├── styles/        # Design tokens
│   │       │   └── tokens.ts  # Colors, spacing, typography, shadows
│   │       └── config/        # App configuration
│   │           └── app.ts
│   │
│   └── api/                   # Express backend application
│       ├── src/
│       │   ├── modules/       # Domain modules
│       │   │   ├── health/    # Health check endpoint
│       │   │   ├── auth/      # Authentication (Phase 2+)
│       │   │   ├── users/     # User management (Phase 2+)
│       │   │   ├── tasks/     # Task management (Phase 2+)
│       │   │   ├── streaks/   # Streak tracking (Phase 2+)
│       │   │   └── xp/        # XP system (Phase 2+)
│       │   ├── config/
│       │   │   └── env.ts     # Environment configuration
│       │   ├── lib/
│       │   │   └── prisma.ts  # Prisma client singleton
│       │   ├── middlewares/
│       │   │   └── errorHandler.ts  # Global error handling
│       │   ├── utils/
│       │   │   └── asyncHandler.ts  # Async route wrapper
│       │   ├── types/
│       │   │   └── index.ts
│       │   ├── app.ts         # Express app configuration
│       │   └── server.ts      # Server entry point
│       └── prisma/
│           └── schema.prisma  # Database schema
│
├── package.json               # Root workspace configuration
└── README.md                  # Project documentation
```

## Technology Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **TailwindCSS 4** - Utility-first styling
- **Framer Motion** - Animation library
- **Zustand** - Lightweight state management
- **Lucide React** - Icon library

### Backend
- **Express.js** - Web framework
- **TypeScript** - Type safety
- **Prisma** - ORM for database access
- **PostgreSQL** - Database (configured, not yet connected)

### Development
- **Concurrently** - Run multiple dev servers
- **ts-node-dev** - TypeScript execution with hot reload

## Architecture Decisions

### Frontend Architecture

#### 1. Feature-Based Organization
Components are organized by responsibility rather than type:
- `ui/` - Reusable, atomic components
- `layout/` - Page structure components
- `features/` - Domain-specific feature modules

**Why:** Scales better than flat component folders. Features can be developed and tested independently.

#### 2. Zustand for State Management
Lightweight alternative to Redux with minimal boilerplate.

**Why:** 
- Simple API
- No providers needed
- TypeScript-first
- Perfect for this app's state complexity

#### 3. Animation System
Centralized animation constants and variants in `lib/animations/`.

**Why:**
- Consistent motion across the app
- Easy to adjust timing globally
- Reusable animation patterns
- Performance optimization through shared configs

#### 4. Design Tokens
All design values (colors, spacing, typography) in `styles/tokens.ts`.

**Why:**
- Single source of truth
- Prevents magic values
- Easy theme adjustments
- Type-safe design system

#### 5. API Client Pattern
Type-safe API client with centralized error handling.

**Why:**
- Consistent request/response handling
- Easy to add auth headers later
- Type safety with backend contracts
- Centralized error handling

### Backend Architecture

#### 1. Modular Domain Structure
Each domain (auth, tasks, xp) is a self-contained module.

**Module structure:**
```
module/
├── controller.ts   # HTTP handlers
├── service.ts      # Business logic
├── routes.ts       # Route definitions
├── validation.ts   # Input validation
└── types.ts        # Module-specific types
```

**Why:**
- Clear separation of concerns
- Easy to test in isolation
- Scales horizontally
- Team members can work on different modules without conflicts

#### 2. Async Handler Wrapper
Eliminates try-catch boilerplate in route handlers.

**Why:**
- Cleaner controller code
- Consistent error handling
- Automatic error forwarding to middleware

#### 3. Custom Error Class
`AppError` for operational errors with status codes.

**Why:**
- Distinguishes operational errors from programmer errors
- Consistent error responses
- Proper HTTP status codes

#### 4. Prisma Client Singleton
Single Prisma instance with connection pooling.

**Why:**
- Prevents connection exhaustion
- Development hot-reload safety
- Production optimization

## Design System

### Color Palette
- **Background:** Pure black (#000000) for premium feel
- **Accent:** Purple (#8b5cf6) for primary actions
- **Success:** Green (#10b981) for completion feedback
- **Text:** White with zinc variants for hierarchy

### Animation Principles
- **Spring animations** for organic feel
- **60fps target** for all interactions
- **Immediate feedback** on user actions
- **Smooth transitions** between states

### Spacing Scale
Consistent 8px-based spacing system (xs: 8px, sm: 12px, md: 16px, lg: 24px, xl: 32px, etc.)

## Performance Considerations

### Frontend
- **Code splitting** via Next.js automatic chunking
- **Image optimization** via Next.js Image component
- **Animation performance** via Framer Motion's hardware acceleration
- **Minimal rerenders** via Zustand's selector pattern

### Backend
- **Connection pooling** via Prisma
- **Async/await** for non-blocking operations
- **Error boundaries** prevent server crashes
- **Modular loading** for faster cold starts

## Development Workflow

### Running the Project
```bash
npm run dev          # Both frontend and backend
npm run dev:web      # Frontend only (port 3000)
npm run dev:api      # Backend only (port 4000)
```

### Building
```bash
npm run build        # Build all
npm run build:web    # Build frontend
npm run build:api    # Build backend
```

### Database
```bash
cd apps/api
npm run prisma:generate  # Generate Prisma client
npm run prisma:migrate   # Run migrations
npm run prisma:studio    # Open Prisma Studio
```

## Scalability Strategy

### Frontend
- Feature modules can be lazy-loaded
- UI components are atomic and reusable
- State is domain-separated
- Animation system is centralized

### Backend
- Modules can be extracted to microservices
- Service layer isolates business logic
- Database queries are optimized via Prisma
- Horizontal scaling via stateless design

## Security Considerations

### Current
- CORS configured
- Environment variables for secrets
- TypeScript for type safety
- Input validation ready (to be implemented)

### Future (Phase 2+)
- JWT authentication
- Rate limiting
- Input sanitization
- SQL injection prevention (via Prisma)
- XSS prevention (via React)

## Testing Strategy (Future)

### Frontend
- Unit tests for utilities and hooks
- Component tests for UI components
- Integration tests for features
- E2E tests for critical flows

### Backend
- Unit tests for services
- Integration tests for API endpoints
- Database tests with test containers

## Deployment Strategy

### Frontend (Vercel)
- Automatic deployments from main branch
- Preview deployments for PRs
- Edge network for global performance
- Environment variables via Vercel dashboard

### Backend (Railway/Render)
- Automatic deployments from main branch
- PostgreSQL database provisioning
- Environment variables via platform
- Health check endpoint for monitoring

## Next Steps (Phase 2)

1. **Database Schema** - Define User, Task, Streak, XP models
2. **Authentication** - JWT-based auth system
3. **Task CRUD** - Create, read, update, delete tasks
4. **Completion Animation** - Rewarding task completion feedback
5. **XP System** - Points and leveling mechanics
6. **Streak Tracking** - Daily consistency rewards

## Engineering Principles Applied

✅ **Separation of Concerns** - Clear boundaries between layers
✅ **DRY (Don't Repeat Yourself)** - Reusable utilities and components
✅ **SOLID Principles** - Single responsibility, dependency injection
✅ **Type Safety** - Strict TypeScript throughout
✅ **Performance First** - Optimized for perceived speed
✅ **Developer Experience** - Clear structure, good tooling
✅ **Maintainability** - Readable code, consistent patterns
✅ **Scalability** - Modular architecture ready to grow
