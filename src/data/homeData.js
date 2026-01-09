// Static home page data - replaces database content
export const homeData = {
  banners: [
    {
      id: 1,
      title: 'Intelligent Automation for Specialty Crops',
      subtitle: 'Field-ready robots and sensing systems for resilient agriculture',
      description: 'Our lab deploys autonomous platforms that help growers monitor, harvest, and care for high-value crops with precision and care.',
      image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
      button_text: 'Discover Our Work',
      button_link: '/publications',
      featured: true
    },
    {
      id: 2,
      title: 'From Pixels to Plants',
      subtitle: 'Vision-driven analytics that quantify plant health in real time',
      description: 'We fuse aerial, ground, and canopy-level sensing to deliver actionable insights that drive sustainable decisions on every acre.',
      image: 'https://images.unsplash.com/photo-1518779578993-ec3579fee39f?auto=format&fit=crop&w=1400&q=80',
      button_text: 'Explore Research Areas',
      button_link: '/about',
      featured: false
    },
    {
      id: 3,
      title: 'Join a Multi-disciplinary Team',
      subtitle: 'Robotics, AI, horticulture, and design working side by side',
      description: 'Students and collaborators build systems that leave the lab and deliver value to growers across the Mountain West and beyond.',
      image: 'https://images.unsplash.com/photo-1522199710521-72d69614c702?auto=format&fit=crop&w=1400&q=80',
      button_text: 'Meet the Team',
      button_link: '/students',
      featured: false
    }
  ],

  content: {
    welcome_section: {
      title: 'Where Robotics Meets Regenerative Agriculture',
      subtitle: 'Translating intelligent automation into sustainable food systems',
      description: 'The AgBodied Lab: Perception, Embodied Intelligence, and Robotics for Agriculture designs end-to-end solutions—from perception algorithms and novel hardware to grower-centered interfaces. Our deployments span orchards, vineyards, high tunnels, and controlled-environment agriculture.',
      image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=1100&q=80'
    },

    research_areas: [
      {
        id: 1,
        title: 'Field Robotics',
        description: 'Legged and wheeled platforms capable of operating in challenging terrain while performing inspection, thinning, and harvesting tasks.',
        icon: '🤖',
        image: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=420&q=80'
      },
      {
        id: 2,
        title: 'Perception & AI',
        description: 'Multispectral imaging, deep learning, and self-supervised models that understand plant development and stress in real time.',
        icon: '🧠',
        image: 'https://images.unsplash.com/photo-1516117172878-fd2c41f4a759?auto=format&fit=crop&w=420&q=80'
      },
      {
        id: 3,
        title: 'Connected Sensing',
        description: 'Low-power sensor constellations and analytics dashboards that give growers a comprehensive picture of microclimates and soil dynamics.',
        icon: '📡',
        image: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=420&q=80'
      },
      {
        id: 4,
        title: 'Human–Robot Partnership',
        description: 'Interaction design, safety protocols, and training tools that make agricultural automation approachable for diverse crews.',
        icon: '🤝',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=420&q=80'
      }
    ],

    stats: {
      publications: 62,
      projects: 9,
      students: 14,
      years_experience: 7
    },

    featured_projects: [
      {
        id: 1,
        title: 'Sunset Harvester',
        description: 'An autonomous arm-and-gripper system that delicately harvests apples at twilight using adaptive illumination and tactile feedback.',
        image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=520&q=80',
        status: 'Active'
      },
      {
        id: 2,
        title: 'Canopy Insight',
        description: 'A drone + rover collaboration that stitches multispectral data into canopy vigor maps the same day they are collected.',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=520&q=80',
        status: 'Active'
      },
      {
        id: 3,
        title: 'HydraSense',
        description: 'A distributed sensing network that forecasts irrigation needs and nutrient loads for organic vegetable farms.',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=520&q=80',
        status: 'Completed'
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
