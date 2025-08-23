import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import ServiceDetail from "@/pages/ServiceDetail";
import Portfolio from "@/pages/Portfolio";
import CaseStudyDetail from "@/pages/CaseStudyDetail";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminHome from "@/pages/admin/AdminHome";
import ContentManager from "@/pages/admin/ContentManager";
import CaseStudyManager from "@/pages/admin/CaseStudyManager";
import TeamManager from "@/pages/admin/TeamManager";
import TestimonialManager from "@/pages/admin/TestimonialManager";
import CategoryManager from "@/pages/admin/CategoryManager";
import Layout from "@/components/Layout";
import AdminLayout from "@/components/AdminLayout";

function PublicRoutes() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/services" component={Services} />
        <Route path="/services/:slug" component={ServiceDetail} />
        <Route path="/portfolio" component={Portfolio} />
        <Route path="/case-studies/:slug" component={CaseStudyDetail} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function AdminRoutes() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!isAuthenticated || !user?.isAdmin) {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminHome} />
        <Route path="/admin/content" component={ContentManager} />
        <Route path="/admin/case-studies" component={CaseStudyManager} />
        <Route path="/admin/team" component={TeamManager} />
        <Route path="/admin/testimonials" component={TestimonialManager} />
        <Route path="/admin/categories" component={CategoryManager} />
        <Route component={NotFound} />
      </Switch>
    </AdminLayout>
  );
}

function Router() {
  return (
    <Switch>
      {/* Admin routes - hidden from public navigation */}
      <Route path="/admin" nest>
        <AdminRoutes />
      </Route>
      
      {/* Public routes */}
      <Route>
        <PublicRoutes />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
