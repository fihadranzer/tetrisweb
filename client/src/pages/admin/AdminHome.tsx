import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Users, 
  FileText, 
  MessageSquare, 
  Star, 
  BarChart3, 
  Calendar,
  TrendingUp,
  Mail
} from "lucide-react";
import { Link } from "wouter";

export default function AdminHome() {
  const { data: services = [] } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: caseStudies = [] } = useQuery({
    queryKey: ["/api/case-studies"],
  });

  const { data: teamMembers = [] } = useQuery({
    queryKey: ["/api/team"],
  });

  const { data: testimonials = [] } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const { data: contactSubmissions = [] } = useQuery({
    queryKey: ["/api/admin/contact-submissions"],
  });

  const unreadSubmissions = contactSubmissions.filter((sub: any) => !sub.isRead).length;
  const featuredCaseStudies = caseStudies.filter((cs: any) => cs.isFeatured).length;
  const featuredTestimonials = testimonials.filter((t: any) => t.isFeatured).length;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
        <p className="text-gray-600">Welcome to the Pi Tetris content management system.</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Services</p>
                <p className="text-3xl font-bold text-gray-900">{services.length}</p>
              </div>
              <FileText className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Case Studies</p>
                <p className="text-3xl font-bold text-gray-900">{caseStudies.length}</p>
                <p className="text-xs text-green-600">{featuredCaseStudies} featured</p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Team Members</p>
                <p className="text-3xl font-bold text-gray-900">{teamMembers.length}</p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Contact Forms</p>
                <p className="text-3xl font-bold text-gray-900">{contactSubmissions.length}</p>
                {unreadSubmissions > 0 && (
                  <p className="text-xs text-red-600">{unreadSubmissions} unread</p>
                )}
              </div>
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/case-studies">
              <Button className="w-full justify-start" variant="outline" data-testid="button-manage-case-studies">
                <FileText className="mr-2 h-4 w-4" />
                Manage Case Studies
              </Button>
            </Link>
            <Link href="/admin/team">
              <Button className="w-full justify-start" variant="outline" data-testid="button-manage-team">
                <Users className="mr-2 h-4 w-4" />
                Manage Team Members
              </Button>
            </Link>
            <Link href="/admin/testimonials">
              <Button className="w-full justify-start" variant="outline" data-testid="button-manage-testimonials">
                <Star className="mr-2 h-4 w-4" />
                Manage Testimonials
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button className="w-full justify-start" variant="outline" data-testid="button-manage-categories">
                <BarChart3 className="mr-2 h-4 w-4" />
                Manage Categories
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center">
                <Calendar className="h-4 w-4 text-gray-400 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">System started</p>
                  <p className="text-xs text-gray-500">Content management system is ready</p>
                </div>
              </div>
              {unreadSubmissions > 0 && (
                <div className="flex items-center">
                  <MessageSquare className="h-4 w-4 text-orange-500 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-900">New contact submissions</p>
                    <p className="text-xs text-gray-500">{unreadSubmissions} unread messages</p>
                  </div>
                </div>
              )}
              <div className="flex items-center">
                <TrendingUp className="h-4 w-4 text-green-500 mr-3" />
                <div className="flex-1">
                  <p className="text-sm text-gray-900">Content ready for management</p>
                  <p className="text-xs text-gray-500">All sections available for editing</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="mr-2 h-5 w-5" />
              Case Studies
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-sm font-medium">{caseStudies.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Featured</span>
                <span className="text-sm font-medium">{featuredCaseStudies}</span>
              </div>
              <div className="pt-2">
                <Link href="/admin/case-studies">
                  <Button size="sm" variant="outline" className="w-full" data-testid="button-edit-case-studies">
                    Edit Case Studies
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Star className="mr-2 h-5 w-5" />
              Testimonials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total</span>
                <span className="text-sm font-medium">{testimonials.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Featured</span>
                <span className="text-sm font-medium">{featuredTestimonials}</span>
              </div>
              <div className="pt-2">
                <Link href="/admin/testimonials">
                  <Button size="sm" variant="outline" className="w-full" data-testid="button-edit-testimonials">
                    Edit Testimonials
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="mr-2 h-5 w-5" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Active Members</span>
                <span className="text-sm font-medium">{teamMembers.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Departments</span>
                <span className="text-sm font-medium">
                  {Array.from(new Set(teamMembers.map((m: any) => m.role?.split(' ')[0]))).length}
                </span>
              </div>
              <div className="pt-2">
                <Link href="/admin/team">
                  <Button size="sm" variant="outline" className="w-full" data-testid="button-edit-team">
                    Edit Team
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
