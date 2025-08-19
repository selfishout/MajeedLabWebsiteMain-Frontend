// Static news and events data - replaces database content
export const newsEventsData = {
  news: [
    {
      id: 1,
      title: "Majeed Lab Receives NSF Grant for Agricultural Robotics Research",
      content: "We are excited to announce that our lab has been awarded a $500,000 NSF grant to advance research in autonomous agricultural robotics. This funding will support our work on computer vision-based crop monitoring and precision farming technologies.",
      date: "2024-08-15",
      category: "Research",
      author: "Dr. Yaqoob Majeed",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "New PhD Student Ali Torabi Joins the Lab",
      content: "We welcome Ali Torabi to our research team! Ali brings expertise in computer vision and machine learning, and will be working on agricultural robotics applications. His research focuses on autonomous navigation and crop disease detection.",
      date: "2024-08-10",
      category: "Team",
      author: "Lab Team",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Paper Accepted at IEEE ICRA 2024",
      content: "Our paper 'Agricultural Robotics: A Comprehensive Review' has been accepted for presentation at IEEE International Conference on Robotics and Automation (ICRA) 2024. This is a significant milestone for our lab's research visibility.",
      date: "2024-08-05",
      category: "Publications",
      author: "Dr. Yaqoob Majeed",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Collaboration with Agricultural Department Announced",
      content: "We are pleased to announce a new collaboration with the Department of Agriculture to develop smart farming solutions. This partnership will provide real-world testing environments for our robotic systems.",
      date: "2024-07-28",
      category: "Collaboration",
      author: "Lab Team",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Lab Equipment Upgrade Complete",
      content: "Our lab has completed a major equipment upgrade, including new high-resolution cameras, advanced sensors, and improved computing infrastructure. These upgrades will enhance our research capabilities significantly.",
      date: "2024-07-20",
      category: "Infrastructure",
      author: "Lab Team",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 6,
      title: "Student Research Showcase Success",
      content: "Our annual student research showcase was a great success! Students presented their work on agricultural robotics, computer vision, and IoT applications. The event attracted industry professionals and academic collaborators.",
      date: "2024-07-15",
      category: "Events",
      author: "Lab Team",
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
      featured: false
    }
  ],
  events: [
    {
      id: 1,
      title: "Agricultural Robotics Workshop 2024",
      description: "Join us for a comprehensive workshop on agricultural robotics technologies, featuring hands-on demonstrations, expert presentations, and networking opportunities.",
      date: "2024-09-15",
      time: "9:00 AM - 5:00 PM",
      location: "University Conference Center",
      type: "Workshop",
      registration_required: true,
      registration_link: "#",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=400&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "Research Seminar: Computer Vision in Agriculture",
      description: "Dr. Sarah Johnson from MIT will present her research on computer vision applications in precision agriculture, followed by Q&A and discussion.",
      date: "2024-09-20",
      time: "2:00 PM - 3:30 PM",
      location: "Engineering Building, Room 301",
      type: "Seminar",
      registration_required: false,
      registration_link: null,
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 3,
      title: "Industry Partner Meeting",
      description: "Annual meeting with our industry partners to discuss research progress, future collaborations, and technology transfer opportunities.",
      date: "2024-09-25",
      time: "10:00 AM - 12:00 PM",
      location: "Business School, Conference Room A",
      type: "Meeting",
      registration_required: true,
      registration_link: "#",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 4,
      title: "Open Lab Day",
      description: "Public open house showcasing our latest research projects, robotic demonstrations, and interactive exhibits. Open to students, faculty, and community members.",
      date: "2024-10-05",
      time: "1:00 PM - 6:00 PM",
      location: "Majeed Agricultural Robotics Lab",
      type: "Open House",
      registration_required: false,
      registration_link: null,
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop",
      featured: false
    },
    {
      id: 5,
      title: "Graduate Student Symposium",
      description: "Our graduate students will present their research progress and findings. This is a great opportunity to learn about ongoing projects and provide feedback.",
      date: "2024-10-12",
      time: "9:00 AM - 4:00 PM",
      location: "Engineering Building, Auditorium",
      type: "Symposium",
      registration_required: false,
      registration_link: null,
      image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=400&fit=crop",
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
