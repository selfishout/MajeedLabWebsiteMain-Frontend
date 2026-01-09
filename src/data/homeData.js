// Static home page data - replaces database content
export const homeData = {
  banner: {
    title: 'Intelligent Automation for Specialty Crops',
    subtitle: 'Field-ready robots and sensing systems for resilient agriculture',
    description: 'Our lab deploys autonomous platforms that help growers monitor, harvest, and care for high-value crops with precision and care.',
    image: 'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80',
    button_text: 'Discover Our Work',
    button_link: '/publications'
  },

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
        title: 'Embodied AI and Autonomous Robotic Systems',
        description: 'Development of intelligent robotic platforms that tightly integrate perception, learning, and control for autonomous operation in complex, unstructured environments such as agriculture and controlled-environment systems.',
        icon: '🤖',
        image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&w=1200&q=90'
      },
      {
        id: 2,
        title: 'Robotic Perception and Multimodal Sensing',
        description: 'Research on visual, depth, tactile, and spectral sensing (RGB, LiDAR, multispectral/hyperspectral) and sensor fusion to enable robust scene understanding, plant perception, and interaction-aware robotics.',
        icon: '🧠',
        image: 'https://images.unsplash.com/photo-1555255707-c07966088b7b?auto=format&fit=crop&w=1200&q=90'
      },
      {
        id: 3,
        title: 'Learning-Based Manipulation and Decision Making',
        description: 'Design of supervised, self-supervised, and reinforcement learning methods for robotic manipulation, harvesting, navigation, and adaptive decision-making under uncertainty and resource constraints.',
        icon: '📡',
        image: 'https://images.unsplash.com/photo-1555252333-9f8e92e65df9?auto=format&fit=crop&w=1200&q=90'
      },
      {
        id: 4,
        title: 'AI-Driven Agricultural Systems and Digital Twins',
        description: 'Application of AI, robotics, and digital twins to optimize crop growth, resource use, and sustainability in controlled and field agriculture, bridging plant science, engineering, and data-driven production systems.',
        icon: '🤝',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=90'
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
  // Get banner
  getBanner: () => homeData.banner,
  
  // Get welcome section
  getWelcomeSection: () => homeData.content.welcome_section,
  
  // Get research areas
  getResearchAreas: () => homeData.content.research_areas,
  
  // Get stats
  getStats: () => homeData.content.stats,
  
  // Get featured projects
  getFeaturedProjects: () => homeData.content.featured_projects
};
