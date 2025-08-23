import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Mail, Eye, Archive, MessageSquare, Calendar, Building, User, Phone } from "lucide-react";

export default function ContactFormManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedSubmission, setSelectedSubmission] = useState<any>(null);

  const { data: submissions, isLoading } = useQuery({
    queryKey: ["/api/admin/contact-submissions", selectedStatus ? { status: selectedStatus } : {}],
  });

  const markAsReadMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("PUT", `/api/admin/contact-submissions/${id}/read`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
      toast({
        title: "Marked as read",
      });
    },
    onError: () => {
      toast({
        title: "Error marking as read",
        variant: "destructive",
      });
    },
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      await apiRequest("PUT", `/api/admin/contact-submissions/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/contact-submissions"] });
      toast({
        title: "Status updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error updating status",
        variant: "destructive",
      });
    },
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'read': return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
      case 'replied': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'archived': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
    }
  };

  const getProjectTypeLabel = (projectType: string) => {
    const types: Record<string, string> = {
      'ai-ml': 'AI & Machine Learning',
      'custom-software': 'Custom Software Development',
      'mobile-app': 'Mobile App Development',
      'data-engineering': 'Data Engineering',
      'erp-crm': 'ERP/CRM/CMS Development',
      'staff-augmentation': 'Staff Augmentation',
      'consulting': 'Consulting'
    };
    return types[projectType] || projectType;
  };

  const handleStatusChange = (submissionId: string, newStatus: string) => {
    updateStatusMutation.mutate({ id: submissionId, status: newStatus });
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-page-title">
              Contact Form Management
            </h1>
            <p className="text-pi-gray mt-2" data-testid="text-page-description">
              Manage and respond to contact form submissions
            </p>
          </div>
        </div>

        {/* Filter */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <MessageSquare className="w-5 h-5 text-pi-blue" />
              <span className="font-medium">Filter by Status:</span>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-48" data-testid="select-status-filter">
                  <SelectValue placeholder="All submissions" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Submissions</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
              {submissions && (
                <span className="text-sm text-pi-gray">
                  ({submissions.length} {submissions.length === 1 ? 'submission' : 'submissions'})
                </span>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Submissions List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-submissions-title">Contact Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                {!submissions || submissions.length === 0 ? (
                  <div className="text-center py-12">
                    <Mail className="w-12 h-12 text-pi-gray mx-auto mb-4" />
                    <p className="text-pi-gray text-lg" data-testid="text-no-submissions">
                      {selectedStatus ? `No ${selectedStatus} submissions found.` : 'No contact submissions yet.'}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {submissions.map((submission: any) => (
                      <div 
                        key={submission.id}
                        className={`border border-gray-200 dark:border-gray-700 rounded-lg p-4 cursor-pointer transition-colors ${
                          selectedSubmission?.id === submission.id ? 'bg-blue-50 dark:bg-blue-900/20 border-pi-blue' : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                        }`}
                        onClick={() => setSelectedSubmission(submission)}
                        data-testid={`submission-${submission.id}`}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center space-x-3">
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white" data-testid={`text-submission-name-${submission.id}`}>
                                {submission.firstName} {submission.lastName}
                              </h3>
                              <p className="text-sm text-pi-gray" data-testid={`text-submission-email-${submission.id}`}>
                                {submission.email}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(submission.status)} data-testid={`badge-status-${submission.id}`}>
                              {submission.status || 'new'}
                            </Badge>
                            {!submission.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full" data-testid={`indicator-unread-${submission.id}`}></div>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-xs text-pi-gray mb-2">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span data-testid={`text-submission-date-${submission.id}`}>
                              {new Date(submission.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          {submission.company && (
                            <div className="flex items-center space-x-1">
                              <Building className="w-3 h-3" />
                              <span data-testid={`text-submission-company-${submission.id}`}>
                                {submission.company}
                              </span>
                            </div>
                          )}
                          {submission.projectType && (
                            <div className="flex items-center space-x-1">
                              <span className="w-3 h-3 bg-pi-blue rounded-full"></span>
                              <span data-testid={`text-submission-project-${submission.id}`}>
                                {getProjectTypeLabel(submission.projectType)}
                              </span>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2" data-testid={`text-submission-message-${submission.id}`}>
                          {submission.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Submission Details */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle data-testid="text-details-title">Submission Details</CardTitle>
              </CardHeader>
              <CardContent>
                {!selectedSubmission ? (
                  <div className="text-center py-12">
                    <Eye className="w-12 h-12 text-pi-gray mx-auto mb-4" />
                    <p className="text-pi-gray" data-testid="text-select-submission">
                      Select a submission to view details
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2" data-testid="text-contact-info">
                        Contact Information
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 text-pi-gray" />
                          <span data-testid="text-selected-name">
                            {selectedSubmission.firstName} {selectedSubmission.lastName}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Mail className="w-4 h-4 text-pi-gray" />
                          <a 
                            href={`mailto:${selectedSubmission.email}`}
                            className="text-pi-blue hover:underline"
                            data-testid="link-selected-email"
                          >
                            {selectedSubmission.email}
                          </a>
                        </div>
                        {selectedSubmission.company && (
                          <div className="flex items-center space-x-2">
                            <Building className="w-4 h-4 text-pi-gray" />
                            <span data-testid="text-selected-company">{selectedSubmission.company}</span>
                          </div>
                        )}
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-pi-gray" />
                          <span data-testid="text-selected-date">
                            {new Date(selectedSubmission.createdAt).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {selectedSubmission.projectType && (
                      <div>
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Project Type</h3>
                        <Badge variant="outline" data-testid="badge-selected-project">
                          {getProjectTypeLabel(selectedSubmission.projectType)}
                        </Badge>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Message</h3>
                      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3">
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap" data-testid="text-selected-message">
                          {selectedSubmission.message}
                        </p>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">Status</h3>
                      <Select 
                        value={selectedSubmission.status || 'new'} 
                        onValueChange={(value) => handleStatusChange(selectedSubmission.id, value)}
                      >
                        <SelectTrigger data-testid="select-selected-status">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="new">New</SelectItem>
                          <SelectItem value="read">Read</SelectItem>
                          <SelectItem value="replied">Replied</SelectItem>
                          <SelectItem value="archived">Archived</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      {!selectedSubmission.isRead && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => markAsReadMutation.mutate(selectedSubmission.id)}
                          disabled={markAsReadMutation.isPending}
                          data-testid="button-mark-read"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Mark as Read
                        </Button>
                      )}
                      
                      <Button
                        variant="default"
                        size="sm"
                        className="w-full"
                        onClick={() => window.open(`mailto:${selectedSubmission.email}?subject=Re: Your inquiry to Pi Tetris`)}
                        data-testid="button-reply"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Reply via Email
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
