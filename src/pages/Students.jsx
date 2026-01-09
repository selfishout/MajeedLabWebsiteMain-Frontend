import React, { useEffect } from 'react';
import './Students.css';
import { teamData } from '../data/teamData';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

export default function Students() {
  const professor = teamData.professor;
  const students = teamData.students;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getImageUrl = (member) => member.image;

  const getCVLabel = (member) => {
    if (!member.cv) return null;
    return member.cv.toLowerCase().includes('dummy') ? 'Sample CV' : 'Curriculum Vitae';
  };

  const getInitials = (name) => {
    if (!name) return '?';
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const renderAvatar = (member, className) => {
    const imageUrl = getImageUrl(member);
    if (imageUrl) {
      return <img src={imageUrl} alt={member.name} className={className} />;
    }
    return (
      <div className={`${className} avatar-placeholder`}>
        <span className="avatar-initials">{getInitials(member.name)}</span>
      </div>
    );
  };

  // Separate students by degree_type field (defaults to M.S if not specified)
  const phdStudents = students.filter(student => 
    student.degree_type && student.degree_type.toLowerCase() === 'ph.d'
  );

  const mastersStudents = students.filter(student => 
    !student.degree_type || student.degree_type.toLowerCase() !== 'ph.d'
  );

  return (
    <div className="students-page">
      <h1 className="students-title">Our Team</h1>

      {/* Professor section */}
      {professor && (
        <div className="professor-section">
          {renderAvatar(professor, 'professor-image')}
          <div className="professor-info">
            <h2 className="professor-name">{professor.name}</h2>
            <h3 className="professor-title">{professor.designation}</h3>
            {professor.affiliation && (
              <p className="professor-affiliation"><strong>Affiliation:</strong> {professor.affiliation}</p>
            )}
            {professor.research_interests && (
              <p className="professor-affiliation"><strong>Focus:</strong> {professor.research_interests}</p>
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
              {professor.cv && (
                <a href={professor.cv} target="_blank" rel="noopener noreferrer" className="cv-link">
                  {getCVLabel(professor)}
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      <h2 className="students-section-title">Researchers & Students</h2>

      {/* Ph.D. Students Section */}
      {phdStudents.length > 0 && (
        <>
          <h3 className="degree-section-title">Ph.D. Students</h3>
          <div className="students-list">
            {phdStudents.map((student) => (
              <div className="student-card" key={student.id}>
                {renderAvatar(student, 'student-image')}
                <h3 className="student-name">{student.name}</h3>
                <p className="student-designation">{student.designation}</p>
                <p className="student-bio">{student.bio}</p>
                <div className="student-links">
                  {student.email && (
                    <a href={`mailto:${student.email}`} className="email-link">Email</a>
                  )}
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
                  {student.cv && (
                    <a href={student.cv} target="_blank" rel="noopener noreferrer" className="cv-link">
                      {getCVLabel(student)}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Fancy Separator */}
      {phdStudents.length > 0 && mastersStudents.length > 0 && (
        <div className="degree-separator">
          <div className="separator-line"></div>
          <div className="separator-icon">🎓</div>
          <div className="separator-line"></div>
        </div>
      )}

      {/* Masters Students Section */}
      {mastersStudents.length > 0 && (
        <>
          <h3 className="degree-section-title">Master's Students</h3>
          <div className="students-list">
            {mastersStudents.map((student) => (
              <div className="student-card" key={student.id}>
                {renderAvatar(student, 'student-image')}
                <h3 className="student-name">{student.name}</h3>
                <p className="student-designation">{student.designation}</p>
                <p className="student-bio">{student.bio}</p>
                <div className="student-links">
                  {student.email && (
                    <a href={`mailto:${student.email}`} className="email-link">Email</a>
                  )}
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
                  {student.cv && (
                    <a href={student.cv} target="_blank" rel="noopener noreferrer" className="cv-link">
                      {getCVLabel(student)}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </>
      )}

    </div>
  );
} 