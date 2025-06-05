import React from 'react';
import PropTypes from 'prop-types';
import PostCard from './PostCard'; // Import the PostCard component

function PostSection({ posts, onDeletePost, onImageClick }) { // Receive posts and callbacks as props
  return (
    <section className="post-flex">
      <div className="post-flex-row">
        {/* Map through the posts array and render a PostCard for each */}
        {posts.map(post => (
          <PostCard
            key={post.id} // Important: React needs a unique 'key' for each item in a list
            post={post}
            onImageClick={onImageClick} 
          />
        ))}
      </div>
    </section>
  );
}

PostSection.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      imgSrc: PropTypes.string,
      img: PropTypes.string,
      description: PropTypes.string,
      title: PropTypes.string,
    })
  ).isRequired,
  onDeletePost: PropTypes.func.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default PostSection;