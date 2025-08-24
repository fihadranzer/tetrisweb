# Pi Tetris - Local Development Setup

A comprehensive IT company website with service portfolio and content management system.

## 🚀 Quick Start

### Prerequisites
- Node.js 18 or higher
- PostgreSQL 14 or higher
- Git

### 1. Install Dependencies
```bash
npm install
```

### 2. Database Setup

**Option A: Local PostgreSQL**
```bash
# Create database
createdb pi_tetris_dev

# Your DATABASE_URL will be:
postgresql://username:password@localhost:5432/pi_tetris_dev
```

**Option B: Neon Cloud Database (Recommended)**
1. Sign up at [neon.tech](https://neon.tech/) (free tier available)
2. Create a new database
3. Copy the connection string

### 3. Environment Configuration
Create a `.env` file in the project root:

```bash
# Copy from example
cp .env.example .env

# Edit .env with your values
DATABASE_URL="your-database-url-here"
SESSION_SECRET="generate-a-random-secret-key"
```

### 4. Database Schema Setup
```bash
# Push database schema
npm run db:push
```

### 5. Start Development Server
```bash
npm run dev
```

The application will be available at:
- Website: http://localhost:5000
- API: http://localhost:5000/api

## 🛠 Local Development Notes

### Authentication
- Replit Auth is disabled for local development
- Admin features can be accessed directly without authentication
- Production deployment will require proper authentication setup

### File Storage
- Object storage features are disabled locally
- File uploads will need to be configured for your preferred storage provider
- Supported options: AWS S3, Google Cloud Storage, Azure Blob Storage

### Database Management
- Use `npm run db:push` to update schema after making changes
- Database changes are tracked in `shared/schema.ts`
- View your data using any PostgreSQL client (pgAdmin, DBeaver, etc.)

## 📁 Project Structure

```
pi-tetris/
├── client/                 # React frontend (Vite + TypeScript)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/         # Page components and routes
│   │   ├── hooks/         # Custom React hooks
│   │   └── lib/           # Utilities and configurations
├── server/                # Express.js backend
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data access layer
│   └── db.ts             # Database connection
├── shared/                # Shared types and schemas
│   └── schema.ts         # Database schema definitions
└── package.json          # Dependencies and scripts
```

## 🎯 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Update database schema
- `npm run check` - Type checking

## 🌐 Features

- **Professional Service Pages**: Mobile App Development, DevOps & Cloud, AI/ML, etc.
- **Content Management**: Admin interface for managing services, case studies, team
- **Responsive Design**: Modern UI with Tailwind CSS and shadcn/ui components
- **Type Safety**: Full TypeScript implementation across frontend and backend
- **Database Integration**: PostgreSQL with Drizzle ORM

## 🚀 Deployment

For production deployment, you'll need to:
1. Set up authentication (replace Replit Auth)
2. Configure object storage provider
3. Set production environment variables
4. Deploy to your preferred hosting platform

## 🆘 Troubleshooting

**Database connection issues:**
- Verify PostgreSQL is running
- Check DATABASE_URL format
- Ensure database exists and user has permissions

**Port already in use:**
- Change the PORT environment variable
- Kill any processes using port 5000

**Build errors:**
- Run `npm run check` to verify TypeScript
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`