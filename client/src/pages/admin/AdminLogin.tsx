import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Eye, EyeOff, Mail, Shield } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [showVerificationStep, setShowVerificationStep] = useState(false);
  const [loading, setLoading] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Allowed admin emails
  const allowedEmails = ['rhfiha@gmail.com', 'dev.fiha@gmail.com'];

  const sendCodeMutation = useMutation({
    mutationFn: async (email: string) => {
      return await apiRequest('POST', '/api/admin/send-verification', { email });
    },
    onSuccess: () => {
      setShowVerificationStep(true);
      toast({
        title: "Verification Code Sent",
        description: "Check the console for your 6-digit verification code (in development mode).",
        variant: "default",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to send verification code",
        variant: "destructive",
      });
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async ({ email, code }: { email: string; code: string }) => {
      return await apiRequest('POST', '/api/admin/verify-login', { email, code });
    },
    onSuccess: () => {
      toast({
        title: "Login Successful",
        description: "Welcome to the admin panel!",
        variant: "default",
      });
      setLocation('/admin');
    },
    onError: (error: any) => {
      toast({
        title: "Verification Failed",
        description: error.message || "Invalid verification code",
        variant: "destructive",
      });
    },
  });

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    if (!allowedEmails.includes(email.toLowerCase())) {
      toast({
        title: "Access Denied",
        description: "This email is not authorized for admin access",
        variant: "destructive",
      });
      return;
    }

    sendCodeMutation.mutate(email);
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit verification code",
        variant: "destructive",
      });
      return;
    }

    verifyCodeMutation.mutate({ email, code: verificationCode });
  };

  const handleBackToEmail = () => {
    setShowVerificationStep(false);
    setVerificationCode("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
          <CardDescription>
            {showVerificationStep 
              ? "Enter your verification code to continue"
              : "Enter your authorized email to receive a verification code"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {!showVerificationStep ? (
            <form onSubmit={handleSendCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your admin email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    data-testid="input-admin-email"
                    required
                  />
                </div>
              </div>
              
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Only authorized emails can access the admin panel. 
                  You will receive a verification code if your email is authorized.
                </AlertDescription>
              </Alert>

              <Button 
                type="submit" 
                className="w-full" 
                disabled={sendCodeMutation.isPending}
                data-testid="button-send-verification"
              >
                {sendCodeMutation.isPending ? "Sending..." : "Send Verification Code"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyCode} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  data-testid="input-verification-code"
                  required
                />
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400 text-center">
                Code sent to: <strong>{email}</strong>
              </div>

              <div className="space-y-2">
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={verifyCodeMutation.isPending}
                  data-testid="button-verify-code"
                >
                  {verifyCodeMutation.isPending ? "Verifying..." : "Verify & Login"}
                </Button>
                
                <Button 
                  type="button" 
                  variant="outline" 
                  className="w-full" 
                  onClick={handleBackToEmail}
                  data-testid="button-back-to-email"
                >
                  Use Different Email
                </Button>
              </div>
            </form>
          )}

          <div className="text-xs text-gray-500 text-center mt-4">
            Authorized for: rhfiha@gmail.com, dev.fiha@gmail.com
          </div>
        </CardContent>
      </Card>
    </div>
  );
}