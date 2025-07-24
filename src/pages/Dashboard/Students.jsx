import React, { useEffect, useState } from 'react'
import {
  fetchStudentsData,
  createStudent,
  updateStudent,
  deleteStudent
} from '../../services/api'
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import FileUpload from '../../components/FileUpload/FileUpload';

function Students() {
  const [students, setStudents] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(initialForm())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editId, setEditId] = useState(null)

  /* ---------- helpers ---------- */
  function initialForm() {
    return {
      role: 'Student',
      name: '',
      email: '',
      designation: '',
      research_interests: '',
      is_active: true,
      is_alumni: false,
      start_date: '',
      end_date: '',
      bio: '',
      image: null,
      cv: null,
      github: '',
      linkedin: '',
      website: '',
      google_scholar: '',
      imagePreview: '',
      cvPreview: '',
    }
  }

  const loadStudents = () => {
    fetchStudentsData()
      .then(res => {
        if (res?.data && Array.isArray(res.data)) {
          setStudents(res.data)
        }
      })
      .catch(err => console.error('Error fetching students:', err))
  }

  /* ---------- lifecycle ---------- */
  useEffect(loadStudents, [])

  /* ---------- modal actions ---------- */
  const openAddModal = () => {
    setForm(initialForm())
    setEditId(null)
    setIsModalOpen(true)
  }

  const openEditModal = (student) => {
    const { id, image, cv, ...fields } = student
    setForm({
      ...fields,
      image: null, // force re-upload
      cv: null,    // force re-upload
      imagePreview: student.image || '',
      cvPreview: student.cv || '', // Add CV preview
    })
    setEditId(id)
    setIsModalOpen(true)
  }

  const closeModal = () => setIsModalOpen(false)

  /* ---------- form handlers ---------- */
  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target
    if (name === 'image' && files && files[0]) {
      setForm(prev => ({
        ...prev,
        image: files[0],
        imagePreview: URL.createObjectURL(files[0]),
      }))
    } else if (name === 'cv' && files && files[0]) {
      setForm(prev => ({
        ...prev,
        cv: files[0],
      }))
    } else {
    setForm(prev => ({
      ...prev,
        [name]: type === 'checkbox' ? checked : value
      }))
    }
  }

  const handleFileDelete = (fieldName) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: null,
      // Only clear the preview for the specific field being deleted
      ...(fieldName === 'image' && { imagePreview: '' }),
      ...(fieldName === 'cv' && { cvPreview: '' })
    }))
  }

  const handleFileUpdate = async (field, stu) => {
    const data = new FormData();
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = field === 'cv' ? '.pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document' : 'image/*';
    fileInput.onchange = async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      data.append(field, file);
      try {
        await updateStudent(stu.id, data); // Use the API function
        loadStudents();
      } catch (err) {
        alert('Failed to update file.');
      }
    };
    fileInput.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // build multipart payload
      const data = new FormData()
      Object.entries(form).forEach(([key, val]) => {
        if (key === 'image' && val instanceof File) data.append('image', val)
        else if (key === 'cv' && val instanceof File) data.append('cv', val)
        // Always send link fields, even if blank, so backend clears them
        else if (["github","linkedin","website","google_scholar"].includes(key)) data.append(key, val || '')
        // Send empty string for deleted files to clear them on backend
        else if (key === 'image' && val === null) data.append('image', '')
        else if (key === 'cv' && val === null) data.append('cv', '')
        else if (key !== 'image' && key !== 'cv' && key !== 'imagePreview' && val !== null && val !== '') data.append(key, val)
      })

      if (editId) {
        await updateStudent(editId, data)
      } else {
        await createStudent(data)
      }

      closeModal()
      loadStudents()
    } catch (err) {
      console.error('Error saving student:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this student?')) return
    try {
      await deleteStudent(id)
      loadStudents()
    } catch (err) {
      console.error('Error deleting student:', err)
    }
  }

  /* ---------- render ---------- */
  return (
  <div className="p-6 max-w-6xl mx-auto">
    {/* Header */}
    <div className="flex items-center justify-between mb-8">
      <div>
        <h1 className="text-4xl font-bold text-gray-800">👥 Team</h1>
        <p className="text-gray-600 mt-1">Manage your lab team members efficiently.</p>
      </div>
      <button
        onClick={openAddModal}
        className="bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-700 transition"
      >
        + Add Team Member
      </button>
    </div>

    {/* Students Table */}
    <table className="w-full bg-white border rounded-xl shadow-md text-sm">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 text-left whitespace-normal">Photo</th>
            <th className="p-2 text-left whitespace-normal">Name</th>
            <th className="p-2 text-left whitespace-normal">Role</th>
            <th className="p-2 text-left whitespace-normal">Designation</th>
            <th className="p-2 text-left whitespace-normal">Email</th>
            <th className="p-2 text-left whitespace-normal">CV</th>
            <th className="p-2 text-left whitespace-normal">GitHub</th>
            <th className="p-2 text-left whitespace-normal">LinkedIn</th>
            <th className="p-2 text-left whitespace-normal">Website</th>
            <th className="p-2 text-left whitespace-normal">Google Scholar</th>
            <th className="p-2 text-left whitespace-normal">Actions</th>
          </tr>
        </thead>
        <tbody>
      {students.map((stu) => (
            <tr key={stu.id} className="border-b hover:bg-gray-50">
              <td className="p-2 align-top">
                {stu.image ? (
                  <a href={stu.image} target="_blank" rel="noopener noreferrer">
                    <img src={stu.image} alt={stu.name} className="w-14 h-14 object-cover rounded-full border" />
                  </a>
                ) : (
                  <span className="text-xs text-gray-400">No Image</span>
                )}
                <button
                  className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  title="Update Image"
                  onClick={() => handleFileUpdate('image', stu)}
                >Update</button>
              </td>
              <td className="p-2 font-semibold align-top whitespace-normal break-words">{stu.name}</td>
              <td className="p-2 align-top whitespace-normal break-words">{stu.role}</td>
              <td className="p-2 align-top whitespace-normal break-words">{stu.designation}</td>
              <td className="p-2 align-top whitespace-normal break-words">{stu.email}</td>
              <td className="p-2 align-top whitespace-normal break-words">
                {stu.cv ? (
                  <a href={stu.cv} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">CV</a>
                ) : (
                  <span className="text-xs text-gray-400">No CV</span>
                )}
                <button
                  className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200"
                  title="Update CV"
                  onClick={() => handleFileUpdate('cv', stu)}
                >Update</button>
              </td>
              <td className="p-2 align-top whitespace-normal break-words">
                {stu.github && <a href={stu.github} target="_blank" rel="noopener noreferrer" title="GitHub"><FaGithub size={20} className="inline text-gray-700 hover:text-black" /></a>}
              </td>
              <td className="p-2 align-top whitespace-normal break-words">
                {stu.linkedin && <a href={stu.linkedin} target="_blank" rel="noopener noreferrer" title="LinkedIn"><FaLinkedin size={20} className="inline text-blue-700 hover:text-blue-900" /></a>}
              </td>
              <td className="p-2 align-top whitespace-normal break-words">
                {stu.website && <a href={stu.website} target="_blank" rel="noopener noreferrer" title="Website"><FaGlobe size={20} className="inline text-green-700 hover:text-green-900" /></a>}
              </td>
              <td className="p-2 align-top whitespace-normal break-words">
                {stu.google_scholar && <a href={stu.google_scholar} target="_blank" rel="noopener noreferrer" title="Google Scholar"><SiGooglescholar size={20} className="inline text-indigo-700 hover:text-indigo-900" /></a>}
              </td>
              <td className="p-2 flex gap-2 align-top">
  <button
    onClick={() => openEditModal(stu)}
                  className="text-yellow-600 font-medium bg-gray-200 px-3 py-1 rounded-full hover:bg-yellow-100"
                >Edit</button>
  <button
    onClick={() => handleDelete(stu.id)}
    className="text-red-600 font-medium bg-gray-200 px-3 py-1 rounded-full hover:bg-red-100"
                >Delete</button>
              </td>
            </tr>
          ))}
          {students.length === 0 && (
            <tr>
              <td colSpan="10" className="p-6 text-center text-gray-500">
                No team members found.
              </td>
            </tr>
              )}
        </tbody>
      </table>

    {/* Modal */}
    {isModalOpen && (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
        <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 relative overflow-auto max-h-[90vh]">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl"
            title="Close"
          >
            ×
          </button>

          <h2 className="text-2xl font-bold mb-6 text-gray-800">
            {editId ? '✏️ Edit Team Member' : '➕ Add Team Member'}
          </h2>

          <form onSubmit={handleSubmit} className="grid gap-5 md:grid-cols-2 text-gray-700">
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
              className="w-full border rounded p-2 mt-1"
            >
              <option value="Student">Student</option>
              <option value="Professor">Professor</option>
            </select>
            <Input label="Name" name="name" value={form.name} onChange={handleChange} />
            <Input label="Designation" name="designation" value={form.designation} onChange={handleChange} />
            <Input label="Email" name="email" value={form.email} onChange={handleChange} />
            <Input label="GitHub Link" name="github" value={form.github} onChange={handleChange} />
            <Input label="LinkedIn Link" name="linkedin" value={form.linkedin} onChange={handleChange} />
            <Input label="Website Link" name="website" value={form.website} onChange={handleChange} />
            <Input label="Google Scholar Link" name="google_scholar" value={form.google_scholar} onChange={handleChange} />
            
            <FileUpload
              label="Profile Image"
              name="image"
              previewValue={form.imagePreview || ''}
              onChange={handleChange}
              onDelete={handleFileDelete}
              accept="image/*"
              previewType="image"
            />
            
            <FileUpload
              label="CV File (PDF/Word)"
              name="cv"
              previewValue={form.cvPreview || form.cv || ''}
              onChange={handleChange}
              onDelete={handleFileDelete}
              accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              previewType="cv"
            />
            
            <Input label="Start Date" name="start_date" type="date" value={form.start_date} onChange={handleChange} />
            <Input label="End Date" name="end_date" type="date" value={form.end_date} onChange={handleChange} />

            <div className="col-span-2">
              <label className="block text-sm font-medium">Research Interests</label>
              <textarea
                name="research_interests"
                rows={2}
                value={form.research_interests}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium">Bio</label>
              <textarea
                name="bio"
                rows={3}
                value={form.bio}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div className="flex items-center col-span-2 gap-6 mt-2">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="is_alumni"
                  checked={form.is_alumni}
                  onChange={handleChange}
                />
                <span className="ml-2 text-sm">Alumni</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="is_active"
                  checked={form.is_active}
                  onChange={handleChange}
                />
                <span className="ml-2 text-sm">Active</span>
              </label>
            </div>

            <div className="col-span-2 flex gap-4 mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-blue-600 text-white font-medium px-5 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
              >
                {isSubmitting ? 'Saving…' : editId ? 'Update' : 'Create'}
              </button>
              <button
                type="button"
                onClick={closeModal}
                className="bg-gray-300 text-gray-800 font-medium px-5 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    )}
  </div>
)

}

/* small wrapper for simple inputs */
function Input({ label, ...props }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-gray-700">{label}</span>
      <input
        className="mt-1 w-full border rounded p-2 focus:outline-none focus:ring focus:border-blue-300"
        {...props}
      />
    </label>
  )
}

export default Students
