// Static news and events data - replaces database content
export const newsEventsData = {
  news: [
    {
      id: 1,
      title: 'Majeed Lab Launches Orchard Autonomy Testbed',
      content: 'A new 12-acre testbed equipped with sensorized trellises, autonomous carts, and weather-aware irrigation opened this spring. The facility enables season-long evaluation of collaborative robots in commercial orchard conditions.',
      date: '2025-03-18',
      category: 'Research',
      author: 'Communications Office',
      image: 'https://images.unsplash.com/photo-1514996937319-344454492b37?auto=format&fit=crop&w=1200&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Dr. Majeed Receives 2025 ASABE Young Designer Award',
      content: 'The American Society of Agricultural and Biological Engineers honored Dr. Majeed for pioneering modular robotic platforms that adapt to varied horticultural systems.',
      date: '2025-02-12',
      category: 'Recognition',
      author: 'ASABE',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      id: 3,
      title: 'Graduate Students Publish in Nature Food',
      content: 'Ali Torabi and MD. Mahbubur Rahman demonstrated how multimodal sensing improves disease early-warning systems. Their study shows a 27% reduction in crop losses in partner orchards.',
      date: '2025-01-28',
      category: 'Publications',
      author: 'Editorial Team',
      image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      id: 4,
      title: 'Lab Announces Partnership with Wyoming Producers Council',
      content: 'A three-year partnership will co-develop robotics training programs for growers, focusing on ease of use, safety, and long-term support models.',
      date: '2025-01-09',
      category: 'Collaboration',
      author: 'Partnerships Team',
      image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      id: 5,
      title: 'HydraSense Project Wraps with Open-Source Toolkit',
      content: 'The HydraSense irrigation project concluded with an open-source repository that helps small farms deploy predictive watering using off-the-shelf sensors.',
      date: '2024-12-08',
      category: 'Projects',
      author: 'HydraSense Team',
      image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      id: 6,
      title: 'Winter Robotics Bootcamp Highlights',
      content: 'More than 40 students built prototype grippers, perception demos, and greenhouse dashboards during the lab’s first winter bootcamp.',
      date: '2024-12-15',
      category: 'Events',
      author: 'Student Council',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?auto=format&fit=crop&w=1200&q=80',
      featured: false
    }
  ],
  events: [
    {
      id: 1,
      title: 'Orchard Robotics Field Day',
      description: 'Experience live demonstrations of the Sunset Harvester platform, canopy scouting drones, and human-robot workflow tools. Growers can test-drive systems and provide feedback.',
      date: '2025-04-26',
      time: '09:00 AM – 3:30 PM',
      location: 'Laramie Smart Orchard Testbed',
      type: 'Open House',
      registration_required: true,
      registration_link: 'https://agrobotics-lab.typeform.com/fieldday',
      image: 'https://images.unsplash.com/photo-1500382017468-9049fed747aa?auto=format&fit=crop&w=1200&q=80',
      featured: true
    },
    {
      id: 2,
      title: 'Workshop: Designing Trustworthy Farm Interfaces',
      description: 'Hands-on design sprint focused on inclusive interfaces for farm crews adopting autonomous systems. Facilitated by Emma Chen and industry ergonomics experts.',
      date: '2025-05-16',
      time: '10:00 AM – 4:00 PM',
      location: 'Engineering Innovation Center · Studio 2',
      type: 'Workshop',
      registration_required: true,
      registration_link: 'https://agrobotics-lab.typeform.com/workshop',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      id: 3,
      title: 'Guest Seminar: Robotics in Specialty Crop Harvest',
      description: 'Dr. Priya Desai (UC Davis) discusses lessons learned from deploying collaborative robots in table grape operations.',
      date: '2025-02-21',
      time: '2:00 PM – 3:15 PM',
      location: 'Agricultural Sciences Hall · Room 215',
      type: 'Seminar',
      registration_required: false,
      registration_link: null,
      image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      id: 4,
      title: 'Industry Advisory Roundtable',
      description: 'Annual strategy session with the lab’s advisory board to prioritize grower needs and technology transfer pathways.',
      date: '2025-03-07',
      time: '11:30 AM – 2:00 PM',
      location: 'Wyoming Technology Business Center',
      type: 'Roundtable',
      registration_required: true,
      registration_link: 'https://agrobotics-lab.typeform.com/roundtable',
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      featured: false
    },
    {
      id: 5,
      title: 'Graduate Research Showcase',
      description: 'Poster session and lightning talks highlighting milestone results from current graduate researchers.',
      date: '2025-04-04',
      time: '4:00 PM – 6:30 PM',
      location: 'College of Engineering Atrium',
      type: 'Symposium',
      registration_required: false,
      registration_link: null,
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1200&q=80',
      featured: false
    }
  ]
};

// Helper functions for news and events
export const newsEventsHelper = {
  // Get all news
  getAllNews: () => newsEventsData.news,
  
  // Get featured news
  getFeaturedNews: () => newsEventsData.news.filter(item => item.featured),
  
  // Get news by category
  getNewsByCategory: (category) => newsEventsData.news.filter(item => item.category === category),
  
  // Get recent news (last 30 days)
  getRecentNews: () => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return newsEventsData.news.filter(item => new Date(item.date) >= thirtyDaysAgo);
  },
  
  // Get all events
  getAllEvents: () => newsEventsData.events,
  
  // Get featured events
  getFeaturedEvents: () => newsEventsData.events.filter(item => item.featured),
  
  // Get upcoming events
  getUpcomingEvents: () => {
    const today = new Date();
    return newsEventsData.events.filter(item => new Date(item.date) >= today);
  },
  
  // Get events by type
  getEventsByType: (type) => newsEventsData.events.filter(item => item.type === type),
  
  // Get events requiring registration
  getEventsRequiringRegistration: () => newsEventsData.events.filter(item => item.registration_required)
};
