import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  LayoutDashboard, 
  FileText, 
  Users, 
  Star, 
  Building, 
  Settings, 
  LogOut,
  MessageSquare,
  Folder
} from "lucide-react";
import { Link, useLocation } from "wouter";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { user } = useAuth();
  const [location] = useLocation();

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  };

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Content", href: "/admin/content", icon: FileText },
    { name: "Case Studies", href: "/admin/case-studies", icon: FileText },
    { name: "Team", href: "/admin/team", icon: Users },
    { name: "Testimonials", href: "/admin/testimonials", icon: Star },
    { name: "Categories", href: "/admin/categories", icon: Folder },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">Pi Tetris Admin</h1>
          <p className="text-sm text-gray-600 mt-1">Content Management</p>
        </div>
        
        <nav className="mt-6">
          <div className="px-3">
            {navigation.map((item) => {
              const isActive = location === item.href;
              return (
                <Link key={item.name} href={item.href}>
                  <a 
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md mb-1 transition-colors ${
                      isActive
                        ? "bg-blue-100 text-blue-900"
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    data-testid={`nav-${item.name.toLowerCase().replace(' ', '-')}`}
                  >
                    <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-blue-500" : "text-gray-400"}`} />
                    {item.name}
                  </a>
                </Link>
              );
            })}
          </div>
        </nav>

        {/* User Info & Logout */}
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {user?.firstName || user?.email}
                  </p>
                  <p className="text-xs text-gray-500">Administrator</p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleLogout}
                  data-testid="button-admin-logout"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900">
                  {navigation.find(item => item.href === location)?.name || "Admin"}
                </h2>
              </div>
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <Button variant="outline" size="sm" data-testid="button-view-website">
                    View Website
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
