import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function EditProfileModal({ isOpen, onClose, profileData, onSave }) {
  // State to manage the form inputs
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newImageFile, setNewImageFile] = useState(null); // Stores the File object
  const [imagePreviewUrl, setImagePreviewUrl] = useState(''); // Stores the URL for preview

  // Ref for the file input to reset it
  const imageUploadRef = useRef(null);



  useEffect(() => {
    if (isOpen && profileData) {
      setNewTitle(profileData.title);
      setNewDescription(profileData.description);
      // Set initial preview to current profile image
      setImagePreviewUrl(profileData.imageUrl);
      setNewImageFile(null); // Reset file input
      if (imageUploadRef.current) {
        imageUploadRef.current.value = ''; // Clear the actual file input
      }
    }
  }, [isOpen, profileData]);

  // Effect to handle keyboard (Esc key) and outside clicks
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      const modalElement = document.getElementById('editProfileModal'); 
      if (modalElement && !modalElement.contains(e.target) && isOpen && e.target.classList.contains('modal-overlay')) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => { // Cleanup function
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]); 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Basic image validation
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file.");
        return;
      }
      setNewImageFile(file);

      // Create a URL for preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result); 
      };
      reader.readAsDataURL(file);
    } else {
      setNewImageFile(null);
      setImagePreviewUrl(profileData.imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); 
    let updatedImageUrl = imagePreviewUrl; 

    if (newImageFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatedImageUrl = reader.result; 
        onSave({
          imageUrl: updatedImageUrl,
          title: newTitle,
          description: newDescription,
        });
        // After save, reset the file input state and preview
        setNewImageFile(null);
        setImagePreviewUrl('');
        if (imageUploadRef.current) {
          imageUploadRef.current.value = '';
        }
      };
      reader.readAsDataURL(newImageFile);
    } else {
      onSave({
        imageUrl: profileData.imageUrl,
        title: newTitle,
        description: newDescription,
      });
      setNewImageFile(null);
      setImagePreviewUrl('');
      if (imageUploadRef.current) {
        imageUploadRef.current.value = '';
      }
    }
  };

  if (!isOpen) return null;

  return (
    <section id="modalOverlay" className="modal-overlay active"> {/* 'active' class ensures it's visible */}
      <article id="editProfileModal" className="modal">
        <div className="modal-header">
          <h3 className="modal-title">Edit Profile</h3>
          <button type="button" className="modal-close" onClick={onClose}>
            <i className="ri-close-line close-icon"></i>
          </button>
        </div>
        <form id="profileForm" className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="imageUpload" className="image-upload">
              <span id="uploadText">
                <i className="ri-file-upload-line"></i>&nbsp;Profile Image
              </span>
              <span id="fileName" className="file-name" style={{ display: newImageFile ? 'inline-block' : 'none' }}>
                {newImageFile ? newImageFile.name : ''}
              </span>
            </label>
            <input
              type="file"
              id="imageUpload"
              className="imageUpload"
              name="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              ref={imageUploadRef}
            />
            {imagePreviewUrl && ( 
              <img
                src={imagePreviewUrl}
                className="image-preview"
                id="imagePreview"
                alt="Image Preview"
                style={{ display: 'block' }} 
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="title" className="label">Title</label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder="Enter profile text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description" className="label">Description</label>
            <textarea
              id="description"
              name="description"
              placeholder="Enter profile description"
              value={newDescription}
              onChange={(e) => setNewDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-buttons">
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-save">Save Changes</button>
          </div>
        </form>
      </article>
    </section>
  );
}

EditProfileModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  profileData: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
};

export default EditProfileModal;