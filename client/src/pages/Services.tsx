import { useQuery } from "@tanstack/react-query";
import ServiceCard from "@/components/ServiceCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Services() {
  const { data: services = [], isLoading } = useQuery({
    queryKey: ["/api/services"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories"],
    enabled: true,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Services</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We offer comprehensive software development services to help businesses transform their operations through innovative technology solutions. From AI and machine learning to custom software development, our expert team delivers results that drive growth.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service: any) => (
            <ServiceCard key={service.id} service={service} showFullDescription />
          ))}
        </div>

        {/* Service Categories */}
        {categories.length > 0 && (
          <section className="bg-gray-50 rounded-2xl p-8 mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Service Categories</h2>
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category: any) => (
                <Badge key={category.id} variant="secondary" className="text-sm py-2 px-4">
                  {category.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and how our expert team can help you achieve your technology goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" data-testid="button-schedule-consultation">
                Schedule a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600" data-testid="button-view-our-work">
                View Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
