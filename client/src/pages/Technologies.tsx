import { useQuery } from "@tanstack/react-query";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  Code, 
  Database, 
  Brain, 
  BarChart, 
  Settings, 
  Star,
  TrendingUp,
  Zap,
  Shield,
  Cpu,
  Globe,
  Layers
} from "lucide-react";

const techCategories = [
  { 
    key: 'frontend', 
    label: 'Frontend Development', 
    color: 'bg-green-100 text-green-800',
    darkColor: 'dark:bg-green-900 dark:text-green-100',
    icon: Code,
    description: 'Modern user interfaces and interactive web experiences'
  },
  { 
    key: 'backend', 
    label: 'Backend Development', 
    color: 'bg-blue-100 text-blue-800',
    darkColor: 'dark:bg-blue-900 dark:text-blue-100',
    icon: Database,
    description: 'Server-side architecture and API development'
  },
  { 
    key: 'ai-ml', 
    label: 'AI & Machine Learning', 
    color: 'bg-purple-100 text-purple-800',
    darkColor: 'dark:bg-purple-900 dark:text-purple-100',
    icon: Brain,
    description: 'Intelligent systems and predictive analytics'
  },
  { 
    key: 'data', 
    label: 'Data Engineering', 
    color: 'bg-orange-100 text-orange-800',
    darkColor: 'dark:bg-orange-900 dark:text-orange-100',
    icon: BarChart,
    description: 'Data processing, analysis, and visualization'
  },
  { 
    key: 'devops', 
    label: 'DevOps & Cloud', 
    color: 'bg-red-100 text-red-800',
    darkColor: 'dark:bg-red-900 dark:text-red-100',
    icon: Settings,
    description: 'Infrastructure, deployment, and scalable solutions'
  },
];

// Enhanced technology data with details
const enhancedTechnologies = {
  frontend: [
    { name: 'React', description: 'Component-based UI library', experience: 95, projects: 50, trending: true },
    { name: 'Vue.js', description: 'Progressive JavaScript framework', experience: 90, projects: 35, trending: true },
    { name: 'Angular', description: 'Full-featured TypeScript framework', experience: 85, projects: 25, trending: false },
    { name: 'Next.js', description: 'React framework for production', experience: 92, projects: 40, trending: true },
    { name: 'TypeScript', description: 'Typed JavaScript at scale', experience: 98, projects: 60, trending: true },
    { name: 'Tailwind CSS', description: 'Utility-first CSS framework', experience: 95, projects: 45, trending: true },
  ],
  backend: [
    { name: 'Node.js', description: 'JavaScript runtime environment', experience: 95, projects: 55, trending: true },
    { name: 'Python', description: 'Versatile programming language', experience: 92, projects: 50, trending: true },
    { name: 'Java', description: 'Enterprise application development', experience: 88, projects: 30, trending: false },
    { name: 'PostgreSQL', description: 'Advanced relational database', experience: 90, projects: 40, trending: true },
    { name: 'MongoDB', description: 'NoSQL document database', experience: 85, projects: 35, trending: false },
    { name: 'Express.js', description: 'Fast Node.js web framework', experience: 93, projects: 45, trending: true },
  ],
  'ai-ml': [
    { name: 'TensorFlow', description: 'Machine learning platform', experience: 88, projects: 25, trending: true },
    { name: 'PyTorch', description: 'Deep learning framework', experience: 85, projects: 20, trending: true },
    { name: 'Scikit-learn', description: 'Machine learning library', experience: 90, projects: 30, trending: false },
    { name: 'OpenAI GPT', description: 'Large language models', experience: 95, projects: 15, trending: true },
    { name: 'Hugging Face', description: 'NLP model hub', experience: 87, projects: 18, trending: true },
    { name: 'LangChain', description: 'LLM application framework', experience: 92, projects: 12, trending: true },
  ],
  data: [
    { name: 'Apache Spark', description: 'Big data processing engine', experience: 82, projects: 15, trending: false },
    { name: 'Pandas', description: 'Data analysis library', experience: 95, projects: 40, trending: true },
    { name: 'NumPy', description: 'Numerical computing library', experience: 93, projects: 45, trending: false },
    { name: 'Tableau', description: 'Data visualization platform', experience: 85, projects: 20, trending: false },
    { name: 'Apache Kafka', description: 'Real-time data streaming', experience: 88, projects: 18, trending: true },
    { name: 'Elasticsearch', description: 'Search and analytics engine', experience: 87, projects: 22, trending: true },
  ],
  devops: [
    { name: 'Docker', description: 'Container platform', experience: 95, projects: 50, trending: true },
    { name: 'Kubernetes', description: 'Container orchestration', experience: 88, projects: 25, trending: true },
    { name: 'AWS', description: 'Cloud computing platform', experience: 92, projects: 45, trending: true },
    { name: 'Azure', description: 'Microsoft cloud platform', experience: 85, projects: 30, trending: true },
    { name: 'Jenkins', description: 'Continuous integration tool', experience: 82, projects: 35, trending: false },
    { name: 'Terraform', description: 'Infrastructure as code', experience: 90, projects: 28, trending: true },
  ],
};

