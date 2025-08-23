import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImage from "@assets/WhatsApp Image 2025-08-23 at 9.17.05 PM_1755962247143.jpeg";
import ServicesMegaMenu from "@/components/ServicesMegaMenu";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [location] = useLocation();

  const navigation = [
    { name: "Technologies", href: "/technologies" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href.startsWith("#")) {
      return false; // Hash links are handled differently
    }
    return location === href;
  };

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    setIsServicesOpen(false);
    if (href.startsWith("#")) {
      // Smooth scroll for hash links
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleServicesToggle = () => {
    setIsServicesOpen(!isServicesOpen);
  };

  const handleCloseServices = () => {
    setIsServicesOpen(false);
  };

  const handleMouseEnterServices = () => {
    setIsServicesOpen(true);
  };

  const handleMouseLeaveServices = () => {
    setIsServicesOpen(false);
  };

  return (
    <>
    <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/">
              <div className="flex items-center space-x-2" data-testid="link-home">
                <img 
                  src={logoImage} 
                  alt="Pi Tetris Logo" 
                  className="h-10 w-auto object-contain"
                />
                <span className="text-xl font-bold text-blue-600">Pi Tetris</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {/* Services Dropdown */}
              <div className="relative group">
                <button
                  onClick={handleServicesToggle}
                  onMouseEnter={handleMouseEnterServices}
                  className={`flex items-center px-3 py-2 text-sm font-medium transition-colors ${
                    location.startsWith('/services') 
                      ? "text-blue-600"
                      : "text-gray-600 hover:text-blue-600"
                  }`}
                  data-testid="nav-services"
                >
                  Services
                  <ChevronDown className={`ml-1 h-4 w-4 transform transition-transform ${
                    isServicesOpen ? 'rotate-180' : ''
                  }`} />
                </button>
              </div>

              {/* Other Navigation Items */}
              {navigation.map((item) => (
                item.href.startsWith("#") ? (
                  <button
                    key={item.name}
                    onClick={() => handleNavClick(item.href)}
                    className="text-gray-600 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors"
                    data-testid={`nav-${item.name.toLowerCase()}`}
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link key={item.name} href={item.href}>
                    <span
                      className={`px-3 py-2 text-sm font-medium transition-colors cursor-pointer ${
                        isActive(item.href)
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      data-testid={`nav-${item.name.toLowerCase()}`}
                    >
                      {item.name}
                    </span>
                  </Link>
                )
              ))}
              <Link href="/contact">
                <Button data-testid="button-get-started">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" data-testid="button-mobile-menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-2">
                    <img 
                      src={logoImage} 
                      alt="Pi Tetris Logo" 
                      className="h-8 w-auto object-contain"
                    />
                    <span className="text-lg font-semibold">Pi Tetris</span>
                  </div>
                  <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="space-y-4">
                  {/* Mobile Services Link */}
                  <Link href="/services">
                    <span
                      onClick={() => setIsOpen(false)}
                      className={`block py-2 text-base font-medium transition-colors cursor-pointer ${
                        location.startsWith('/services')
                          ? "text-blue-600"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      data-testid="mobile-nav-services"
                    >
                      Services
                    </span>
                  </Link>
                  
                  {/* Other Navigation Items */}
                  {navigation.map((item) => (
                    item.href.startsWith("#") ? (
                      <button
                        key={item.name}
                        onClick={() => handleNavClick(item.href)}
                        className="block w-full text-left text-gray-600 hover:text-blue-600 py-2 text-base font-medium transition-colors"
                        data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                      >
                        {item.name}
                      </button>
                    ) : (
                      <Link key={item.name} href={item.href}>
                        <span
                          onClick={() => setIsOpen(false)}
                          className={`block py-2 text-base font-medium transition-colors cursor-pointer ${
                            isActive(item.href)
                              ? "text-blue-600"
                              : "text-gray-600 hover:text-blue-600"
                          }`}
                          data-testid={`mobile-nav-${item.name.toLowerCase()}`}
                        >
                          {item.name}
                        </span>
                      </Link>
                    )
                  ))}
                  <div className="pt-4">
                    <Link href="/contact">
                      <Button className="w-full" onClick={() => setIsOpen(false)} data-testid="mobile-button-get-started">
                        Get Started
                      </Button>
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
    
    {/* Services Mega Menu - Positioned outside nav for full width */}
    <div 
      onMouseLeave={handleMouseLeaveServices}
      className={isServicesOpen ? "block" : "hidden"}
    >
      <ServicesMegaMenu isOpen={isServicesOpen} onClose={handleCloseServices} />
    </div>
    
    {/* Backdrop for mega menu */}
    {isServicesOpen && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-10 z-40" 
        onClick={handleCloseServices}
      />
    )}
    </>
  );
}
