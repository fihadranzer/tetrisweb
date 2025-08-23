import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Code, 
  Cpu, 
  Smartphone, 
  Database, 
  Cloud, 
  Bot, 
  TrendingUp,
  Building2,
  Layers,
  Settings,
  ArrowRight,
  Zap
} from "lucide-react";

interface ServicesMegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ServicesMegaMenu({ isOpen, onClose }: ServicesMegaMenuProps) {
  if (!isOpen) return null;

  const serviceModels = [
    {
      title: "Dedicated Team",
      description: "Full-time dedicated development teams for your projects",
      href: "/services/dedicated-team",
      icon: Users
    },
    {
      title: "Staff Augmentation",
      description: "Scale your team with skilled developers",
      href: "/services/staff-augmentation", 
      icon: TrendingUp
    },
    {
      title: "Project Management",
      description: "End-to-end project delivery and management",
      href: "/services/project-delivery",
      icon: Settings
    },
    {
      title: "Virtual CTO",
      description: "Technical leadership and strategic guidance",
      href: "/services/virtual-cto",
      icon: Cpu
    },
    {
      title: "Enterprise Search",
      description: "Advanced search solutions for enterprises",
      href: "/services/enterprise-search",
      icon: Database
    }
  ];

  const customSolutions = [
    {
      title: "Artificial Intelligence",
      description: "AI/ML solutions and intelligent applications",
      href: "/services/ai-ml-development",
      icon: Cpu
    },
    {
      title: "Custom Software Development", 
      description: "Tailored software solutions for your business",
      href: "/services/custom-software-development",
      icon: Code
    },
    {
      title: "Web Application Development",
      description: "Modern web applications and platforms",
      href: "/services/web-application-development",
      icon: Layers
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile apps",
      href: "/services/mobile-app-development",
      icon: Smartphone
    },
    {
      title: "ERP/CRM/CMS Systems",
      description: "Enterprise resource planning and management",
      href: "/services/erp-crm-cms-development",
      icon: Building2
    },
    {
      title: "Data Engineering",
      description: "Data pipelines and analytics solutions", 
      href: "/services/data-engineering",
      icon: Database
    },
    {
      title: "Cloud Services",
      description: "Cloud migration and infrastructure solutions",
      href: "/services/cloud-services",
      icon: Cloud
    },
    {
      title: "AI Chatbots",
      description: "Intelligent conversational interfaces",
      href: "/services/ai-chatbots",
      icon: Bot
    }
  ];

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div className="absolute top-full left-0 w-full bg-white shadow-2xl border-t border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Service Models */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Service Models
            </h3>
            <div className="space-y-3">
              {serviceModels.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Link key={service.href} href={service.href}>
                    <div 
                      onClick={handleLinkClick}
                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                      data-testid={`mega-menu-${service.href.split('/').pop()}`}
                    >
                      <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors">
                        <IconComponent className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">{service.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Custom Solutions */}
          <div>
            <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Custom Solutions Expertise
            </h3>
            <div className="space-y-3">
              {customSolutions.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Link key={service.href} href={service.href}>
                    <div 
                      onClick={handleLinkClick}
                      className="flex items-start p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer group"
                      data-testid={`mega-menu-${service.href.split('/').pop()}`}
                    >
                      <div className="w-8 h-8 bg-green-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors">
                        <IconComponent className="w-4 h-4 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">{service.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Why Choose Pi Tetris */}
          <div>
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
                    <Zap className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Why Choose Pi Tetris?</h3>
                    <Badge className="bg-blue-600 text-white mt-1">Expert Development</Badge>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm">
                  At our core we are a software development services company. Build your software with our expert team.
                </p>
                <div className="space-y-2 text-sm text-gray-600 mb-6">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    Expert AI/ML Development
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    Enterprise-Grade Solutions
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-2"></div>
                    24/7 Support & Maintenance
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Link href="/contact">
                    <Button onClick={handleLinkClick} className="w-full bg-blue-600 hover:bg-blue-700" data-testid="mega-menu-get-in-touch">
                      Get In Touch
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button onClick={handleLinkClick} variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50" data-testid="mega-menu-view-portfolio">
                      View Our Work
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}