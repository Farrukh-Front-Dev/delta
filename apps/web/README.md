# Dopamine Web

Production-ready Next.js frontend with authentication and dopamine-driven UX.

## Features

- ✅ **Authentication**: Login, signup, logout with JWT
- ✅ **Protected Routes**: Dashboard requires authentication
- ✅ **Smooth Animations**: Framer Motion with performance optimization
- ✅ **State Management**: Zustand with granular selectors
- ✅ **Design System**: Centralized tokens and reusable components
- ✅ **Performance**: Motion budget architecture, memoization, profiling
- ✅ **Type Safety**: Full TypeScript coverage

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Update `NEXT_PUBLIC_API_URL` to point to your backend:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

### 3. Start Development Server

```bash
npm run dev
```

App will start on `http://localhost:3000`

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   └── dashboard/         # Protected dashboard
├── components/
│   ├── auth/              # Auth components (forms, protected route)
│   ├── ui/                # Reusable UI components
│   ├── features/          # Feature-specific components
│   └── layout/            # Layout components
├── stores/                # Zustand state management
│   ├── useAuthStore.ts    # Authentication state
│   ├── useUserStore.ts    # User data (deprecated - use auth store)
│   └── useTaskStore.ts    # Task management
├── hooks/                 # Custom React hooks
│   ├── useAuth.ts         # Auth operations hook
│   └── useDashboardInit.ts
├── lib/
│   ├── api/               # API client
│   │   ├── client.ts      # Base API client
│   │   └── auth.api.ts    # Auth API methods
│   ├── animations/        # Framer Motion utilities
│   ├── audio/             # Sound effects
│   ├── performance/       # Performance monitoring
│   └── utils/             # Utility functions
├── styles/                # Design tokens
└── types/                 # TypeScript definitions
```

## Authentication Flow

### 1. User visits app
- Redirected to `/login` if not authenticated
- Redirected to `/dashboard` if authenticated

### 2. User signs up
- `POST /api/auth/signup` with email, password, name
- JWT token stored in httpOnly cookie
- User redirected to dashboard

### 3. User logs in
- `POST /api/auth/login` with email, password
- JWT token stored in httpOnly cookie
- User redirected to dashboard

### 4. Protected routes
- Dashboard wrapped in `<ProtectedRoute>`
- Checks authentication on mount
- Redirects to login if not authenticated

### 5. User logs out
- `POST /api/auth/logout` clears cookie
- Local state cleared
- User redirected to login

## Design System Rules (CLAUDE.md)

### Colors
- ✅ Use semantic classes: `bg-primary`, `text-muted`, `bg-surface`
- ❌ No hardcoded hex values in components
- ✅ Use CSS variables: `var(--color-primary)`

### Spacing
- ✅ Use Tailwind spacing scale
- ❌ No custom pixel values

### Animations
- ✅ Use centralized animation constants
- ✅ Maintain 60fps
- ❌ No random timing values

### Components
- ✅ Reusable and theme-aware
- ✅ Follow existing patterns
- ❌ No one-off styling

## Performance Optimization

### Motion Budget Architecture
- Limits concurrent animations
- Prevents performance degradation
- See `src/lib/performance/profiler.ts`

### Granular Zustand Selectors
```typescript
// ✅ Good - only re-renders when user.xp changes
const xp = useAuthStore((state) => state.user?.xp);

// ❌ Bad - re-renders on any auth store change
const { user } = useAuthStore();
```

### Memoization
- Use `useMemo` for expensive computations
- Use `useCallback` for stable function references
- See dashboard page for examples

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Components

### Auth Components
- `<LoginForm />` - Login form with validation
- `<SignupForm />` - Signup form with password strength
- `<ProtectedRoute />` - Route wrapper for authentication

### UI Components
- `<Button />` - Animated button with variants
- `<Input />` - Styled input field
- `<FormError />` - Animated error message
- `<Card />` - Container component
- `<Progress />` - Progress bar

### Feature Components
- `<EnergyCore />` - Animated progress visualization
- `<TaskList />` - Task list with animations
- `<TaskItem />` - Individual task with completion animation
- `<StatsBar />` - User stats display
- `<CompletionCelebration />` - Task completion animation

## State Management

### Auth Store
```typescript
const { user, isAuthenticated, isLoading } = useAuthStore();
```

### Task Store
```typescript
const { tasks, addTask, toggleTask } = useTaskStore();
```

## API Integration

All API calls use `credentials: 'include'` to send cookies:

```typescript
// Login
await authApi.login({ email, password });

// Get current user
const user = await authApi.getMe();

// Logout
await authApi.logout();
```

## Security

- ✅ JWT tokens in httpOnly cookies (not localStorage)
- ✅ CORS configured for backend only
- ✅ Password validation on frontend
- ✅ Protected routes with auth check
- ✅ Automatic redirect on auth failure

## Future Enhancements

- [ ] Task API integration (currently in-memory)
- [ ] Real-time XP updates
- [ ] Profile page
- [ ] Password reset
- [ ] Email verification
- [ ] OAuth (Google, GitHub)
- [ ] Dark/light theme toggle
- [ ] Accessibility improvements

## Troubleshooting

### "Authentication required" error
- Make sure backend is running on `http://localhost:4000`
- Check that `NEXT_PUBLIC_API_URL` is set correctly
- Verify CORS is configured on backend

### Tasks not persisting
- Tasks are currently in-memory only
- Will be integrated with backend API in future

### Animations stuttering
- Check Performance Panel (bottom right)
- Reduce concurrent animations
- Check browser DevTools Performance tab
