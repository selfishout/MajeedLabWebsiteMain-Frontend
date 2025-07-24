import React, { useEffect, useState } from 'react';
import { fetchEvents, createEvent, updateEvent, deleteEvent } from '../../services/api';
import FileUpload from '../../components/FileUpload/FileUpload';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ title: '', date: '', description: '', link: '', image: null, imagePreview: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => { loadEvents(); }, []);

  const loadEvents = async () => {
    try {
      const res = await fetchEvents();
      setEvents(res.data);
    } catch (err) { console.error('Failed to fetch events:', err); }
  };

  const openModal = (item = null) => {
    if (item) {
      setForm({
        title: item.title,
        date: item.date,
        description: item.description,
        link: item.link || '',
        image: null,
        imagePreview: item.image || ''
      });
      setEditId(item.id);
    } else {
      setForm({ title: '', date: '', description: '', link: '', image: null, imagePreview: '' });
      setEditId(null);
    }
    setShowModal(true);
  };
  const closeModal = () => { setShowModal(false); setForm({ title: '', date: '', description: '', link: '', image: null, imagePreview: '' }); setEditId(null); };
  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    if (type === 'file') {
      setForm(prev => ({ ...prev, [name]: files[0], imagePreview: files[0] ? URL.createObjectURL(files[0]) : '' }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileDelete = (fieldName) => {
    setForm(prev => ({
      ...prev,
      [fieldName]: null,
      imagePreview: fieldName === 'image' ? '' : prev.imagePreview
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); setIsSubmitting(true);
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => {
        if (k === 'image' && v instanceof File) data.append('image', v);
        else if (k === 'image' && v === null) data.append('image', ''); // Send empty string for deleted images
        else if (k !== 'imagePreview' && v !== null && v !== '') data.append(k, v);
      });
      if (editId) await updateEvent(editId, data); else await createEvent(data);
      closeModal(); loadEvents();
    } catch (err) { alert('Failed to save event.'); } finally { setIsSubmitting(false); }
  };
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this event?')) return;
    try { await deleteEvent(id); loadEvents(); } catch (err) { alert('Failed to delete event.'); }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-gray-800">🎉 Events</h1>
        <button onClick={() => openModal()} className="bg-gradient-to-r from-green-500 to-green-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:from-green-600 hover:to-green-800 transition duration-300">+ Add Event</button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-xl shadow-md">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-3 text-left">Title</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Link</th>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((item) => (
              <tr key={item.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{item.title}</td>
                <td className="p-3">{item.date}</td>
                <td className="p-3 max-w-xs truncate" title={item.description}>{item.description}</td>
                <td className="p-3">{item.link ? <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">View</a> : <span className="text-xs text-gray-400">N/A</span>}</td>
                <td className="p-3">{item.image ? <a href={item.image} target="_blank" rel="noopener noreferrer"><img src={item.image} alt="event" className="w-14 h-14 object-cover rounded border" /></a> : <span className="text-xs text-gray-400">No Image</span>}</td>
                <td className="p-3 flex gap-2">
                  <button onClick={() => openModal(item)} className="text-yellow-600 font-medium bg-gray-200 px-3 py-1 rounded-full hover:bg-yellow-100">Edit</button>
                  <button onClick={() => handleDelete(item.id)} className="text-red-600 font-medium bg-gray-200 px-3 py-1 rounded-full hover:bg-red-100">Delete</button>
                </td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr><td colSpan="6" className="p-6 text-center text-gray-500">No events found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-8 relative overflow-auto max-h-[90vh]">
            <h2 className="text-2xl font-bold mb-4">{editId ? 'Edit Event' : 'Add Event'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="title" value={form.title} onChange={handleChange} placeholder="Title" className="w-full border p-2 rounded" required />
              <input type="date" name="date" value={form.date} onChange={handleChange} className="w-full border p-2 rounded" required />
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" required />
              <input type="text" name="link" value={form.link} onChange={handleChange} placeholder="Link (optional)" className="w-full border p-2 rounded" />
              <FileUpload
                label="Event Image"
                name="image"
                previewValue={form.imagePreview}
                onChange={handleChange}
                onDelete={handleFileDelete}
                accept="image/*"
                previewType="image"
              />
              <div className="flex gap-3 mt-4">
                <button type="submit" disabled={isSubmitting} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50">{isSubmitting ? 'Saving…' : editId ? 'Update' : 'Create'}</button>
                <button type="button" onClick={closeModal} className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 