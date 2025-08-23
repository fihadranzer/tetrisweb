import { useQuery } from "@tanstack/react-query";
import TeamMemberCard from "@/components/TeamMemberCard";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, Users, Award, TrendingUp } from "lucide-react";
import { Link } from "wouter";

export default function About() {
  const { data: teamMembers = [], isLoading } = useQuery({
    queryKey: ["/api/team"],
  });

  const { data: technologies = [] } = useQuery({
    queryKey: ["/api/technologies"],
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
        <div className="text-center mb-20">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Pi Tetris</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            We are a leading software development company specializing in AI-driven solutions. 
            Our mission is to help businesses transform through innovative technology, delivering 
            more velocity, more value, and more peace of mind.
          </p>
        </div>

        {/* Company Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Excellence</h3>
                <p className="text-gray-600">We strive for perfection in every project, delivering solutions that exceed expectations.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaboration</h3>
                <p className="text-gray-600">We work closely with our clients as true partners in their digital transformation journey.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Innovation</h3>
                <p className="text-gray-600">We stay at the forefront of technology, continuously learning and adopting new solutions.</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality</h3>
                <p className="text-gray-600">Every line of code, every design decision is made with quality and reliability in mind.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Company Story */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  Founded with a vision to bridge the gap between cutting-edge technology and practical business solutions, 
                  Pi Tetris has grown from a small team of passionate developers to a globally recognized software development company.
                </p>
                <p>
                  Our journey began with a simple belief: that artificial intelligence and modern software development practices 
                  could dramatically improve how businesses operate. Today, we've helped hundreds of companies across various 
                  industries transform their operations through innovative technology solutions.
                </p>
                <p>
                  We're proud to be SOC 2 compliant and work with clients ranging from innovative startups to Fortune 500 companies, 
                  always maintaining our commitment to excellence, transparency, and delivering results that matter.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">350+</div>
                  <div className="text-gray-700">Projects Delivered</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">100+</div>
                  <div className="text-gray-700">Happy Clients</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">5+</div>
                  <div className="text-gray-700">Years Experience</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                  <div className="text-gray-700">Support</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        {teamMembers.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Expert Team</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our experienced professionals bring deep expertise across diverse technologies and industries 
                to deliver exceptional results for your projects.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member: any) => (
                <TeamMemberCard key={member.id} member={member} />
              ))}
            </div>
          </section>
        )}

        {/* Technologies */}
        {technologies.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Technology Expertise</h2>
              <p className="text-xl text-gray-600">
                We work with cutting-edge technologies to deliver modern, scalable solutions.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-3 justify-center">
              {technologies.map((tech: any) => (
                <Badge 
                  key={tech.id} 
                  variant="outline" 
                  className="text-sm py-2 px-4 hover:bg-blue-50 hover:border-blue-300 transition-colors cursor-pointer"
                  data-testid={`badge-technology-${tech.slug}`}
                >
                  {tech.name}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* Awards & Recognition */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600">Recognition from industry leaders and clients worldwide.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Top AI Developer 2024</h3>
                <p className="text-gray-600">Clutch</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Best Software Developer</h3>
                <p className="text-gray-600">TechBehemoths</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">SOC 2 Compliant</h3>
                <p className="text-gray-600">Security & Compliance</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Work Together?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and see how our expertise can help you achieve your goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" data-testid="button-get-started">
                Get Started
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
