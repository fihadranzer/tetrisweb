import { Button } from "@/components/ui/button";
import { ArrowRight, Star } from "lucide-react";
import { Link } from "wouter";

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
              The Software Development Company for AI
            </h1>
            <p className="text-xl lg:text-2xl text-blue-100 mb-8 leading-relaxed">
              More velocity. More value. More sleep.
            </p>
            <p className="text-lg text-blue-100 mb-8">
              We design, build, and staff AI driven web, mobile and data solutions. SOC 2 compliant. Global time zone aligned.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary" data-testid="button-schedule-call">
                  Schedule a Call
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  data-testid="button-price-project"
                >
                  Price Your Project
                </Button>
              </Link>
            </div>
            <div className="mt-8 flex items-center space-x-6">
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <span className="ml-2 text-lg font-semibold">4.9 stars</span>
              </div>
              <div className="text-blue-100">|</div>
              <div className="text-sm text-blue-100">Verified rating on Clutch.co</div>
            </div>
          </div>
          <div className="relative">
            {/* Code visualization mockup */}
            <div className="bg-gray-900 rounded-lg p-6 shadow-2xl">
              <div className="flex items-center mb-4">
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
              </div>
              <div className="text-green-400 font-mono text-sm">
                <div className="mb-2 text-gray-400">// AI-Powered Solutions</div>
                <div className="text-blue-400 mb-1">
                  function <span className="text-yellow-400">buildIntelligentApp</span>() {"{"}
                </div>
                <div className="ml-4 text-white mb-1">
                  const <span className="text-cyan-400">ai</span> = new <span className="text-yellow-400">PiTetris</span>();
                </div>
                <div className="ml-4 text-white mb-1">
                  return <span className="text-cyan-400">ai</span>.<span className="text-yellow-400">deploy</span>();
                </div>
                <div className="text-blue-400">{"}"}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
