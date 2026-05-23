# Authentication System Requirements

## Overview

Implement a complete, production-ready authentication system for the Dopamine productivity platform. The system must be secure, user-friendly, and integrate seamlessly with the existing frontend architecture.

---

## User Stories

### 1. User Registration
**As a new user**  
**I want to** create an account with email and password  
**So that** I can save my tasks and progress across devices

**Acceptance Criteria:**
- User can register with email, password, and optional name
- Email must be unique and valid format
- Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number
- Password is hashed before storage (bcrypt)
- User receives JWT token upon successful registration
- User is automatically logged in after registration
- Validation errors are shown clearly
- Duplicate email shows friendly error message

---

### 2. User Login
**As a returning user**  
**I want to** log in with my email and password  
**So that** I can access my saved tasks and progress

**Acceptance Criteria:**
- User can login with email and password
- Invalid credentials show clear error message
- Successful login returns JWT token
- Token is stored securely in httpOnly cookie
- User is redirected to dashboard after login
- "Remember me" option extends token expiry
- Failed login attempts are rate-limited (5 attempts per 15 minutes)

---

### 3. Protected Routes
**As a logged-in user**  
**I want** dashboard and tasks to be protected  
**So that** only I can access my data

**Acceptance Criteria:**
- Unauthenticated users redirected to login page
- JWT token validated on every protected route
- Expired tokens trigger re-authentication
- Invalid tokens are rejected with 401 status
- Protected API endpoints require valid token
- Frontend shows loading state during auth check

---

### 4. User Logout
**As a logged-in user**  
**I want to** log out securely  
**So that** my account is protected on shared devices

**Acceptance Criteria:**
- Logout clears JWT token from cookies
- Logout clears user state from frontend
- User is redirected to login page
- Logout works even if token is expired
- All user data is cleared from memory

---

### 5. Persistent Sessions
**As a user**  
**I want** to stay logged in across browser sessions  
**So that** I don't have to login every time

**Acceptance Criteria:**
- JWT token persists in httpOnly cookie
- Token is validated on app load
- User is auto-logged in if token is valid
- Expired tokens trigger login page
- Token refresh mechanism for long sessions

---

### 6. User Profile
**As a logged-in user**  
**I want to** view and update my profile  
**So that** I can manage my account information

**Acceptance Criteria:**
- User can view their email, name, XP, level, streak
- User can update their name
- User can change their password (requires current password)
- Email cannot be changed (security)
- Profile updates are validated
- Success/error messages shown clearly

---

## Technical Requirements

### Backend (Express + Prisma)

#### 1. Database Schema
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String?
  xp        Int      @default(0)
  level     Int      @default(1)
  streak    Int      @default(0)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  tasks     Task[]
}

model Task {
  id          String   @id @default(uuid())
  title       String
  completed   Boolean  @default(false)
  xpValue     Int      @default(25)
  userId      String
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt   DateTime @default(now())
  completedAt DateTime?
}
```

#### 2. Auth Endpoints
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user
- `PUT /api/auth/profile` - Update profile
- `PUT /api/auth/password` - Change password

#### 3. Security Requirements
- Passwords hashed with bcrypt (salt rounds: 10)
- JWT tokens with 7-day expiry
- httpOnly cookies for token storage
- CORS configured for frontend origin only
- Rate limiting on auth endpoints
- Input validation with Zod
- SQL injection protection (Prisma handles this)
- XSS protection (sanitize inputs)

#### 4. Middleware
- `authMiddleware` - Verify JWT token
- `validateRequest` - Validate request body with Zod
- `rateLimiter` - Rate limit auth endpoints
- `errorHandler` - Centralized error handling

---

### Frontend (Next.js + Zustand)

#### 1. Auth Pages
- `/login` - Login page
- `/signup` - Signup page
- `/` - Landing page (public)
- `/dashboard` - Protected dashboard

#### 2. Auth State Management
```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}
```

#### 3. Protected Route Wrapper
```typescript
// Wrap protected pages
<ProtectedRoute>
  <DashboardPage />
