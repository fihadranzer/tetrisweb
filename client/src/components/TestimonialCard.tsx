import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    content: string;
    authorName: string;
    authorTitle?: string;
    authorCompany?: string;
    authorImageUrl?: string;
    rating: number;
    isActive: boolean;
    isFeatured: boolean;
  };
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="bg-gray-50 hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        {/* Rating Stars */}
        <div className="flex items-center mb-4">
          <div className="flex">
            {renderStars(testimonial.rating)}
          </div>
          <span className="ml-2 text-sm text-gray-600">({testimonial.rating}/5)</span>
        </div>
        
        {/* Testimonial Content */}
        <blockquote className="text-gray-900 mb-6 leading-relaxed">
          "{testimonial.content}"
        </blockquote>
        
        {/* Author Info */}
        <div className="flex items-center">
          {/* Author Avatar */}
          <div className="flex-shrink-0 mr-4">
            {testimonial.authorImageUrl ? (
              <img
                src={testimonial.authorImageUrl}
                alt={testimonial.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
                <span className="text-white font-medium text-sm">
                  {getInitials(testimonial.authorName)}
                </span>
              </div>
            )}
          </div>
          
          {/* Author Details */}
          <div>
            <cite className="not-italic">
              <div className="font-semibold text-gray-900">{testimonial.authorName}</div>
              {(testimonial.authorTitle || testimonial.authorCompany) && (
                <div className="text-sm text-gray-600">
                  {testimonial.authorTitle}
                  {testimonial.authorTitle && testimonial.authorCompany && ', '}
                  {testimonial.authorCompany}
                </div>
              )}
            </cite>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
