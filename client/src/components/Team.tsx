import { useQuery } from "@tanstack/react-query";

export default function Team() {
  const { data: team, isLoading } = useQuery({
    queryKey: ['/api/team'],
  });

  // Default team if none loaded
  const defaultTeam = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Chief Technology Officer',
      expertise: '15+ years in AI/ML and enterprise software architecture',
      imageUrl: null
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'VP of Engineering',
      expertise: 'Expert in cloud infrastructure and scalable system design',
      imageUrl: null
    },
    {
      id: 3,
      name: 'Dr. Emily Watson',
      role: 'Lead Data Scientist',
      expertise: 'PhD in Machine Learning, specialist in NLP and computer vision',
      imageUrl: null
    },
    {
      id: 4,
      name: 'David Kim',
      role: 'Senior Solutions Architect',
      expertise: 'Full-stack development and enterprise system integration',
      imageUrl: null
    }
  ];

  const displayTeam = team || defaultTeam;

  if (isLoading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center min-h-96">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pi-blue"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4" data-testid="text-team-title">
            Meet Our Expert Team
          </h2>
          <p className="text-xl text-pi-gray max-w-4xl mx-auto" data-testid="text-team-description">
            Our experienced professionals bring deep expertise across diverse technologies and industries to deliver exceptional results for your projects.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayTeam.map((member: any) => (
            <div key={member.id} className="bg-white dark:bg-gray-900 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow" data-testid={`team-member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
              <div className="w-24 h-24 mx-auto mb-4">
                {member.imageUrl ? (
                  <img 
                    src={member.imageUrl} 
                    alt={member.name}
                    className="w-24 h-24 rounded-full object-cover"
                    data-testid={`img-member-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                  />
                ) : (
                  <div className="w-24 h-24 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                )}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1" data-testid={`text-member-name-${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
                {member.name}
              </h3>
              <p className="text-pi-blue font-medium mb-2" data-testid={`text-member-role-${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
                {member.role}
              </p>
              <p className="text-sm text-pi-gray" data-testid={`text-member-expertise-${member.name.toLowerCase().replace(/\s+/g, '-')}`}>
                {member.expertise}
              </p>
              {(member.linkedinUrl || member.twitterUrl || member.githubUrl) && (
                <div className="flex justify-center space-x-3 mt-4">
                  {member.linkedinUrl && (
                    <a 
                      href={member.linkedinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pi-gray hover:text-pi-blue transition-colors"
                      data-testid={`link-linkedin-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                  {member.twitterUrl && (
                    <a 
                      href={member.twitterUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pi-gray hover:text-pi-blue transition-colors"
                      data-testid={`link-twitter-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {member.githubUrl && (
                    <a 
                      href={member.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-pi-gray hover:text-pi-blue transition-colors"
                      data-testid={`link-github-${member.name.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
                      </svg>
                    </a>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
