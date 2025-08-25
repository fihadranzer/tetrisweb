import {
  users,
  adminVerificationCodes,
  categories,
  services,
  caseStudies,
  teamMembers,
  testimonials,
  clients,
  technologies,
  contactSubmissions,
  siteSettings,
  type User,
  type UpsertUser,
  type AdminVerificationCode,
  type InsertAdminVerificationCode,
  type Category,
  type InsertCategory,
  type Service,
  type InsertService,
  type CaseStudy,
  type InsertCaseStudy,
  type TeamMember,
  type InsertTeamMember,
  type Testimonial,
  type InsertTestimonial,
  type Client,
  type InsertClient,
  type Technology,
  type InsertTechnology,
  type ContactSubmission,
  type InsertContactSubmission,
  type SiteSetting,
  type InsertSiteSetting,
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, and, ilike } from "drizzle-orm";
import { emailService } from "./emailService";

// Allowed admin emails - only these emails can access admin panel
const ALLOWED_ADMIN_EMAILS = ['rhfiha@gmail.com', 'dev.fiha@gmail.com'];

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Admin verification operations
  isAllowedAdminEmail(email: string): boolean;
  createVerificationCode(email: string): Promise<{ code: string; expiresAt: Date }>;
  verifyCode(email: string, code: string): Promise<boolean>;
  cleanupExpiredCodes(): Promise<void>;
  
  // Category operations
  getCategories(type?: string): Promise<Category[]>;
  getCategoryBySlug(slug: string): Promise<Category | undefined>;
  createCategory(category: InsertCategory): Promise<Category>;
  updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category>;
  deleteCategory(id: string): Promise<void>;
  
  // Service operations
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | undefined>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: string, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: string): Promise<void>;
  initializeDefaultServices(): Promise<void>;
  
  // Case study operations
  getCaseStudies(): Promise<CaseStudy[]>;
  getFeaturedCaseStudies(): Promise<CaseStudy[]>;
  getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined>;
  createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy>;
  updateCaseStudy(id: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy>;
  deleteCaseStudy(id: string): Promise<void>;
  
  // Team member operations
  getTeamMembers(): Promise<TeamMember[]>;
  createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember>;
  updateTeamMember(id: string, teamMember: Partial<InsertTeamMember>): Promise<TeamMember>;
  deleteTeamMember(id: string): Promise<void>;
  
  // Testimonial operations
  getTestimonials(): Promise<Testimonial[]>;
  getFeaturedTestimonials(): Promise<Testimonial[]>;
  createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial>;
  updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial>;
  deleteTestimonial(id: string): Promise<void>;
  
  // Client operations
  getClients(): Promise<Client[]>;
  createClient(client: InsertClient): Promise<Client>;
  updateClient(id: string, client: Partial<InsertClient>): Promise<Client>;
  deleteClient(id: string): Promise<void>;
  
  // Technology operations
  getTechnologies(categoryId?: string): Promise<Technology[]>;
  createTechnology(technology: InsertTechnology): Promise<Technology>;
  updateTechnology(id: string, technology: Partial<InsertTechnology>): Promise<Technology>;
  deleteTechnology(id: string): Promise<void>;
  
  // Contact submission operations
  getContactSubmissions(): Promise<ContactSubmission[]>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  markContactSubmissionRead(id: string): Promise<void>;
  deleteContactSubmission(id: string): Promise<void>;
  
  // Site settings operations
  getSiteSettings(): Promise<SiteSetting[]>;
  getSiteSetting(key: string): Promise<SiteSetting | undefined>;
  upsertSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting>;
  deleteSiteSetting(key: string): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }
  
  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  // Admin verification operations
  isAllowedAdminEmail(email: string): boolean {
    return ALLOWED_ADMIN_EMAILS.includes(email.toLowerCase());
  }

  async createVerificationCode(email: string): Promise<{ code: string; expiresAt: Date }> {
    // Generate a 6-digit verification code
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes from now

    await db.insert(adminVerificationCodes).values([{
      email: email.toLowerCase(),
      code,
      expiresAt,
      isUsed: false,
    }]);

    // Send the verification code via email
    await emailService.sendVerificationCode(email, code);

    return { code, expiresAt };
  }

  async verifyCode(email: string, code: string): Promise<boolean> {
    const verificationRecords = await db
      .select()
      .from(adminVerificationCodes)
      .where(
        and(
          eq(adminVerificationCodes.email, email.toLowerCase()),
          eq(adminVerificationCodes.code, code),
          eq(adminVerificationCodes.isUsed, false)
        )
      )
      .orderBy(desc(adminVerificationCodes.createdAt));

    if (!verificationRecords || verificationRecords.length === 0) {
      return false;
    }

    const verificationRecord = verificationRecords[0];

    // Check if code is expired
    if (new Date() > verificationRecord.expiresAt) {
      return false;
    }

    // Mark code as used
    await db
      .update(adminVerificationCodes)
      .set({ isUsed: true })
      .where(eq(adminVerificationCodes.id, verificationRecord.id));

    return true;
  }

  async cleanupExpiredCodes(): Promise<void> {
    await db
      .delete(adminVerificationCodes)
      .where(
        and(
          eq(adminVerificationCodes.isUsed, true)
        )
      );
  }

  // Category operations
  async getCategories(type?: string): Promise<Category[]> {
    const query = db
      .select()
      .from(categories)
      .where(and(
        eq(categories.isActive, true),
        type ? eq(categories.type, type) : undefined
      ))
      .orderBy(categories.sortOrder, categories.name);
    return await query;
  }

  async getCategoryBySlug(slug: string): Promise<Category | undefined> {
    const [category] = await db
      .select()
      .from(categories)
      .where(and(eq(categories.slug, slug), eq(categories.isActive, true)));
    return category;
  }

  async createCategory(category: InsertCategory): Promise<Category> {
    const [newCategory] = await db
      .insert(categories)
      .values([category])
      .returning();
    return newCategory;
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category> {
    const updateData: any = { ...category, updatedAt: new Date() };
    const [updatedCategory] = await db
      .update(categories)
      .set(updateData)
      .where(eq(categories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteCategory(id: string): Promise<void> {
    await db.delete(categories).where(eq(categories.id, id));
  }

  // Service operations
  async getServices(): Promise<Service[]> {
    return await db
      .select()
      .from(services)
      .where(eq(services.isActive, true))
      .orderBy(services.sortOrder, services.title);
  }

  async getServiceBySlug(slug: string): Promise<Service | undefined> {
    const [service] = await db
      .select()
      .from(services)
      .where(and(eq(services.slug, slug), eq(services.isActive, true)));
    return service;
  }

  async createService(service: InsertService): Promise<Service> {
    const [newService] = await db
      .insert(services)
      .values([service])
      .returning();
    return newService;
  }

  // Initialize default services if they don't exist
  async initializeDefaultServices(): Promise<void> {
    try {
      console.log('Initializing default services...');
      const existingServices = await this.getServices();
      console.log('Existing services count:', existingServices.length);
      
      const defaultServices = [
        {
          title: "Web Application Development",
          slug: "web-application-development",
          shortDescription: "Custom web applications built with modern technologies for scalable, secure, and user-friendly digital solutions.",
          longDescription: "Our web application development services focus on creating robust, scalable, and secure web solutions tailored to your business needs. We leverage cutting-edge technologies and best practices to deliver high-performance applications that drive business growth and enhance user experience.",
          features: [
            "Custom Web Applications",
            "Progressive Web Apps (PWA)",
            "Single Page Applications (SPA)",
            "Enterprise Web Portals",
            "E-commerce Platforms",
            "Content Management Systems",
            "API Development & Integration",
            "Database Design & Optimization",
            "Cloud Deployment & Scaling",
            "Security Implementation"
          ],
          technologies: [
            "React", "Vue.js", "Angular", "Node.js", "Python", "Django", "Flask", 
            "PHP", "Laravel", "Ruby on Rails", "PostgreSQL", "MongoDB", "AWS", "Docker"
          ],
          isActive: true,
          sortOrder: 1
        },
        {
          title: "Mobile App Development",
          slug: "mobile-app-development",
          shortDescription: "Native and cross-platform mobile applications that deliver exceptional user experiences across iOS and Android devices.",
          longDescription: "We specialize in developing high-quality mobile applications that engage users and drive business success. Our mobile app development services cover the entire development lifecycle, from concept and design to deployment and maintenance, ensuring your app stands out in the competitive mobile marketplace.",
          features: [
            "Native iOS Development",
            "Native Android Development",
            "Cross-Platform Development",
            "React Native Applications",
            "Flutter Applications",
            "Mobile UI/UX Design",
            "App Store Optimization",
            "Push Notifications",
            "Offline Functionality",
            "Mobile App Analytics"
          ],
          technologies: [
            "React Native", "Flutter", "Swift", "Kotlin", "Java", "Dart", 
            "Xamarin", "Ionic", "Firebase", "SQLite", "Core Data", "Room"
          ],
          isActive: true,
          sortOrder: 2
        }
      ];

      for (const service of defaultServices) {
        const exists = existingServices.find(s => s.slug === service.slug);
        if (!exists) {
          console.log(`Creating service: ${service.title}`);
          await this.createService(service);
          console.log(`Created default service: ${service.title}`);
        } else {
          console.log(`Service already exists: ${service.title}`);
        }
      }
    } catch (error) {
      console.error('Error initializing default services:', error);
    }
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service> {
    const updateData: any = { ...service, updatedAt: new Date() };
    const [updatedService] = await db
      .update(services)
      .set(updateData)
      .where(eq(services.id, id))
      .returning();
    return updatedService;
  }

  async deleteService(id: string): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Case study operations
  async getCaseStudies(): Promise<CaseStudy[]> {
    return await db
      .select()
      .from(caseStudies)
      .where(eq(caseStudies.isActive, true))
      .orderBy(desc(caseStudies.isFeatured), caseStudies.sortOrder, desc(caseStudies.createdAt));
  }

  async getFeaturedCaseStudies(): Promise<CaseStudy[]> {
    return await db
      .select()
      .from(caseStudies)
      .where(and(eq(caseStudies.isActive, true), eq(caseStudies.isFeatured, true)))
      .orderBy(caseStudies.sortOrder, desc(caseStudies.createdAt))
      .limit(6);
  }

  async getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
    const [caseStudy] = await db
      .select()
      .from(caseStudies)
      .where(and(eq(caseStudies.slug, slug), eq(caseStudies.isActive, true)));
    return caseStudy;
  }

  async createCaseStudy(caseStudy: InsertCaseStudy): Promise<CaseStudy> {
    const [newCaseStudy] = await db
      .insert(caseStudies)
      .values([caseStudy])
      .returning();
    return newCaseStudy;
  }

  async updateCaseStudy(id: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy> {
    const updateData: any = { ...caseStudy, updatedAt: new Date() };
    const [updatedCaseStudy] = await db
      .update(caseStudies)
      .set(updateData)
      .where(eq(caseStudies.id, id))
      .returning();
    return updatedCaseStudy;
  }

  async deleteCaseStudy(id: string): Promise<void> {
    await db.delete(caseStudies).where(eq(caseStudies.id, id));
  }

  // Team member operations
  async getTeamMembers(): Promise<TeamMember[]> {
    return await db
      .select()
      .from(teamMembers)
      .where(eq(teamMembers.isActive, true))
      .orderBy(teamMembers.sortOrder, teamMembers.name);
  }

  async createTeamMember(teamMember: InsertTeamMember): Promise<TeamMember> {
    const [newTeamMember] = await db
      .insert(teamMembers)
      .values([teamMember])
      .returning();
    return newTeamMember;
  }

  async updateTeamMember(id: string, teamMember: Partial<InsertTeamMember>): Promise<TeamMember> {
    const updateData: any = { ...teamMember, updatedAt: new Date() };
    const [updatedTeamMember] = await db
      .update(teamMembers)
      .set(updateData)
      .where(eq(teamMembers.id, id))
      .returning();
    return updatedTeamMember;
  }

  async deleteTeamMember(id: string): Promise<void> {
    await db.delete(teamMembers).where(eq(teamMembers.id, id));
  }

  // Testimonial operations
  async getTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(eq(testimonials.isActive, true))
      .orderBy(desc(testimonials.isFeatured), testimonials.sortOrder, desc(testimonials.createdAt));
  }

  async getFeaturedTestimonials(): Promise<Testimonial[]> {
    return await db
      .select()
      .from(testimonials)
      .where(and(eq(testimonials.isActive, true), eq(testimonials.isFeatured, true)))
      .orderBy(testimonials.sortOrder, desc(testimonials.createdAt))
      .limit(3);
  }

  async createTestimonial(testimonial: InsertTestimonial): Promise<Testimonial> {
    const [newTestimonial] = await db
      .insert(testimonials)
      .values([testimonial])
      .returning();
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const updateData: any = { ...testimonial, updatedAt: new Date() };
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set(updateData)
      .where(eq(testimonials.id, id))
      .returning();
    return updatedTestimonial;
  }

  async deleteTestimonial(id: string): Promise<void> {
    await db.delete(testimonials).where(eq(testimonials.id, id));
  }

  // Client operations
  async getClients(): Promise<Client[]> {
    return await db
      .select()
      .from(clients)
      .where(eq(clients.isActive, true))
      .orderBy(clients.sortOrder, clients.name);
  }

  async createClient(client: InsertClient): Promise<Client> {
    const [newClient] = await db
      .insert(clients)
      .values([client])
      .returning();
    return newClient;
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client> {
    const updateData: any = { ...client, updatedAt: new Date() };
    const [updatedClient] = await db
      .update(clients)
      .set(updateData)
      .where(eq(clients.id, id))
      .returning();
    return updatedClient;
  }

  async deleteClient(id: string): Promise<void> {
    await db.delete(clients).where(eq(clients.id, id));
  }

  // Technology operations
  async getTechnologies(categoryId?: string): Promise<Technology[]> {
    return await db
      .select()
      .from(technologies)
      .where(and(
        eq(technologies.isActive, true),
        categoryId ? eq(technologies.categoryId, categoryId) : undefined
      ))
      .orderBy(technologies.sortOrder, technologies.name);
  }

  async createTechnology(technology: InsertTechnology): Promise<Technology> {
    const [newTechnology] = await db
      .insert(technologies)
      .values([technology])
      .returning();
    return newTechnology;
  }

  async updateTechnology(id: string, technology: Partial<InsertTechnology>): Promise<Technology> {
    const updateData: any = { ...technology, updatedAt: new Date() };
    const [updatedTechnology] = await db
      .update(technologies)
      .set(updateData)
      .where(eq(technologies.id, id))
      .returning();
    return updatedTechnology;
  }

  async deleteTechnology(id: string): Promise<void> {
    await db.delete(technologies).where(eq(technologies.id, id));
  }

  // Contact submission operations
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db
      .select()
      .from(contactSubmissions)
      .orderBy(desc(contactSubmissions.createdAt));
  }

  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values([submission])
      .returning();
    return newSubmission;
  }

  async markContactSubmissionRead(id: string): Promise<void> {
    await db
      .update(contactSubmissions)
      .set({ isRead: true })
      .where(eq(contactSubmissions.id, id));
  }

  async deleteContactSubmission(id: string): Promise<void> {
    await db.delete(contactSubmissions).where(eq(contactSubmissions.id, id));
  }

  // Site settings operations
  async getSiteSettings(): Promise<SiteSetting[]> {
    return await db
      .select()
      .from(siteSettings)
      .orderBy(siteSettings.key);
  }

  async getSiteSetting(key: string): Promise<SiteSetting | undefined> {
    const [setting] = await db
      .select()
      .from(siteSettings)
      .where(eq(siteSettings.key, key));
    return setting;
  }

  async upsertSiteSetting(setting: InsertSiteSetting): Promise<SiteSetting> {
    const [upsertedSetting] = await db
      .insert(siteSettings)
      .values(setting)
      .onConflictDoUpdate({
        target: siteSettings.key,
        set: {
          value: setting.value,
          type: setting.type,
          description: setting.description,
          updatedAt: new Date(),
        },
      })
      .returning();
    return upsertedSetting;
  }

  async deleteSiteSetting(key: string): Promise<void> {
    await db.delete(siteSettings).where(eq(siteSettings.key, key));
  }
}

export const storage = new DatabaseStorage();
