import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

// Helper: convert image file to base64 (for persistence)
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

function NewPostDialog({ isOpen, onClose, onAddPost }) {
  const [imageFile, setImageFile] = useState(null);
  const [postTitle, setPostTitle] = useState('');
  const dialogRef = useRef(null); 

  // Effect to handle keyboard (Escape key) and outside clicks
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (event) => {
      if (dialogRef.current && isOpen && !dialogRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => { // Cleanup function
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside); 
    };
  }, [isOpen, onClose]); // Re-run effect if isOpen or onClose changes


  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    } else {
      setImageFile(null);
      alert("Please select an image file.");
      e.target.value = '';
    }
  };

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    if (!postTitle.trim()) {
      alert("Please enter a title.");
      return;
    }

    const imgBase64 = await fileToBase64(imageFile);
    const uniqueId = `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newPost = {
      id: uniqueId,
      img: imgBase64,
      title: postTitle.trim(),
    };

    onAddPost(newPost);

    setImageFile(null);
    setPostTitle('');
    if (e.target.elements.postImage) {
      e.target.elements.postImage.value = '';
    }

    onClose();
  };

  if (!isOpen) return null;

  return (
    // Make sure the dialog has a ref
    <dialog id="postDialog" open={isOpen} ref={dialogRef} style={{ display: 'block' }}>
      <form onSubmit={handleSubmit}>
        <label>Select Image:</label><br />
        <input
          type="file"
          id="postImage"
          accept="image/*"
          onChange={handleFileChange}
        /><br /><br />
        <label>Post Title:</label><br />
        <input
          id="postTitle"
          type="text"
          value={postTitle}
          onChange={handleTitleChange}
        />
        <br /><br />
        <div>
          <button type="submit" id="postOkBtn">Post</button>
          <button type="button" onClick={onClose} className="post_cancel">Cancel</button>
        </div>
      </form>
    </dialog>
  );
}

NewPostDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddPost: PropTypes.func.isRequired,
};

export default NewPostDialog;