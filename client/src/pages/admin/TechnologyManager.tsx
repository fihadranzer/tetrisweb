import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import AdminLayout from "@/components/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Save, Code } from "lucide-react";

const techCategories = [
  { value: 'backend', label: 'Back-End' },
  { value: 'frontend', label: 'Front-End' },
  { value: 'ai-ml', label: 'AI/ML' },
  { value: 'data', label: 'Data' },
  { value: 'devops', label: 'DevOps' },
];

export default function TechnologyManager() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "backend",
    icon: "",
    url: "",
    description: "",
    isActive: true,
    sortOrder: 0
  });

  const { data: technologies, isLoading } = useQuery({
    queryKey: ["/api/admin/technologies"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("POST", "/api/admin/technologies", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/technologies"] });
      resetForm();
      toast({
        title: "Technology created successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error creating technology",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      await apiRequest("PUT", `/api/admin/technologies/${editingId}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/technologies"] });
      resetForm();
      toast({
        title: "Technology updated successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error updating technology",
        variant: "destructive",
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      await apiRequest("DELETE", `/api/admin/technologies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/technologies"] });
      toast({
        title: "Technology deleted successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error deleting technology",
        variant: "destructive",
      });
    },
  });

  const resetForm = () => {
    setFormData({
      name: "",
      category: "backend",
      icon: "",
      url: "",
      description: "",
      isActive: true,
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

  const startEdit = (technology: any) => {
    setEditingId(technology.id);
    setFormData({
      name: technology.name || "",
      category: technology.category || "backend",
      icon: technology.icon || "",
      url: technology.url || "",
      description: technology.description || "",
      isActive: technology.isActive ?? true,
      sortOrder: technology.sortOrder || 0
    });
    setShowForm(true);
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

  const groupedTechnologies = techCategories.map(category => ({
    ...category,
    technologies: technologies?.filter((tech: any) => tech.category === category.value) || []
  }));

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-page-title">
              Technology Management
            </h1>
            <p className="text-pi-gray mt-2" data-testid="text-page-description">
              Manage technology stack and tools
            </p>
          </div>
          <Button onClick={() => setShowForm(!showForm)} data-testid="button-add-technology">
            <Plus className="w-4 h-4 mr-2" />
            Add Technology
          </Button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <Card>
            <CardHeader>
              <CardTitle data-testid="text-form-title">
                {editingId ? "Edit Technology" : "Add New Technology"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Technology Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., React, Python, AWS"
                      required
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category">Category *</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                      <SelectTrigger data-testid="select-category">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {techCategories.map((category) => (
                          <SelectItem key={category.value} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="url">Official Website</Label>
                    <Input
                      id="url"
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      placeholder="https://technology.com"
                      data-testid="input-url"
                    />
                  </div>
                  <div>
                    <Label htmlFor="icon">Icon/Logo URL</Label>
                    <Input
                      id="icon"
                      value={formData.icon}
                      onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                      placeholder="URL to technology logo"
                      data-testid="input-icon"
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
                    placeholder="Brief description of the technology"
                    data-testid="textarea-description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isActive"
                      checked={formData.isActive}
                      onCheckedChange={(checked) => setFormData({ ...formData, isActive: !!checked })}
                      data-testid="checkbox-isActive"
                    />
                    <Label htmlFor="isActive">Active</Label>
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

        {/* Technologies by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {groupedTechnologies.map((category) => (
            <Card key={category.value}>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2" data-testid={`text-category-${category.value}`}>
                  <Code className="w-5 h-5" />
                  <span>{category.label}</span>
                  <span className="text-sm font-normal text-pi-gray">
                    ({category.technologies.length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {category.technologies.length === 0 ? (
                  <p className="text-pi-gray text-sm" data-testid={`text-no-technologies-${category.value}`}>
                    No technologies in this category
                  </p>
                ) : (
                  <div className="space-y-3">
                    {category.technologies.map((tech: any) => (
                      <div 
                        key={tech.id}
                        className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg"
                        data-testid={`technology-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                      >
                        <div className="flex items-center space-x-3">
                          {tech.icon && (
                            <img src={tech.icon} alt={tech.name} className="w-6 h-6 object-contain" />
                          )}
                          <div>
                            <h4 className="font-medium text-gray-900 dark:text-white" data-testid={`text-tech-name-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}>
                              {tech.name}
                            </h4>
                            {tech.description && (
                              <p className="text-xs text-pi-gray" data-testid={`text-tech-description-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}>
                                {tech.description}
                              </p>
                            )}
                          </div>
                          {!tech.isActive && (
                            <span className="text-xs px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 rounded">
                              Inactive
                            </span>
                          )}
                        </div>
                        <div className="flex space-x-1">
                          {tech.url && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => window.open(tech.url, '_blank')}
                              data-testid={`button-visit-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                            >
                              Visit
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => startEdit(tech)}
                            data-testid={`button-edit-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => deleteMutation.mutate(tech.id)}
                            data-testid={`button-delete-${tech.name.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
}
