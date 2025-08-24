import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
// Use local auth for development, Replit auth for production
const authModule = process.env.NODE_ENV === 'development' 
  ? await import("./localAuth")
  : await import("./replitAuth");

const { setupAuth, isAuthenticated } = authModule;
import { ObjectStorageService, ObjectNotFoundError } from "./objectStorage";
import { ObjectPermission } from "./objectAcl";
import {
  insertServiceSchema,
  insertCaseStudySchema,
  insertTeamMemberSchema,
  insertTestimonialSchema,
  insertClientSchema,
  insertTechnologySchema,
  insertCategorySchema,
  insertContactSubmissionSchema,
  insertSiteSettingSchema,
} from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Direct Admin Login Route (bypasses Replit Auth)
  app.post('/api/admin/login', async (req, res) => {
    try {
      const { email, password } = req.body;
      
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }
      
      const user = await storage.getUserByEmail(email);
      
      if (!user || !user.isAdmin || user.adminPassword !== password) {
        return res.status(401).json({ message: 'Invalid credentials or not an admin' });
      }
      
      // Set session for direct login
      (req.session as any).directAdminUser = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        isAdmin: user.isAdmin,
        loginType: 'direct'
      };
      
      res.json({ 
        message: 'Login successful', 
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          isAdmin: user.isAdmin
        }
      });
    } catch (error) {
      console.error('Direct admin login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  // Auth routes  
  app.get('/api/auth/user', async (req: any, res) => {
    try {
      // Check for direct admin login first
      if ((req.session as any).directAdminUser) {
        return res.json((req.session as any).directAdminUser);
      }
      
      // Then check Replit Auth
      if (!req.isAuthenticated() || !req.user?.claims?.sub) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });
  
  // Logout route for both direct and Replit auth
  app.post('/api/auth/logout', (req, res) => {
    // Clear direct admin session
    if ((req.session as any).directAdminUser) {
      delete (req.session as any).directAdminUser;
      return res.json({ message: 'Logged out successfully' });
    }
    
    // Handle Replit auth logout
    req.logout(() => {
      res.json({ message: 'Logged out successfully' });
    });
  });

  // Public API routes
  
  // Get all services
  app.get('/api/services', async (req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ message: "Failed to fetch services" });
    }
  });

  // Get service by slug
  app.get('/api/services/:slug', async (req, res) => {
    try {
      const service = await storage.getServiceBySlug(req.params.slug);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res.status(500).json({ message: "Failed to fetch service" });
    }
  });

  // Get all case studies
  app.get('/api/case-studies', async (req, res) => {
    try {
      const caseStudies = await storage.getCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      console.error("Error fetching case studies:", error);
      res.status(500).json({ message: "Failed to fetch case studies" });
    }
  });

  // Get featured case studies
  app.get('/api/case-studies/featured', async (req, res) => {
    try {
      const caseStudies = await storage.getFeaturedCaseStudies();
      res.json(caseStudies);
    } catch (error) {
      console.error("Error fetching featured case studies:", error);
      res.status(500).json({ message: "Failed to fetch featured case studies" });
    }
  });

  // Get case study by slug
  app.get('/api/case-studies/:slug', async (req, res) => {
    try {
      const caseStudy = await storage.getCaseStudyBySlug(req.params.slug);
      if (!caseStudy) {
        return res.status(404).json({ message: "Case study not found" });
      }
      res.json(caseStudy);
    } catch (error) {
      console.error("Error fetching case study:", error);
      res.status(500).json({ message: "Failed to fetch case study" });
    }
  });

  // Get team members
  app.get('/api/team', async (req, res) => {
    try {
      const teamMembers = await storage.getTeamMembers();
      res.json(teamMembers);
    } catch (error) {
      console.error("Error fetching team members:", error);
      res.status(500).json({ message: "Failed to fetch team members" });
    }
  });

  // Get testimonials
  app.get('/api/testimonials', async (req, res) => {
    try {
      const testimonials = await storage.getTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      res.status(500).json({ message: "Failed to fetch testimonials" });
    }
  });

  // Get featured testimonials
  app.get('/api/testimonials/featured', async (req, res) => {
    try {
      const testimonials = await storage.getFeaturedTestimonials();
      res.json(testimonials);
    } catch (error) {
      console.error("Error fetching featured testimonials:", error);
      res.status(500).json({ message: "Failed to fetch featured testimonials" });
    }
  });

  // Get clients
  app.get('/api/clients', async (req, res) => {
    try {
      const clients = await storage.getClients();
      res.json(clients);
    } catch (error) {
      console.error("Error fetching clients:", error);
      res.status(500).json({ message: "Failed to fetch clients" });
    }
  });

  // Get technologies
  app.get('/api/technologies', async (req, res) => {
    try {
      const categoryId = req.query.categoryId as string;
      const technologies = await storage.getTechnologies(categoryId);
      res.json(technologies);
    } catch (error) {
      console.error("Error fetching technologies:", error);
      res.status(500).json({ message: "Failed to fetch technologies" });
    }
  });

  // Get categories
  app.get('/api/categories', async (req, res) => {
    try {
      const type = req.query.type as string;
      const categories = await storage.getCategories(type);
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  // Submit contact form
  app.post('/api/contact', async (req, res) => {
    try {
      const validatedData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(validatedData);
      res.status(201).json(submission);
    } catch (error) {
      console.error("Error creating contact submission:", error);
      res.status(500).json({ message: "Failed to submit contact form" });
    }
  });

  // Get site settings
  app.get('/api/settings/:key', async (req, res) => {
    try {
      const setting = await storage.getSiteSetting(req.params.key);
      if (!setting) {
        return res.status(404).json({ message: "Setting not found" });
      }
      res.json(setting);
    } catch (error) {
      console.error("Error fetching site setting:", error);
      res.status(500).json({ message: "Failed to fetch site setting" });
    }
  });

  // Object storage routes
  app.get("/public-objects/:filePath(*)", async (req, res) => {
    const filePath = req.params.filePath;
    const objectStorageService = new ObjectStorageService();
    try {
      const file = await objectStorageService.searchPublicObject(filePath);
      if (!file) {
        return res.status(404).json({ error: "File not found" });
      }
      objectStorageService.downloadObject(file, res);
    } catch (error) {
      console.error("Error searching for public object:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Admin-only routes (protected)

  // Check if user is admin
  const isAdmin = async (req: any, res: any, next: any) => {
    try {
      const userId = req.user?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      
      const user = await storage.getUser(userId);
      if (!user || !user.isAdmin) {
        return res.status(403).json({ message: "Admin access required" });
      }
      
      next();
    } catch (error) {
      console.error("Error checking admin status:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  // Admin object storage routes
  app.get("/objects/:objectPath(*)", isAuthenticated, async (req, res) => {
    const userId = req.user?.claims?.sub;
    const objectStorageService = new ObjectStorageService();
    try {
      const objectFile = await objectStorageService.getObjectEntityFile(req.path);
      const canAccess = await objectStorageService.canAccessObjectEntity({
        objectFile,
        userId: userId,
        requestedPermission: ObjectPermission.READ,
      });
      if (!canAccess) {
        return res.sendStatus(401);
      }
      objectStorageService.downloadObject(objectFile, res);
    } catch (error) {
      console.error("Error checking object access:", error);
      if (error instanceof ObjectNotFoundError) {
        return res.sendStatus(404);
      }
      return res.sendStatus(500);
    }
  });

  app.post("/api/objects/upload", isAuthenticated, isAdmin, async (req, res) => {
    const objectStorageService = new ObjectStorageService();
    const uploadURL = await objectStorageService.getObjectEntityUploadURL();
    res.json({ uploadURL });
  });

  // Admin CRUD routes

  // Categories
  app.post('/api/admin/categories', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertCategorySchema.parse(req.body);
      const category = await storage.createCategory(validatedData);
      res.status(201).json(category);
    } catch (error) {
      console.error("Error creating category:", error);
      res.status(500).json({ message: "Failed to create category" });
    }
  });

  app.put('/api/admin/categories/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const category = await storage.updateCategory(req.params.id, req.body);
      res.json(category);
    } catch (error) {
      console.error("Error updating category:", error);
      res.status(500).json({ message: "Failed to update category" });
    }
  });

  app.delete('/api/admin/categories/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteCategory(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting category:", error);
      res.status(500).json({ message: "Failed to delete category" });
    }
  });

  // Services
  app.post('/api/admin/services', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertServiceSchema.parse(req.body);
      const service = await storage.createService(validatedData);
      res.status(201).json(service);
    } catch (error) {
      console.error("Error creating service:", error);
      res.status(500).json({ message: "Failed to create service" });
    }
  });

  app.put('/api/admin/services/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const service = await storage.updateService(req.params.id, req.body);
      res.json(service);
    } catch (error) {
      console.error("Error updating service:", error);
      res.status(500).json({ message: "Failed to update service" });
    }
  });

  app.delete('/api/admin/services/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteService(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting service:", error);
      res.status(500).json({ message: "Failed to delete service" });
    }
  });

  // Case Studies
  app.post('/api/admin/case-studies', isAuthenticated, isAdmin, async (req, res) => {
    try {
      // Handle empty categoryId
      const processedData = {
        ...req.body,
        categoryId: req.body.categoryId === '' ? null : req.body.categoryId
      };
      
      const validatedData = insertCaseStudySchema.parse(processedData);
      const caseStudy = await storage.createCaseStudy(validatedData);
      res.status(201).json(caseStudy);
    } catch (error) {
      console.error("Error creating case study:", error);
      res.status(500).json({ message: "Failed to create case study" });
    }
  });

  app.put('/api/admin/case-studies/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const caseStudy = await storage.updateCaseStudy(req.params.id, req.body);
      res.json(caseStudy);
    } catch (error) {
      console.error("Error updating case study:", error);
      res.status(500).json({ message: "Failed to update case study" });
    }
  });

  app.delete('/api/admin/case-studies/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteCaseStudy(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting case study:", error);
      res.status(500).json({ message: "Failed to delete case study" });
    }
  });

  // Team Members
  app.post('/api/admin/team', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertTeamMemberSchema.parse(req.body);
      const teamMember = await storage.createTeamMember(validatedData);
      res.status(201).json(teamMember);
    } catch (error) {
      console.error("Error creating team member:", error);
      res.status(500).json({ message: "Failed to create team member" });
    }
  });

  app.put('/api/admin/team/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const teamMember = await storage.updateTeamMember(req.params.id, req.body);
      res.json(teamMember);
    } catch (error) {
      console.error("Error updating team member:", error);
      res.status(500).json({ message: "Failed to update team member" });
    }
  });

  app.delete('/api/admin/team/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteTeamMember(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting team member:", error);
      res.status(500).json({ message: "Failed to delete team member" });
    }
  });

  // Testimonials
  app.post('/api/admin/testimonials', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertTestimonialSchema.parse(req.body);
      const testimonial = await storage.createTestimonial(validatedData);
      res.status(201).json(testimonial);
    } catch (error) {
      console.error("Error creating testimonial:", error);
      res.status(500).json({ message: "Failed to create testimonial" });
    }
  });

  app.put('/api/admin/testimonials/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const testimonial = await storage.updateTestimonial(req.params.id, req.body);
      res.json(testimonial);
    } catch (error) {
      console.error("Error updating testimonial:", error);
      res.status(500).json({ message: "Failed to update testimonial" });
    }
  });

  app.delete('/api/admin/testimonials/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteTestimonial(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
      res.status(500).json({ message: "Failed to delete testimonial" });
    }
  });

  // Clients
  app.post('/api/admin/clients', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertClientSchema.parse(req.body);
      const client = await storage.createClient(validatedData);
      res.status(201).json(client);
    } catch (error) {
      console.error("Error creating client:", error);
      res.status(500).json({ message: "Failed to create client" });
    }
  });

  app.put('/api/admin/clients/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const client = await storage.updateClient(req.params.id, req.body);
      res.json(client);
    } catch (error) {
      console.error("Error updating client:", error);
      res.status(500).json({ message: "Failed to update client" });
    }
  });

  app.delete('/api/admin/clients/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteClient(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting client:", error);
      res.status(500).json({ message: "Failed to delete client" });
    }
  });

  // Technologies
  app.post('/api/admin/technologies', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertTechnologySchema.parse(req.body);
      const technology = await storage.createTechnology(validatedData);
      res.status(201).json(technology);
    } catch (error) {
      console.error("Error creating technology:", error);
      res.status(500).json({ message: "Failed to create technology" });
    }
  });

  app.put('/api/admin/technologies/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const technology = await storage.updateTechnology(req.params.id, req.body);
      res.json(technology);
    } catch (error) {
      console.error("Error updating technology:", error);
      res.status(500).json({ message: "Failed to update technology" });
    }
  });

  app.delete('/api/admin/technologies/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteTechnology(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting technology:", error);
      res.status(500).json({ message: "Failed to delete technology" });
    }
  });

  // Contact Submissions
  app.get('/api/admin/contact-submissions', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ message: "Failed to fetch contact submissions" });
    }
  });

  app.put('/api/admin/contact-submissions/:id/read', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.markContactSubmissionRead(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error marking submission as read:", error);
      res.status(500).json({ message: "Failed to mark submission as read" });
    }
  });

  app.delete('/api/admin/contact-submissions/:id', isAuthenticated, isAdmin, async (req, res) => {
    try {
      await storage.deleteContactSubmission(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting contact submission:", error);
      res.status(500).json({ message: "Failed to delete contact submission" });
    }
  });

  // Site Settings
  app.get('/api/admin/settings', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const settings = await storage.getSiteSettings();
      res.json(settings);
    } catch (error) {
      console.error("Error fetching site settings:", error);
      res.status(500).json({ message: "Failed to fetch site settings" });
    }
  });

  app.put('/api/admin/settings', isAuthenticated, isAdmin, async (req, res) => {
    try {
      const validatedData = insertSiteSettingSchema.parse(req.body);
      const setting = await storage.upsertSiteSetting(validatedData);
      res.json(setting);
    } catch (error) {
      console.error("Error updating site setting:", error);
      res.status(500).json({ message: "Failed to update site setting" });
    }
  });

  // Handle image uploads for content management
  app.put('/api/admin/images', isAuthenticated, isAdmin, async (req, res) => {
    if (!req.body.imageURL) {
      return res.status(400).json({ error: "imageURL is required" });
    }

    try {
      const userId = req.user?.claims?.sub;
      const objectStorageService = new ObjectStorageService();
      const objectPath = await objectStorageService.trySetObjectEntityAclPolicy(
        req.body.imageURL,
        {
          owner: userId,
          visibility: "public",
        }
      );

      res.status(200).json({
        objectPath: objectPath,
      });
    } catch (error) {
      console.error("Error setting image ACL:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
