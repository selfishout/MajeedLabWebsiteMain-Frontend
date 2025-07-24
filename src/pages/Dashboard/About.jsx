import React, { useEffect, useState } from 'react'
import { fetchAboutLab, updateAboutLab } from '../../services/api'

const DEFAULT_SECTION = { title: '', description: '', images: [], subsections: [] }
const DEFAULT_SUBSECTION = { title: '', description: '', images: [] }

function DashboardAboutLab() {
  const [about, setAbout] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [form, setForm] = useState({ sections: [] })
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Track deleted image IDs
  const [deletedSectionImageIds, setDeletedSectionImageIds] = useState([])
  const [deletedSubSectionImageIds, setDeletedSubSectionImageIds] = useState([])

  useEffect(() => {
    fetchAboutLab()
      .then(res => {
        setAbout(res.data)
        setForm(res.data)
        setDeletedSectionImageIds([])
        setDeletedSubSectionImageIds([])
      })
      .catch(() => {
        setAbout({ sections: [] })
        setForm({ sections: [] })
        setDeletedSectionImageIds([])
        setDeletedSubSectionImageIds([])
      })
  }, [])

  // Section handlers
  const addSection = () => {
    setForm({ ...form, sections: [...(form.sections || []), { ...DEFAULT_SECTION }] })
  }
  const removeSection = (idx) => {
    setForm({ ...form, sections: form.sections.filter((_, i) => i !== idx) })
  }
  const handleSectionChange = (idx, field, value) => {
    const updated = [...form.sections]
    updated[idx][field] = value
    setForm({ ...form, sections: updated })
  }
  // Section image handlers
  const removeSectionImage = (sectionIdx, imgIdx) => {
    const updated = [...form.sections]
    const img = updated[sectionIdx].images[imgIdx]
    if (img && img.id) {
      setDeletedSectionImageIds(prev => [...prev, img.id])
    }
    updated[sectionIdx].images = updated[sectionIdx].images.filter((_, i) => i !== imgIdx)
    setForm({ ...form, sections: updated })
  }
  const handleSectionImages = (idx, files) => {
    const updated = [...form.sections]
    // Keep existing images (with id) and add new files
    updated[idx].images = [
      ...(updated[idx].images ? updated[idx].images.filter(img => img.id) : []),
      ...Array.from(files)
    ]
    setForm({ ...form, sections: updated })
  }

  // Sub-section handlers
  const addSubSection = (sectionIdx) => {
    const updated = [...form.sections]
    updated[sectionIdx].subsections = updated[sectionIdx].subsections || []
    updated[sectionIdx].subsections.push({ ...DEFAULT_SUBSECTION })
    setForm({ ...form, sections: updated })
  }
  const removeSubSection = (sectionIdx, subIdx) => {
    const updated = [...form.sections]
    updated[sectionIdx].subsections = updated[sectionIdx].subsections.filter((_, i) => i !== subIdx)
    setForm({ ...form, sections: updated })
  }
  const handleSubSectionChange = (sectionIdx, subIdx, field, value) => {
    const updated = [...form.sections]
    updated[sectionIdx].subsections[subIdx][field] = value
    setForm({ ...form, sections: updated })
  }
  // Sub-section image handlers
  const removeSubSectionImage = (sectionIdx, subIdx, imgIdx) => {
    const updated = [...form.sections]
    const img = updated[sectionIdx].subsections[subIdx].images[imgIdx]
    if (img && img.id) {
      setDeletedSubSectionImageIds(prev => [...prev, img.id])
    }
    updated[sectionIdx].subsections[subIdx].images = updated[sectionIdx].subsections[subIdx].images.filter((_, i) => i !== imgIdx)
    setForm({ ...form, sections: updated })
  }
  const handleSubSectionImages = (sectionIdx, subIdx, files) => {
    const updated = [...form.sections]
    updated[sectionIdx].subsections[subIdx].images = [
      ...(updated[sectionIdx].subsections[subIdx].images ? updated[sectionIdx].subsections[subIdx].images.filter(img => img.id) : []),
      ...Array.from(files)
    ]
    setForm({ ...form, sections: updated })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      const formData = new FormData()
      Object.entries(form).forEach(([key, value]) => {
        if (key === 'main_image') {
          if (value instanceof File) {
            formData.append('main_image', value)
          }
        } else if (key === 'project_image') {
          if (value instanceof File) {
            formData.append('project_image', value)
          }
        } else if (key !== 'sections') {
          formData.append(key, value)
        }
      })
      // Prepare sections and collect files
      let fileMap = {}
      const sectionsPayload = form.sections.map((section, i) => {
        let sectionImages = []
        if (section.images) {
          section.images.forEach((img, j) => {
            if (img.id) {
              sectionImages.push({ id: img.id })
            } else if (img instanceof File) {
              const key = `section_${i}_image_${j}`
              formData.append(key, img)
              sectionImages.push({ upload_key: key })
            }
          })
        }
        let subPayload = (section.subsections || []).map((sub, k) => {
          let subImages = []
          if (sub.images) {
            sub.images.forEach((img, l) => {
              if (img.id) {
                subImages.push({ id: img.id })
              } else if (img instanceof File) {
                const key = `section_${i}_sub_${k}_image_${l}`
                formData.append(key, img)
                subImages.push({ upload_key: key })
              }
            })
          }
          return { ...sub, images: subImages }
        })
        return { ...section, images: sectionImages, subsections: subPayload }
      })
      formData.append('sections', JSON.stringify(sectionsPayload))
      // Add deleted image IDs
      formData.append('deletedSectionImageIds', JSON.stringify(deletedSectionImageIds))
      formData.append('deletedSubSectionImageIds', JSON.stringify(deletedSubSectionImageIds))
      await updateAboutLab(formData)
      setIsEditing(false)
      const res = await fetchAboutLab()
      setAbout(res.data)
      setForm(res.data)
      setDeletedSectionImageIds([])
      setDeletedSubSectionImageIds([])
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
      <p className="mb-6">Edit the About Lab sections and sub-sections below.</p>
      <hr className="about-divider" />
      {!isEditing ? (
        <div className="bg-white rounded shadow p-4 mb-6">
          {about.sections && about.sections.map((section, i) => (
            <div key={i} className="mb-6">
              <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
              <p>{section.description}</p>
              {section.images && section.images.map((img, j) => (
                <img key={j} src={img.image} alt="Section" className="about-main-image styled-image" />
              ))}
              {section.subsections && section.subsections.map((sub, k) => (
                <div key={k} className="ml-6 mt-2">
                  <h3 className="text-lg font-semibold">{sub.title}</h3>
                  <p>{sub.description}</p>
                  {sub.images && sub.images.map((img, l) => (
                    <img key={l} src={img.image} alt="SubSection" className="about-main-image styled-image" />
                  ))}
                </div>
              ))}
            </div>
          ))}
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mt-4"
          >
            Edit
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
          {(form.sections || []).map((section, i) => (
            <div key={i} className="border p-3 mb-4 rounded bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold">Section {i + 1}</h3>
                <button type="button" onClick={() => removeSection(i)} className="text-red-500">Remove</button>
              </div>
              <input type="text" value={section.title} onChange={e => handleSectionChange(i, 'title', e.target.value)} placeholder="Section Title" className="w-full border p-2 rounded mb-2" />
              <textarea value={section.description} onChange={e => handleSectionChange(i, 'description', e.target.value)} placeholder="Section Description" className="w-full border p-2 rounded mb-2" />
              {/* Show existing images with remove button */}
              {section.images && section.images.filter(img => img.id).length > 0 && (
                <div className="flex flex-wrap gap-2 mb-2">
                  {section.images.filter(img => img.id).map((img, j) => (
                    <div key={img.id} className="relative group">
                      <img src={img.image} alt="Section" className="about-main-image styled-image" />
                      <button type="button" onClick={() => removeSectionImage(i, j)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-80 group-hover:opacity-100">✕</button>
                    </div>
                  ))}
                </div>
              )}
              <input type="file" multiple onChange={e => handleSectionImages(i, e.target.files)} className="mb-2" />
              <div className="ml-4">
                <h4 className="font-semibold">Sub-sections</h4>
                {(section.subsections || []).map((sub, k) => (
                  <div key={k} className="border p-2 mb-2 rounded bg-gray-100">
                    <div className="flex justify-between items-center mb-1">
                      <span>Sub-section {k + 1}</span>
                      <button type="button" onClick={() => removeSubSection(i, k)} className="text-red-400">Remove</button>
                    </div>
                    <input type="text" value={sub.title} onChange={e => handleSubSectionChange(i, k, 'title', e.target.value)} placeholder="Sub-section Title" className="w-full border p-2 rounded mb-1" />
                    <textarea value={sub.description} onChange={e => handleSubSectionChange(i, k, 'description', e.target.value)} placeholder="Sub-section Description" className="w-full border p-2 rounded mb-1" />
                    {/* Show existing sub images with remove button */}
                    {sub.images && sub.images.filter(img => img.id).length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-1">
                        {sub.images.filter(img => img.id).map((img, l) => (
                          <div key={img.id} className="relative group">
                            <img src={img.image} alt="SubSection" className="about-main-image styled-image" />
                            <button type="button" onClick={() => removeSubSectionImage(i, k, l)} className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs opacity-80 group-hover:opacity-100">✕</button>
                          </div>
                        ))}
                      </div>
                    )}
                    <input type="file" multiple onChange={e => handleSubSectionImages(i, k, e.target.files)} className="mb-1" />
                  </div>
                ))}
                <button type="button" onClick={() => addSubSection(i)} className="text-blue-500">+ Add Sub-section</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={addSection} className="bg-green-500 text-white px-3 py-1 rounded">+ Add Section</button>
          <div className="flex gap-3 mt-4">
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
