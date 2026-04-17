import './Footer.css'
import React from 'react'
import { Link } from 'react-router-dom'
import { siteConfig } from '../../data/siteConfig'

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        {/* Lab Info */}
        <div className="footer-section university-info">
          <p className="footer-heading">{siteConfig.labName}</p>
          <p>{siteConfig.tagline}</p>
          <p><strong>Contact:</strong> <a href={`mailto:${siteConfig.contact.email}`}>{siteConfig.contact.email}</a></p>
          <p><strong>Phone:</strong> {siteConfig.contact.phone}</p>
        </div>

        {/* Quick Links */}
        <div className="footer-section footer-nav">
          <p className="footer-heading">Explore</p>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Lab</Link></li>
            <li><Link to="/publications">Publications</Link></li>
            <li><Link to="/news-events">News & Events</Link></li>
            <li><Link to="/students">Team</Link></li>
          </ul>
        </div>

        {/* University */}
        <div className="footer-section footer-map">
          <p className="footer-heading">{siteConfig.university.name}</p>
          <p>{siteConfig.university.department}</p>
          <p>{siteConfig.university.address}</p>
          <p>
            Website: <a href={siteConfig.university.website} target="_blank" rel="noreferrer">{siteConfig.university.website}</a>
          </p>
          <div className="map-container">
            <iframe
              title="University of Wyoming"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.135598378269!2d-105.58191572333821!3d41.3148430027359!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87685de0b4ca7301%3A0xdddc82c353736f6!2sUniversity%20of%20Wyoming!5e0!3m2!1sen!2sus!4v1731532718000!5m2!1sen!2sus"
              width="100%"
              height="150"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {siteConfig.labName}. Built as a static showcase of our research.</p>
      </div>
    </footer>
  )
}

export default Footer
