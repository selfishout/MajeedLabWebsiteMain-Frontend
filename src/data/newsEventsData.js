// Static news and events data - replaces database content
export const newsEventsData = {
  news: [
    {
      id: 2,
      title: 'Joint summer internship at O&M Robotics & InstaFarm',
      subtitle:
        'Dayan joins a dual-track robotics team in Loveland, CO to advance AI-driven plant health phenotyping and autonomous solar panel cleaning.',
      content: [
        "Dayan, M.S. student in Electrical Engineering at the University of Wyoming's Agricultural Robotics Laboratory, started his summer internship at O&M Robotics on May 18, 2026. Working across two platforms, InstaFarm and SolTrek, he applies AI perception and vision-based control to real-world agricultural and energy systems.",
        'Position: AI/Robotics Research Intern. Project focus: developing AI models for the InstaFarm plant health phenotyping platform and a vision-based control system for the SolTrek solar panel cleaning robot.'
      ],
      date: '2026-05-18',
      category: 'Team',
      author: 'AgBodied Lab',
      image:
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Solar panels under a clear sky',
      featured: true,
      externalLinks: [
        { url: 'https://omrobotics.com/', label: 'Visit O&M Robotics' },
        { url: 'https://instafarm.ag/', label: 'Visit InstaFarm' }
      ]
    },
    {
      id: 3,
      title: 'AgBodied Lab at the 2026 AI in Agriculture Conference',
      subtitle:
        "Two University of Wyoming researchers present robotics and AI work at NC State's premier agricultural AI event.",
      content: [
        'FNU Dayan and Abiam Asif Khalid represented the Agricultural Robotics Laboratory at the 2026 AI in Agriculture Conference, held March 31-April 2 at NC State University campus in Raleigh, NC.',
        'Poster: Leveraging Sequence State Space Models for Visuomotor Control in Unstructured Field Environments. FNU Dayan, Poster Session.',
        'Oral: Vision-Based Fruit Ripeness Detection for Simulated Robotic Harvesting. Abiam Asif Khalid, Oral presentation.'
      ],
      date: '2026-04-02',
      category: 'Events',
      author: 'AgBodied Lab',
      image:
        'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80',
      imageAlt: 'Agricultural field rows viewed from above',
      featured: false,
      externalLink: {
        url: 'https://calendar.ncsu.edu/event/ai-in-agriculture-conference',
        label: 'View NC State event'
      }
    },
    {
      id: 1,
      title: 'Summer internship at Uplink Robotics',
      subtitle:
        'Muhammad Mujahid Iqbal joins a Wyoming inspection-robotics team to advance long-range HD video for field systems.',
      content: [
        'Muhammad Mujahid Iqbal, M.S. student in Electrical Engineering at the University of Wyoming, will intern at Uplink Robotics in Laramie this summer. The company designs and builds rugged, man-controlled crawlers that bring high-definition visuals and safe access to crawlspaces and other hard-to-reach environments for inspectors and first responders.',
        'Position: Robotics Intern. Project focus: develop and build a long-range HD video transmission system for ground-based inspection robots—closing the gap between operators and machines where reliable video is mission-critical.'
      ],
      date: '2026-04-16',
      category: 'Team',
      author: 'AgBodied Lab',
      image:
        'https://uplinkrobotics.com/wp-content/uploads/2025/08/UplinkRobotics-White-w-Text-5000x5000-1-1024x1024.png',
      imageAlt: 'Uplink Robotics logo',
      imageLayout: 'contain-dark',
      featured: true,
      externalLink: { url: 'https://uplinkrobotics.com/', label: 'Visit Uplink Robotics' }
    }
  ],
  events: [
    {
      id: 1,
      title: '2026 AI in Agriculture Conference',
      description:
        'FNU Dayan presented a poster on sequence state space models for visuomotor control, and Abiam Asif Khalid delivered an oral presentation on vision-based fruit ripeness detection for simulated robotic harvesting.',
      date: '2026-03-31',
      time: 'March 31-April 2, 2026',
      location: 'NC State University campus · Raleigh, NC',
      type: 'Conference',
      registration_required: false,
      registration_link: 'https://calendar.ncsu.edu/event/ai-in-agriculture-conference',
      image:
        'https://images.unsplash.com/photo-1560493676-04071c5f467b?auto=format&fit=crop&w=1200&q=80',
      featured: true
    }
  ]
};

// Helper functions for news and events
export const newsEventsHelper = {
  // Get all news
  getAllNews: () => newsEventsData.news,

  // Get featured news
  getFeaturedNews: () => newsEventsData.news.filter((item) => item.featured),

  // Get news by category
  getNewsByCategory: (category) =>
    newsEventsData.news.filter((item) => item.category === category),

  // Get recent news (last 30 days)
  getRecentNews: () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return newsEventsData.news.filter((item) => new Date(item.date) >= thirtyDaysAgo);
  },

  // Get all events
  getAllEvents: () => newsEventsData.events,

  // Get featured events
  getFeaturedEvents: () => newsEventsData.events.filter((item) => item.featured),

  // Get upcoming events
  getUpcomingEvents: () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return newsEventsData.events.filter((item) => new Date(item.date) >= today);
  },

  // Get events by type
  getEventsByType: (type) => newsEventsData.events.filter((item) => item.type === type),

  // Get events requiring registration
  getEventsRequiringRegistration: () =>
    newsEventsData.events.filter((item) => item.registration_required)
};
