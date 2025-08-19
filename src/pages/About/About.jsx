import './About.css'
import React, { useEffect, useState } from 'react'
import { fetchAboutLab, fetchLabImageUrl } from  '../../services/api'

function About() {
    const [aboutData, setAboutData] = useState(null)

    useEffect(() =>{
        fetchAboutLab().then(res => {
            setAboutData(res.data)
        }).catch(() => {
            setAboutData({ sections: [] })
        })
    }, [])

    if (!aboutData) return <div className="about-container"><p>Loading...</p></div>

    return (
      <div className="about-container about-lab-public">
        <h1 className="about-lab-title">{aboutData.title || 'About Lab'}</h1>
        {aboutData.sections && aboutData.sections.map((section, i) => (
          <div
            key={i}
            className={`about-section-card mb-12 flex flex-col md:flex-row ${i % 2 === 1 ? 'md:flex-row-reverse' : ''} fade-in`}
            // data-aos="fade-up" // Uncomment if using AOS
          >
            <div className="about-section-content md:w-1/2 p-4 flex flex-col justify-center">
              <h2 className="text-2xl font-bold mb-2 text-primary">{section.title}</h2>
              <p className="mb-4 text-lg text-gray-700">{section.description}</p>
              {section.subsections && section.subsections.length > 0 && (
                <div className="about-subsections mt-4">
                  {section.subsections.map((sub, k) => (
                    <div key={k} className="about-subsection-card mb-4 p-3 rounded-lg bg-gray-50 shadow-sm fade-in">
                      <h3 className="text-lg font-semibold text-secondary mb-1">{sub.title}</h3>
                      <p className="mb-2 text-gray-600">{sub.description}</p>
                      {sub.images && sub.images.length > 0 && (
                        <div className="about-subsection-images flex flex-wrap gap-2">
                          {sub.images.map((img, l) => (
                            img.image_lab ? (
                              <img key={l} src={fetchLabImageUrl(img.image_lab.id)} alt="SubSection" className="about-sub-image hover-zoom" />
                            ) : null
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {section.images && section.images.length > 0 && (
              <div className="about-section-images md:w-1/2 flex flex-col items-center justify-center gap-4 p-4">
                {section.images.map((img, j) => (
                  img.image_lab ? (
                    <img key={j} src={fetchLabImageUrl(img.image_lab.id)} alt="Section" className="about-main-image hover-zoom shadow-xl" />
                  ) : null
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    )
}

export default About
