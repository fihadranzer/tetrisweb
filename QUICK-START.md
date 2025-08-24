# ⚡ Pi Tetris - Quick Local Setup

Get the Pi Tetris website running on your PC in 5 minutes!

## 🎯 Prerequisites
- [Node.js 18+](https://nodejs.org/) 
- [PostgreSQL](https://www.postgresql.org/download/) or [Neon Cloud DB](https://neon.tech/) (free)

## 🚀 One-Command Setup

1. **Download** the project files from Replit (Download as ZIP)
2. **Extract** and open terminal in the project folder
3. **Run** the setup script:

```bash
node local-start.js
```

That's it! The script will:
- ✅ Create `.env` file if needed
- ✅ Install all dependencies  
- ✅ Set up database schema
- ✅ Start the development server

## 🌐 Access Your Site

- **Website**: http://localhost:5000
- **Admin Panel**: http://localhost:5000/admin (no login required locally)

## 📝 Manual Setup (if preferred)

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Create `.env` file**
   ```bash
   DATABASE_URL="postgresql://username:password@localhost:5432/pi_tetris_dev"
   SESSION_SECRET="your-random-secret-here"
   NODE_ENV="development"
   ```

3. **Setup database**
   ```bash
   createdb pi_tetris_dev
   npm run db:push
   ```

4. **Start server**
   ```bash
   npm run dev
   ```

## 🎯 Features Available

✅ **All Service Pages** - Mobile App Development, AI/ML, DevOps, etc.  
✅ **Content Management** - Add/edit services, case studies, team members  
✅ **Portfolio Showcase** - Professional case studies and client work  
✅ **Contact Forms** - Working contact form submissions  
✅ **Admin Interface** - Full content management system  

## 🆘 Need Help?

**Database Issues?**
- Use [Neon.tech](https://neon.tech/) for free cloud PostgreSQL
- Or install PostgreSQL locally

**Port 5000 busy?**
- Change `PORT=3000` in your `.env` file

**More Help?**
- See detailed guide: `README-Local-Setup.md`

Happy coding! 🎉