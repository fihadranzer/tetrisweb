import { Link } from "wouter";
import { Twitter, Linkedin, Github } from "lucide-react";
import logoWhite from "../assets/logo-white.svg";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <img 
                src={logoWhite} 
                alt="Pi Tetris Logo" 
                className="h-10 w-10 object-contain"
              />
              <h3 className="text-2xl font-bold">Pi Tetris</h3>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              We design, build, and staff AI driven web, mobile and data solutions. 
              Your trusted partner for digital transformation.
            </p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-twitter"
              >
                <Twitter className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-linkedin"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-colors"
                data-testid="link-github"
              >
                <Github className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/services">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="footer-link-ai-ml">
                    AI & Machine Learning
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="footer-link-custom-software">
                    Custom Software
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="footer-link-mobile">
                    Mobile Development
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="footer-link-data">
                    Data Engineering
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="footer-link-staff">
                    Staff Augmentation
                  </span>
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Company */}
          <div>
            <h4 className="text-lg font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="footer-link-about">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="footer-link-portfolio">
                    Portfolio
                  </span>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-link-careers">
                  Careers
                </a>
              </li>
              <li>
                <Link href="/contact">
                  <span className="hover:text-white transition-colors cursor-pointer" data-testid="footer-link-contact">
                    Contact
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Pi Tetris. All rights reserved. | SOC 2 Compliant</p>
        </div>
      </div>
    </footer>
  );
}
