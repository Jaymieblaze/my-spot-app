import React, { useEffect } from 'react';
import PropTypes from 'prop-types';

function ImageModalViewer({ isOpen, onClose, image }) {
  // Destructure image properties, providing defaults if image is null
  const imgSrc = image?.src || '';
  const imgCaption = image?.caption || '';

  // Effect to toggle 'modal-open' class on body for styling (e.g., preventing scroll)
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    // Cleanup function: remove class when component unmounts or isOpen becomes false
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  // Effect to handle closing on Escape key or outside click
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    const handleClickOutside = (e) => {
      const modalContent = document.querySelector('.imageModal');
      // If the click is outside the modal content AND it's on the overlay AND the modal is open
      if (modalContent && !modalContent.contains(e.target) && e.target.classList.contains('imageModalOverlay') && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]); 

  if (!isOpen) {
    return null;
  }

  return (
    <article className={`imageModalOverlay ${isOpen ? 'active' : ''}`}>
      <div className="imageModal">
        <button id="closeImgModal" className="closeImgModal" onClick={onClose}>&times;</button>
        <img src={imgSrc} alt={imgCaption} id="imgModalPreview" className="imgModalpreview" />
        <p id="imgCaption" className="img-caption">{imgCaption}</p>
      </div>
    </article>
  );
}

ImageModalViewer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
  }),
};

export default ImageModalViewer;