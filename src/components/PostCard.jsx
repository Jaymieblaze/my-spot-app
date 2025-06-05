import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function PostCard({ post, onImageClick }) { 
  // Use unique state for each card's liked status, loaded from localStorage
  const [isLiked, setIsLiked] = useState(() => {
    const savedLikedStatus = localStorage.getItem(`liked-${post.id}`);
    return savedLikedStatus === 'true';
  });

  // Update localStorage whenever isLiked changes
  useEffect(() => {
    localStorage.setItem(`liked-${post.id}`, isLiked);
  }, [isLiked, post.id]);

  const handleLikeToggle = () => {
    setIsLiked(prevIsLiked => !prevIsLiked);
  };


  const handleImageClick = () => {
    onImageClick(post.imgSrc || post.img, post.description || post.title);
  };

  return (
    <article className="card">
      <div className="image-container">
        <img
          src={post.imgSrc || post.img}
          alt={post.description || post.title}
          onClick={handleImageClick}
        />
      </div>
      <div className="card-content">
        <p>{post.description || post.title}</p>
        <i
          className={`heart-icon ${isLiked ? 'ri-heart-fill liked' : 'ri-heart-line'}`}
          onClick={handleLikeToggle}
        ></i>
      </div>
    </article>
  );
}

PostCard.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string.isRequired,
    imgSrc: PropTypes.string,
    img: PropTypes.string,
    description: PropTypes.string,
    title: PropTypes.string,
  }).isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default PostCard;