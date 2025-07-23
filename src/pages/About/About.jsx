import './About.css'
import React, { useEffect, useState } from 'react'
import { fetchAboutLab } from  '../../services/api'

const DEFAULT_DATA = {
  title: 'About Our Lab',
  overview: 'The Majeed Lab is dedicated to advancing research in robotics, artificial intelligence, and agricultural technology. Our mission is to develop innovative solutions that address real-world challenges in sustainable agriculture and smart systems.',
  research_areas: 'Agricultural Robotics, Computer Vision & AI, Smart Sensing',
  projects: 'AgriBot: Autonomous robot for precision agriculture, CropVision: Computer vision for crop disease detection, SmartGreenhouse: IoT-enabled greenhouse management',
  facilities: 'Robotics workshop with 3D printers, High-performance computing cluster, Experimental greenhouse and test fields',
  collaborations: 'Collaborations with leading universities and industry partners. Supported by national science foundations and agricultural agencies.',
  contact_info: '123 Science Drive, University Campus, City, Country\nEmail: majeedlab@university.edu',
  main_image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
  project_image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80',
};

function About() {
    const [aboutData, setAboutData] = useState(null)

    useEffect(() =>{
        fetchAboutLab().then(res => {
            setAboutData(res.data)
        }).catch(() => {
            setAboutData(DEFAULT_DATA)
        })
    }, [])

    if (!aboutData) return <div className="about-container"><p>Loading...</p></div>

    return (
      <div className="about-container about-lab-public">
        <h1 className="about-lab-title">{aboutData.title || 'About Lab'}</h1>
        {aboutData.main_image && (
          <img src={aboutData.main_image} alt="Lab" className="about-main-image styled-image" />
        )}
        <section className="about-section">
          <h2>Overview</h2>
          <p>{aboutData.overview}</p>
        </section>
        <hr className="about-divider" />
        <section className="about-section">
          <h2>Research Areas</h2>
          <ul>
            {(aboutData.research_areas || '').split(/\n|,/).map((area, i) => area.trim() && <li key={i}>{area}</li>)}
          </ul>
        </section>
        <hr className="about-divider" />
        <section className="about-section">
          <h2>Current Projects</h2>
          {aboutData.project_image && (
            <img src={aboutData.project_image} alt="Project" className="about-project-image styled-image" />
          )}
          <ul>
            {(aboutData.projects || '').split(/\n|,/).map((proj, i) => proj.trim() && <li key={i}>{proj}</li>)}
          </ul>
        </section>
        {aboutData.facilities && (
          <>
            <hr className="about-divider" />
            <section className="about-section">
              <h2>Lab Facilities</h2>
              <p>{aboutData.facilities}</p>
            </section>
          </>
        )}
        {aboutData.collaborations && (
          <>
            <hr className="about-divider" />
            <section className="about-section">
              <h2>Collaborations & Funding</h2>
              <p>{aboutData.collaborations}</p>
            </section>
          </>
        )}
        <hr className="about-divider" />
        <section className="about-section">
          <h2>Contact & Location</h2>
          <p style={{whiteSpace: 'pre-line'}}>{aboutData.contact_info}</p>
        </section>
      </div>
    )
}

export default About
