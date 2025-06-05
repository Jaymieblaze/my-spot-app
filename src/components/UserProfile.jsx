import React from 'react';
import PropTypes from 'prop-types'; 

function UserProfile({ profileData, onEditProfileClick, onNewPostClick }) {
  const { imageUrl, title, description } = profileData;

  return (
    <section className="text-container">
      <div className="user-profile">
        <img
          src={imageUrl}
          alt="profile picture"
          className="profile-pic"
          id="profileImage" 
        />
        <div className="user-details">
          <section>
            <h2 className="user-name" id="profileTitle">
              {title}
            </h2>
            <p className="user-description" id="profileDescription">
              {description}
            </p>
          </section>

          <button
            className="button_secondary"
            id="editProfileButton"
            type="button"
            onClick={onEditProfileClick} 
          >
            <i className="ri-pencil-line"></i> Edit Profile
          </button>
        </div>
      </div>
      <button
        className="button_large"
        type="button"
        id="newPostButton"
        onClick={onNewPostClick} 
      >
        <i className="ri-add-line"></i> New Post
      </button>
    </section>
  );
}

// Add PropTypes for better development and debugging
UserProfile.propTypes = {
  profileData: PropTypes.shape({
    imageUrl: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  onEditProfileClick: PropTypes.func.isRequired,
  onNewPostClick: PropTypes.func.isRequired,
};

export default UserProfile;