</ProtectedRoute>
```

#### 4. API Client Updates
- Add JWT token to all requests
- Handle 401 responses (redirect to login)
- Retry failed requests after token refresh
- Show loading states during auth operations

---

## Implementation Plan

### Phase 1: Backend Foundation (Week 1)
1. ✅ Update Prisma schema
2. ✅ Run migrations
3. ✅ Install dependencies (bcryptjs, jsonwebtoken, zod)
4. ✅ Create auth module structure
5. ✅ Implement password hashing utility
6. ✅ Implement JWT utility

### Phase 2: Auth Endpoints (Week 1)
1. ✅ POST /api/auth/signup
2. ✅ POST /api/auth/login
3. ✅ POST /api/auth/logout
4. ✅ GET /api/auth/me
5. ✅ Add validation schemas (Zod)
6. ✅ Add error handling

### Phase 3: Middleware & Security (Week 1)
1. ✅ Auth middleware (JWT verification)
2. ✅ Rate limiting middleware
3. ✅ CORS configuration
4. ✅ Input sanitization
5. ✅ Error handler updates

### Phase 4: Frontend Auth (Week 2)
1. ✅ Create auth store (Zustand)
2. ✅ Create login page
3. ✅ Create signup page
4. ✅ Create protected route wrapper
5. ✅ Update API client with auth
6. ✅ Add loading states

### Phase 5: Integration (Week 2)
1. ✅ Connect frontend to backend
2. ✅ Test auth flow end-to-end
3. ✅ Add error handling
4. ✅ Add success messages
5. ✅ Update existing stores to use auth

### Phase 6: Polish & Testing (Week 2)
1. ✅ Add form validation
2. ✅ Add loading spinners
3. ✅ Add error boundaries
4. ✅ Test edge cases
5. ✅ Security audit

---

## Security Considerations

### 1. Password Security
- Minimum 8 characters
- Require uppercase, lowercase, number
- Hash with bcrypt (salt rounds: 10)
- Never log passwords
- Never return passwords in API responses

### 2. Token Security
- JWT with 7-day expiry
- Store in httpOnly cookies (not localStorage)
- Include user ID and email in payload
- Sign with strong secret (32+ characters)
- Validate on every protected request

### 3. Rate Limiting
- Login: 5 attempts per 15 minutes per IP
- Signup: 3 attempts per hour per IP
- Password reset: 3 attempts per hour per email

### 4. Input Validation
- Validate all inputs with Zod
- Sanitize user inputs
- Reject malformed requests
- Return clear error messages

### 5. CORS
- Allow only frontend origin
- Enable credentials (cookies)
- Restrict methods to needed ones

---

## Error Handling

### Backend Errors
- `400` - Bad Request (validation failed)
- `401` - Unauthorized (invalid/missing token)
- `403` - Forbidden (valid token, insufficient permissions)
- `404` - Not Found (user not found)
- `409` - Conflict (email already exists)
- `429` - Too Many Requests (rate limited)
- `500` - Internal Server Error

### Frontend Error Messages
- "Invalid email or password" (login failed)
- "Email already registered" (signup conflict)
- "Password must be at least 8 characters" (validation)
- "Session expired, please login again" (token expired)
- "Too many attempts, try again later" (rate limited)

---

## Testing Requirements

### Backend Tests
- Unit tests for auth utilities (hash, JWT)
- Integration tests for auth endpoints
- Test invalid inputs
- Test rate limiting
- Test token expiry

### Frontend Tests
- Test login flow
- Test signup flow
- Test protected routes
- Test logout
- Test token refresh

---

## Success Criteria

### Functional
- [ ] User can signup with email/password
- [ ] User can login with credentials
- [ ] User can logout
- [ ] Protected routes require authentication
- [ ] Token persists across sessions
- [ ] Invalid tokens are rejected
- [ ] User profile can be viewed/updated

### Security
- [ ] Passwords are hashed
- [ ] Tokens are in httpOnly cookies
- [ ] Rate limiting works
- [ ] CORS is configured
- [ ] Input validation works
- [ ] No sensitive data in logs

### UX
- [ ] Clear error messages
- [ ] Loading states shown
- [ ] Smooth redirects
- [ ] Form validation feedback
- [ ] Success messages shown

---

## Dependencies

### Backend
```json
{
  "bcryptjs": "^2.4.3",
  "jsonwebtoken": "^9.0.2",
  "zod": "^3.22.4",
  "express-rate-limit": "^7.1.5",
  "cookie-parser": "^1.4.6"
}
```

### Frontend
```json
{
  "zod": "^3.22.4",
  "react-hook-form": "^7.49.3",
  "@hookform/resolvers": "^3.3.4"
}
```

---

## Environment Variables

### Backend (.env)
```bash
PORT=4000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/dopamine_db"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRES_IN="7d"
FRONTEND_URL="http://localhost:3000"
```

### Frontend (.env)
```bash
NEXT_PUBLIC_API_URL="http://localhost:4000"
```

---

## Documentation Requirements

- [ ] API documentation (endpoints, request/response)
- [ ] Authentication flow diagram
- [ ] Security best practices document
- [ ] Deployment guide with auth setup
- [ ] User guide for auth features

---

## Future Enhancements (Out of Scope)

- OAuth (Google, GitHub)
- Two-factor authentication (2FA)
- Password reset via email
- Email verification
- Social login
- Remember me checkbox
- Session management (view active sessions)
- Account deletion

---

## Notes

- This is a **production-ready** auth system
- Follow **OWASP** security guidelines
- Use **industry best practices**
- Keep it **simple but secure**
- Prioritize **user experience**

---

**Status:** Ready for implementation  
**Estimated Time:** 2 weeks  
**Priority:** Critical  
**Dependencies:** None
