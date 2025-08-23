import { apiRequest } from "./queryClient";

// Contact form submission
export const submitContactForm = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
}) => {
  return apiRequest("POST", "/api/contact", data);
};

// Public API calls
export const getServices = async () => {
  return apiRequest("GET", "/api/services");
};

export const getService = async (slug: string) => {
  return apiRequest("GET", `/api/services/${slug}`);
};

export const getTechnologies = async (category?: string) => {
  const params = category ? `?category=${category}` : '';
  return apiRequest("GET", `/api/technologies${params}`);
};

export const getTeamMembers = async () => {
  return apiRequest("GET", "/api/team");
};

export const getTestimonials = async (featured?: boolean) => {
  const params = featured ? '?featured=true' : '';
  return apiRequest("GET", `/api/testimonials${params}`);
};

export const getClients = async (featured?: boolean) => {
  const params = featured ? '?featured=true' : '';
  return apiRequest("GET", `/api/clients${params}`);
};

export const getCaseStudies = async (featured?: boolean) => {
  const params = featured ? '?featured=true' : '';
  return apiRequest("GET", `/api/case-studies${params}`);
};

export const getCaseStudy = async (slug: string) => {
  return apiRequest("GET", `/api/case-studies/${slug}`);
};

export const getSiteSetting = async (key: string) => {
  return apiRequest("GET", `/api/settings/${key}`);
};

// Admin API calls (require authentication)
export const getDashboardStats = async () => {
  return apiRequest("GET", "/api/admin/stats");
};

export const getCategories = async (type?: string) => {
  const params = type ? `?type=${type}` : '';
  return apiRequest("GET", `/api/admin/categories${params}`);
};

export const createCategory = async (data: any) => {
  return apiRequest("POST", "/api/admin/categories", data);
};

export const updateCategory = async (id: string, data: any) => {
  return apiRequest("PUT", `/api/admin/categories/${id}`, data);
};

export const deleteCategory = async (id: string) => {
  return apiRequest("DELETE", `/api/admin/categories/${id}`);
};

// Services admin
export const getServicesAdmin = async () => {
  return apiRequest("GET", "/api/admin/services");
};

export const createService = async (data: any) => {
  return apiRequest("POST", "/api/admin/services", data);
};

export const updateService = async (id: string, data: any) => {
  return apiRequest("PUT", `/api/admin/services/${id}`, data);
};

export const deleteService = async (id: string) => {
  return apiRequest("DELETE", `/api/admin/services/${id}`);
};

// Technologies admin
export const getTechnologiesAdmin = async () => {
  return apiRequest("GET", "/api/admin/technologies");
};

export const createTechnology = async (data: any) => {
  return apiRequest("POST", "/api/admin/technologies", data);
};

export const updateTechnology = async (id: string, data: any) => {
  return apiRequest("PUT", `/api/admin/technologies/${id}`, data);
};

export const deleteTechnology = async (id: string) => {
  return apiRequest("DELETE", `/api/admin/technologies/${id}`);
};

// Team admin
export const getTeamAdmin = async () => {
  return apiRequest("GET", "/api/admin/team");
};

export const createTeamMember = async (data: any) => {
  return apiRequest("POST", "/api/admin/team", data);
};

export const updateTeamMember = async (id: string, data: any) => {
  return apiRequest("PUT", `/api/admin/team/${id}`, data);
};

export const deleteTeamMember = async (id: string) => {
  return apiRequest("DELETE", `/api/admin/team/${id}`);
};

// Testimonials admin
export const getTestimonialsAdmin = async () => {
  return apiRequest("GET", "/api/admin/testimonials");
};

export const createTestimonial = async (data: any) => {
  return apiRequest("POST", "/api/admin/testimonials", data);
};

export const updateTestimonial = async (id: string, data: any) => {
  return apiRequest("PUT", `/api/admin/testimonials/${id}`, data);
};

export const deleteTestimonial = async (id: string) => {
  return apiRequest("DELETE", `/api/admin/testimonials/${id}`);
};

// Clients admin
export const getClientsAdmin = async () => {
  return apiRequest("GET", "/api/admin/clients");
};

export const createClient = async (data: any) => {
  return apiRequest("POST", "/api/admin/clients", data);
};

export const updateClient = async (id: string, data: any) => {
  return apiRequest("PUT", `/api/admin/clients/${id}`, data);
};

export const deleteClient = async (id: string) => {
  return apiRequest("DELETE", `/api/admin/clients/${id}`);
};

// Case studies admin
export const getCaseStudiesAdmin = async () => {
  return apiRequest("GET", "/api/admin/case-studies");
};

export const createCaseStudy = async (data: any) => {
  return apiRequest("POST", "/api/admin/case-studies", data);
};

export const updateCaseStudy = async (id: string, data: any) => {
  return apiRequest("PUT", `/api/admin/case-studies/${id}`, data);
};

export const deleteCaseStudy = async (id: string) => {
  return apiRequest("DELETE", `/api/admin/case-studies/${id}`);
};

// Contact submissions admin
export const getContactSubmissions = async (status?: string) => {
  const params = status ? `?status=${status}` : '';
  return apiRequest("GET", `/api/admin/contact-submissions${params}`);
};

export const markContactSubmissionAsRead = async (id: string) => {
  return apiRequest("PUT", `/api/admin/contact-submissions/${id}/read`);
};

export const updateContactSubmissionStatus = async (id: string, status: string) => {
  return apiRequest("PUT", `/api/admin/contact-submissions/${id}`, { status });
};

// Site settings admin
export const getSiteSettings = async () => {
  return apiRequest("GET", "/api/admin/settings");
};

export const upsertSiteSetting = async (data: any) => {
  return apiRequest("POST", "/api/admin/settings", data);
};

// Object storage
export const getUploadURL = async () => {
  return apiRequest("POST", "/api/objects/upload");
};

export const setObjectACL = async (objectURL: string, visibility: 'public' | 'private') => {
  return apiRequest("PUT", "/api/objects/set-acl", { objectURL, visibility });
};
