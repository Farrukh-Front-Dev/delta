# Authentication Implementation Prompt for Claude Sonnet

## Context

You are a **Senior Full-Stack Engineer** tasked with implementing a production-ready authentication system for a dopamine-driven productivity platform called "Dopamine".

---

## Your Mission

Implement a complete, secure, professional authentication system following industry best practices. This is NOT a tutorial project - this is production code that will handle real user data.

---

## Step 1: Project Analysis (CRITICAL - DO THIS FIRST)

Before writing ANY code, you MUST:

1. **Read the entire codebase structure:**
   - Read `README.md` to understand the project
   - Read `apps/web/AGENTS.md` for engineering standards
   - Read `apps/web/CLAUDE.md` for design system rules
   - Read `SENIOR_AUDIT_REPORT.md` to understand current issues
   - Explore `apps/api/src/` to understand backend architecture
   - Explore `apps/web/src/` to understand frontend architecture

2. **Understand the current state:**
   - What exists: Frontend with Zustand stores, UI components, dashboard
   - What's missing: Backend implementation, data persistence, auth
   - Current tech stack: Next.js 16, Express, Prisma, PostgreSQL, Zustand
   - Current architecture: Monorepo with apps/web and apps/api

3. **Read the requirements:**
   - Read `.kiro/specs/authentication-system/requirements.md` COMPLETELY
   - Understand all user stories
   - Understand all acceptance criteria
   - Understand all technical requirements
   - Understand all security requirements

4. **Confirm understanding:**
   - Summarize what you're about to build
   - List the main components you'll create
   - Identify potential challenges
   - Ask clarifying questions if needed

---

## Step 2: Implementation Plan

After understanding the project, create a detailed implementation plan:

### Backend Implementation Order:
1. Update Prisma schema (User, Task models)
2. Install required dependencies
3. Create auth utilities (hash, JWT)
4. Create validation schemas (Zod)
5. Create auth service (business logic)
6. Create auth controller (request handlers)
7. Create auth routes
8. Create auth middleware
9. Update app.ts with new routes
10. Test endpoints manually

### Frontend Implementation Order:
1. Create auth store (Zustand)
2. Create auth API client methods
3. Create login page UI
4. Create signup page UI
5. Create protected route wrapper
6. Update dashboard to use auth
7. Add loading states
8. Add error handling
9. Test auth flow end-to-end

---

## Step 3: Implementation Standards

### Code Quality Requirements:

**Backend:**
- ✅ Use TypeScript strict mode
- ✅ Follow modular architecture (controller → service → repository)
- ✅ Validate ALL inputs with Zod
- ✅ Hash passwords with bcrypt (10 rounds)
- ✅ Use JWT with httpOnly cookies
- ✅ Add proper error handling
- ✅ Add rate limiting
- ✅ Never log sensitive data
- ✅ Follow existing code style

**Frontend:**
- ✅ Follow design system (CLAUDE.md rules)
- ✅ Use Zustand for state management
- ✅ Add loading states for all async operations
- ✅ Add error boundaries
- ✅ Show clear error messages
- ✅ Use existing UI components
- ✅ Follow existing animation patterns
- ✅ Maintain performance (< 16ms renders)

### Security Requirements (NON-NEGOTIABLE):
- ✅ Passwords MUST be hashed with bcrypt
- ✅ JWT MUST be in httpOnly cookies (NOT localStorage)
- ✅ Rate limiting MUST be implemented
- ✅ Input validation MUST use Zod
- ✅ CORS MUST be configured properly
- ✅ SQL injection protection (Prisma handles this)
- ✅ XSS protection (sanitize inputs)
- ✅ CSRF protection (SameSite cookies)

---

## Step 4: File Structure

### Backend Files to Create:

```
apps/api/src/
├── modules/
│   └── auth/
│       ├── auth.controller.ts      # Request handlers
│       ├── auth.service.ts         # Business logic
│       ├── auth.routes.ts          # Route definitions
│       ├── auth.validation.ts      # Zod schemas
│       └── auth.types.ts           # TypeScript types
├── middlewares/
│   ├── auth.middleware.ts          # JWT verification
│   ├── rateLimiter.middleware.ts   # Rate limiting
│   └── validation.middleware.ts    # Request validation
├── utils/
│   ├── jwt.util.ts                 # JWT helpers
│   ├── hash.util.ts                # Password hashing
│   └── sanitize.util.ts            # Input sanitization
└── config/
    └── auth.config.ts              # Auth configuration
```

### Frontend Files to Create:

```
apps/web/
├── app/
│   ├── login/
│   │   └── page.tsx                # Login page
│   ├── signup/
│   │   └── page.tsx                # Signup page
│   └── (protected)/
│       └── dashboard/
│           └── page.tsx            # Protected dashboard
├── src/
│   ├── stores/
│   │   └── useAuthStore.ts         # Auth state management
│   ├── components/
│   │   ├── auth/
│   │   │   ├── LoginForm.tsx       # Login form component
│   │   │   ├── SignupForm.tsx      # Signup form component
│   │   │   └── ProtectedRoute.tsx  # Route wrapper
│   │   └── ui/
│   │       └── FormError.tsx       # Error message component
│   ├── lib/
│   │   └── api/
│   │       └── auth.api.ts         # Auth API methods
│   └── hooks/
│       └── useAuth.ts              # Auth hook
```

---

## Step 5: Implementation Checklist

