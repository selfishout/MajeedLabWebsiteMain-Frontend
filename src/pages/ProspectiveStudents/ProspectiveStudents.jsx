import React from 'react';
import './ProspectiveStudents.css';
import { FaGraduationCap, FaUserGraduate, FaEnvelope, FaFileAlt, FaCheckCircle } from 'react-icons/fa';

export default function ProspectiveStudents() {
  const contactEmail = 'ymajeed@uwyo.edu';

  return (
    <div className="prospective-students-page">
      <section className="prospective-hero">
        <div className="container">
          <h1 className="page-title">Prospective Students</h1>
          <p className="page-subtitle">
            Join our research team and contribute to cutting-edge agricultural robotics and AI
          </p>
        </div>
      </section>

      <section className="prospective-content">
        <div className="container">
          {/* PhD/MS Students Section */}
          <div className="prospective-section">
            <div className="section-header">
              <FaGraduationCap className="section-icon" />
              <h2 className="section-title">Prospective PhD/MS Students</h2>
            </div>
            <div className="section-content">
              <p className="section-intro">
                We look for students and scholars who have strong interests and backgrounds in robotics, sensing, perception, embodied intelligence, and AI. Self-motivated candidates are particularly welcome. The ability to work collaboratively and interdisciplinary with strong written and communication skills is highly desired. A track record including international conferences and journal publications is a plus. Strong hands-on and/or programming skills are highly preferred.
              </p>
              
              <div className="requirements-box">
                <h3 className="requirements-title">Technical Skills & Platforms</h3>
                <p className="requirements-text">
                  The applicants are expected to be familiar with one or more of the following platforms:
                </p>
                <div className="skills-grid">
                  <div className="skill-item">
                    <FaCheckCircle className="skill-icon" />
                    <span>Python</span>
                  </div>
                  <div className="skill-item">
                    <FaCheckCircle className="skill-icon" />
                    <span>C++</span>
                  </div>
                  <div className="skill-item">
                    <FaCheckCircle className="skill-icon" />
                    <span>PyTorch</span>
                  </div>
                  <div className="skill-item">
                    <FaCheckCircle className="skill-icon" />
                    <span>MATLAB</span>
                  </div>
                  <div className="skill-item">
                    <FaCheckCircle className="skill-icon" />
                    <span>ROS</span>
                  </div>
                  <div className="skill-item">
                    <FaCheckCircle className="skill-icon" />
                    <span>SolidWorks</span>
                  </div>
                </div>
              </div>

              <div className="application-box">
                <h3 className="application-title">How to Apply</h3>
                <p className="application-text">
                  If you are interested in working with us, we encourage you to apply to the <strong>UW EECS PhD or MS programs</strong> and mention <strong>Dr. Majeed</strong> in your statement.
                </p>
                <p className="application-text">
                  Feel free to email <strong>Yaqoob Majeed</strong> ({contactEmail}) with subject <strong>"Prospective Students: Your Name"</strong> and include your:
                </p>
                <ul className="application-list">
                  <li>
                    <FaFileAlt className="list-icon" />
                    <span>CV</span>
                  </li>
                  <li>
                    <FaFileAlt className="list-icon" />
                    <span>Transcripts</span>
                  </li>
                  <li>
                    <FaFileAlt className="list-icon" />
                    <span>Test Scores (IELTS, TOEFL, or GRE) - if available</span>
                  </li>
                </ul>
                <div className="contact-button-container">
                  <a href={`mailto:${contactEmail}?subject=Prospective Students: [Your Name]`} className="contact-button">
                    <FaEnvelope className="button-icon" />
                    Contact Dr. Majeed
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Visiting Students Section */}
          <div className="prospective-section">
            <div className="section-header">
              <FaUserGraduate className="section-icon" />
              <h2 className="section-title">Visiting Students and Scholars</h2>
            </div>
            <div className="section-content">
              <p className="section-intro">
                If you are looking for a visiting scholar position, please contact Dr. Majeed via email ({contactEmail}) with the subject <strong>"Prospective Visiting Students/Scholars: Your Name"</strong> and include the following information:
              </p>
              <ul className="application-list">
                <li>
                  <FaFileAlt className="list-icon" />
                  <span>CV</span>
                </li>
                <li>
                  <FaFileAlt className="list-icon" />
                  <span>Contact information of three references</span>
                </li>
              </ul>
              <div className="note-box">
                <p className="note-text">
                  <strong>Note:</strong> We will reach out if there is a potential fit. Due to the limitation of our lab space, the visiting position may not be always available.
                </p>
              </div>
              <div className="contact-button-container">
                <a href={`mailto:${contactEmail}?subject=Prospective Visiting Students/Scholars: [Your Name]`} className="contact-button">
                  <FaEnvelope className="button-icon" />
                  Contact for Visiting Position
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

