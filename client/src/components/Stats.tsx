export default function Stats() {
  return (
    <section className="py-20 bg-pi-blue text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4" data-testid="text-stats-title">
            We Are A Top-Rated Software Development Company for a Reason
          </h2>
          <p className="text-xl text-blue-100 max-w-4xl mx-auto" data-testid="text-stats-description">
            We deliver highly skilled software engineers, data science professionals, and cloud specialists who consistently solve problems, complete tasks and work to power your projects forward.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div data-testid="stat-rating">
            <div className="text-4xl font-bold mb-2" data-testid="text-stat-rating-value">4.9</div>
            <div className="text-blue-100" data-testid="text-stat-rating-label">stars</div>
            <div className="text-sm text-blue-200 mt-1" data-testid="text-stat-rating-description">Verified Client Rating</div>
          </div>
          <div data-testid="stat-promoter">
            <div className="text-4xl font-bold mb-2" data-testid="text-stat-promoter-value">93%</div>
            <div className="text-blue-100" data-testid="text-stat-promoter-label">Promoter Score</div>
            <div className="text-sm text-blue-200 mt-1" data-testid="text-stat-promoter-description">Client's willing to refer us</div>
          </div>
          <div data-testid="stat-retention">
            <div className="text-4xl font-bold mb-2" data-testid="text-stat-retention-value">200%</div>
            <div className="text-blue-100" data-testid="text-stat-retention-label">Retention Rate</div>
            <div className="text-sm text-blue-200 mt-1" data-testid="text-stat-retention-description">Annual growth in renewals</div>
          </div>
          <div data-testid="stat-projects">
            <div className="text-4xl font-bold mb-2" data-testid="text-stat-projects-value">350+</div>
            <div className="text-blue-100" data-testid="text-stat-projects-label">Projects</div>
            <div className="text-sm text-blue-200 mt-1" data-testid="text-stat-projects-description">Successfully delivered</div>
          </div>
        </div>
      </div>
    </section>
  );
}
