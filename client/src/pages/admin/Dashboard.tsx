import { useQuery } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, MessageSquare, Star, TrendingUp, Activity } from "lucide-react";

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/admin/stats"],
  });

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue"></div>
        </div>
      </AdminLayout>
    );
  }

  const statCards = [
    {
      title: "Case Studies",
      value: stats?.caseStudiesCount || 0,
      icon: FileText,
      description: "Published case studies",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      title: "Team Members",
      value: stats?.teamMembersCount || 0,
      icon: Users,
      description: "Active team members",
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-900/20"
    },
    {
      title: "Contact Forms",
      value: stats?.contactFormsCount || 0,
      icon: MessageSquare,
      description: "Total submissions",
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      title: "Testimonials",
      value: stats?.testimonialsCount || 0,
      icon: Star,
      description: "Active testimonials",
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-900/20"
    }
  ];

  const quickActions = [
    {
      title: "Add Case Study",
      description: "Create a new portfolio case study",
      href: "/admin/case-studies",
      icon: FileText,
      color: "bg-blue-500 hover:bg-blue-600"
    },
    {
      title: "Manage Team",
      description: "Add or edit team members",
      href: "/admin/team",
      icon: Users,
      color: "bg-green-500 hover:bg-green-600"
    },
    {
      title: "View Messages",
      description: "Check new contact form submissions",
      href: "/admin/contact-forms",
      icon: MessageSquare,
      color: "bg-purple-500 hover:bg-purple-600"
    },
    {
      title: "Add Testimonial",
      description: "Create a new client testimonial",
      href: "/admin/testimonials",
      icon: Star,
      color: "bg-yellow-500 hover:bg-yellow-600"
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-dashboard-title">
            Dashboard
          </h1>
          <p className="text-pi-gray mt-2" data-testid="text-dashboard-description">
            Manage your Pi Tetris website content and monitor activity
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, index) => (
            <Card key={index} data-testid={`card-stat-${index}`}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-pi-gray" data-testid={`text-stat-title-${index}`}>
                      {stat.title}
                    </p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white" data-testid={`text-stat-value-${index}`}>
                      {stat.value}
                    </p>
                    <p className="text-xs text-pi-gray mt-1" data-testid={`text-stat-description-${index}`}>
                      {stat.description}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4" data-testid="text-quick-actions-title">
            Quick Actions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow cursor-pointer" data-testid={`card-action-${index}`}>
                <CardContent className="p-6">
                  <a href={action.href} className="block">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg text-white ${action.color}`}>
                        <action.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white" data-testid={`text-action-title-${index}`}>
                          {action.title}
                        </h3>
                        <p className="text-sm text-pi-gray" data-testid={`text-action-description-${index}`}>
                          {action.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2" data-testid="text-recent-activity-title">
              <Activity className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-sm" data-testid="activity-item-0">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-pi-gray">System is running smoothly</span>
                <span className="text-xs text-pi-gray ml-auto">Just now</span>
              </div>
              <div className="flex items-center space-x-3 text-sm" data-testid="activity-item-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-pi-gray">Database backup completed</span>
                <span className="text-xs text-pi-gray ml-auto">1 hour ago</span>
              </div>
              <div className="flex items-center space-x-3 text-sm" data-testid="activity-item-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-pi-gray">Content management system ready</span>
                <span className="text-xs text-pi-gray ml-auto">2 hours ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
