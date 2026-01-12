// Static about lab data - replaces database content
export const aboutLabData = {
  labInfo: {
    name: 'AgBodied Lab: Perception, Embodied Intelligence, and Robotics for Agriculture',
    established: '2024',
    location: 'Engineering Building 5th Floor, 5019',
    department: 'Department of Computer Science and Electrical Engineering',
    university: 'University of Wyoming',
    address: '1000 E University Ave, Laramie, WY 82071, USA',
    phone: '+1 (307) 766-1234',
    email: 'ymajeed@uwyo.edu',
    website: 'https://www.uwyo.edu/agrobotics'
  },

  mission: 'Design people-centered automation that elevates agricultural productivity, protects natural resources, and keeps growers in the loop.',

  vision: 'Enable every specialty crop grower to deploy adaptive robotics and sensing systems that make farming more resilient, profitable, and sustainable.',

  description: 'The AgBodied Lab: Perception, Embodied Intelligence, and Robotics for Agriculture blends robotics, computer vision, agronomy, and design research. We co-develop technology with growers, ensuring that our autonomous platforms, perception pipelines, and analytics tools solve problems that matter in the field.',

  researchFocus: [
    'Collaborative harvesting and crop care robots for orchards and vineyards',
    'Multispectral perception and machine learning for plant health diagnostics',
    'IoT and digital-twin infrastructure for smart irrigation and fertigation',
    'Human–robot interaction frameworks tailored to diverse farm teams',
    'Sustainability metrics that quantify resource savings from automation'
  ],

  facilities: [
    {
      id: 1,
      name: 'Robotics Fabrication Studio',
      description: 'Rapid prototyping space with CNC machining, additive manufacturing, and electronics benches for building rugged field hardware.',
      image: 'https://images.unsplash.com/photo-1581092795360-469fdbcd8216?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 2,
      name: 'Perception & AI Lab',
      description: 'High-performance GPU clusters and motion capture rigs for training, testing, and benchmarking agricultural perception models.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 3,
      name: 'Controlled Environment Greenhouse',
      description: 'Smart greenhouse outfitted with climate control, robotic gantries, and dense sensing arrays for continuous phenotyping.',
      image: 'https://images.unsplash.com/photo-1524592868574-9d353fe29619?auto=format&fit=crop&w=900&q=80'
    },
    {
      id: 4,
      name: 'Smart Orchard Testbed',
      description: 'Multi-acre outdoor facility integrating LiDAR-instrumented trellises, autonomous vehicles, and grower-grade irrigation systems.',
      image: 'https://images.unsplash.com/photo-1439122957703-7711f1e3f9a4?auto=format&fit=crop&w=900&q=80'
    }
  ],

  equipment: [
    {
      id: 1,
      name: '3D Printer',
      description: 'Advanced 3D printing capabilities enable rapid prototyping and custom fabrication of robotic components, end effectors, and specialized parts for agricultural applications. Our high-precision 3D printers support multiple materials including durable polymers and composites, allowing for iterative design and testing of mechanical systems. This technology accelerates the development cycle of custom robotic solutions tailored to specific agricultural tasks and environments.',
      image: '/images/Equipment/3D-Printer.jpg'
    },
    {
      id: 2,
      name: 'InsightFarm',
      description: 'The InsightFarm system provides comprehensive monitoring and analytics for controlled environment agriculture, integrating advanced sensing technologies with data-driven decision support. This platform enables real-time tracking of environmental parameters, plant growth metrics, and resource utilization across greenhouse and indoor farming facilities. InsightFarm supports precision agriculture through automated data collection, analysis, and actionable insights for optimizing crop production and resource efficiency.',
      image: '/images/Equipment/InsightFarm.jpg'
    },
    {
      id: 3,
      name: 'Robot',
      description: 'Our robotic platforms encompass a diverse range of autonomous systems designed for agricultural operations, including manipulation, navigation, and field tasks. These robots integrate perception, planning, and control systems to perform complex operations in unstructured agricultural environments. The platforms are equipped with advanced sensing capabilities, robust mechanical designs, and intelligent decision-making algorithms to support precision agriculture and sustainable farming practices.',
      image: '/images/Equipment/Robot.jpg'
    }
  ],

  achievements: [
    {
      id: 1,
      title: '2025 NSF Emerging Frontiers Award',
      description: 'Funding to advance collaborative autonomy between robots and orchard crews.',
      year: '2025'
    },
    {
      id: 2,
      title: 'ICRA 2024 Best Field Robotics Demo',
      description: 'Recognized for the Sunset Harvester live demonstration in Yokohama.',
      year: '2024'
    },
    {
      id: 3,
      title: 'Grower Impact Milestone',
      description: 'Partner orchards reported a 22% reduction in fruit bruising using our adaptive gripper.',
      year: '2024'
    },
    {
      id: 4,
      title: 'Student Innovation Fellowships',
      description: 'Four graduate researchers received national fellowships for work in agricultural AI.',
      year: '2023'
    }
  ],

  partnerships: [
    {
      id: 1,
      name: 'Wyoming Producers Council',
      description: 'Guides field deployments and ensures technology outcomes align with regional grower priorities.',
      logo: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 2,
      name: 'Frontier Robotics Cooperative',
      description: 'Industry consortium accelerating commercialization of collaborative agricultural robots.',
      logo: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?auto=format&fit=crop&w=400&q=80'
    },
    {
      id: 3,
      name: 'USDA Agricultural Research Service',
      description: 'Joint projects on data-driven crop protection and resource-efficient irrigation.',
      logo: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=400&q=80'
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
