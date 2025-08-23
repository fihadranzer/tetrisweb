import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Plus, Edit, Trash2, Save, Building, Image } from "lucide-react";

export default function ClientManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    logoUrl: "",
    website: "",
    description: "",
    isActive: true,
    isFeatured: false,
    sortOrder: 0
  });

  const { data: clients, isLoading } = useQuery({
    queryKey: ["/api/admin/clients"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/admin/clients", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/clients"] });
      resetForm();
      toast({
        title: "Client created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error creating client",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("PUT", `/api/admin/clients/${editingId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/clients"] });
      resetForm();
      toast({
        title: "Client updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error updating client",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/clients"] });
      toast({
        title: "Client deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error deleting client",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      logoUrl: "",
      website: "",
      description: "",
      isActive: true,
      isFeatured: false,
      sortOrder: 0
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate(formData);
    } else {
      createMutation.mutate(formData);
    }
  };

  const startEdit = (client: any) => {
    setEditingId(client.id);
    setFormData({
      name: client.name || "",
      logoUrl: client.logoUrl || "",
      website: client.website || "",
      description: client.description || "",
      isActive: client.isActive ?? true,
      isFeatured: client.isFeatured || false,
      sortOrder: client.sortOrder || 0
    });
    setShowForm(true);
  };

  const handleLogoUpload = async () => {
    try {
      const response = await fetch("/api/objects/upload", {
        method: "POST",
        credentials: "include",
      });
      const data = await response.json();
      return { method: "PUT" as const, url: data.uploadURL };
    } catch (error) {
      console.error("Error getting upload URL:", error);
      throw error;
    }
  };

  const handleLogoUploadComplete = async (result: any) => {
    if (result.successful && result.successful[0]) {
      const uploadURL = result.successful[0].uploadURL;
      
      try {
        const response = await fetch("/api/objects/set-acl", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            objectURL: uploadURL,
            visibility: "public"
          }),
        });
        
        const data = await response.json();
        setFormData({ ...formData, logoUrl: data.objectPath });
        toast({
          title: "Logo uploaded successfully",
        });
      } catch (error) {
        console.error("Error setting ACL:", error);
        toast({
          title: "Error processing logo",
          variant: "destructive",
        });
      }
    }
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
              Client Management
            </h1>
            <p className="text-pi-gray mt-2" data-testid="text-page-description">
              Manage client companies and their information
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} data-testid="button-add-client">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-form-title">
                {editingId ? "Edit Client" : "Add New Client"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Company Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      type="url"
                      value={formData.website}
                      onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                      placeholder="https://company.com"
                      data-testid="input-website"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    placeholder="Brief description of the client or project work"
                    data-testid="textarea-description"
                  />
                </div>

                <div>
                  <Label>Company Logo</Label>
                  <div className="mt-2 space-y-2">
                    {formData.logoUrl && (
                      <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-2">
                        <img src={formData.logoUrl} alt="Preview" className="h-12 w-32 object-contain" />
                        <p className="text-xs text-pi-gray mt-1" data-testid="text-current-logo">
                          Current logo
                        </p>
                      </div>
                    )}
                    <ObjectUploader
                      maxNumberOfFiles={1}
                      maxFileSize={5242880} // 5MB
                      onGetUploadParameters={handleLogoUpload}
                      onComplete={handleLogoUploadComplete}
                      data-testid="uploader-logo"
                    >
                      <div className="flex items-center gap-2">
                        <Image className="w-4 h-4" />
                        <span>Upload Logo</span>
                      </div>
                    </ObjectUploader>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
                      data-testid="checkbox-isActive"
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isFeatured"
                      checked={formData.isFeatured}
                      onCheckedChange={(checked) => setFormData({ ...formData, isFeatured: !!checked })}
                      data-testid="checkbox-isFeatured"
                    />
                    <Label htmlFor="isFeatured">Featured</Label>
                  </div>
                  <div>
                    <Label htmlFor="sortOrder">Sort Order</Label>
                    <Input
                      id="sortOrder"
                      type="number"
                      value={formData.sortOrder}
                      onChange={(e) => setFormData({ ...formData, sortOrder: parseInt(e.target.value) || 0 })}
                      data-testid="input-sortOrder"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button 
                    type="submit" 
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {editingId ? "Update" : "Create"}
                  </Button>
                  <Button type="button" variant="outline" onClick={resetForm} data-testid="button-cancel">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Clients List */}
        <Card>
          <CardHeader>
            <CardTitle data-testid="text-clients-title">Clients</CardTitle>
          </CardHeader>
          <CardContent>
            {!clients || clients.length === 0 ? (
              <p className="text-pi-gray text-center py-8" data-testid="text-no-clients">
                No clients found. Add your first client above.
              </p>
            ) : (
              <div className="space-y-4">
                {clients.map((client: any) => (
                  <div 
                    key={client.id} 
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                    data-testid={`client-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {client.logoUrl ? (
                          <img 
                            src={client.logoUrl} 
                            alt={client.name}
                            className="w-16 h-12 object-contain"
                          />
                        ) : (
                          <div className="w-16 h-12 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                            <Building className="w-6 h-6 text-gray-400" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white" data-testid={`text-client-name-${client.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {client.name}
                          </h3>
                          <div className="flex space-x-1">
                            {client.isFeatured && (
                              <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200 rounded" data-testid={`badge-featured-${client.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                Featured
                              </span>
                            )}
                            {!client.isActive && (
                              <span className="text-xs px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded" data-testid={`badge-inactive-${client.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                Inactive
                              </span>
                            )}
                          </div>
                        </div>
                        {client.website && (
                          <a 
                            href={client.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-sm text-pi-blue hover:underline mb-1 block"
                            data-testid={`link-website-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            {client.website}
                          </a>
                        )}
                        {client.description && (
                          <p className="text-sm text-gray-700 dark:text-gray-300" data-testid={`text-client-description-${client.name.toLowerCase().replace(/\s+/g, '-')}`}>
                            {client.description}
                          </p>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => startEdit(client)}
                          data-testid={`button-edit-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => deleteMutation.mutate(client.id)}
                          data-testid={`button-delete-${client.name.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}
