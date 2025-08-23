import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { ArrowRight, CheckCircle } from "lucide-react";

const contactSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().optional(),
  projectType: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters long"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactForm() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const projectType = watch("projectType");

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      reset();
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error sending message",
        description: error.message || "Please try again later.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  if (isSubmitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-green-900 mb-2">Thank you for your message!</h3>
          <p className="text-green-700 mb-6">
            We've received your inquiry and will get back to you within 24 hours during business days.
          </p>
          <Button 
            variant="outline" 
            onClick={() => setIsSubmitted(false)}
            className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
            data-testid="button-send-another-message"
          >
            Send Another Message
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border border-gray-200">
      <CardHeader>
        <CardTitle>Send us a message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                {...register("firstName")}
                className={errors.firstName ? "border-red-500" : ""}
                data-testid="input-first-name"
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
              )}
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                {...register("lastName")}
                className={errors.lastName ? "border-red-500" : ""}
                data-testid="input-last-name"
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
              )}
            </div>
          </div>
          
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              className={errors.email ? "border-red-500" : ""}
              data-testid="input-email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              {...register("company")}
              data-testid="input-company"
            />
          </div>
          
          <div>
            <Label htmlFor="projectType">Project Type</Label>
            <Select value={projectType} onValueChange={(value) => setValue("projectType", value)}>
              <SelectTrigger data-testid="select-project-type">
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ai-ml">AI & Machine Learning</SelectItem>
                <SelectItem value="custom-software">Custom Software Development</SelectItem>
                <SelectItem value="mobile-app">Mobile App Development</SelectItem>
                <SelectItem value="data-engineering">Data Engineering</SelectItem>
                <SelectItem value="erp-crm">ERP/CRM/CMS Development</SelectItem>
                <SelectItem value="staff-augmentation">Staff Augmentation</SelectItem>
                <SelectItem value="consulting">Consulting</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="message">Project Description *</Label>
            <Textarea
              id="message"
              rows={4}
              {...register("message")}
              className={errors.message ? "border-red-500" : ""}
              placeholder="Tell us about your project requirements, timeline, and goals..."
              data-testid="textarea-message"
            />
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={submitMutation.isPending}
            data-testid="button-send-message"
          >
            {submitMutation.isPending ? (
              "Sending..."
            ) : (
              <>
                Send Message
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
          
          <p className="text-sm text-gray-600 text-center">
            We typically respond within 24 hours during business days.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
