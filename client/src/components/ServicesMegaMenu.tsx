import { useEffect, useRef } from "react";
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
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);

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
    <div 
      ref={menuRef}
      className="fixed top-16 left-0 right-0 bg-white shadow-2xl border-t border-gray-100 z-50 transform transition-all duration-200 ease-in-out"
      style={{ 
        opacity: isOpen ? 1 : 0,
        visibility: isOpen ? 'visible' : 'hidden',
        transform: isOpen ? 'translateY(0)' : 'translateY(-10px)'
      }}
      onMouseEnter={() => {}} // Keep menu open when hovering over it
      onMouseLeave={() => onClose()}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Service Models */}
          <div className="bg-blue-50 rounded-lg p-4 md:p-6">
            <h3 className="text-lg font-semibold text-blue-600 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Service Models
            </h3>
            <div className="space-y-2">
              {serviceModels.map((service) => {
                const IconComponent = service.icon;
                return (
                  <Link key={service.href} href={service.href}>
                    <div 
                      onClick={handleLinkClick}
                      className="flex items-start p-2 md:p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
                      data-testid={`mega-menu-${service.href.split('/').pop()}`}
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-blue-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors flex-shrink-0">
                        <IconComponent className="w-3 h-3 md:w-4 md:h-4 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors text-sm md:text-base">{service.title}</h4>
                        <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Custom Solutions */}
          <div className="bg-green-50 rounded-lg p-4 md:p-6">
            <h3 className="text-lg font-semibold text-green-600 mb-4 flex items-center">
              <Code className="w-5 h-5 mr-2" />
              Custom Solutions
            </h3>
            <div className="grid grid-cols-1 gap-2">
              {customSolutions.slice(0, 6).map((service) => {
                const IconComponent = service.icon;
                return (
                  <Link key={service.href} href={service.href}>
                    <div 
                      onClick={handleLinkClick}
                      className="flex items-start p-2 md:p-3 rounded-lg hover:bg-white hover:shadow-sm transition-all cursor-pointer group"
                      data-testid={`mega-menu-${service.href.split('/').pop()}`}
                    >
                      <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-md flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors flex-shrink-0">
                        <IconComponent className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors text-sm md:text-base">{service.title}</h4>
                        <p className="text-xs md:text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
                      </div>
                    </div>
                  </Link>
                );
              })}
              <Link href="/services">
                <div 
                  onClick={handleLinkClick}
                  className="flex items-center justify-center p-2 md:p-3 rounded-lg border-2 border-dashed border-green-200 hover:border-green-300 hover:bg-white transition-all cursor-pointer group"
                  data-testid="mega-menu-view-all-services"
                >
                  <span className="text-sm text-green-600 group-hover:text-green-700 font-medium">View All Services →</span>
                </div>
              </Link>
            </div>
          </div>

          {/* Why Choose Pi Tetris */}
          <div className="md:row-span-1">
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 h-full">
              <CardContent className="p-4 md:p-6 h-full flex flex-col">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-600 rounded-lg flex items-center justify-center mr-3">
                    <Zap className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-gray-900">Why Pi Tetris?</h3>
                    <Badge className="bg-purple-600 text-white mt-1 text-xs">Expert Development</Badge>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-xs md:text-sm flex-1">
                  At our core we are a software development services company. Build your software with our expert team.
                </p>
                <div className="space-y-2 text-xs md:text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-2 flex-shrink-0"></div>
                    Expert AI/ML Development
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-2 flex-shrink-0"></div>
                    Enterprise-Grade Solutions
                  </div>
                  <div className="flex items-center">
                    <div className="w-2 h-2 bg-purple-600 rounded-full mr-2 flex-shrink-0"></div>
                    24/7 Support & Maintenance
                  </div>
                </div>
                <div className="flex flex-col space-y-2 mt-auto">
                  <Link href="/contact">
                    <Button onClick={handleLinkClick} className="w-full bg-purple-600 hover:bg-purple-700 text-sm" data-testid="mega-menu-get-in-touch">
                      Get In Touch
                      <ArrowRight className="ml-2 h-3 w-3 md:h-4 md:w-4" />
                    </Button>
                  </Link>
                  <Link href="/portfolio">
                    <Button onClick={handleLinkClick} variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50 text-sm" data-testid="mega-menu-view-portfolio">
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