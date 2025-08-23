import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Key, Users, Mail, LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function AdminLogin() {
  const [email, setEmail] = useState('admin@pitetris.com');
  const [password, setPassword] = useState('');
  const [showDirectLogin, setShowDirectLogin] = useState(true); // Show direct login by default
  const { toast } = useToast();
  
  const handleReplitLogin = () => {
    // Store redirect path for after Replit auth
    sessionStorage.setItem('redirectAfterAuth', '/admin');
    window.location.href = "/api/login";
  };
  
  const directLoginMutation = useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      return await apiRequest('/api/admin/login', {
        method: 'POST',
        body: { email, password }
      });
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Redirecting to admin panel...",
      });
      // Reload to trigger auth check
      window.location.reload();
    },
    onError: (error: any) => {
      toast({
        title: "Login Failed", 
        description: error.message || "Invalid credentials or not an admin",
        variant: "destructive",
      });
    }
  });
  
  const handleDirectLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      toast({
        title: "All Fields Required",
        description: "Please enter both email and password",
        variant: "destructive",
      });
      return;
    }
    directLoginMutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Shield className="mx-auto h-12 w-12 text-blue-600" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">Pi Tetris Admin Portal</h2>
          <p className="mt-2 text-sm text-gray-600">
            Secure access to content management system
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">Admin Access Required</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-gray-600 mb-6">
                This area is restricted to authorized administrators only. 
                Please authenticate to access the content management system.
              </p>
              
              {!showDirectLogin ? (
                <div className="space-y-4">
                  <Button 
                    onClick={handleReplitLogin}
                    className="w-full"
                    size="lg"
                    data-testid="button-replit-login"
                  >
                    <Key className="mr-2 h-4 w-4" />
                    Login with Replit Auth
                  </Button>
                  
                  <div className="text-center">
                    <button
                      onClick={() => setShowDirectLogin(true)}
                      className="text-sm text-blue-600 hover:text-blue-800 underline"
                      data-testid="button-show-direct-login"
                    >
                      Use Admin Credentials
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleDirectLogin} className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                    <div className="text-sm text-blue-800">
                      <strong>Admin Credentials:</strong><br/>
                      Email: admin@pitetris.com<br/>
                      Password: admin123
                    </div>
                  </div>
                  
                  <div className="text-left">
                    <Label htmlFor="email">Admin Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@pitetris.com"
                      className="mt-1"
                      data-testid="input-admin-email"
                    />
                  </div>
                  
                  <div className="text-left">
                    <Label htmlFor="password">Admin Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter admin password"
                      className="mt-1"
                      data-testid="input-admin-password"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={directLoginMutation.isPending}
                    data-testid="button-direct-login"
                  >
                    {directLoginMutation.isPending ? (
                      <>Loading...</>
                    ) : (
                      <>
                        <LogIn className="mr-2 h-4 w-4" />
                        Login as Admin
                      </>
                    )}
                  </Button>
                  
                  <div className="text-center">
                    <button
                      type="button"
                      onClick={() => setShowDirectLogin(false)}
                      className="text-sm text-gray-600 hover:text-gray-800 underline"
                      data-testid="button-back-to-replit"
                    >
                      Use Replit Auth Instead
                    </button>
                  </div>
                </form>
              )}
            </div>

            <div className="border-t border-gray-200 pt-6">
              <div className="text-center">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Admin Portal Features</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center">
                    <Users className="h-4 w-4 mr-2" />
                    Content Management
                  </div>
                  <div className="flex items-center justify-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Secure File Upload
                  </div>
                  <div className="flex items-center justify-center">
                    <Key className="h-4 w-4 mr-2" />
                    Category Management
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-xs text-gray-500">
            This system is protected by enterprise-grade security measures.
            All access attempts are logged and monitored.
          </p>
        </div>
      </div>
    </div>
  );
}
