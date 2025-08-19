// Data Manager for Team Data
// Handles import/export and backup functionality

import { teamStorage } from './teamData';

export const dataManager = {
  // Export current data as JSON file
  exportData: () => {
    const data = teamStorage.getAll();
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `majeed-lab-team-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    
    URL.revokeObjectURL(link.href);
  },

  // Import data from JSON file
  importData: (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target.result);
          
          // Validate data structure
          if (!data.professor || !Array.isArray(data.students)) {
            throw new Error('Invalid data format. Expected professor and students array.');
          }
          
          // Save to localStorage
          teamStorage.saveAll(data);
          resolve(data);
        } catch (error) {
          reject(new Error(`Failed to parse file: ${error.message}`));
        }
      };
      
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsText(file);
    });
  },

  // Reset to default data
  resetToDefault: () => {
    const defaultData = {
      professor: {
        id: 1,
        name: "Dr. Yaqoob Majeed",
        designation: "Principal Professor",
        bio: "Principal Professor at Majeed Agricultural Robotics Lab. Leading research in agricultural robotics, computer vision, and AI applications in farming.",
        short_bio: "Principal Professor specializing in agricultural robotics and AI.",
        email: "yaqoob.majeed@university.edu",
        affiliation: "Majeed Agricultural Robotics Lab",
        image: "https://randomuser.me/api/portraits/men/75.jpg",
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
          cv: "#",
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
    
    teamStorage.saveAll(defaultData);
    return defaultData;
  },

  // Get data statistics
  getStats: () => {
    const data = teamStorage.getAll();
    return {
      totalMembers: 1 + data.students.length,
      professors: 1,
      students: data.students.length,
      activeStudents: data.students.filter(s => s.is_active).length,
      alumniStudents: data.students.filter(s => s.is_alumni).length,
      lastUpdated: new Date().toLocaleString()
    };
  },

  // Backup data to multiple localStorage keys
  createBackup: () => {
    const data = teamStorage.getAll();
    const timestamp = new Date().toISOString();
    const backupKey = `majeedLabTeam_backup_${timestamp}`;
    
    localStorage.setItem(backupKey, JSON.stringify(data));
    
    // Keep only last 5 backups
    const backupKeys = Object.keys(localStorage)
      .filter(key => key.startsWith('majeedLabTeam_backup_'))
      .sort()
      .reverse();
    
    if (backupKeys.length > 5) {
      backupKeys.slice(5).forEach(key => localStorage.removeItem(key));
    }
    
    return backupKey;
  },

  // List available backups
  listBackups: () => {
    return Object.keys(localStorage)
      .filter(key => key.startsWith('majeedLabTeam_backup_'))
      .map(key => ({
        key,
        timestamp: key.replace('majeedLabTeam_backup_', ''),
        date: new Date(key.replace('majeedLabTeam_backup_', '')).toLocaleString()
      }))
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  },

  // Restore from backup
  restoreFromBackup: (backupKey) => {
    const backupData = localStorage.getItem(backupKey);
    if (backupData) {
      const data = JSON.parse(backupData);
      teamStorage.saveAll(data);
      return data;
    }
    throw new Error('Backup not found');
  }
};
