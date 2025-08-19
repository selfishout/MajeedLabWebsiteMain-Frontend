// Static team data - replaces database
export const teamData = {
  professor: {
    id: 1,
    name: "Dr. Yaqoob Majeed",
    designation: "Principal Professor",
    bio: "Principal Professor at Majeed Agricultural Robotics Lab. Leading research in agricultural robotics, computer vision, and AI applications in farming.",
    short_bio: "Principal Professor specializing in agricultural robotics and AI.",
    email: "yaqoob.majeed@university.edu",
    affiliation: "Majeed Agricultural Robotics Lab",
    image: "https://randomuser.me/api/portraits/men/75.jpg", // Fallback image
    social: {
      github: "https://github.com/yaqoobmajeed",
      linkedin: "https://linkedin.com/in/yaqoobmajeed",
      website: "https://yaqoobmajeed.com",
      google_scholar: "https://scholar.google.com/citations?user=yaqoobmajeed"
    }
  },
  students: [
    {
      id: 1,
      name: "Ali Torabi",
      role: "Student",
      email: "ali.torabi@university.edu",
      designation: "PhD Student",
      research_interests: "Agricultural robotics, computer vision, field robotics",
      bio: "PhD student researching agricultural robotics and computer vision applications in farming.",
      is_active: true,
      start_date: "2023-09-01",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      cv: "#", // Placeholder for CV
      social: {
        github: "https://github.com/alitorabi",
        linkedin: "https://linkedin.com/in/alitorabi",
        website: "https://alitorabi.dev",
        google_scholar: "https://scholar.google.com/citations?user=alitorabi"
      }
    },
    {
      id: 2,
      name: "Sanjog Gaihre",
      role: "Student",
      email: "sanjog.gaihre@university.edu",
      designation: "Master's Student",
      research_interests: "Smart farming, sensor networks, IoT",
      bio: "Master's student working on smart farming technologies and IoT sensor networks.",
      is_active: true,
      start_date: "2024-01-15",
      image: "https://randomuser.me/api/portraits/men/44.jpg",
      cv: "#",
      social: {
        github: "https://github.com/sanjoggaihre",
        linkedin: "https://linkedin.com/in/sanjoggaihre",
        website: "https://sanjoggaihre.com",
        google_scholar: "https://scholar.google.com/citations?user=sanjoggaihre"
      }
    },
    {
      id: 3,
      name: "MD. Mahbubur Rahman",
      role: "Student",
      email: "mahbubur.rahman@university.edu",
      designation: "PhD Student",
      research_interests: "AI in agriculture, machine learning, crop monitoring",
      bio: "PhD student focusing on AI and machine learning applications in agricultural crop monitoring.",
      is_active: true,
      start_date: "2023-08-01",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      cv: "#",
      social: {
        github: "https://github.com/mahbuburrahman",
        linkedin: "https://linkedin.com/in/mahbuburrahman",
        website: "https://mahbuburrahman.com",
        google_scholar: "https://scholar.google.com/citations?user=mahbuburrahman"
      }
    }
  ]
};

// Helper functions for CRUD operations using localStorage
export const teamStorage = {
  // Get all team data
  getAll: () => {
    const stored = localStorage.getItem('majeedLabTeam');
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default data
    localStorage.setItem('majeedLabTeam', JSON.stringify(teamData));
    return teamData;
  },

  // Save all team data
  saveAll: (data) => {
    localStorage.setItem('majeedLabTeam', JSON.stringify(data));
  },

  // Add new team member
  addMember: (member) => {
    const data = teamStorage.getAll();
    const newId = Math.max(...data.students.map(s => s.id), data.professor.id) + 1;
    member.id = newId;
    
    if (member.role === 'Professor') {
      data.professor = member;
    } else {
      data.students.push(member);
    }
    
    teamStorage.saveAll(data);
    return member;
  },

  // Update team member
  updateMember: (id, updates) => {
    const data = teamStorage.getAll();
    
    if (data.professor.id === id) {
      data.professor = { ...data.professor, ...updates };
    } else {
      const studentIndex = data.students.findIndex(s => s.id === id);
      if (studentIndex !== -1) {
        data.students[studentIndex] = { ...data.students[studentIndex], ...updates };
      }
    }
    
    teamStorage.saveAll(data);
  },

  // Delete team member
  deleteMember: (id) => {
    const data = teamStorage.getAll();
    
    if (data.professor.id === id) {
      // Don't allow deleting professor
      return false;
    } else {
      data.students = data.students.filter(s => s.id !== id);
    }
    
    teamStorage.saveAll(data);
    return true;
  }
};
