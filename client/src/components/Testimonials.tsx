import { useQuery } from "@tanstack/react-query";

export default function Testimonials() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ['/api/testimonials', { featured: 'true' }],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue"></div>
          </div>
        </div>
      </section>
    );
  }

  // Default testimonials if none loaded
  const defaultTestimonials = [
    {
      id: 1,
      quote: "Pi Tetris has been great to work with. Their team has impressed us with their professionalism and capacity. We have a mature and sophisticated tech stack, and they were able to jump in and rapidly make valuable contributions.",
      authorName: "Mark Thompson",
      authorTitle: "Director of Engineering",
      authorCompany: "TechFlow Solutions",
      rating: 5
    },
    {
      id: 2,
      quote: "The work was highly complicated and required a lot of planning, engineering, and customization. Their development knowledge is impressive and they delivered exactly what we needed.",
      authorName: "Jennifer Walsh",
      authorTitle: "Senior Product Manager",
      authorCompany: "DataVantage Inc",
      rating: 5
    },
    {
      id: 3,
      quote: "Pi Tetris came in with a dedicated team that quickly grasped our problem and designed and built our data integration solution. They delivered a clearer picture for our business in a timeframe I didn't think was possible.",
      authorName: "Robert Martinez",
      authorTitle: "Chief Operating Officer",
      authorCompany: "FinanceFirst",
      rating: 5
    }
  ];

  const displayTestimonials = testimonials || defaultTestimonials;

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-testimonials-title">
            What Our Clients Say
          </h2>
          <p className="text-xl text-pi-gray" data-testid="text-testimonials-description">
            Real feedback from real clients who have transformed their businesses with our solutions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayTestimonials.map((testimonial: any) => (
            <div key={testimonial.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6" data-testid={`testimonial-${testimonial.id}`}>
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" data-testid={`star-${testimonial.id}-${i}`}>
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-gray-900 dark:text-white mb-4" data-testid={`text-testimonial-quote-${testimonial.id}`}>
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-sm not-italic">
                <span className="font-semibold text-gray-900 dark:text-white" data-testid={`text-testimonial-author-${testimonial.id}`}>
                  {testimonial.authorName}
                </span>
                {testimonial.authorTitle && (
                  <>
                    <br />
                    <span className="text-pi-gray" data-testid={`text-testimonial-title-${testimonial.id}`}>
                      {testimonial.authorTitle}
                      {testimonial.authorCompany && `, ${testimonial.authorCompany}`}
                    </span>
                  </>
                )}
              </cite>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
