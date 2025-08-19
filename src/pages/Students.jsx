import React, { useEffect, useState } from 'react';
import './Students.css';
import { teamData, teamStorage } from '../data/teamData';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

export default function Students() {
  const [team, setTeam] = useState(teamData);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load data from localStorage (or use default if none exists)
    const storedData = teamStorage.getAll();
    setTeam(storedData);
  }, []);

  // Get professor and students from team data
  const professor = team.professor;
  const students = team.students;

  const getImageUrl = (member) => {
    // Use the image from data, or fallback to randomuser.me
    if (member.image && member.image !== '#') {
      return member.image;
    }
    // Fallback images based on name
    if (member.name && member.name.toLowerCase().includes('ali')) {
      return 'https://randomuser.me/api/portraits/men/32.jpg';
    } else if (member.name && member.name.toLowerCase().includes('sanjog')) {
      return 'https://randomuser.me/api/portraits/men/44.jpg';
    } else if (member.name && member.name.toLowerCase().includes('mahbubur')) {
      return 'https://randomuser.me/api/portraits/men/67.jpg';
    } else if (member.name && member.name.toLowerCase().includes('yaqoob')) {
      return 'https://randomuser.me/api/portraits/men/75.jpg';
    }
    return 'https://randomuser.me/api/portraits/men/32.jpg';
  };

  return (
    <div className="students-page">
      <h1 className="students-title">Our Team</h1>
      
      {/* Professor section */}
      {professor && (
        <div className="professor-section">
          <img src={getImageUrl(professor)} alt={professor.name} className="professor-image" />
          <div className="professor-info">
            <h2 className="professor-name">{professor.name}</h2>
            <h3 className="professor-title">{professor.designation}</h3>
            {professor.affiliation && (
              <p className="professor-affiliation"><strong>Affiliation:</strong> {professor.affiliation}</p>
            )}
            {professor.bio && (
              <p className="professor-bio">{professor.bio}</p>
            )}
            <div className="professor-links">
              <a href={`mailto:${professor.email}`} className="email-link">Email</a>
              
              {/* Social Media Links */}
              {professor.social?.github && (
                <a href={professor.social.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                  <FaGithub size={20} className="social-icon github" />
                </a>
              )}
              {professor.social?.linkedin && (
                <a href={professor.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                  <FaLinkedin size={20} className="social-icon linkedin" />
                </a>
              )}
              {professor.social?.website && (
                <a href={professor.social.website} target="_blank" rel="noopener noreferrer" title="Website">
                  <FaGlobe size={20} className="social-icon website" />
                </a>
              )}
              {professor.social?.google_scholar && (
                <a href={professor.social.google_scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar">
                  <SiGooglescholar size={20} className="social-icon scholar" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <h2 className="students-section-title">Team Members</h2>
      
      {loading ? (
        <div style={{textAlign: 'center', margin: '2rem'}}>Loading team…</div>
      ) : (
        <div className="students-list">
          {students.map((student) => (
            <div className="student-card" key={student.id}>
              <img src={getImageUrl(student)} alt={student.name} className="student-image" />
              <h3 className="student-name">{student.name}</h3>
              <p className="student-designation">{student.designation}</p>
              {student.research_interests && (
                <p className="student-research"><strong>Research:</strong> {student.research_interests}</p>
              )}
              <p className="student-bio">{student.bio}</p>
              
              <div className="student-links">
                <a href={`mailto:${student.email}`} className="email-link">Email</a>
                
                {/* Social Media Links */}
                {student.social?.github && (
                  <a href={student.social.github} target="_blank" rel="noopener noreferrer" title="GitHub">
                    <FaGithub size={18} className="social-icon github" />
                  </a>
                )}
                {student.social?.linkedin && (
                  <a href={student.social.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn">
                    <FaLinkedin size={18} className="social-icon linkedin" />
                  </a>
                )}
                {student.social?.website && (
                  <a href={student.social.website} target="_blank" rel="noopener noreferrer" title="Website">
                    <FaGlobe size={18} className="social-icon website" />
                  </a>
                )}
                {student.social?.google_scholar && (
                  <a href={student.social.google_scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar">
                    <SiGooglescholar size={18} className="social-icon scholar" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 