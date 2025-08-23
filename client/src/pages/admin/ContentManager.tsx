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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Edit, Trash2, Eye, EyeOff } from "lucide-react";

export default function ContentManager() {
  const [activeTab, setActiveTab] = useState("services");
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isCreating, setIsCreating] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: services = [] } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: clients = [] } = useQuery({
    queryKey: ["/api/clients"],
  });

  const { data: technologies = [] } = useQuery({
    queryKey: ["/api/technologies"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
  });

  const createServiceMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/services", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setIsCreating(false);
      setEditingItem(null);
      toast({ title: "Service created successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error creating service", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateServiceMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/services/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      setEditingItem(null);
      toast({ title: "Service updated successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error updating service", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteServiceMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/services/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/services"] });
      toast({ title: "Service deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting service", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const createClientMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/admin/clients", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setIsCreating(false);
      setEditingItem(null);
      toast({ title: "Client created successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error creating client", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const updateClientMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: any }) => {
      return apiRequest("PUT", `/api/admin/clients/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      setEditingItem(null);
      toast({ title: "Client updated successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error updating client", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const deleteClientMutation = useMutation({
    mutationFn: async (id: string) => {
      return apiRequest("DELETE", `/api/admin/clients/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/clients"] });
      toast({ title: "Client deleted successfully" });
    },
    onError: (error) => {
      toast({ 
        title: "Error deleting client", 
        description: error.message,
        variant: "destructive" 
      });
    },
  });

  const handleCreateService = () => {
    setIsCreating(true);
    setActiveTab("services");
    setEditingItem({
      title: "",
      slug: "",
      shortDescription: "",
      longDescription: "",
      iconUrl: "",
      categoryId: "",
      features: [],
      technologies: [],
      sortOrder: 0,
      isActive: true,
    });
  };

  const handleCreateClient = () => {
    setIsCreating(true);
    setActiveTab("clients");
    setEditingItem({
      name: "",
      logoUrl: "",
      websiteUrl: "",
      description: "",
      sortOrder: 0,
      isActive: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingItem) return;

    if (activeTab === "services") {
      if (isCreating) {
        createServiceMutation.mutate(editingItem);
      } else {
        updateServiceMutation.mutate({ id: editingItem.id, data: editingItem });
      }
    } else if (activeTab === "clients") {
      if (isCreating) {
        createClientMutation.mutate(editingItem);
      } else {
        updateClientMutation.mutate({ id: editingItem.id, data: editingItem });
      }
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
        
        if (activeTab === "services") {
          setEditingItem({ ...editingItem, iconUrl: data.objectPath });
        } else if (activeTab === "clients") {
          setEditingItem({ ...editingItem, logoUrl: data.objectPath });
        }
        
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

  const renderServiceForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={editingItem?.title || ""}
            onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
            required
            data-testid="input-service-title"
          />
        </div>
        <div>
          <Label htmlFor="slug">Slug</Label>
          <Input
            id="slug"
            value={editingItem?.slug || ""}
            onChange={(e) => setEditingItem({ ...editingItem, slug: e.target.value })}
            required
            data-testid="input-service-slug"
          />
        </div>
      </div>

      <div>
        <Label htmlFor="shortDescription">Short Description</Label>
        <Textarea
          id="shortDescription"
          value={editingItem?.shortDescription || ""}
          onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
          data-testid="textarea-service-short-description"
        />
      </div>

      <div>
        <Label htmlFor="longDescription">Long Description</Label>
        <RichTextEditor
          value={editingItem?.longDescription || ""}
          onChange={(value) => setEditingItem({ ...editingItem, longDescription: value })}
        />
      </div>

      <div>
        <Label>Icon Image</Label>
        <div className="mt-2">
          <ObjectUploader
            onGetUploadParameters={handleImageUpload}
            onComplete={handleImageUploadComplete}
            maxNumberOfFiles={1}
            maxFileSize={5 * 1024 * 1024} // 5MB
          >
            <span>Upload Icon</span>
          </ObjectUploader>
          {editingItem?.iconUrl && (
            <div className="mt-2">
              <img src={editingItem.iconUrl} alt="Icon preview" className="w-16 h-16 object-cover rounded" />
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Select 
          value={editingItem?.categoryId || ""} 
          onValueChange={(value) => setEditingItem({ ...editingItem, categoryId: value })}
        >
          <SelectTrigger data-testid="select-service-category">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category: any) => (
              <SelectItem key={category.id} value={category.id}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={editingItem?.isActive || false}
          onCheckedChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
          data-testid="switch-service-active"
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={createServiceMutation.isPending || updateServiceMutation.isPending} data-testid="button-save-service">
          {isCreating ? "Create Service" : "Update Service"}
        </Button>
        <Button type="button" variant="outline" onClick={() => { setEditingItem(null); setIsCreating(false); }} data-testid="button-cancel-service">
          Cancel
        </Button>
      </div>
    </form>
  );

  const renderClientForm = () => (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name">Client Name</Label>
        <Input
          id="name"
          value={editingItem?.name || ""}
          onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
          required
          data-testid="input-client-name"
        />
      </div>

      <div>
        <Label>Logo</Label>
        <div className="mt-2">
          <ObjectUploader
            onGetUploadParameters={handleImageUpload}
            onComplete={handleImageUploadComplete}
            maxNumberOfFiles={1}
            maxFileSize={5 * 1024 * 1024} // 5MB
          >
            <span>Upload Logo</span>
          </ObjectUploader>
          {editingItem?.logoUrl && (
            <div className="mt-2">
              <img src={editingItem.logoUrl} alt="Logo preview" className="w-32 h-16 object-contain rounded border" />
            </div>
          )}
        </div>
      </div>

      <div>
        <Label htmlFor="websiteUrl">Website URL</Label>
        <Input
          id="websiteUrl"
          type="url"
          value={editingItem?.websiteUrl || ""}
          onChange={(e) => setEditingItem({ ...editingItem, websiteUrl: e.target.value })}
          data-testid="input-client-website"
        />
      </div>

      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={editingItem?.description || ""}
          onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
          data-testid="textarea-client-description"
        />
      </div>

      <div className="flex items-center space-x-2">
        <Switch
          id="isActive"
          checked={editingItem?.isActive || false}
          onCheckedChange={(checked) => setEditingItem({ ...editingItem, isActive: checked })}
          data-testid="switch-client-active"
        />
        <Label htmlFor="isActive">Active</Label>
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={createClientMutation.isPending || updateClientMutation.isPending} data-testid="button-save-client">
          {isCreating ? "Create Client" : "Update Client"}
        </Button>
        <Button type="button" variant="outline" onClick={() => { setEditingItem(null); setIsCreating(false); }} data-testid="button-cancel-client">
          Cancel
        </Button>
      </div>
    </form>
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Content Manager</h1>
        <p className="text-gray-600">Manage services, clients, and other website content.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-8">
          <TabsTrigger value="services" data-testid="tab-services">Services</TabsTrigger>
          <TabsTrigger value="clients" data-testid="tab-clients">Clients</TabsTrigger>
          <TabsTrigger value="technologies" data-testid="tab-technologies">Technologies</TabsTrigger>
        </TabsList>

        <TabsContent value="services">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Services</CardTitle>
                <Button onClick={handleCreateService} data-testid="button-add-service">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Service
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {services.map((service: any) => (
                    <div key={service.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium">{service.title}</h3>
                        <p className="text-sm text-gray-600">{service.shortDescription}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant={service.isActive ? "default" : "secondary"}>
                            {service.isActive ? "Active" : "Inactive"}
                          </Badge>
                          {service.isActive ? (
                            <Eye className="w-4 h-4 text-green-600" />
                          ) : (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          )}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingItem(service)}
                          data-testid={`button-edit-service-${service.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteServiceMutation.mutate(service.id)}
                          data-testid={`button-delete-service-${service.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingItem && activeTab === "services" && (
              <Card>
                <CardHeader>
                  <CardTitle>{isCreating ? "Create Service" : "Edit Service"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderServiceForm()}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="clients">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Clients</CardTitle>
                <Button onClick={handleCreateClient} data-testid="button-add-client">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Client
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clients.map((client: any) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        {client.logoUrl && (
                          <img src={client.logoUrl} alt={client.name} className="w-12 h-8 object-contain" />
                        )}
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <p className="text-sm text-gray-600">{client.description}</p>
                          <Badge variant={client.isActive ? "default" : "secondary"}>
                            {client.isActive ? "Active" : "Inactive"}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setEditingItem(client)}
                          data-testid={`button-edit-client-${client.id}`}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteClientMutation.mutate(client.id)}
                          data-testid={`button-delete-client-${client.id}`}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {editingItem && activeTab === "clients" && (
              <Card>
                <CardHeader>
                  <CardTitle>{isCreating ? "Create Client" : "Edit Client"}</CardTitle>
                </CardHeader>
                <CardContent>
                  {renderClientForm()}
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="technologies">
          <Card>
            <CardHeader>
              <CardTitle>Technologies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-gray-500">
                Technology management will be available in the next update.
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
