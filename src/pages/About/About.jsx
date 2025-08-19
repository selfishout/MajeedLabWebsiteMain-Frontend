import React, { useEffect, useState } from 'react';
import './About.css';
import { aboutLabData, aboutLabHelper } from '../../data/aboutLabData';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaGlobe, FaCalendarAlt, FaBuilding, FaAward, FaHandshake } from 'react-icons/fa';

export default function About() {
  const [labInfo, setLabInfo] = useState({});
  const [mission, setMission] = useState('');
  const [vision, setVision] = useState('');
  const [description, setDescription] = useState('');
  const [researchFocus, setResearchFocus] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [partnerships, setPartnerships] = useState([]);

  useEffect(() => {
    // Load about lab data
    setLabInfo(aboutLabHelper.getLabInfo());
    setMission(aboutLabHelper.getMission());
    setVision(aboutLabHelper.getVision());
    setDescription(aboutLabHelper.getDescription());
    setResearchFocus(aboutLabHelper.getResearchFocus());
    setFacilities(aboutLabHelper.getFacilities());
    setEquipment(aboutLabHelper.getEquipment());
    setAchievements(aboutLabHelper.getAchievements());
    setPartnerships(aboutLabHelper.getPartnerships());
  }, []);

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">{labInfo.name}</h1>
            <p className="hero-subtitle">
              Pioneering the Future of Agricultural Robotics and Smart Farming
            </p>
            <div className="hero-meta">
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>Established {labInfo.established}</span>
              </div>
              <div className="meta-item">
                <FaBuilding className="meta-icon" />
                <span>{labInfo.department}</span>
              </div>
              <div className="meta-item">
                <FaMapMarkerAlt className="meta-icon" />
                <span>{labInfo.location}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="mission-vision-section">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <h2 className="section-title">Our Mission</h2>
              <p className="mission-text">{mission}</p>
            </div>
            <div className="vision-card">
              <h2 className="section-title">Our Vision</h2>
              <p className="vision-text">{vision}</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Description Section */}
      <section className="about-description-section">
        <div className="container">
          <h2 className="section-title">About Our Laboratory</h2>
          <p className="about-description">{description}</p>
        </div>
      </section>

      {/* Research Focus Section */}
      <section className="research-focus-section">
        <div className="container">
          <h2 className="section-title">Research Focus Areas</h2>
          <div className="research-focus-grid">
            {researchFocus.map((focus, index) => (
              <div key={index} className="focus-item">
                <div className="focus-icon">🔬</div>
                <p className="focus-text">{focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section */}
      <section className="facilities-section">
        <div className="container">
          <h2 className="section-title">Our Facilities</h2>
          <div className="facilities-grid">
            {facilities.map((facility) => (
              <div key={facility.id} className="facility-card">
                <div className="facility-image">
                  <img src={facility.image} alt={facility.name} />
                </div>
                <div className="facility-content">
                  <h3 className="facility-title">{facility.name}</h3>
                  <p className="facility-description">{facility.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment Section */}
      <section className="equipment-section">
        <div className="container">
          <h2 className="section-title">Laboratory Equipment</h2>
          <div className="equipment-grid">
            {equipment.map((item) => (
              <div key={item.id} className="equipment-item">
                <h4 className="equipment-name">{item.name}</h4>
                <p className="equipment-description">{item.description}</p>
                <span className="equipment-quantity">{item.quantity}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="achievements-section">
        <div className="container">
          <h2 className="section-title">Recent Achievements</h2>
          <div className="achievements-grid">
            {achievements.map((achievement) => (
              <div key={achievement.id} className="achievement-card">
                <div className="achievement-icon">
                  <FaAward />
                </div>
                <div className="achievement-content">
                  <h3 className="achievement-title">{achievement.title}</h3>
                  <p className="achievement-description">{achievement.description}</p>
                  <span className="achievement-year">{achievement.year}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnerships Section */}
      <section className="partnerships-section">
        <div className="container">
          <h2 className="section-title">Our Partnerships</h2>
          <div className="partnerships-grid">
            {partnerships.map((partnership) => (
              <div key={partnership.id} className="partnership-card">
                <div className="partnership-logo">
                  <img src={partnership.logo} alt={partnership.name} />
                </div>
                <div className="partnership-content">
                  <h3 className="partnership-name">{partnership.name}</h3>
                  <p className="partnership-description">{partnership.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-section">
        <div className="container">
          <h2 className="section-title">Contact Information</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <div className="contact-item">
                <FaMapMarkerAlt className="contact-icon" />
                <div>
                  <h4>Address</h4>
                  <p>{labInfo.address}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaPhone className="contact-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>{labInfo.phone}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaEnvelope className="contact-icon" />
                <div>
                  <h4>Email</h4>
                  <p>{labInfo.email}</p>
                </div>
              </div>
              <div className="contact-item">
                <FaGlobe className="contact-icon" />
                <div>
                  <h4>Website</h4>
                  <a href={labInfo.website} target="_blank" rel="noopener noreferrer">
                    {labInfo.website}
                  </a>
                </div>
              </div>
            </div>
            <div className="contact-map">
              <div className="map-placeholder">
                <FaMapMarkerAlt className="map-icon" />
                <p>Interactive Map Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Interested in Our Research?</h2>
            <p className="cta-description">
              We welcome collaborations, student applications, and research partnerships. 
              Get in touch to learn more about our work and opportunities.
            </p>
            <div className="cta-buttons">
              <a href={`mailto:${labInfo.email}`} className="cta-button primary">
                Contact Us
              </a>
              <a href="/students" className="cta-button secondary">
                Join Our Team
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
