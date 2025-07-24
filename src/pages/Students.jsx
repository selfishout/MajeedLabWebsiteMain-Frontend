import React, { useEffect, useState } from 'react';
import './Students.css';
import { fetchStudentsData } from '../services/api';
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';

const sampleStudents = [
  {
    name: 'Alice Johnson',
    bio: 'PhD student researching agricultural robotics and AI. Loves field robotics and open-source software.',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    cv: '#',
    github: 'https://github.com/alicejohnson',
    linkedin: 'https://linkedin.com/in/alicejohnson',
  },
  {
    name: 'Bob Smith',
    bio: 'Master’s student focused on computer vision for crop monitoring. Enjoys hackathons and teaching.',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    cv: '#',
    github: 'https://github.com/bobsmith',
    linkedin: 'https://linkedin.com/in/bobsmith',
  },
  {
    name: 'Carol Lee',
    bio: 'Undergraduate working on sensor networks for smart farming. Passionate about STEM outreach.',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    cv: '#',
    github: 'https://github.com/carollee',
    linkedin: 'https://linkedin.com/in/carollee',
  },
];

export default function Students() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStudentsData()
      .then(res => {
        setMembers(res.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Split members by role
  const professor = members.find(m => m.role === 'Professor');
  const students = members.filter(m => m.role === 'Student');

  return (
    <div className="students-page">
      <h1 className="students-title">Our Team</h1>
      {/* Professor section */}
      {professor && (
        <div className="professor-section">
          <img src={professor.image} alt={professor.name} className="professor-image" />
          <div className="professor-info">
            <h2 className="professor-name">{professor.name}</h2>
            <h3 className="professor-title">{professor.designation || 'Principal Professor'}</h3>
            {professor.research_interests && (
              <p className="professor-research"><strong>Research Interests:</strong> {professor.research_interests}</p>
            )}
            {professor.start_date && (
              <p className="professor-dates"><strong>Start Date:</strong> {professor.start_date}</p>
            )}
            {professor.end_date && (
              <p className="professor-dates"><strong>End Date:</strong> {professor.end_date}</p>
            )}
            {professor.bio && (
              <p className="professor-bio">{professor.bio}</p>
            )}
            <div className="professor-links">
              <a href={`mailto:${professor.email}`}>Email</a>
              {professor.cv && <a href={professor.cv} target="_blank" rel="noopener noreferrer">CV</a>}
              {professor.github && <a href={professor.github} target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub size={20} className="inline text-gray-700 hover:text-black" /></a>}
              {professor.linkedin && <a href={professor.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={20} className="inline text-blue-700 hover:text-blue-900" /></a>}
              {professor.website && <a href={professor.website} target="_blank" rel="noopener noreferrer" title="Website"><FaGlobe size={20} className="inline text-green-700 hover:text-green-900" /></a>}
              {professor.google_scholar && <a href={professor.google_scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar"><SiGooglescholar size={20} className="inline text-indigo-700 hover:text-indigo-900" /></a>}
            </div>
          </div>
        </div>
      )}
      <h2 className="students-section-title">Team Members</h2>
      {loading ? (
        <div style={{textAlign: 'center', margin: '2rem'}}>Loading team…</div>
      ) : (
        <div className="students-list">
          {(students.length === 0 ? sampleStudents : students).map((stu, idx) => (
            <div className="student-card" key={stu.id || idx}>
              <img src={stu.image} alt={stu.name} className="student-image" />
              <h3 className="student-name">{stu.name}</h3>
              <p className="student-bio">{stu.bio}</p>
              <div className="student-links">
                {stu.cv && <a href={stu.cv} target="_blank" rel="noopener noreferrer">CV</a>}
                {stu.github && <a href={stu.github} target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub size={20} className="inline text-gray-700 hover:text-black" /></a>}
                {stu.linkedin && <a href={stu.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={20} className="inline text-blue-700 hover:text-blue-900" /></a>}
                {stu.website && <a href={stu.website} target="_blank" rel="noopener noreferrer" title="Website"><FaGlobe size={20} className="inline text-green-700 hover:text-green-900" /></a>}
                {stu.google_scholar && <a href={stu.google_scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar"><SiGooglescholar size={20} className="inline text-indigo-700 hover:text-indigo-900" /></a>}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 