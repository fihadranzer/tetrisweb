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
import RichTextEditor from "@/components/RichTextEditor";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react";

export default function CaseStudyManager() {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: caseStudies = [] } = useQuery({
    queryKey: ["/api/case-studies"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories", { type: "case-study" }],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/case-studies", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
      setIsCreating(false);
      setEditingItem(null);
      toast({ title: "Case study created successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error creating case study", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/case-studies/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
      setEditingItem(null);
      toast({ title: "Case study updated successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error updating case study", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/case-studies/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/case-studies"] });
      toast({ title: "Case study deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting case study", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingItem({
      title: "",
      slug: "",
      clientName: "",
      shortDescription: "",
      longDescription: "",
      challenge: "",
      solution: "",
      results: "",
      imageUrl: "",
      categoryId: "",
      technologies: [],
      tags: [],
      projectDuration: "",
      teamSize: 1,
      sortOrder: 0,
      isFeatured: false,
      isActive: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    // Parse technologies and tags from comma-separated strings
    const processedData = {
      ...editingItem,
      technologies: typeof editingItem.technologies === 'string' 
        ? editingItem.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
        : editingItem.technologies || [],
      tags: typeof editingItem.tags === 'string'
        ? editingItem.tags.split(',').map((t: string) => t.trim()).filter(Boolean)
        : editingItem.tags || [],
    };

    if (isCreating) {
      createMutation.mutate(processedData);
    } else {
      updateMutation.mutate({ id: editingItem.id, data: processedData });
    }
  };

  const handleImageUpload = async () => {
    try {
      const response = await apiRequest("POST", "/api/objects/upload");
      const data = await response.json();
      return { method: "PUT" as const, url: data.uploadURL };
    } catch (error) {
      toast({
        title: "Error getting upload URL",
        description: "Failed to prepare file upload",
        variant: "destructive",
      });
      throw error;
    }
  };

  const handleImageUploadComplete = async (result: any) => {
    if (result.successful && result.successful.length > 0) {
      const uploadedFile = result.successful[0];
      try {
        const response = await apiRequest("PUT", "/api/admin/images", {
          imageURL: uploadedFile.uploadURL,
        });
        const data = await response.json();
        setEditingItem({ ...editingItem, imageUrl: data.objectPath });
        toast({ title: "Image uploaded successfully" });
      } catch (error) {
        toast({
          title: "Error processing image",
          description: "Failed to save image",
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Case Study Manager</h1>
        <p className="text-gray-600">Manage portfolio case studies and project showcases.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Case Studies</CardTitle>
            <Button onClick={handleCreate} data-testid="button-add-case-study">
              <Plus className="w-4 h-4 mr-2" />
              Add Case Study
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {caseStudies.map((caseStudy: any) => (
                <div key={caseStudy.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-medium">{caseStudy.title}</h3>
                      {caseStudy.isFeatured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                    </div>
                    {caseStudy.clientName && (
                      <p className="text-sm text-blue-600 mb-1">Client: {caseStudy.clientName}</p>
                    )}
                    <p className="text-sm text-gray-600 mb-2">{caseStudy.shortDescription}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant={caseStudy.isActive ? "default" : "secondary"}>
                        {caseStudy.isActive ? "Active" : "Inactive"}
                      </Badge>
                      {caseStudy.isFeatured && (
                        <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                          Featured
                        </Badge>
                      )}
                      {caseStudy.isActive ? (
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
                      onClick={() => setEditingItem(caseStudy)}
                      data-testid={`button-edit-case-study-${caseStudy.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(caseStudy.id)}
                      data-testid={`button-delete-case-study-${caseStudy.id}`}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {editingItem && (
          <Card>
            <CardHeader>
              <CardTitle>{isCreating ? "Create Case Study" : "Edit Case Study"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      value={editingItem.title || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                      required
                      data-testid="input-case-study-title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="slug">Slug</Label>
                    <Input
                      id="slug"
                      value={editingItem.slug || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
                      required
                      data-testid="input-case-study-slug"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="clientName">Client Name</Label>
                  <Input
                    id="clientName"
                    value={editingItem.clientName || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, clientName: e.target.value })}
                    data-testid="input-case-study-client"
                  />
                </div>

                <div>
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    value={editingItem.shortDescription || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                    data-testid="textarea-case-study-short-description"
                  />
                </div>

                <div>
                  <Label>Project Image</Label>
                  <div className="mt-2">
                    <ObjectUploader
                      onGetUploadParameters={handleImageUpload}
                      onComplete={handleImageUploadComplete}
                      maxNumberOfFiles={1}
                      maxFileSize={10 * 1024 * 1024} // 10MB
                    >
                      <span>Upload Project Image</span>
                    </ObjectUploader>
                    {editingItem.imageUrl && (
                      <div className="mt-2">
                        <img src={editingItem.imageUrl} alt="Project preview" className="w-32 h-20 object-cover rounded border" />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="longDescription">Detailed Description</Label>
                  <RichTextEditor
                    value={editingItem.longDescription || ""}
                    onChange={(value) => setEditingItem({ ...editingItem, longDescription: value })}
                  />
                </div>

                <div>
                  <Label htmlFor="challenge">Challenge</Label>
                  <RichTextEditor
                    value={editingItem.challenge || ""}
                    onChange={(value) => setEditingItem({ ...editingItem, challenge: value })}
                  />
                </div>

                <div>
                  <Label htmlFor="solution">Solution</Label>
                  <RichTextEditor
                    value={editingItem.solution || ""}
                    onChange={(value) => setEditingItem({ ...editingItem, solution: value })}
                  />
                </div>

                <div>
                  <Label htmlFor="results">Results</Label>
                  <RichTextEditor
                    value={editingItem.results || ""}
                    onChange={(value) => setEditingItem({ ...editingItem, results: value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="projectDuration">Project Duration</Label>
                    <Input
                      id="projectDuration"
                      value={editingItem.projectDuration || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, projectDuration: e.target.value })}
                      placeholder="e.g., 6 months"
                      data-testid="input-case-study-duration"
                    />
                  </div>
                  <div>
                    <Label htmlFor="teamSize">Team Size</Label>
                    <Input
                      id="teamSize"
                      type="number"
                      min="1"
                      value={editingItem.teamSize || 1}
                      onChange={(e) => setEditingItem({ ...editingItem, teamSize: parseInt(e.target.value) })}
                      data-testid="input-case-study-team-size"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="technologies">Technologies (comma-separated)</Label>
                  <Input
                    id="technologies"
                    value={Array.isArray(editingItem.technologies) ? editingItem.technologies.join(', ') : editingItem.technologies || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, technologies: e.target.value })}
                    placeholder="React, Node.js, PostgreSQL"
                    data-testid="input-case-study-technologies"
                  />
                </div>

                <div>
                  <Label htmlFor="tags">Tags (comma-separated)</Label>
                  <Input
                    id="tags"
                    value={Array.isArray(editingItem.tags) ? editingItem.tags.join(', ') : editingItem.tags || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, tags: e.target.value })}
                    placeholder="AI, Web Development, Enterprise"
                    data-testid="input-case-study-tags"
                  />
                </div>

                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select 
                    value={editingItem.categoryId || ""} 
                    onValueChange={(value) => setEditingItem({ ...editingItem, categoryId: value })}
                  >
                    <SelectTrigger data-testid="select-case-study-category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">No category</SelectItem>
                      {categories.map((category: any) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={editingItem.isFeatured || false}
                      onCheckedChange={(checked) => setEditingItem({ ...editingItem, isFeatured: checked })}
                      data-testid="switch-case-study-featured"
                    />
                    <Label htmlFor="isFeatured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={editingItem.isActive || false}
                      onCheckedChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
                      data-testid="switch-case-study-active"
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-case-study">
                    {isCreating ? "Create Case Study" : "Update Case Study"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setEditingItem(null); setIsCreating(false); }} data-testid="button-cancel-case-study">
                    Cancel
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
