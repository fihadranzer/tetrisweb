import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    slug: string;
    shortDescription?: string;
    longDescription?: string;
    iconUrl?: string;
    features?: string[];
    technologies?: string[];
    isActive: boolean;
  };
  showFullDescription?: boolean;
}

export default function ServiceCard({ service, showFullDescription = false }: ServiceCardProps) {
  const ServiceIcon = () => {
    if (service.iconUrl) {
      return <img src={service.iconUrl} alt="" className="w-6 h-6" />;
    }
    
    // Default icons based on service title
    const iconColor = "text-white";
    if (service.title.toLowerCase().includes("ai") || service.title.toLowerCase().includes("ml")) {
      return (
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
      );
    }
    if (service.title.toLowerCase().includes("mobile")) {
      return (
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a1 1 0 001-1V4a1 1 0 00-1-1H8a1 1 0 00-1 1v16a1 1 0 001 1z" />
        </svg>
      );
    }
    if (service.title.toLowerCase().includes("data")) {
      return (
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
        </svg>
      );
    }
    if (service.title.toLowerCase().includes("cloud") || service.title.toLowerCase().includes("devops")) {
      return (
        <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
        </svg>
      );
    }
    // Default code icon
    return (
      <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
      </svg>
    );
  };

  return (
    <Card className="hover:shadow-lg transition-shadow group">
      <CardContent className="p-6">
        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-700 transition-colors">
          <ServiceIcon />
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">{service.title}</h3>
        <p className="text-gray-600 mb-4">
          {showFullDescription && service.longDescription 
            ? service.longDescription.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : service.shortDescription
          }
        </p>
        
        {service.features && service.features.length > 0 && showFullDescription && (
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Key Features:</h4>
            <ul className="text-sm text-gray-600 space-y-1">
              {service.features.slice(0, 3).map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="w-1 h-1 bg-blue-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        )}

        {service.technologies && service.technologies.length > 0 && showFullDescription && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {service.technologies.slice(0, 4).map((tech, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tech}
                </Badge>
              ))}
              {service.technologies.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{service.technologies.length - 4} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <Link href={`/services/${service.slug}`}>
          <a 
            className="text-blue-600 font-medium hover:text-blue-700 transition-colors inline-flex items-center group"
            data-testid={`link-service-${service.slug}`}
          >
            Learn More
            <ArrowRight className="ml-1 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Link>
      </CardContent>
    </Card>
  );
}
