import React, { useState, useRef } from 'react'; // Import useRef
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
  const [imageFile, setImageFile] = useState(null); // State to store the actual file object
  const [postTitle, setPostTitle] = useState(''); // State for the post title input

  // Ref to directly access the <dialog> element for showModal/close behavior if needed,
  // though we're managing it with `open` prop for now.
  const dialogRef = useRef(null);

  // When modal opens, clear previous inputs
  // We don't use useEffect here as much as in EditProfile because
  // NewPostDialog typically starts fresh each time it opens.
  // We'll clear inputs directly in handleSubmit and when opening.

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
    } else {
      setImageFile(null);
      alert("Please select an image file.");
      e.target.value = ''; // Clear file input if invalid
    }
  };

  const handleTitleChange = (e) => {
    setPostTitle(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    if (!imageFile) {
      alert("Please select an image.");
      return;
    }

    if (!postTitle.trim()) {
      alert("Please enter a title.");
      return;
    }

    // Convert image to base64
    const imgBase64 = await fileToBase64(imageFile);

    // Generate a unique ID for the new post
    const uniqueId = `post-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;

    // Create the new post object
    const newPost = {
      id: uniqueId,
      img: imgBase64, // Use 'img' for consistency with how saved posts are structured in App.jsx
      title: postTitle.trim(),
      // Add other properties if needed, e.g., 'liked' status, but we handle that in PostCard
    };

    onAddPost(newPost); // Pass the new post data up to App.jsx

    // Clear the form after successful post
    setImageFile(null);
    setPostTitle('');
    // Manually clear the file input element's value (required for type="file")
    if (e.target.elements.postImage) { // Check if the element exists
      e.target.elements.postImage.value = '';
    }

    onClose(); // Close the dialog
  };

  // If the dialog is not open, return null to not render anything
  if (!isOpen) return null;

  return (
    // We are still using the <dialog> element.
    // The 'open' attribute controls its native visibility.
    // We add a 'style' to ensure it's displayed as a block when open.
    <dialog id="postDialog" open={isOpen} ref={dialogRef} style={{ display: 'block' }}>
      <form onSubmit={handleSubmit}> {/* Removed method="dialog" as we handle submission manually */}
        <label>Select Image:</label><br />
        <input
          type="file"
          id="postImage"
          accept="image/*"
          onChange={handleFileChange}
          // The value attribute for file input is read-only, we manage clearing via ref or direct DOM
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
          <button type="submit" id="postOkBtn">Post</button> {/* Changed to type="submit" */}
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