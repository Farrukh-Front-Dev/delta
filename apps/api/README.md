# Dopamine API

Production-ready Express.js backend with authentication.

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy `.env.example` to `.env` and update values:

```bash
cp .env.example .env
```

Required environment variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT (min 32 characters)
- `FRONTEND_URL` - Frontend URL for CORS

### 3. Database Setup

Make sure PostgreSQL is running, then run migrations:

```bash
# Run migrations
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate
```

### 4. Start Development Server

```bash
npm run dev
```

Server will start on `http://localhost:4000`

## API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user (protected)
- `PUT /api/auth/profile` - Update profile (protected)
- `PUT /api/auth/password` - Change password (protected)

## Security Features

- ✅ Password hashing with bcrypt (10 rounds)
- ✅ JWT tokens in httpOnly cookies
- ✅ Rate limiting on auth endpoints
- ✅ Input validation with Zod
- ✅ XSS protection (input sanitization)
- ✅ CORS configured for frontend only
- ✅ SQL injection protection (Prisma)
- ✅ CSRF protection (SameSite cookies)

## Project Structure

```
src/
├── config/          # Configuration files
├── lib/             # Prisma client
├── middlewares/     # Express middlewares
├── modules/         # Feature modules
│   └── auth/       # Authentication module
├── utils/           # Utility functions
├── types/           # TypeScript types
├── app.ts           # Express app setup
└── server.ts        # Server entry point
```

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run prisma:generate` - Generate Prisma client
- `npm run prisma:migrate` - Run database migrations
- `npm run prisma:studio` - Open Prisma Studio

## Database Schema

### User
- `id` - UUID (primary key)
- `email` - String (unique)
- `password` - String (hashed)
- `name` - String (optional)
- `xp` - Integer (default: 0)
- `level` - Integer (default: 1)
- `streak` - Integer (default: 0)
- `createdAt` - DateTime
- `updatedAt` - DateTime

### Task
- `id` - UUID (primary key)
- `title` - String
- `completed` - Boolean (default: false)
- `xpValue` - Integer (default: 25)
- `userId` - String (foreign key)
- `createdAt` - DateTime
- `completedAt` - DateTime (optional)
