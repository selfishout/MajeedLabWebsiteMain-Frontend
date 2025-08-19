import React, { useState, useEffect } from 'react';
import './Home.css';
import { homeData, homeHelper } from '../data/homeData';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaRobot, FaEye, FaSatellite, FaBrain, FaChartLine, FaUsers, FaBookOpen, FaProjectDiagram, FaCalendarAlt } from 'react-icons/fa';

export default function Home() {
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [welcomeSection, setWelcomeSection] = useState({});
  const [researchAreas, setResearchAreas] = useState([]);
  const [stats, setStats] = useState({});
  const [featuredProjects, setFeaturedProjects] = useState([]);

  useEffect(() => {
    // Load home page data
    console.log('Loading home page data...');
    const allBanners = homeHelper.getAllBanners();
    const welcome = homeHelper.getWelcomeSection();
    const research = homeHelper.getResearchAreas();
    const statistics = homeHelper.getStats();
    const projects = homeHelper.getFeaturedProjects();

    console.log('Banners:', allBanners);
    console.log('Welcome:', welcome);
    console.log('Research:', research);
    console.log('Stats:', statistics);
    console.log('Projects:', projects);

    setBanners(allBanners);
    setWelcomeSection(welcome);
    setResearchAreas(research);
    setStats(statistics);
    setFeaturedProjects(projects);
  }, []);

  useEffect(() => {
    // Auto-rotate banners
    const interval = setInterval(() => {
      setCurrentBannerIndex((prevIndex) => 
        prevIndex === banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length]);

  const goToBanner = (index) => {
    setCurrentBannerIndex(index);
  };

  const nextBanner = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === banners.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevBanner = () => {
    setCurrentBannerIndex((prevIndex) => 
      prevIndex === 0 ? banners.length - 1 : prevIndex - 1
    );
  };

  const getResearchIcon = (title) => {
    const iconMap = {
      'Agricultural Robotics': <FaRobot />,
      'Computer Vision': <FaEye />,
      'IoT & Sensors': <FaSatellite />,
      'Machine Learning': <FaBrain />
    };
    return iconMap[title] || <FaRobot />;
  };

  return (
    <div className="home-page">
      {/* Hero Banner Section */}
      <section className="hero-banner">
        {banners.length > 0 && (
          <>
            <div className="banner-container">
              <div className="banner-slide active">
                <div className="banner-image">
                  <img src={banners[currentBannerIndex].image} alt={banners[currentBannerIndex].title} />
                </div>
                <div className="banner-content">
                  <h1 className="banner-title">{banners[currentBannerIndex].title}</h1>
                  <h2 className="banner-subtitle">{banners[currentBannerIndex].subtitle}</h2>
                  <p className="banner-description">{banners[currentBannerIndex].description}</p>
                  <Link to={banners[currentBannerIndex].button_link} className="banner-button">
                    {banners[currentBannerIndex].button_text}
                    <FaArrowRight className="button-icon" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Banner Navigation */}
            <div className="banner-navigation">
              <button className="nav-button prev" onClick={prevBanner}>
                ‹
              </button>
              <div className="banner-dots">
                {banners.map((_, index) => (
                  <button
                    key={index}
                    className={`dot ${index === currentBannerIndex ? 'active' : ''}`}
                    onClick={() => goToBanner(index)}
                  />
                ))}
              </div>
              <button className="nav-button next" onClick={nextBanner}>
                ›
              </button>
            </div>
          </>
        )}
      </section>

      {/* Welcome Section */}
      <section className="welcome-section">
        <div className="container">
          <div className="welcome-content">
            <div className="welcome-text">
              <h2 className="section-title">{welcomeSection.title}</h2>
              <h3 className="section-subtitle">{welcomeSection.subtitle}</h3>
              <p className="section-description">{welcomeSection.description}</p>
              <Link to="/about" className="learn-more-btn">
                Learn More About Our Lab
                <FaArrowRight className="button-icon" />
              </Link>
            </div>
            <div className="welcome-image">
              <img src={welcomeSection.image} alt="Lab Welcome" />
            </div>
          </div>
        </div>
      </section>

      {/* Research Areas Section */}
      <section className="research-areas">
        <div className="container">
          <h2 className="section-title">Our Research Areas</h2>
          <p className="section-subtitle">
            We focus on cutting-edge technologies that transform agriculture
          </p>
          <div className="research-grid">
            {researchAreas.map((area) => (
              <div key={area.id} className="research-card">
                <div className="research-icon">
                  {getResearchIcon(area.title)}
                </div>
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

      {/* Statistics Section */}
      <section className="statistics-section">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">
                <FaBookOpen />
              </div>
              <div className="stat-number">{stats.publications}</div>
              <div className="stat-label">Publications</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaProjectDiagram />
              </div>
              <div className="stat-number">{stats.projects}</div>
              <div className="stat-label">Active Projects</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaUsers />
              </div>
              <div className="stat-number">{stats.students}</div>
              <div className="stat-label">Team Members</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">
                <FaCalendarAlt />
              </div>
              <div className="stat-number">{stats.years_experience}</div>
              <div className="stat-label">Years of Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section className="featured-projects">
        <div className="container">
          <h2 className="section-title">Featured Projects</h2>
          <p className="section-subtitle">
            Discover our latest innovations in agricultural robotics
          </p>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <div key={project.id} className="project-card">
                <div className="project-image">
                  <img src={project.image} alt={project.title} />
                  <div className={`project-status ${project.status.toLowerCase()}`}>
                    {project.status}
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-description">{project.description}</p>
                  <div className="project-meta">
                    <span className="project-status-badge">
                      {project.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="projects-cta">
            <Link to="/publications" className="view-all-projects-btn">
              View All Research Projects
              <FaArrowRight className="button-icon" />
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Our Research Team</h2>
            <p className="cta-description">
              We're always looking for motivated students and researchers to join our team. 
              Explore opportunities in agricultural robotics, computer vision, and smart farming technologies.
            </p>
            <div className="cta-buttons">
              <Link to="/students" className="cta-button primary">
                Meet Our Team
              </Link>
              <Link to="/about" className="cta-button secondary">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
