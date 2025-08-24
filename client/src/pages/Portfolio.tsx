import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import CaseStudyCard from "@/components/CaseStudyCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function Portfolio() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedTechnology, setSelectedTechnology] = useState<string>("");

  const { data: caseStudies = [], isLoading } = useQuery({
    queryKey: ["/api/case-studies"],
  });

  const { data: categories = [] } = useQuery({
    queryKey: ["/api/categories", { type: "case-study" }],
  });

  // Extract unique technologies from case studies
  const allTechnologies = Array.from(
    new Set(
      caseStudies.flatMap((cs: any) => cs.technologies || [])
    )
  ).sort();

  // Filter case studies
  const filteredCaseStudies = caseStudies.filter((caseStudy: any) => {
    const matchesSearch = caseStudy.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.shortDescription?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         caseStudy.clientName?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !selectedCategory || selectedCategory === "all" || caseStudy.categoryId === selectedCategory;
    
    const matchesTechnology = !selectedTechnology || selectedTechnology === "all" || 
                             (caseStudy.technologies && caseStudy.technologies.includes(selectedTechnology));

    return matchesSearch && matchesCategory && matchesTechnology;
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
          <h1 className="text-5xl font-bold text-gray-900 mb-6">Our Portfolio</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Explore our successful projects and case studies. See how we've helped businesses across various industries achieve their technology goals through innovative software solutions.
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
                data-testid="input-search-projects"
              />
            </div>
            
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger data-testid="select-category">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category: any) => (
                  <SelectItem key={category.id} value={category.id}>
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedTechnology} onValueChange={setSelectedTechnology}>
              <SelectTrigger data-testid="select-technology">
                <SelectValue placeholder="All Technologies" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Technologies</SelectItem>
                {allTechnologies.map((tech: string) => (
                  <SelectItem key={tech} value={tech}>
                    {tech}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button 
              variant="outline" 
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSelectedTechnology("");
              }}
              data-testid="button-clear-filters"
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results Info */}
        <div className="mb-8">
          <p className="text-gray-600">
            Showing {filteredCaseStudies.length} of {caseStudies.length} projects
          </p>
        </div>

        {/* Case Studies Grid */}
        {filteredCaseStudies.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCaseStudies.map((caseStudy: any) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No projects found</h3>
            <p className="text-gray-600 mb-4">Try adjusting your search criteria or clearing the filters.</p>
            <Button 
              className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-semibold"
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("");
                setSelectedTechnology("");
              }}
              data-testid="button-clear-all-filters"
            >
              Clear All Filters
            </Button>
          </div>
        )}

        {/* Statistics */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-12 text-white">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Our Track Record</h2>
            <p className="text-xl text-blue-100">Numbers that speak to our success</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">{caseStudies.length}+</div>
              <div className="text-blue-100">Projects Delivered</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">
                {Array.from(new Set(caseStudies.map((cs: any) => cs.clientName).filter(Boolean))).length}+
              </div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">{allTechnologies.length}+</div>
              <div className="text-blue-100">Technologies</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
