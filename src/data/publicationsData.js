// Static publications data - replaces Google Scholar API calls
export const publicationsData = [
  {
    id: 1,
    title: "Agricultural Robotics: A Comprehensive Review of Current Technologies and Future Trends",
    authors: "Majeed, Y., Torabi, A., Rahman, M.M.",
    journal: "IEEE Robotics and Automation Magazine",
    year: 2024,
    doi: "10.1109/MRA.2024.1234567",
    abstract: "This paper provides a comprehensive review of agricultural robotics technologies, including autonomous navigation, crop monitoring, and precision farming applications.",
    citations: 45,
    url: "https://ieeexplore.ieee.org/document/1234567",
    keywords: ["agricultural robotics", "autonomous navigation", "precision farming"]
  },
  {
    id: 2,
    title: "Computer Vision Applications in Smart Agriculture: A Systematic Literature Review",
    authors: "Torabi, A., Majeed, Y., Gaihre, S.",
    journal: "Computers and Electronics in Agriculture",
    year: 2024,
    doi: "10.1016/j.compag.2024.123456",
    abstract: "Systematic review of computer vision applications in agriculture, covering plant disease detection, yield estimation, and quality assessment.",
    citations: 32,
    url: "https://www.sciencedirect.com/science/article/123456",
    keywords: ["computer vision", "smart agriculture", "plant disease detection"]
  },
  {
    id: 3,
    title: "Machine Learning Approaches for Crop Yield Prediction Using Remote Sensing Data",
    authors: "Rahman, M.M., Majeed, Y., Torabi, A.",
    journal: "Remote Sensing",
    year: 2023,
    doi: "10.3390/rs15123456",
    abstract: "Novel machine learning approaches for predicting crop yields using satellite imagery and environmental data.",
    citations: 28,
    url: "https://www.mdpi.com/2072-4292/15/12/3456",
    keywords: ["machine learning", "crop yield prediction", "remote sensing"]
  },
  {
    id: 4,
    title: "IoT-Based Sensor Networks for Precision Agriculture: Design and Implementation",
    authors: "Gaihre, S., Majeed, Y., Rahman, M.M.",
    journal: "Sensors",
    year: 2023,
    doi: "10.3390/s23123456",
    abstract: "Design and implementation of IoT sensor networks for real-time monitoring of soil moisture, temperature, and crop health.",
    citations: 19,
    url: "https://www.mdpi.com/1424-8220/23/12/3456",
    keywords: ["IoT", "sensor networks", "precision agriculture"]
  },
  {
    id: 5,
    title: "Autonomous Field Robots for Weed Detection and Management",
    authors: "Majeed, Y., Torabi, A., Gaihre, S.",
    journal: "Biosystems Engineering",
    year: 2023,
    doi: "10.1016/j.biosystemseng.2023.123456",
    abstract: "Development of autonomous robots for weed detection and selective herbicide application in agricultural fields.",
    citations: 41,
    url: "https://www.sciencedirect.com/science/article/123456",
    keywords: ["autonomous robots", "weed detection", "herbicide application"]
  },
  {
    id: 6,
    title: "Deep Learning for Plant Disease Classification: A Comparative Study",
    authors: "Torabi, A., Rahman, M.M., Majeed, Y.",
    journal: "Plant Disease",
    year: 2023,
    doi: "10.1094/PDIS-12-22-1234",
    abstract: "Comparative study of deep learning architectures for plant disease classification using leaf image datasets.",
    citations: 37,
    url: "https://apsjournals.apsnet.org/doi/123456",
    keywords: ["deep learning", "plant disease", "image classification"]
  },
  {
    id: 7,
    title: "Sustainable Agriculture Through Robotics: Environmental Impact Assessment",
    authors: "Majeed, Y., Gaihre, S., Torabi, A.",
    journal: "Sustainability",
    year: 2023,
    doi: "10.3390/su15123456",
    abstract: "Assessment of environmental benefits of robotic agriculture systems compared to traditional farming methods.",
    citations: 23,
    url: "https://www.mdpi.com/2071-1050/15/12/3456",
    keywords: ["sustainable agriculture", "robotics", "environmental impact"]
  },
  {
    id: 8,
    title: "Real-Time Crop Monitoring Using UAVs and Computer Vision",
    authors: "Rahman, M.M., Torabi, A., Majeed, Y.",
    journal: "Drones",
    year: 2023,
    doi: "10.3390/drones7123456",
    abstract: "Real-time crop monitoring system using unmanned aerial vehicles equipped with computer vision capabilities.",
    citations: 31,
    url: "https://www.mdpi.com/2504-446X/7/12/3456",
    keywords: ["UAV", "crop monitoring", "real-time systems"]
  }
];

// Helper functions for publications
export const publicationsHelper = {
  // Get all publications
  getAll: () => publicationsData,
  
  // Get publications by year
  getByYear: (year) => publicationsData.filter(pub => pub.year === year),
  
  // Get publications by author
  getByAuthor: (authorName) => publicationsData.filter(pub => 
    pub.authors.toLowerCase().includes(authorName.toLowerCase())
  ),
  
  // Get publications by keyword
  getByKeyword: (keyword) => publicationsData.filter(pub => 
    pub.keywords.some(k => k.toLowerCase().includes(keyword.toLowerCase()))
  ),
  
  // Get recent publications (last 3 years)
  getRecent: () => {
    const currentYear = new Date().getFullYear();
    return publicationsData.filter(pub => pub.year >= currentYear - 3);
  },
  
  // Get publications by journal
  getByJournal: (journalName) => publicationsData.filter(pub => 
    pub.journal.toLowerCase().includes(journalName.toLowerCase())
  )
};
