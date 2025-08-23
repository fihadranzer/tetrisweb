import { Link } from "wouter";
import { Twitter, Linkedin, Github } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Pi Tetris</h3>
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
                  <a className="hover:text-white transition-colors" data-testid="footer-link-ai-ml">
                    AI & Machine Learning
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-white transition-colors" data-testid="footer-link-custom-software">
                    Custom Software
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-white transition-colors" data-testid="footer-link-mobile">
                    Mobile Development
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-white transition-colors" data-testid="footer-link-data">
                    Data Engineering
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-white transition-colors" data-testid="footer-link-staff">
                    Staff Augmentation
                  </a>
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
                  <a className="hover:text-white transition-colors" data-testid="footer-link-about">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/portfolio">
                  <a className="hover:text-white transition-colors" data-testid="footer-link-portfolio">
                    Portfolio
                  </a>
                </Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors" data-testid="footer-link-careers">
                  Careers
                </a>
              </li>
              <li>
                <Link href="/contact">
                  <a className="hover:text-white transition-colors" data-testid="footer-link-contact">
                    Contact
                  </a>
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
