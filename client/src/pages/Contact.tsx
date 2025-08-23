import ContactForm from "@/components/ContactForm";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Get in Touch</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Ready to transform your business with AI-driven solutions? Let's discuss your project 
            and how we can help you achieve your goals. Our team is here to answer your questions 
            and provide expert guidance.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're here to help you succeed. Reach out to us through any of the channels below, 
                and we'll get back to you promptly.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <MapPin className="w-6 h-6 text-blue-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Our Office</h3>
                      <p className="text-gray-600">
                        123 Technology Drive<br />
                        San Francisco, CA 94105<br />
                        United States
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Mail className="w-6 h-6 text-blue-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Us</h3>
                      <p className="text-gray-600">
                        <a href="mailto:hello@pitetris.com" className="hover:text-blue-600 transition-colors">
                          hello@pitetris.com
                        </a>
                      </p>
                      <p className="text-gray-600 mt-1">
                        <a href="mailto:careers@pitetris.com" className="hover:text-blue-600 transition-colors">
                          careers@pitetris.com
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Phone className="w-6 h-6 text-blue-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Call Us</h3>
                      <p className="text-gray-600">
                        <a href="tel:+15551234567" className="hover:text-blue-600 transition-colors">
                          +1 (555) 123-4567
                        </a>
                      </p>
                      <p className="text-gray-600 text-sm mt-1">Monday - Friday, 9AM - 6PM PST</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Clock className="w-6 h-6 text-blue-600 mt-1" />
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Business Hours</h3>
                      <div className="text-gray-600 space-y-1">
                        <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                        <p>Saturday: 10:00 AM - 4:00 PM</p>
                        <p>Sunday: Closed</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Response Time */}
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Response Time</h3>
                <p className="text-gray-600">
                  We typically respond to all inquiries within 24 hours during business days. 
                  For urgent matters, please call us directly.
                </p>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Form */}
          <div>
            <ContactForm />
          </div>
        </div>

        {/* FAQ Section */}
        <section className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Quick answers to common questions about our services.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">How long does a typical project take?</h3>
                <p className="text-gray-600">
                  Project timelines vary based on complexity and scope. Simple applications typically take 2-4 months, 
                  while complex AI solutions may take 6-12 months. We'll provide a detailed timeline during our initial consultation.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you work with startups and small businesses?</h3>
                <p className="text-gray-600">
                  Absolutely! We work with companies of all sizes, from early-stage startups to Fortune 500 companies. 
                  We offer flexible engagement models to fit your budget and requirements.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">What technologies do you specialize in?</h3>
                <p className="text-gray-600">
                  We specialize in AI/ML, web development, mobile apps, and cloud solutions. Our tech stack includes 
                  React, Node.js, Python, TensorFlow, AWS, and many other modern technologies.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Do you provide ongoing support and maintenance?</h3>
                <p className="text-gray-600">
                  Yes, we offer comprehensive support and maintenance packages to ensure your applications continue 
                  to perform optimally. We also provide updates and enhancements as your business grows.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
