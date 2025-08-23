import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSubmissionSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { MapPin, Mail, Phone } from "lucide-react";

type ContactFormData = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  projectType?: string;
  message: string;
};

export default function ContactSection() {
  const { toast } = useToast();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(insertContactSubmissionSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      company: "",
      projectType: "",
      message: ""
    }
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await apiRequest("POST", "/api/contact", data);
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
      console.error("Contact form error:", error);
      toast({
        title: "Error sending message",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    mutation.mutate(data);
  };

  return (
    <section id="contact" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6" data-testid="text-contact-title">
              Get in Touch
            </h2>
            <p className="text-xl text-pi-gray mb-8" data-testid="text-contact-description">
              Ready to transform your business with AI-driven solutions? Let's discuss your project and how we can help you achieve your goals.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start" data-testid="contact-address">
                <div className="flex-shrink-0">
                  <MapPin className="w-6 h-6 text-pi-blue mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Our Office</h3>
                  <p className="text-pi-gray">
                    123 Technology Drive<br />
                    San Francisco, CA 94105
                  </p>
                </div>
              </div>
              
              <div className="flex items-start" data-testid="contact-email">
                <div className="flex-shrink-0">
                  <Mail className="w-6 h-6 text-pi-blue mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Email Us</h3>
                  <p className="text-pi-gray">hello@pitetris.com</p>
                </div>
              </div>
              
              <div className="flex items-start" data-testid="contact-phone">
                <div className="flex-shrink-0">
                  <Phone className="w-6 h-6 text-pi-blue mt-1" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Call Us</h3>
                  <p className="text-pi-gray">+1 (555) 123-4567</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <Card className="shadow-lg" data-testid="card-contact-form">
            <CardContent className="p-8">
              {isSubmitted ? (
                <div className="text-center py-8" data-testid="success-message">
                  <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-pi-gray mb-6">Thank you for reaching out. We'll get back to you within 24 hours.</p>
                  <Button 
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    data-testid="button-send-another"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        {...register("firstName")}
                        className="mt-1"
                        data-testid="input-firstName"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1" data-testid="error-firstName">
                          {errors.firstName.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        {...register("lastName")}
                        className="mt-1"
                        data-testid="input-lastName"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1" data-testid="error-lastName">
                          {errors.lastName.message}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      {...register("email")}
                      className="mt-1"
                      data-testid="input-email"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1" data-testid="error-email">
                        {errors.email.message}
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      {...register("company")}
                      className="mt-1"
                      data-testid="input-company"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="projectType">Project Type</Label>
                    <Select onValueChange={(value) => setValue("projectType", value)} value={watch("projectType")}>
                      <SelectTrigger className="mt-1" data-testid="select-projectType">
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
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Project Description *</Label>
                    <Textarea
                      id="message"
                      {...register("message")}
                      rows={4}
                      className="mt-1"
                      placeholder="Tell us about your project..."
                      data-testid="textarea-message"
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1" data-testid="error-message">
                        {errors.message.message}
                      </p>
                    )}
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-pi-blue hover:bg-pi-blue-dark"
                    disabled={mutation.isPending}
                    data-testid="button-submit"
                  >
                    {mutation.isPending ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
