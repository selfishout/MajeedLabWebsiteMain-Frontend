import React, { useEffect, useState } from 'react'
import {
  fetchPublicationData,
  createPublication,
  updatePublication,
  deletePublication,
} from '../../services/api'

function Publications() {
  const [publications, setPublications] = useState([])
  const [form, setForm] = useState({
    title: '',
    authors: '',
    journal: '',
    year: '',
    link: '',
    abstract: '',
    pdf: null,
  })
  const [editId, setEditId] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })

  useEffect(() => {
    loadPublications()
  }, [])

  const loadPublications = async () => {
    try {
      const res = await fetchPublicationData()
      setPublications(res.data)
    } catch (error) {
      console.error('Failed to fetch publications:', error)
    }
  }

  const openModal = (publication = null) => {
    if (publication) {
      setForm({
        title: publication.title,
        authors: publication.authors,
        journal: publication.journal || '',
        year: publication.year || '',
        link: publication.link || '',
        abstract: publication.abstract || '',
        pdf: null,
      })
      setEditId(publication.id)
    } else {
      setForm({
        title: '',
        authors: '',
        journal: '',
        year: '',
        link: '',
        abstract: '',
        pdf: null,
      })
      setEditId(null)
    }
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setForm({
      title: '',
      authors: '',
      journal: '',
      year: '',
      link: '',
      abstract: '',
      pdf: null,
    })
    setEditId(null)
  }

  const handleChange = (e) => {
    const { name, type, value, files } = e.target
    if (type === 'file') {
      setForm({ ...form, [name]: files[0] })
    } else {
      setForm({ ...form, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = new FormData()
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'pdf' && val instanceof File) data.append('pdf', val)
        else if (val !== null && val !== '') data.append(key, val)
      })
      if (editId) {
        await updatePublication(editId, data)
      } else {
        await createPublication(data)
      }
      closeModal()
      loadPublications()
    } catch (error) {
      console.error('Failed to save publication:', error)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this publication?')) {
      try {
        await deletePublication(id)
        loadPublications()
      } catch (error) {
        console.error('Failed to delete publication:', error)
      }
    }
  }

  // PATCH for PDF update
  const handlePdfUpdate = async (pub) => {
    const data = new FormData()
    const fileInput = document.createElement('input')
    fileInput.type = 'file'
    fileInput.accept = '.pdf,application/pdf'
    fileInput.onchange = async (e) => {
      const file = e.target.files[0]
      if (!file) return
      data.append('pdf', file)
      try {
        await updatePublication(pub.id, data)
        loadPublications()
      } catch (err) {
        alert('Failed to update PDF.')
      }
    }
    fileInput.click()
  }

  const sortedPublications = React.useMemo(() => {
    let sortable = [...publications]
    if (sortConfig.key) {
      sortable.sort((a, b) => {
        let aVal = a[sortConfig.key] || ''
        let bVal = b[sortConfig.key] || ''
        // Special case: year should be sorted numerically
        if (sortConfig.key === 'year') {
          aVal = parseInt(aVal) || 0
          bVal = parseInt(bVal) || 0
        } else {
          if (typeof aVal === 'string') aVal = aVal.toLowerCase()
          if (typeof bVal === 'string') bVal = bVal.toLowerCase()
        }
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }
    return sortable
  }, [publications, sortConfig])

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: 'asc' }
    })
  }

  return (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-4xl font-extrabold text-gray-800">📚 Publications</h1>
      <button
        onClick={() => openModal()}
        className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition duration-300"
      >
        + Add Publication
      </button>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border rounded-xl shadow-md">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left cursor-pointer select-none" onClick={() => handleSort('title')}>
              Title {sortConfig.key === 'title' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-3 text-left cursor-pointer select-none" onClick={() => handleSort('authors')}>
              Authors {sortConfig.key === 'authors' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-3 text-left cursor-pointer select-none" onClick={() => handleSort('journal')}>
              Journal/Conf {sortConfig.key === 'journal' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-3 text-left cursor-pointer select-none" onClick={() => handleSort('year')}>
              Year {sortConfig.key === 'year' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-3 text-left cursor-pointer select-none" onClick={() => handleSort('link')}>
              Link {sortConfig.key === 'link' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-3 text-left cursor-pointer select-none" onClick={() => handleSort('pdf')}>
              PDF {sortConfig.key === 'pdf' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-3 text-left cursor-pointer select-none" onClick={() => handleSort('abstract')}>
              Abstract {sortConfig.key === 'abstract' && (sortConfig.direction === 'asc' ? '▲' : '▼')}
            </th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedPublications.map((pub) => (
            <tr key={pub.id} className="border-b hover:bg-gray-50">
              <td className="p-3 font-semibold">{pub.title}</td>
              <td className="p-3">{pub.authors}</td>
              <td className="p-3">{pub.journal}</td>
              <td className="p-3">{pub.year}</td>
              <td className="p-3">
                {pub.link ? <a href={pub.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a> : <span className="text-xs text-gray-400">N/A</span>}
              </td>
              <td className="p-3">
                {pub.pdf ? (
                  <a href={pub.pdf} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download</a>
                ) : (
                  <span className="text-xs text-gray-400">No PDF</span>
                )}
                <button
                  className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  title="Update PDF"
                  onClick={() => handlePdfUpdate(pub)}
                >Update</button>
              </td>
              <td className="p-3 max-w-xs truncate" title={pub.abstract}>{pub.abstract}</td>
              <td className="p-3 flex gap-2">
                <button
                  onClick={() => openModal(pub)}
                  className="text-yellow-600 font-medium bg-gray-200 px-3 py-1 rounded-full hover:bg-yellow-100"
                >Edit</button>
                <button
                  onClick={() => handleDelete(pub.id)}
                  className="text-red-600 font-medium bg-gray-200 px-3 py-1 rounded-full hover:bg-red-100"
                >Delete</button>
              </td>
            </tr>
          ))}
          {sortedPublications.length === 0 && (
            <tr>
              <td colSpan="8" className="p-6 text-center text-gray-500">
                No publications found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* Modal */}
    {showModal && (
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex justify-center items-center z-50 transition-opacity duration-300">
        <div className="bg-white rounded-2xl p-8 w-full max-w-3xl shadow-2xl animate-fadeIn">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
            {editId ? 'Edit Publication' : 'Add Publication'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Authors</label>
                <input
                  type="text"
                  name="authors"
                  value={form.authors}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Journal/Conference</label>
                <input
                  type="text"
                  name="journal"
                  value={form.journal}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block mb-1 text-gray-600 font-medium">Year</label>
                <input
                  type="number"
                  name="year"
                  value={form.year}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 text-gray-600 font-medium">Link</label>
                <input
                  type="url"
                  name="link"
                  value={form.link}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 text-gray-600 font-medium">Abstract</label>
                <textarea
                  name="abstract"
                  value={form.abstract}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  rows={2}
                />
              </div>
              <div className="col-span-2">
                <label className="block mb-1 text-gray-600 font-medium">PDF File</label>
                <input
                  type="file"
                  name="pdf"
                  accept=".pdf,application/pdf"
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                {form.pdf && typeof form.pdf === 'object' && (
                  <span className="text-xs text-gray-600 mt-1 block">{form.pdf.name}</span>
                )}
              </div>
            </div>
            <div className="flex justify-end gap-4 pt-4">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition"
              >
                {editId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)
}

export default Publications
