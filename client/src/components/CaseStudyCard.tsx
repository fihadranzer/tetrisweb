import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";

interface CaseStudyCardProps {
  caseStudy: {
    id: string;
    title: string;
    slug: string;
    clientName?: string;
    shortDescription?: string;
    imageUrl?: string;
    technologies?: string[];
    tags?: string[];
    isFeatured: boolean;
    isActive: boolean;
  };
}

export default function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  const getCategoryColor = (technology: string) => {
    const tech = technology.toLowerCase();
    if (tech.includes('ai') || tech.includes('ml') || tech.includes('machine learning')) {
      return 'bg-purple-100 text-purple-800';
    }
    if (tech.includes('react') || tech.includes('web') || tech.includes('frontend')) {
      return 'bg-blue-100 text-blue-800';
    }
    if (tech.includes('data') || tech.includes('analytics')) {
      return 'bg-green-100 text-green-800';
    }
    return 'bg-gray-100 text-gray-800';
  };

  const getGradientFromTech = (technologies: string[]) => {
    if (!technologies || technologies.length === 0) return 'from-blue-500 to-purple-600';
    
    const firstTech = technologies[0].toLowerCase();
    if (firstTech.includes('ai') || firstTech.includes('ml')) {
      return 'from-purple-500 to-pink-600';
    }
    if (firstTech.includes('web') || firstTech.includes('react')) {
      return 'from-blue-500 to-cyan-600';
    }
    if (firstTech.includes('data')) {
      return 'from-green-500 to-teal-600';
    }
    return 'from-blue-500 to-purple-600';
  };

  return (
    <Card className="hover:shadow-lg transition-shadow group overflow-hidden">
      {/* Image or Gradient Header */}
      <div className="relative">
        {caseStudy.imageUrl ? (
          <div className="aspect-video bg-gray-200 overflow-hidden">
            <img 
              src={caseStudy.imageUrl} 
              alt={caseStudy.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        ) : (
          <div className={`aspect-video bg-gradient-to-br ${getGradientFromTech(caseStudy.technologies || [])} flex items-center justify-center relative overflow-hidden`}>
            {/* Abstract pattern overlay */}
            <div className="absolute inset-0 opacity-20">
              <div className="absolute top-4 left-4 w-8 h-8 border-2 border-white rounded-full"></div>
              <div className="absolute bottom-4 right-4 w-6 h-6 border-2 border-white rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 border-2 border-white rounded-lg rotate-45"></div>
            </div>
            <div className="text-white text-center z-10">
              <div className="text-4xl mb-2">💼</div>
              <p className="text-sm font-medium opacity-90">Case Study</p>
            </div>
          </div>
        )}
        
        {/* Featured badge */}
        {caseStudy.isFeatured && (
          <div className="absolute top-3 right-3">
            <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
              <Star className="w-3 h-3 mr-1 fill-current" />
              Featured
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-3">
        {/* Tags */}
        {caseStudy.tags && caseStudy.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {caseStudy.tags.slice(0, 2).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
        
        <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {caseStudy.title}
        </h3>
        
        {caseStudy.clientName && (
          <p className="text-sm text-blue-600 font-medium mb-2">
            Client: {caseStudy.clientName}
          </p>
        )}
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-gray-600 mb-4 line-clamp-3">{caseStudy.shortDescription}</p>
        
        {/* Technologies */}
        {caseStudy.technologies && caseStudy.technologies.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {caseStudy.technologies.slice(0, 3).map((tech, index) => (
                <Badge 
                  key={index} 
                  className={`text-xs ${getCategoryColor(tech)}`}
                >
                  {tech}
                </Badge>
              ))}
              {caseStudy.technologies.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{caseStudy.technologies.length - 3}
                </Badge>
              )}
            </div>
          </div>
        )}
        
        <Link href={`/case-studies/${caseStudy.slug}`}>
          <Button variant="outline" size="sm" className="w-full group" data-testid={`button-view-case-study-${caseStudy.slug}`}>
            View Case Study
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
