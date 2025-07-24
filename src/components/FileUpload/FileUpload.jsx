import React, { useState, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import './FileUpload.css';

const FileUpload = ({ 
  label, 
  name, 
  previewValue, // Changed from 'value' to 'previewValue' to be more explicit
  onChange, 
  onDelete, 
  accept, 
  previewType = 'image', // 'image', 'file', or 'cv'
  className = '' 
}) => {
  const [preview, setPreview] = useState(previewValue || '');
  const fileInputRef = useRef(null);

  useEffect(() => {
    setPreview(previewValue || '');
  }, [previewValue]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (previewType === 'image') {
        setPreview(URL.createObjectURL(file));
      } else if (previewType === 'cv') {
        setPreview(file.name);
      }
      onChange(e);
    }
  };

  const handleDelete = () => {
    setPreview('');
    onDelete(name);
    // Clear only this specific file input using ref
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const renderPreview = () => {
    if (!preview) return null;

    if (previewType === 'image') {
      return (
        <div className="file-preview image-preview">
          <img src={preview} alt="Preview" />
          <button 
            type="button" 
            className="delete-btn" 
            onClick={handleDelete}
            title="Delete image"
          >
            ✕
          </button>
        </div>
      );
    }

    if (previewType === 'cv') {
      return (
        <div className="file-preview cv-preview">
          <div className="cv-icon">📄</div>
          <span className="cv-name">{typeof preview === 'string' ? preview : preview.name}</span>
          <button 
            type="button" 
            className="delete-btn" 
            onClick={handleDelete}
            title="Delete CV"
          >
            ✕
          </button>
        </div>
      );
    }

    return (
      <div className="file-preview file-preview">
        <div className="file-icon">📎</div>
        <span className="file-name">{typeof preview === 'string' ? preview : preview.name}</span>
        <button 
          type="button" 
          className="delete-btn" 
          onClick={handleDelete}
          title="Delete file"
        >
          ✕
        </button>
      </div>
    );
  };

  return (
    <div className={`file-upload-container ${className}`}>
      <label className="file-upload-label">{label}</label>
      <input
        ref={fileInputRef}
        type="file"
        name={name}
        accept={accept}
        onChange={handleFileChange}
        className="file-input"
      />
      {renderPreview()}
    </div>
  );
};

export default FileUpload; 