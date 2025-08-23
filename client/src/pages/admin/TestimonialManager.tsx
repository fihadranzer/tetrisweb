import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ObjectUploader } from "@/components/ObjectUploader";
import { Plus, Edit, Trash2, Star, Eye, EyeOff } from "lucide-react";

export default function TestimonialManager() {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: testimonials = [] } = useQuery({
    queryKey: ["/api/testimonials"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/testimonials", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setIsCreating(false);
      setEditingItem(null);
      toast({ title: "Testimonial created successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error creating testimonial", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/testimonials/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      setEditingItem(null);
      toast({ title: "Testimonial updated successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error updating testimonial", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/testimonials/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/testimonials"] });
      toast({ title: "Testimonial deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting testimonial", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingItem({
      content: "",
      authorName: "",
      authorTitle: "",
      authorCompany: "",
      authorImageUrl: "",
      rating: 5,
      sortOrder: 0,
      isActive: true,
      isFeatured: false,
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
        setEditingItem({ ...editingItem, authorImageUrl: data.objectPath });
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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Testimonial Manager</h1>
        <p className="text-gray-600">Manage client testimonials and reviews.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Testimonials</CardTitle>
            <Button onClick={handleCreate} data-testid="button-add-testimonial">
              <Plus className="w-4 h-4 mr-2" />
              Add Testimonial
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {testimonials.map((testimonial: any) => (
                <div key={testimonial.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-4 flex-1">
                    {testimonial.authorImageUrl ? (
                      <img 
                        src={testimonial.authorImageUrl} 
                        alt={testimonial.authorName}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {testimonial.authorName.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-medium">{testimonial.authorName}</h3>
                        {testimonial.isFeatured && <Star className="w-4 h-4 text-yellow-500 fill-current" />}
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(testimonial.rating)}
                        <span className="text-sm text-gray-500">({testimonial.rating}/5)</span>
                      </div>
                      <p className="text-sm text-blue-600 mb-1">
                        {testimonial.authorTitle}
                        {testimonial.authorCompany && `, ${testimonial.authorCompany}`}
                      </p>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-3">{testimonial.content}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={testimonial.isActive ? "default" : "secondary"}>
                          {testimonial.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {testimonial.isFeatured && (
                          <Badge variant="outline" className="text-yellow-600 border-yellow-600">
                            Featured
                          </Badge>
                        )}
                        {testimonial.isActive ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingItem(testimonial)}
                      data-testid={`button-edit-testimonial-${testimonial.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(testimonial.id)}
                      data-testid={`button-delete-testimonial-${testimonial.id}`}
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
              <CardTitle>{isCreating ? "Create Testimonial" : "Edit Testimonial"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="content">Testimonial Content</Label>
                  <Textarea
                    id="content"
                    value={editingItem.content || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, content: e.target.value })}
                    required
                    rows={4}
                    placeholder="Share your testimonial content here..."
                    data-testid="textarea-testimonial-content"
                  />
                </div>

                <div>
                  <Label htmlFor="authorName">Author Name</Label>
                  <Input
                    id="authorName"
                    value={editingItem.authorName || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, authorName: e.target.value })}
                    required
                    data-testid="input-testimonial-author-name"
                  />
                </div>

                <div>
                  <Label htmlFor="authorTitle">Author Title</Label>
                  <Input
                    id="authorTitle"
                    value={editingItem.authorTitle || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, authorTitle: e.target.value })}
                    placeholder="CEO, Director of Engineering, etc."
                    data-testid="input-testimonial-author-title"
                  />
                </div>

                <div>
                  <Label htmlFor="authorCompany">Author Company</Label>
                  <Input
                    id="authorCompany"
                    value={editingItem.authorCompany || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, authorCompany: e.target.value })}
                    data-testid="input-testimonial-author-company"
                  />
                </div>

                <div>
                  <Label>Author Profile Image</Label>
                  <div className="mt-2">
                    <ObjectUploader
                      onGetUploadParameters={handleImageUpload}
                      onComplete={handleImageUploadComplete}
                      maxNumberOfFiles={1}
                      maxFileSize={5 * 1024 * 1024} // 5MB
                    >
                      <span>Upload Author Image</span>
                    </ObjectUploader>
                    {editingItem.authorImageUrl && (
                      <div className="mt-2">
                        <img 
                          src={editingItem.authorImageUrl} 
                          alt="Author preview" 
                          className="w-16 h-16 rounded-full object-cover border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="rating">Rating</Label>
                  <div className="flex items-center gap-4 mt-2">
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={editingItem.rating || 5}
                      onChange={(e) => setEditingItem({ ...editingItem, rating: parseInt(e.target.value) })}
                      className="w-20"
                      data-testid="input-testimonial-rating"
                    />
                    <div className="flex gap-1">
                      {renderStars(editingItem.rating || 5)}
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={editingItem.sortOrder || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) })}
                    data-testid="input-testimonial-sort-order"
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isFeatured"
                      checked={editingItem.isFeatured || false}
                      onCheckedChange={(checked) => setEditingItem({ ...editingItem, isFeatured: checked })}
                      data-testid="switch-testimonial-featured"
                    />
                    <Label htmlFor="isFeatured">Featured</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="isActive"
                      checked={editingItem.isActive || false}
                      onCheckedChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
                      data-testid="switch-testimonial-active"
                    />
                    <Label htmlFor="isActive">Active</Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-testimonial">
                    {isCreating ? "Create Testimonial" : "Update Testimonial"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setEditingItem(null); setIsCreating(false); }} data-testid="button-cancel-testimonial">
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
