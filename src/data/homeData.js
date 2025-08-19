// Static home page data - replaces database content
export const homeData = {
  banners: [
    {
      id: 1,
      title: "Welcome to Majeed Agricultural Robotics Lab",
      subtitle: "Advancing the Future of Smart Farming Through Robotics and AI",
      description: "We are at the forefront of agricultural robotics research, developing innovative solutions for precision farming, crop monitoring, and autonomous agricultural systems.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=1200&h=600&fit=crop",
      button_text: "Learn More",
      button_link: "/about",
      featured: true
    },
    {
      id: 2,
      title: "Cutting-Edge Research in Agricultural Robotics",
      subtitle: "From Computer Vision to Autonomous Navigation",
      description: "Our research spans multiple domains including computer vision, machine learning, IoT sensors, and robotic systems for sustainable agriculture.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&h=600&fit=crop",
      button_text: "Our Research",
      button_link: "/publications",
      featured: false
    },
    {
      id: 3,
      title: "Join Our Team",
      subtitle: "Opportunities for Students and Researchers",
      description: "We welcome motivated students and researchers to join our team. Explore opportunities in agricultural robotics, computer vision, and smart farming technologies.",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=600&fit=crop",
      button_text: "Join Us",
      button_link: "/students",
      featured: false
    }
  ],
  
  content: {
    welcome_section: {
      title: "Welcome to Majeed Agricultural Robotics Lab",
      subtitle: "Pioneering the Future of Smart Agriculture",
      description: "Our laboratory is dedicated to advancing agricultural robotics and automation technologies. We focus on developing intelligent systems that enhance farming efficiency, reduce environmental impact, and ensure food security for future generations.",
      image: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=500&fit=crop"
    },
    
    research_areas: [
      {
        id: 1,
        title: "Agricultural Robotics",
        description: "Development of autonomous robots for field operations, crop monitoring, and precision farming applications.",
        icon: "🤖",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=400&h=300&fit=crop"
      },
      {
        id: 2,
        title: "Computer Vision",
        description: "Advanced image processing and machine learning algorithms for plant disease detection and crop health monitoring.",
        icon: "👁️",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop"
      },
      {
        id: 3,
        title: "IoT & Sensors",
        description: "Smart sensor networks for real-time monitoring of soil conditions, weather, and crop parameters.",
        icon: "📡",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop"
      },
      {
        id: 4,
        title: "Machine Learning",
        description: "AI-powered algorithms for crop yield prediction, disease forecasting, and optimal farming decisions.",
        icon: "🧠",
        image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop"
      }
    ],
    
    stats: {
      publications: 45,
      projects: 12,
      students: 8,
      years_experience: 5
    },
    
    featured_projects: [
      {
        id: 1,
        title: "Autonomous Weed Detection Robot",
        description: "AI-powered robot that identifies and removes weeds while preserving crops, reducing herbicide use by 80%.",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=400&h=300&fit=crop",
        status: "Active"
      },
      {
        id: 2,
        title: "Smart Irrigation System",
        description: "IoT-based system that optimizes water usage based on real-time soil moisture and weather data.",
        image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop",
        status: "Completed"
      },
      {
        id: 3,
        title: "Crop Disease Detection",
        description: "Computer vision system that identifies plant diseases early, enabling timely intervention.",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop",
        status: "Active"
      }
    ]
  }
};

// Helper functions for home data
export const homeHelper = {
  // Get all banners
  getAllBanners: () => homeData.banners,
  
  // Get featured banner
  getFeaturedBanner: () => homeData.banners.find(banner => banner.featured),
  
  // Get welcome section
  getWelcomeSection: () => homeData.content.welcome_section,
  
  // Get research areas
  getResearchAreas: () => homeData.content.research_areas,
  
  // Get stats
  getStats: () => homeData.content.stats,
  
  // Get featured projects
  getFeaturedProjects: () => homeData.content.featured_projects
};