### Phase 1: Backend Core
- [ ] Update `apps/api/prisma/schema.prisma` with User and Task models
- [ ] Run `npx prisma migrate dev --name add_auth`
- [ ] Install dependencies: bcryptjs, jsonwebtoken, zod, express-rate-limit, cookie-parser
- [ ] Create `apps/api/src/utils/hash.util.ts`
- [ ] Create `apps/api/src/utils/jwt.util.ts`
- [ ] Create `apps/api/src/config/auth.config.ts`

### Phase 2: Auth Module
- [ ] Create `apps/api/src/modules/auth/auth.types.ts`
- [ ] Create `apps/api/src/modules/auth/auth.validation.ts`
- [ ] Create `apps/api/src/modules/auth/auth.service.ts`
- [ ] Create `apps/api/src/modules/auth/auth.controller.ts`
- [ ] Create `apps/api/src/modules/auth/auth.routes.ts`

### Phase 3: Middleware
- [ ] Create `apps/api/src/middlewares/auth.middleware.ts`
- [ ] Create `apps/api/src/middlewares/rateLimiter.middleware.ts`
- [ ] Create `apps/api/src/middlewares/validation.middleware.ts`
- [ ] Update `apps/api/src/app.ts` with cookie-parser and auth routes

### Phase 4: Frontend Auth Store
- [ ] Create `apps/web/src/stores/useAuthStore.ts`
- [ ] Create `apps/web/src/lib/api/auth.api.ts`
- [ ] Update `apps/web/src/lib/api/client.ts` to include auth token

### Phase 5: Frontend UI
- [ ] Create `apps/web/src/components/auth/LoginForm.tsx`
- [ ] Create `apps/web/src/components/auth/SignupForm.tsx`
- [ ] Create `apps/web/src/components/auth/ProtectedRoute.tsx`
- [ ] Create `apps/web/app/login/page.tsx`
- [ ] Create `apps/web/app/signup/page.tsx`
- [ ] Update `apps/web/app/dashboard/page.tsx` to be protected

### Phase 6: Integration
- [ ] Connect frontend auth store to backend API
- [ ] Test signup flow
- [ ] Test login flow
- [ ] Test protected routes
- [ ] Test logout flow
- [ ] Add error handling
- [ ] Add loading states

### Phase 7: Polish
- [ ] Add form validation feedback
- [ ] Add success messages
- [ ] Add error boundaries
- [ ] Test edge cases
- [ ] Security audit
- [ ] Update README with auth setup

---

## Step 6: Testing Protocol

After implementation, test these scenarios:

### Happy Path:
1. ✅ User can signup with valid email/password
2. ✅ User is automatically logged in after signup
3. ✅ User can logout
4. ✅ User can login with correct credentials
5. ✅ User can access dashboard when authenticated
6. ✅ Token persists across page refresh

### Error Cases:
1. ✅ Signup with existing email shows error
2. ✅ Login with wrong password shows error
3. ✅ Login with non-existent email shows error
4. ✅ Accessing dashboard without auth redirects to login
5. ✅ Invalid token is rejected
6. ✅ Expired token triggers re-authentication

### Security:
1. ✅ Password is hashed in database
2. ✅ Token is in httpOnly cookie
3. ✅ Rate limiting works (try 6 failed logins)
4. ✅ CORS blocks unauthorized origins
5. ✅ SQL injection attempts are blocked
6. ✅ XSS attempts are sanitized

---

## Step 7: Documentation

After implementation, document:

1. **API Endpoints:**
   - List all auth endpoints
   - Request/response examples
   - Error codes and messages

2. **Environment Variables:**
   - Required variables
   - Example values
   - Security notes

3. **Setup Instructions:**
   - How to run migrations
   - How to seed test user
   - How to test auth flow

---

## Critical Rules

### DO:
- ✅ Read the entire codebase FIRST
- ✅ Follow existing code patterns
- ✅ Use TypeScript strictly
- ✅ Validate ALL inputs
- ✅ Hash ALL passwords
- ✅ Use httpOnly cookies for tokens
- ✅ Add rate limiting
- ✅ Handle errors gracefully
- ✅ Show loading states
- ✅ Test thoroughly

### DON'T:
- ❌ Store tokens in localStorage
- ❌ Log sensitive data (passwords, tokens)
- ❌ Skip input validation
- ❌ Use plain text passwords
- ❌ Ignore error cases
- ❌ Skip security measures
- ❌ Break existing functionality
- ❌ Ignore design system rules
- ❌ Add unnecessary dependencies
- ❌ Over-engineer solutions

---

## Success Criteria

Your implementation is successful when:

1. ✅ All user stories are implemented
2. ✅ All acceptance criteria are met
3. ✅ All security requirements are satisfied
4. ✅ Code follows existing patterns
5. ✅ No TypeScript errors
6. ✅ No console errors
7. ✅ All tests pass
8. ✅ Documentation is complete
9. ✅ Senior developer would approve in code review

---

## Your First Response Should Be:

1. "I have read and understood the codebase"
2. Summary of current project state
3. Summary of what you will implement
4. List of files you will create/modify
5. Any questions or clarifications needed
6. Confirmation you're ready to start

---

## Remember

You are a **Senior Engineer**. This is **production code**. Security is **non-negotiable**. User experience is **critical**. Code quality **matters**.

Take your time. Do it right. Ask questions if unclear.

**Ready? Start by reading the codebase.**
