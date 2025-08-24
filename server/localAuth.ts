import type { Express, RequestHandler } from "express";
import session from "express-session";
import MemoryStore from "memorystore";

// Simple local development authentication bypass
// In production, replace with proper authentication system

export async function setupAuth(app: Express) {
  // Set up session middleware for local development
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const MemStore = MemoryStore(session);
  
  app.use(session({
    secret: process.env.SESSION_SECRET || 'local-dev-secret-key',
    store: new MemStore({
      checkPeriod: sessionTtl
    }),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // false for local development
      maxAge: sessionTtl,
    },
  }));
  
  console.log("🔧 Local development mode: Authentication disabled, sessions enabled");
}

export const isAuthenticated: RequestHandler = (req: any, res, next) => {
  // For local development, always authenticate as a mock admin user
  req.user = {
    claims: {
      sub: "local-admin-user",
      email: "admin@pitetris.local",
      first_name: "Local",
      last_name: "Admin",
      profile_image_url: null
    }
  };
  req.isAuthenticated = () => true;
  next();
};