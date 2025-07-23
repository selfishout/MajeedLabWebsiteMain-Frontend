import React, { useEffect, useState } from 'react'
import { fetchAboutLab, updateAboutLab } from '../../services/api'

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

function DashboardAboutLab() {
  const [about, setAbout] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState(DEFAULT_DATA)
  const [mainImagePreview, setMainImagePreview] = useState(DEFAULT_DATA.main_image)
  const [projectImagePreview, setProjectImagePreview] = useState(DEFAULT_DATA.project_image)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchAboutLab()
      .then(res => {
        setAbout(res.data)
        setForm(res.data)
        setMainImagePreview(res.data.main_image)
        setProjectImagePreview(res.data.project_image)
      })
      .catch(() => {
        setAbout(DEFAULT_DATA)
        setForm(DEFAULT_DATA)
        setMainImagePreview(DEFAULT_DATA.main_image)
        setProjectImagePreview(DEFAULT_DATA.project_image)
      })
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setForm({ ...form, [name]: files[0] })
      const reader = new FileReader()
      reader.onload = (ev) => {
        if (name === 'main_image') setMainImagePreview(ev.target.result)
        if (name === 'project_image') setProjectImagePreview(ev.target.result)
      }
      reader.readAsDataURL(files[0])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) formData.append(key, value)
      })
      await updateAboutLab(formData)
      setIsEditing(false)
      // Refetch updated data
      const res = await fetchAboutLab()
      setAbout(res.data)
      setForm(res.data)
      setMainImagePreview(res.data.main_image)
      setProjectImagePreview(res.data.project_image)
    } catch (err) {
      console.error('Error updating about lab:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!about) return <p className="text-center mt-10">Loading...</p>

  return (
    <div className="p-6 dashboard-about-lab">
      <h1 className="text-2xl font-bold mb-4">About Lab (Admin)</h1>
      <p className="mb-6">Edit the public About Lab section below.</p>
      <hr className="about-divider" />
      {!isEditing ? (
        <div className="bg-white rounded shadow p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">{about.title}</h2>
          {about.main_image && <img src={about.main_image} alt="Lab" className="about-main-image styled-image" />}
          <p className="mb-2"><strong>Overview:</strong> {about.overview}</p>
          <hr className="about-divider" />
          <p className="mb-2"><strong>Research Areas:</strong> {(about.research_areas || '').split(/\n|,/).map((a,i) => a.trim() && <span key={i}>{a}{' '}</span>)}</p>
          <hr className="about-divider" />
          <p className="mb-2"><strong>Projects:</strong> {(about.projects || '').split(/\n|,/).map((p,i) => p.trim() && <span key={i}>{p}{' '}</span>)}</p>
          {about.project_image && <img src={about.project_image} alt="Project" className="about-project-image styled-image" />}
          <hr className="about-divider" />
          {about.facilities && <p className="mb-2"><strong>Facilities:</strong> {about.facilities}</p>}
          <hr className="about-divider" />
          {about.collaborations && <p className="mb-2"><strong>Collaborations:</strong> {about.collaborations}</p>}
          <hr className="about-divider" />
          <p className="mb-2"><strong>Contact Info:</strong> <span style={{whiteSpace: 'pre-line'}}>{about.contact_info}</span></p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
          >
            Edit
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={form.title || ''}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="About Our Lab"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Overview</label>
            <textarea
              name="overview"
              value={form.overview || ''}
              onChange={handleChange}
              rows={4}
              className="w-full border p-2 rounded"
              placeholder="Lab overview..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Research Areas (comma or newline separated)</label>
            <textarea
              name="research_areas"
              value={form.research_areas || ''}
              onChange={handleChange}
              rows={3}
              className="w-full border p-2 rounded"
              placeholder="Agricultural Robotics, Computer Vision & AI, ..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Projects (comma or newline separated)</label>
            <textarea
              name="projects"
              value={form.projects || ''}
              onChange={handleChange}
              rows={3}
              className="w-full border p-2 rounded"
              placeholder="AgriBot, CropVision, ..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Main Lab Image</label>
            <input
              type="file"
              name="main_image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
            {mainImagePreview && <img src={mainImagePreview} alt="Main" className="about-main-image styled-image" />}
          </div>
          <div>
            <label className="block text-sm font-medium">Project Image</label>
            <input
              type="file"
              name="project_image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full border p-2 rounded"
            />
            {projectImagePreview && <img src={projectImagePreview} alt="Project" className="about-project-image styled-image" />}
          </div>
          <div>
            <label className="block text-sm font-medium">Facilities</label>
            <textarea
              name="facilities"
              value={form.facilities || ''}
              onChange={handleChange}
              rows={2}
              className="w-full border p-2 rounded"
              placeholder="Facilities..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Collaborations & Funding</label>
            <textarea
              name="collaborations"
              value={form.collaborations || ''}
              onChange={handleChange}
              rows={2}
              className="w-full border p-2 rounded"
              placeholder="Collaborations..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Contact Info</label>
            <textarea
              name="contact_info"
              value={form.contact_info || ''}
              onChange={handleChange}
              rows={2}
              className="w-full border p-2 rounded"
              placeholder="Contact info..."
            />
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? 'Saving...' : 'Save'}
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default DashboardAboutLab
