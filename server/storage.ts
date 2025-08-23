import {
  users,
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

export interface IStorage {
  // User operations (required for Replit Auth)
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
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
      .values(category)
      .returning();
    return newCategory;
  }

  async updateCategory(id: string, category: Partial<InsertCategory>): Promise<Category> {
    const [updatedCategory] = await db
      .update(categories)
      .set({ ...category, updatedAt: new Date() })
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
      .values(service)
      .returning();
    return newService;
  }

  async updateService(id: string, service: Partial<InsertService>): Promise<Service> {
    const [updatedService] = await db
      .update(services)
      .set({ ...service, updatedAt: new Date() })
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
      .values(caseStudy)
      .returning();
    return newCaseStudy;
  }

  async updateCaseStudy(id: string, caseStudy: Partial<InsertCaseStudy>): Promise<CaseStudy> {
    const [updatedCaseStudy] = await db
      .update(caseStudies)
      .set({ ...caseStudy, updatedAt: new Date() })
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
      .values(teamMember)
      .returning();
    return newTeamMember;
  }

  async updateTeamMember(id: string, teamMember: Partial<InsertTeamMember>): Promise<TeamMember> {
    const [updatedTeamMember] = await db
      .update(teamMembers)
      .set({ ...teamMember, updatedAt: new Date() })
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
      .values(testimonial)
      .returning();
    return newTestimonial;
  }

  async updateTestimonial(id: string, testimonial: Partial<InsertTestimonial>): Promise<Testimonial> {
    const [updatedTestimonial] = await db
      .update(testimonials)
      .set({ ...testimonial, updatedAt: new Date() })
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
      .values(client)
      .returning();
    return newClient;
  }

  async updateClient(id: string, client: Partial<InsertClient>): Promise<Client> {
    const [updatedClient] = await db
      .update(clients)
      .set({ ...client, updatedAt: new Date() })
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
      .values(technology)
      .returning();
    return newTechnology;
  }

  async updateTechnology(id: string, technology: Partial<InsertTechnology>): Promise<Technology> {
    const [updatedTechnology] = await db
      .update(technologies)
      .set({ ...technology, updatedAt: new Date() })
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
      .values(submission)
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
