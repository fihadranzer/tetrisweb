import type { Express, RequestHandler } from "express";

// Simple local development authentication bypass
// In production, replace with proper authentication system

export async function setupAuth(app: Express) {
  // Local development: skip authentication setup
  console.log("🔧 Local development mode: Authentication disabled");
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