export default function Technologies() {
  const { data: technologies = [], isLoading } = useQuery({
    queryKey: ['/api/technologies'],
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue mx-auto mb-4"></div>
          <p className="text-pi-gray" data-testid="text-loading">Loading technologies...</p>
        </div>
      </div>
    );
  }

  const groupedTechnologies = techCategories.map(category => ({
    ...category,
    technologies: (technologies as any[]).filter((tech: any) => tech.category === category.key)
  }));

  return (
    <>
      <div className="pt-20 pb-20 bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-white/10 rounded-full mb-6">
              <Cpu className="w-5 h-5 mr-2" />
              <span className="text-sm font-medium">Technology Excellence</span>
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6" data-testid="text-page-title">
              Our Technology Arsenal
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 max-w-4xl mx-auto" data-testid="text-page-description">
              Cutting-edge technologies and frameworks that drive innovation and deliver exceptional results
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto mt-12">
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">25+</div>
                <div className="text-sm text-blue-200">Technologies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">300+</div>
                <div className="text-sm text-blue-200">Projects Delivered</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">95%</div>
                <div className="text-sm text-blue-200">Client Satisfaction</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-white mb-2">5+</div>
                <div className="text-sm text-blue-200">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technology Categories Overview */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technology Categories
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Explore our expertise across different technology domains
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {techCategories.map((category, index) => {
              const IconComponent = category.icon;
              return (
                <Card key={category.key} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-l-4" 
                      style={{borderLeftColor: category.key === 'frontend' ? '#10b981' : category.key === 'backend' ? '#3b82f6' : category.key === 'ai-ml' ? '#8b5cf6' : category.key === 'data' ? '#f59e0b' : '#ef4444'}}>
                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center transition-transform group-hover:scale-110 ${
                      category.key === 'frontend' ? 'bg-green-100 dark:bg-green-900' :
                      category.key === 'backend' ? 'bg-blue-100 dark:bg-blue-900' :
                      category.key === 'ai-ml' ? 'bg-purple-100 dark:bg-purple-900' :
                      category.key === 'data' ? 'bg-orange-100 dark:bg-orange-900' :
                      'bg-red-100 dark:bg-red-900'
                    }`}>
                      <IconComponent className={`w-8 h-8 ${
                        category.key === 'frontend' ? 'text-green-600 dark:text-green-400' :
                        category.key === 'backend' ? 'text-blue-600 dark:text-blue-400' :
                        category.key === 'ai-ml' ? 'text-purple-600 dark:text-purple-400' :
                        category.key === 'data' ? 'text-orange-600 dark:text-orange-400' :
                        'text-red-600 dark:text-red-400'
                      }`} />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                      {category.label}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                      {category.description}
                    </p>
                    <div className="flex justify-center items-center space-x-2">
                      <Badge className={`${category.color} ${category.darkColor} text-xs`}>
                        {enhancedTechnologies[category.key as keyof typeof enhancedTechnologies]?.length || 0} Technologies
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
      
      {/* Detailed Technology Showcase */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {techCategories.map((category) => {
            const categoryTechs = enhancedTechnologies[category.key as keyof typeof enhancedTechnologies] || [];
            const IconComponent = category.icon;
            
            return (
              <div key={category.key} className="mb-20 last:mb-0">
                <div className="flex items-center mb-12">
                  <div className={`p-3 rounded-lg mr-4 ${
                    category.key === 'frontend' ? 'bg-green-100 dark:bg-green-900' :
                    category.key === 'backend' ? 'bg-blue-100 dark:bg-blue-900' :
                    category.key === 'ai-ml' ? 'bg-purple-100 dark:bg-purple-900' :
                    category.key === 'data' ? 'bg-orange-100 dark:bg-orange-900' :
                    'bg-red-100 dark:bg-red-900'
                  }`}>
                    <IconComponent className={`w-8 h-8 ${
                      category.key === 'frontend' ? 'text-green-600 dark:text-green-400' :
                      category.key === 'backend' ? 'text-blue-600 dark:text-blue-400' :
                      category.key === 'ai-ml' ? 'text-purple-600 dark:text-purple-400' :
                      category.key === 'data' ? 'text-orange-600 dark:text-orange-400' :
                      'text-red-600 dark:text-red-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                      {category.label}
                    </h3>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mt-1">
                      {category.description}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryTechs.map((tech, techIndex) => (
                    <Card key={techIndex} className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-900 border hover:border-blue-200 dark:hover:border-blue-800">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                {tech.name}
                              </h4>
                              {tech.trending && (
                                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs px-2 py-1">
                                  <TrendingUp className="w-3 h-3 mr-1" />
                                  Trending
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                              {tech.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between items-center mb-1">
                              <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Expertise Level</span>
                              <span className="text-xs font-semibold text-gray-900 dark:text-white">{tech.experience}%</span>
                            </div>
                            <Progress value={tech.experience} className="h-2" />
                          </div>
                          
                          <div className="flex justify-between items-center pt-2 border-t border-gray-100 dark:border-gray-700">
                            <div className="flex items-center space-x-1 text-gray-600 dark:text-gray-400">
                              <Layers className="w-4 h-4" />
                              <span className="text-xs">{tech.projects} Projects</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  className={`w-3 h-3 ${
                                    i < Math.floor(tech.experience / 20) 
                                      ? 'text-yellow-400 fill-current' 
                                      : 'text-gray-300 dark:text-gray-600'
                                  }`} 
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Technology Overview & CTA */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Ideas?
              </h2>
              <p className="text-lg md:text-xl text-blue-100 mb-8">
                Our technology expertise combined with innovative thinking delivers solutions that drive business growth and user satisfaction.
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">25+</div>
                  <div className="text-sm text-blue-200">Technologies</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">300+</div>
                  <div className="text-sm text-blue-200">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">95%</div>
                  <div className="text-sm text-blue-200">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl md:text-3xl font-bold mb-2">24/7</div>
                  <div className="text-sm text-blue-200">Support</div>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors flex items-center justify-center">
                  <Zap className="w-5 h-5 mr-2" />
                  Start Your Project
                </button>
                <button className="border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors flex items-center justify-center">
                  <Globe className="w-5 h-5 mr-2" />
                  View Portfolio
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
