// Static news and events data - replaces database content
export const newsEventsData = {
  news: [
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
      title: 'Graduate Research Showcase',
      description:
        'Poster session and lightning talks highlighting milestone results from current graduate researchers.',
      date: '2026-11-12',
      time: '4:00 PM – 6:30 PM',
      location: 'College of Engineering Atrium · University of Wyoming',
      type: 'Symposium',
      registration_required: false,
      registration_link: null,
      image:
        'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Spring Seminar: Field Robotics',
      description:
        'Discussion of deployment lessons from agricultural and inspection robotics in the Mountain West.',
      date: '2026-05-08',
      time: '2:00 PM – 3:15 PM',
      location: 'Engineering Building · Room TBA',
      type: 'Seminar',
      registration_required: false,
      registration_link: null,
      image:
        'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
      featured: false
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
