import React, { useEffect, useState } from 'react'
import { teamData, teamStorage } from '../../data/teamData'
import { dataManager } from '../../data/dataManager'
import { FaGithub, FaLinkedin, FaGlobe } from 'react-icons/fa';
import { SiGooglescholar } from 'react-icons/si';
import FileUpload from '../../components/FileUpload/FileUpload';

function Students() {
  const [students, setStudents] = useState([])
  const [professors, setProfessors] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [form, setForm] = useState(initialForm())
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [editId, setEditId] = useState(null)
  const [showDataTools, setShowDataTools] = useState(false)

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
      affiliation: '', // Added for professors
      short_bio: '', // Added for professors
    }
  }

  const loadData = () => {
    const data = teamStorage.getAll();
    setStudents(data.students);
    setProfessors([data.professor]);
  }

  /* ---------- lifecycle ---------- */
  useEffect(loadData, [])

  /* ---------- data management ---------- */
  const handleExportData = () => {
    dataManager.exportData();
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (file) {
      dataManager.importData(file)
        .then(() => {
          loadData();
          alert('Data imported successfully!');
        })
        .catch(error => {
          alert(`Import failed: ${error.message}`);
        });
    }
  };

  const handleCreateBackup = () => {
    const backupKey = dataManager.createBackup();
    alert(`Backup created: ${backupKey}`);
  };

  const handleResetToDefault = () => {
    if (window.confirm('This will reset all data to default. Are you sure?')) {
      dataManager.resetToDefault();
      loadData();
      alert('Data reset to default successfully!');
    }
  };

  /* ---------- modal actions ---------- */
  const openAddModal = () => {
    setForm(initialForm())
    setEditId(null)
    setIsModalOpen(true)
  }

  const openEditModal = (item, type) => {
    setForm({
      ...item,
      role: type === 'professor' ? 'Professor' : 'Student',
      image: null, // force re-upload
      cv: null,    // force re-upload
      imagePreview: item.image || '',
      cvPreview: item.cv || '',
    });
    setEditId(item.id);
    setIsModalOpen(true);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const isProfessor = form.role === 'Professor';
      
      // Prepare member data
      const memberData = {
        name: form.name,
        email: form.email,
        designation: form.designation,
        bio: form.bio,
        role: form.role,
        github: form.github || null,
        linkedin: form.linkedin || null,
        website: form.website || null,
        google_scholar: form.google_scholar || null,
        image: form.imagePreview || form.image || null,
        cv: form.cvPreview || form.cv || null,
      };

      // Add student-specific fields
      if (!isProfessor) {
        memberData.research_interests = form.research_interests;
        memberData.is_active = form.is_active;
        memberData.is_alumni = form.is_alumni;
        memberData.start_date = form.start_date;
        memberData.end_date = form.end_date;
      }

      // Add professor-specific fields
      if (isProfessor) {
        memberData.affiliation = form.affiliation;
        memberData.short_bio = form.short_bio;
      }

      if (editId) {
        // Update existing member
        teamStorage.updateMember(editId, memberData);
      } else {
        // Create new member
        teamStorage.addMember(memberData);
      }

      setIsModalOpen(false);
      loadData();
    } catch (err) {
      console.error('Failed to save member:', err);
      alert('Failed to save member. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, type) => {
    const memberType = type === 'professor' ? 'professor' : 'student';
    if (!window.confirm(`Delete this ${memberType}?`)) return
    try {
      teamStorage.deleteMember(id);
      loadData()
    } catch (err) {
      console.error(`Error deleting ${memberType}:`, err)
    }
  }

  const getImageUrl = (item) => item.image || 'https://randomuser.me/api/portraits/men/32.jpg';
  const getCVUrl = (item) => item.cv || null;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">👥 Team Management</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setShowDataTools(!showDataTools)}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
          >
            🛠️ Data Tools
          </button>
          <button
            onClick={openAddModal}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <span>➕</span>
            Add Team Member
          </button>
        </div>
      </div>

      {/* Data Management Tools */}
      {showDataTools && (
        <div className="bg-gray-100 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-gray-800 mb-3">Data Management</h3>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleExportData}
              className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded text-sm"
            >
              📤 Export Data
            </button>
            
            <label className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded text-sm cursor-pointer">
              📥 Import Data
              <input
                type="file"
                accept=".json"
                onChange={handleImportData}
                style={{ display: 'none' }}
              />
            </label>
            
            <button
              onClick={handleCreateBackup}
              className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded text-sm"
            >
              💾 Create Backup
            </button>
            
            <button
              onClick={handleResetToDefault}
              className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded text-sm"
            >
              🔄 Reset to Default
            </button>
          </div>
          
          <div className="mt-3 text-sm text-gray-600">
            <strong>Stats:</strong> {dataManager.getStats().totalMembers} total members, 
            {dataManager.getStats().professors} professor, 
            {dataManager.getStats().students} students
          </div>
        </div>
      )}

      {/* Professors Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">👨‍🏫 Professors</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {professors.map((prof) => (
            <div key={prof.id} className="bg-white p-4 rounded-lg shadow-md border">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={getImageUrl(prof)} 
                  alt={prof.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{prof.name}</h3>
                  <p className="text-sm text-gray-600">{prof.designation}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">{prof.bio}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(prof, 'professor')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(prof.id, 'professor')}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Students Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">🎓 Students</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {students.map((stu) => (
            <div key={stu.id} className="bg-white p-4 rounded-lg shadow-md border">
              <div className="flex items-center gap-3 mb-3">
                <img 
                  src={getImageUrl(stu)} 
                  alt={stu.name} 
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{stu.name}</h3>
                  <p className="text-sm text-gray-600">{stu.designation}</p>
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">{stu.bio}</p>
              <div className="flex gap-2">
                <button
                  onClick={() => openEditModal(stu, 'student')}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => handleDelete(stu.id, 'student')}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {editId ? '✏️ Edit Team Member' : '➕ Add Team Member'}
              </h2>
              <button onClick={closeModal} className="text-gray-500 hover:text-gray-700 text-2xl">&times;</button>
            </div>

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
              
              <Input label="Name" name="name" value={form.name} onChange={handleChange} required />
              <Input label="Designation" name="designation" value={form.designation} onChange={handleChange} required />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} type="email" required />
              
              {form.role === 'Student' && (
                <>
                  <Input label="Research Interests" name="research_interests" value={form.research_interests} onChange={handleChange} />
                  <Input label="Start Date" name="start_date" value={form.start_date} onChange={handleChange} type="date" />
                  <Input label="End Date" name="end_date" value={form.end_date} onChange={handleChange} type="date" />
                </>
              )}
              
              {form.role === 'Professor' && (
                <>
                  <Input label="Short Bio" name="short_bio" value={form.short_bio} onChange={handleChange} />
                  <Input label="Affiliation" name="affiliation" value={form.affiliation} onChange={handleChange} />
                </>
              )}
              
              <div className="md:col-span-2">
                <Input label="Bio" name="bio" value={form.bio} onChange={handleChange} required />
              </div>
              
              {/* Social Media Links */}
              <Input label="GitHub Link" name="github" value={form.github} onChange={handleChange} type="url" placeholder="https://github.com/username" />
              <Input label="LinkedIn Link" name="linkedin" value={form.linkedin} onChange={handleChange} type="url" placeholder="https://linkedin.com/in/username" />
              <Input label="Website Link" name="website" value={form.website} onChange={handleChange} type="url" placeholder="https://example.com" />
              <Input label="Google Scholar Link" name="google_scholar" value={form.google_scholar} onChange={handleChange} type="url" placeholder="https://scholar.google.com/citations?user=userid" />
              
              {/* Profile Image */}
              {form.imagePreview && <img src={form.imagePreview} alt="Profile Preview" className="w-24 h-24 object-cover rounded-full mb-2" />}
              <div className="md:col-span-2">
                <FileUpload
                  label="Profile Image"
                  name="image"
                  previewValue={form.imagePreview || ''}
                  onChange={handleChange}
                  onDelete={handleFileDelete}
                  accept="image/*"
                  previewType="image"
                />
              </div>
              
              {/* CV File (only for students) */}
              {form.role === 'Student' && (
                <div className="md:col-span-2">
                  {form.cvPreview && <a href={form.cvPreview} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Download CV</a>}
                  <FileUpload
                    label="CV File (PDF/Word)"
                    name="cv"
                    previewValue={form.cvPreview || ''}
                    onChange={handleChange}
                    onDelete={handleFileDelete}
                    accept=".pdf,.doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    previewType="file"
                  />
                </div>
              )}
              
              <div className="md:col-span-2 flex gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg disabled:opacity-50"
                >
                  {isSubmitting ? 'Saving...' : (editId ? 'Update' : 'Create')}
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg"
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

// Input component
function Input({ label, name, value, onChange, type = 'text', required = false, placeholder = '' }) {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        placeholder={placeholder}
        className="w-full border rounded p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  )
}

export default Students
