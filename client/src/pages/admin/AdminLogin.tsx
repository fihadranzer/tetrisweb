import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Key, Users } from "lucide-react";

export default function AdminLogin() {
  const handleLogin = () => {
    window.location.href = "/api/login";
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
              
              <Button 
                onClick={handleLogin}
                className="w-full"
                size="lg"
                data-testid="button-admin-login"
              >
                <Key className="mr-2 h-4 w-4" />
                Login with Replit Auth
              </Button>
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
