import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { Plus, Edit, Trash2, Eye, EyeOff, Folder } from "lucide-react";

export default function CategoryManager() {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/categories", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      setIsCreating(false);
      setEditingItem(null);
      toast({ title: "Category created successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error creating category", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/categories/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      setEditingItem(null);
      toast({ title: "Category updated successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error updating category", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/categories/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/categories"] });
      toast({ title: "Category deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting category", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingItem({
      name: "",
      slug: "",
      description: "",
      type: "service",
      sortOrder: 0,
      isActive: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (isCreating) {
      createMutation.mutate(editingItem);
    } else {
      updateMutation.mutate({ id: editingItem.id, data: editingItem });
    }
  };

  const categoryTypes = [
    { value: "service", label: "Service" },
    { value: "case-study", label: "Case Study" },
    { value: "technology", label: "Technology" },
    { value: "blog", label: "Blog" },
    { value: "other", label: "Other" },
  ];

  const getCategoryTypeColor = (type: string) => {
    switch (type) {
      case "service":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "case-study":
        return "bg-green-100 text-green-800 border-green-200";
      case "technology":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "blog":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  // Group categories by type
  const categoriesByType = categories.reduce((acc: any, category: any) => {
    const type = category.type || 'other';
    if (!acc[type]) acc[type] = [];
    acc[type].push(category);
    return acc;
  }, {});

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Category Manager</h1>
        <p className="text-gray-600">Organize content with categories for services, case studies, and technologies.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Categories</CardTitle>
            <Button onClick={handleCreate} data-testid="button-add-category">
              <Plus className="w-4 h-4 mr-2" />
              Add Category
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 max-h-96 overflow-y-auto">
              {Object.entries(categoriesByType).map(([type, typeCategories]: [string, any]) => (
                <div key={type}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 capitalize flex items-center">
                    <Folder className="w-5 h-5 mr-2" />
                    {type.replace('-', ' ')} Categories
                  </h3>
                  <div className="space-y-3">
                    {typeCategories.map((category: any) => (
                      <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium">{category.name}</h4>
                            <Badge className={getCategoryTypeColor(category.type)}>
                              {category.type}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{category.description}</p>
                          <div className="flex items-center gap-2">
                            <code className="text-xs bg-gray-100 px-2 py-1 rounded">{category.slug}</code>
                            <Badge variant={category.isActive ? "default" : "secondary"}>
                              {category.isActive ? "Active" : "Inactive"}
                            </Badge>
                            {category.isActive ? (
                              <Eye className="w-4 h-4 text-green-600" />
                            ) : (
                              <EyeOff className="w-4 h-4 text-gray-400" />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-2 ml-4">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => setEditingItem(category)}
                            data-testid={`button-edit-category-${category.id}`}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => deleteMutation.mutate(category.id)}
                            data-testid={`button-delete-category-${category.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              
              {categories.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Folder className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  <p>No categories created yet.</p>
                  <p className="text-sm">Create your first category to organize content.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {editingItem && (
          <Card>
            <CardHeader>
              <CardTitle>{isCreating ? "Create Category" : "Edit Category"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Category Name</Label>
                  <Input
                    id="name"
                    value={editingItem.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    required
                    placeholder="e.g., AI & Machine Learning"
                    data-testid="input-category-name"
                  />
                </div>

                <div>
                  <Label htmlFor="slug">URL Slug</Label>
                  <Input
                    id="slug"
                    value={editingItem.slug || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                    required
                    placeholder="e.g., ai-machine-learning"
                    data-testid="input-category-slug"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Used in URLs. Should be lowercase with hyphens instead of spaces.
                  </p>
                </div>

                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={editingItem.description || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                    rows={3}
                    placeholder="Brief description of this category..."
                    data-testid="textarea-category-description"
                  />
                </div>

                <div>
                  <Label htmlFor="type">Category Type</Label>
                  <Select 
                    value={editingItem.type || ""} 
                    onValueChange={(value) => setEditingItem({ ...editingItem, type: value })}
                  >
                    <SelectTrigger data-testid="select-category-type">
                      <SelectValue placeholder="Select category type" />
                    </SelectTrigger>
                    <SelectContent>
                      {categoryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-500 mt-1">
                    Determines where this category can be used in the system.
                  </p>
                </div>

                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={editingItem.sortOrder || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) })}
                    data-testid="input-category-sort-order"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Lower numbers appear first. Use 0 for default ordering.
                  </p>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={editingItem.isActive || false}
                    onCheckedChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
                    data-testid="switch-category-active"
                  />
                  <Label htmlFor="isActive">Active</Label>
                  <p className="text-sm text-gray-500 ml-2">
                    Only active categories are visible to users.
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-category">
                    {isCreating ? "Create Category" : "Update Category"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setEditingItem(null); setIsCreating(false); }} data-testid="button-cancel-category">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Category Usage Overview */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Category Usage Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {categoryTypes.map((type) => {
              const typeCategories = categoriesByType[type.value] || [];
              const activeCount = typeCategories.filter((c: any) => c.isActive).length;
              
              return (
                <div key={type.value} className="text-center p-4 border rounded-lg">
                  <div className={`w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center ${getCategoryTypeColor(type.value)}`}>
                    <Folder className="w-6 h-6" />
                  </div>
                  <h3 className="font-semibold">{type.label}</h3>
                  <p className="text-sm text-gray-600">
                    {activeCount} active / {typeCategories.length} total
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
