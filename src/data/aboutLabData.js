// Static about lab data - replaces database content
export const aboutLabData = {
  labInfo: {
    name: "Majeed Agricultural Robotics Lab",
    established: "2019",
    location: "Engineering Building, Room 405",
    department: "Department of Agricultural Engineering",
    university: "University of Agricultural Sciences",
    address: "123 Agriculture Drive, University Campus, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "majeed.lab@university.edu",
    website: "https://majeedlab.university.edu"
  },
  
  mission: "To advance agricultural robotics and automation technologies through innovative research, fostering sustainable farming practices and ensuring global food security.",
  
  vision: "To be a world-leading research laboratory in agricultural robotics, developing cutting-edge technologies that transform farming into a more efficient, sustainable, and intelligent industry.",
  
  description: "The Majeed Agricultural Robotics Lab is a state-of-the-art research facility dedicated to developing intelligent robotic systems for agriculture. Our research spans multiple domains including computer vision, machine learning, IoT sensors, and autonomous navigation. We collaborate with industry partners, government agencies, and international research institutions to bring our innovations from the laboratory to the field.",
  
  researchFocus: [
    "Autonomous agricultural robots for field operations",
    "Computer vision systems for crop monitoring and disease detection",
    "IoT sensor networks for precision agriculture",
    "Machine learning algorithms for yield prediction and optimization",
    "Robotic systems for sustainable farming practices",
    "Human-robot collaboration in agricultural settings"
  ],
  
  facilities: [
    {
      id: 1,
      name: "Robotics Testing Lab",
      description: "Large indoor space for testing robotic systems, equipped with artificial soil beds and controlled environmental conditions.",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
    },
    {
      id: 2,
      name: "Computer Vision Lab",
      description: "High-performance computing facility with multiple workstations for image processing and machine learning research.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop"
    },
    {
      id: 3,
      name: "Sensor Testing Facility",
      description: "Controlled environment for testing various agricultural sensors including soil moisture, temperature, and crop health sensors.",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop"
    },
    {
      id: 4,
      name: "Field Testing Area",
      description: "Outdoor testing facility with real agricultural plots for field trials of robotic systems and sensors.",
      image: "https://images.unsplash.com/photo-1500382017468-9049fed747aa?w=600&h=400&fit=crop"
    }
  ],
  
  equipment: [
    {
      id: 1,
      name: "Autonomous Mobile Robots",
      description: "Multiple robotic platforms for field testing and research",
      quantity: "5 units"
    },
    {
      id: 2,
      name: "High-Resolution Cameras",
      description: "RGB, thermal, and multispectral cameras for crop monitoring",
      quantity: "12 units"
    },
    {
      id: 3,
      name: "IoT Sensor Arrays",
      description: "Soil moisture, temperature, humidity, and light sensors",
      quantity: "50+ sensors"
    },
    {
      id: 4,
      name: "Computing Infrastructure",
      description: "High-performance workstations and servers for data processing",
      quantity: "8 workstations"
    },
    {
      id: 5,
      name: "3D Printers",
      description: "For rapid prototyping of robotic components and sensors",
      quantity: "3 units"
    }
  ],
  
  achievements: [
    {
      id: 1,
      title: "NSF Grant Award",
      description: "Received $500,000 NSF grant for agricultural robotics research",
      year: "2024"
    },
    {
      id: 2,
      title: "Best Paper Award",
      description: "IEEE ICRA 2023 Best Paper Award for agricultural robotics research",
      year: "2023"
    },
    {
      id: 3,
      title: "Industry Partnership",
      description: "Established partnerships with 5 major agricultural technology companies",
      year: "2023"
    },
    {
      id: 4,
      title: "Student Recognition",
      description: "3 graduate students received prestigious research fellowships",
      year: "2023"
    }
  ],
  
  partnerships: [
    {
      id: 1,
      name: "Department of Agriculture",
      description: "Collaboration on smart farming initiatives and field testing",
      logo: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=200&h=100&fit=crop"
    },
    {
      id: 2,
      name: "Agricultural Technology Corp",
      description: "Industry partnership for technology transfer and commercialization",
      logo: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=200&h=100&fit=crop"
    },
    {
      id: 3,
      name: "International Robotics Institute",
      description: "Research collaboration on autonomous navigation systems",
      logo: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=200&h=100&fit=crop"
    }
  ]
};

// Helper functions for about lab data
export const aboutLabHelper = {
  // Get lab information
  getLabInfo: () => aboutLabData.labInfo,
  
  // Get mission and vision
  getMission: () => aboutLabData.mission,
  getVision: () => aboutLabData.vision,
  
  // Get description
  getDescription: () => aboutLabData.description,
  
  // Get research focus areas
  getResearchFocus: () => aboutLabData.researchFocus,
  
  // Get facilities
  getFacilities: () => aboutLabData.facilities,
  
  // Get equipment
  getEquipment: () => aboutLabData.equipment,
  
  // Get achievements
  getAchievements: () => aboutLabData.achievements,
  
  // Get partnerships
  getPartnerships: () => aboutLabData.partnerships
};
