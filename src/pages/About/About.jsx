import React, { useEffect, useState } from 'react';
import './About.css';
import { aboutLabHelper } from '../../data/aboutLabData';
import { homeHelper } from '../../data/homeData';
import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaCalendarAlt, FaBuilding, FaRobot, FaEye, FaBrain, FaSatellite, FaArrowRight } from 'react-icons/fa';

export default function About() {
  const [labInfo, setLabInfo] = useState({});
  // const [mission, setMission] = useState('');
  // const [vision, setVision] = useState('');
  const [description, setDescription] = useState('');
  const [researchAreas, setResearchAreas] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [equipment, setEquipment] = useState([]);
  // const [achievements, setAchievements] = useState([]);
  // const [partnerships, setPartnerships] = useState([]);

  useEffect(() => {
    // Load about lab data
    setLabInfo(aboutLabHelper.getLabInfo());
    // setMission(aboutLabHelper.getMission());
    // setVision(aboutLabHelper.getVision());
    setDescription(aboutLabHelper.getDescription());
    setResearchAreas(homeHelper.getResearchAreas());
    setFacilities(aboutLabHelper.getFacilities());
    setEquipment(aboutLabHelper.getEquipment());
    // setAchievements(aboutLabHelper.getAchievements());
    // setPartnerships(aboutLabHelper.getPartnerships());
  }, []);

  const getResearchIcon = (title) => {
    const iconMap = {
      'Embodied AI and Autonomous Robotic Systems': <FaRobot />,
      'Robotic Perception and Multimodal Sensing': <FaEye />,
      'Learning-Based Manipulation and Decision Making': <FaBrain />,
      'AI-Driven Agricultural Systems and Digital Twins': <FaSatellite />
    }
    return iconMap[title] || <FaRobot />
  }

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

      {/* Mission & Vision Section - Commented out */}
      {/* <section className="mission-vision-section">
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
      </section> */}

      {/* About Description Section */}
      <section className="about-description-section">
        <div className="container">
          <h2 className="section-title">About Our Laboratory</h2>
          <p className="about-description">{description}</p>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="research-areas">
        <div className="container">
          <h2 className="section-title">Our Research Areas</h2>
          <p className="section-subtitle">We focus on cutting-edge technologies that transform agriculture</p>
          <div className="research-grid">
            {researchAreas.map((area) => (
              <div key={area.id} className="research-card">
                <div className="research-icon">{getResearchIcon(area.title)}</div>
                <h3 className="research-title">{area.title}</h3>
                <p className="research-description">{area.description}</p>
                <div className="research-image">
                  <img src={area.image} alt={area.title} />
                </div>
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

      {/* Achievements Section - Commented out */}
      {/* <section className="achievements-section">
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
      </section> */}

      {/* Partnerships Section - Commented out */}
      {/* <section className="partnerships-section">
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
      </section> */}

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
            <h2 className="cta-title">Join Our Research Team</h2>
            <p className="cta-description">
              We are looking for innovators who want to make an impact in agricultural robotics—from perception researchers and hardware designers to agronomists and UX strategists.
            </p>
            <div className="cta-buttons">
              <Link to="/students" className="cta-button primary">Meet Our Team</Link>
              <Link to="/prospective-students" className="cta-button secondary">Prospective Students</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
