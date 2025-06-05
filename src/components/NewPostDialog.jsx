import React from 'react'; 

function NewPostDialog({ isOpen, onClose, onAddPost }) { 
  if (!isOpen) return null;

  return (
    <dialog id="postDialog" open={isOpen} style={{ display: 'block' }}> {}
      <form method="dialog" onSubmit={(e) => e.preventDefault()}> {}
        <label>Select Image:</label><br />
        <input type="file" id="postImage" accept="image/*" /><br /><br />
        <label>Post Title:</label><br />
        <input id="postTitle" type="text" />
        <br /><br />
        <div>
          <button type="button" id="postOkBtn" onClick={() => onAddPost({ /* dummy data */ id: Date.now(), img: '', title: 'New Post' })}>Post</button>
          <button type="button" onClick={onClose} className="post_cancel">Cancel</button>
        </div>
      </form>
    </dialog>
  );
}


import PropTypes from 'prop-types';
NewPostDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddPost: PropTypes.func.isRequired,
};

export default NewPostDialog;