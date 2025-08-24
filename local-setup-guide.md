# 🏠 Pi Tetris - Local Development Setup Guide

Complete instructions to run the Pi Tetris IT company website on your local PC.

## 📋 Prerequisites

Before starting, make sure you have these installed:

1. **Node.js 18 or higher** → [Download here](https://nodejs.org/)
2. **PostgreSQL 14 or higher** → [Download here](https://www.postgresql.org/download/)
3. **Git** → [Download here](https://git-scm.com/)

## 🚀 Setup Steps

### Step 1: Get the Project Files
Download the project files from Replit:
1. In Replit, click the three dots menu (⋯) next to your repl name
2. Select "Download as ZIP"
3. Extract the ZIP file to your desired location on your PC

### Step 2: Install Project Dependencies
Open terminal/command prompt in the project folder and run:
```bash
npm install
```

### Step 3: Database Setup

**Option A: Local PostgreSQL (Recommended for development)**
```bash
# Create a new database
createdb pi_tetris_dev

# Note your database connection details:
# Host: localhost
# Port: 5432 (default)
# Database: pi_tetris_dev
# Username: your-postgres-username
# Password: your-postgres-password
```

**Option B: Cloud Database (Neon - Free)**
1. Go to [neon.tech](https://neon.tech/)
2. Sign up for a free account
3. Create a new database
4. Copy the connection string provided

### Step 4: Environment Configuration
Create a `.env` file in your project root folder:

```bash
# Database - Replace with your actual database details
DATABASE_URL="postgresql://username:password@localhost:5432/pi_tetris_dev"

# Session Secret - Generate a random string (required)
SESSION_SECRET="your-super-secret-random-string-here"

# Local Development Settings
NODE_ENV="development"
PORT=5000

# These are required but can use dummy values for local development
REPL_ID="local-development"
REPLIT_DOMAINS="localhost:5000"
ISSUER_URL="https://replit.com/oidc"
```

**Important**: Replace the DATABASE_URL with your actual database connection details!

### Step 5: Database Schema Setup
```bash
# Create the database tables
npm run db:push
```

### Step 6: Start the Development Server
```bash
npm run dev
```

Your website will be available at: **http://localhost:5000**

## 🎯 What You'll See

✅ **Homepage** with hero section and service overview  
✅ **Service Pages** - All professional service pages (Mobile App Development, DevOps, AI/ML, etc.)  
✅ **About Page** with team information  
✅ **Portfolio** with case studies  
✅ **Contact Form** with working submission  
✅ **Admin Panel** at `/admin` (authentication disabled for local development)  

## 🛠 Local Development Features

### Authentication
- **For Development**: Authentication is disabled - you can access admin features directly
- **Admin Panel**: Go to `/admin` to manage content
- **No Login Required**: All admin features work without authentication locally

### File Uploads
- **Note**: Object storage (file uploads) won't work locally without additional setup
- **Alternative**: You can still add content using text descriptions and external image URLs

### Database Management
- **View Data**: Use any PostgreSQL client (pgAdmin, DBeaver, TablePlus)
- **Update Schema**: Run `npm run db:push` after making changes to `shared/schema.ts`
- **Reset Database**: Drop and recreate the database, then run `npm run db:push`

## 📁 Key Project Files

```
pi-tetris/
├── client/src/           # React frontend
│   ├── pages/           # All website pages
│   ├── components/      # UI components
│   └── App.tsx         # Main app routing
├── server/              # Express.js backend
│   ├── routes.ts       # API endpoints
│   ├── storage.ts      # Database operations
│   └── db.ts          # Database connection
├── shared/
│   └── schema.ts       # Database schema
└── package.json        # Dependencies
```

## 🔧 Customization

### Adding Content
1. Go to `http://localhost:5000/admin`
2. Add services, case studies, team members, etc.
3. Changes are saved to your local database

### Modifying Pages
- Edit files in `client/src/pages/`
- Changes will hot-reload automatically
- All service pages are in `client/src/pages/services/`

### Styling Changes
- Global styles: `client/src/index.css`
- Component styles: Individual `.tsx` files use Tailwind CSS

## 🚨 Troubleshooting

**Database Connection Error**
- Check PostgreSQL is running: `pg_ctl status`
- Verify DATABASE_URL in `.env` file
- Test connection: `psql "your-database-url"`

**Port 5000 Already in Use**
- Change PORT in `.env` file to another port (e.g., 3000, 8000)
- Or kill the process using port 5000

**Build Errors**
- Clear cache: `rm -rf node_modules && npm install`
- Check TypeScript: `npm run check`

**Missing Dependencies**
- Make sure all packages installed: `npm install`
- Check Node.js version: `node --version` (should be 18+)

## 🌐 Production Deployment

When ready for production:
1. Set up proper authentication (replace local auth)
2. Configure real object storage (AWS S3, Google Cloud, etc.)
3. Use production database
4. Set `NODE_ENV=production`
5. Deploy to hosting platform (Vercel, Netlify, AWS, etc.)

## 📞 Need Help?

If you encounter any issues:
1. Check the console logs in your terminal
2. Verify all prerequisites are installed
3. Make sure your `.env` file has correct database settings
4. Try restarting the development server

Happy coding! 🎉