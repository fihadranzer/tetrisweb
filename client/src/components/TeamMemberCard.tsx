import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Linkedin, Github, Twitter } from "lucide-react";

interface TeamMemberCardProps {
  member: {
    id: string;
    name: string;
    role: string;
    bio?: string;
    expertise?: string[];
    imageUrl?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    twitterUrl?: string;
    isActive: boolean;
  };
}

export default function TeamMemberCard({ member }: TeamMemberCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <Card className="text-center hover:shadow-lg transition-shadow group">
      <CardContent className="p-6">
        {/* Profile Image */}
        <div className="mb-4">
          {member.imageUrl ? (
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-24 h-24 rounded-full mx-auto object-cover"
            />
          ) : (
            <div className="w-24 h-24 rounded-full mx-auto bg-blue-600 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {getInitials(member.name)}
              </span>
            </div>
          )}
        </div>
        
        {/* Name and Role */}
        <h3 className="text-xl font-semibold text-gray-900 mb-1 group-hover:text-blue-600 transition-colors">
          {member.name}
        </h3>
        <p className="text-blue-600 font-medium mb-3">{member.role}</p>
        
        {/* Bio */}
        {member.bio && (
          <p className="text-sm text-gray-600 mb-4 leading-relaxed">
            {member.bio}
          </p>
        )}
        
        {/* Expertise Tags */}
        {member.expertise && member.expertise.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1 justify-center">
              {member.expertise.slice(0, 3).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {member.expertise.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{member.expertise.length - 3} more
                </Badge>
              )}
            </div>
          </div>
        )}
        
        {/* Social Links */}
        <div className="flex justify-center space-x-3">
          {member.linkedinUrl && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-600"
              asChild
            >
              <a 
                href={member.linkedinUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid={`link-linkedin-${member.id}`}
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.githubUrl && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-gray-50 hover:text-gray-800"
              asChild
            >
              <a 
                href={member.githubUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid={`link-github-${member.id}`}
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
          )}
          {member.twitterUrl && (
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 hover:bg-blue-50 hover:text-blue-400"
              asChild
            >
              <a 
                href={member.twitterUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                data-testid={`link-twitter-${member.id}`}
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
