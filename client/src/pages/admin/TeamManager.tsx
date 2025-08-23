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
import { Plus, Edit, Trash2, Eye, EyeOff, Linkedin, Github, Twitter } from "lucide-react";

export default function TeamManager() {
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: teamMembers = [] } = useQuery({
    queryKey: ["/api/team"],
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/team", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      setIsCreating(false);
      setEditingItem(null);
      toast({ title: "Team member created successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error creating team member", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/team/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      setEditingItem(null);
      toast({ title: "Team member updated successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error updating team member", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/team/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/team"] });
      toast({ title: "Team member deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting team member", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleCreate = () => {
    setIsCreating(true);
    setEditingItem({
      name: "",
      role: "",
      bio: "",
      expertise: [],
      imageUrl: "",
      linkedinUrl: "",
      githubUrl: "",
      twitterUrl: "",
      sortOrder: 0,
      isActive: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    // Parse expertise from comma-separated string
    const processedData = {
      ...editingItem,
      expertise: typeof editingItem.expertise === 'string' 
        ? editingItem.expertise.split(',').map((e: string) => e.trim()).filter(Boolean)
        : editingItem.expertise || [],
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
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Team Manager</h1>
        <p className="text-gray-600">Manage team members and their profiles.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Team Members</CardTitle>
            <Button onClick={handleCreate} data-testid="button-add-team-member">
              <Plus className="w-4 h-4 mr-2" />
              Add Team Member
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {teamMembers.map((member: any) => (
                <div key={member.id} className="flex items-start justify-between p-4 border rounded-lg">
                  <div className="flex items-start gap-4">
                    {member.imageUrl ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500 font-medium">
                          {member.name.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium">{member.name}</h3>
                      <p className="text-sm text-blue-600 mb-1">{member.role}</p>
                      <p className="text-sm text-gray-600 mb-2 line-clamp-2">{member.bio}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant={member.isActive ? "default" : "secondary"}>
                          {member.isActive ? "Active" : "Inactive"}
                        </Badge>
                        {member.isActive ? (
                          <Eye className="w-4 h-4 text-green-600" />
                        ) : (
                          <EyeOff className="w-4 h-4 text-gray-400" />
                        )}
                      </div>
                      <div className="flex gap-2 mt-2">
                        {member.linkedinUrl && <Linkedin className="w-4 h-4 text-blue-600" />}
                        {member.githubUrl && <Github className="w-4 h-4 text-gray-800" />}
                        {member.twitterUrl && <Twitter className="w-4 h-4 text-blue-400" />}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setEditingItem(member)}
                      data-testid={`button-edit-team-member-${member.id}`}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMutation.mutate(member.id)}
                      data-testid={`button-delete-team-member-${member.id}`}
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
              <CardTitle>{isCreating ? "Create Team Member" : "Edit Team Member"}</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={editingItem.name || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                    required
                    data-testid="input-team-member-name"
                  />
                </div>

                <div>
                  <Label htmlFor="role">Role</Label>
                  <Input
                    id="role"
                    value={editingItem.role || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                    required
                    data-testid="input-team-member-role"
                  />
                </div>

                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={editingItem.bio || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, bio: e.target.value })}
                    rows={3}
                    data-testid="textarea-team-member-bio"
                  />
                </div>

                <div>
                  <Label>Profile Image</Label>
                  <div className="mt-2">
                    <ObjectUploader
                      onGetUploadParameters={handleImageUpload}
                      onComplete={handleImageUploadComplete}
                      maxNumberOfFiles={1}
                      maxFileSize={5 * 1024 * 1024} // 5MB
                    >
                      <span>Upload Profile Image</span>
                    </ObjectUploader>
                    {editingItem.imageUrl && (
                      <div className="mt-2">
                        <img 
                          src={editingItem.imageUrl} 
                          alt="Profile preview" 
                          className="w-24 h-24 rounded-full object-cover border"
                        />
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <Label htmlFor="expertise">Expertise (comma-separated)</Label>
                  <Input
                    id="expertise"
                    value={Array.isArray(editingItem.expertise) ? editingItem.expertise.join(', ') : editingItem.expertise || ""}
                    onChange={(e) => setEditingItem({ ...editingItem, expertise: e.target.value })}
                    placeholder="React, Node.js, AI/ML, Leadership"
                    data-testid="input-team-member-expertise"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                    <Input
                      id="linkedinUrl"
                      type="url"
                      value={editingItem.linkedinUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, linkedinUrl: e.target.value })}
                      placeholder="https://linkedin.com/in/username"
                      data-testid="input-team-member-linkedin"
                    />
                  </div>
                  <div>
                    <Label htmlFor="githubUrl">GitHub URL</Label>
                    <Input
                      id="githubUrl"
                      type="url"
                      value={editingItem.githubUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, githubUrl: e.target.value })}
                      placeholder="https://github.com/username"
                      data-testid="input-team-member-github"
                    />
                  </div>
                  <div>
                    <Label htmlFor="twitterUrl">Twitter URL</Label>
                    <Input
                      id="twitterUrl"
                      type="url"
                      value={editingItem.twitterUrl || ""}
                      onChange={(e) => setEditingItem({ ...editingItem, twitterUrl: e.target.value })}
                      placeholder="https://twitter.com/username"
                      data-testid="input-team-member-twitter"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="sortOrder">Sort Order</Label>
                  <Input
                    id="sortOrder"
                    type="number"
                    value={editingItem.sortOrder || 0}
                    onChange={(e) => setEditingItem({ ...editingItem, sortOrder: parseInt(e.target.value) })}
                    data-testid="input-team-member-sort-order"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="isActive"
                    checked={editingItem.isActive || false}
                    onCheckedChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
                    data-testid="switch-team-member-active"
                  />
                  <Label htmlFor="isActive">Active</Label>
                </div>

                <div className="flex gap-2">
                  <Button type="submit" disabled={createMutation.isPending || updateMutation.isPending} data-testid="button-save-team-member">
                    {isCreating ? "Create Team Member" : "Update Team Member"}
                  </Button>
                  <Button type="button" variant="outline" onClick={() => { setEditingItem(null); setIsCreating(false); }} data-testid="button-cancel-team-member">
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
