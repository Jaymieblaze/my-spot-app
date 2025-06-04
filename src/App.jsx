import React, { useState, useEffect } from 'react';
import './App.css'; // Or './styles.css' if you rename it
import Header from './components/Header';


// Dummy initial profile data
const initialProfileData = {
  imageUrl: '/images/image-2.png', 
  title: 'Aliauna Damala Bouga Time Bongo Puru Nacka Lu Lu Lu Badara Akon',
  description: 'Known mononymously as Akon (/ˈeɪkɒn/), is a Senegalese-American singer, record producer, and entrepreneur. An influential figure in modern world...',
};

function App() {
  const [profileData, setProfileData] = useState(() => {
    // Load profile data from localStorage on initial render
    const savedProfile = localStorage.getItem('profileData');
    return savedProfile ? JSON.parse(savedProfile) : initialProfileData;
  });
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isNewPostDialogOpen, setIsNewPostDialogOpen] = useState(false);
  const [posts, setPosts] = useState(() => {
    // Load posts from localStorage on initial render
    const savedPosts = localStorage.getItem('userPosts');
    const initialCards = [
      { id: 'card-1', imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/val-thorens.jpg", description: "Val Thorens" },
      { id: 'card-2', imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/restaurant-terrace.jpg", description: "Restaurant terrace" },
      { id: 'card-3', imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/outdoor-cafe.jpg", description: "An outdoor cafe" },
      { id: 'card-4', imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/long-bridge.jpg", description: "A very long bridge, over the forest..." },
      { id: 'card-5', imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/tunnel-morning-light.jpg", description: "Tunnel with morning light" },
      { id: 'card-6', imgSrc: "https://raw.githubusercontent.com/slyde619/SpotImages/refs/heads/main/images/mountain-house.jpg", description: "Mountain house" },
    ];
    return savedPosts ? JSON.parse(savedPosts) : initialCards;
  });
  const [isImageModalViewerOpen, setIsImageModalViewerOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); 

  // Save profile data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('profileData', JSON.stringify(profileData));
  }, [profileData]);

  // Save posts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('userPosts', JSON.stringify(posts));
  }, [posts]);


  const handleProfileUpdate = (updatedData) => {
    setProfileData(updatedData);
    setIsEditProfileModalOpen(false);
  };

  const handleAddPost = (newPost) => {
    setPosts(prevPosts => [newPost, ...prevPosts]); // Add new post to the beginning
    setIsNewPostDialogOpen(false);
  };

  const handleDeletePost = (idToDelete) => {
    setPosts(prevPosts => prevPosts.filter(post => post.id !== idToDelete));
  };

  const handleOpenImageModal = (imageSrc, imageCaption) => {
    setSelectedImage({ src: imageSrc, caption: imageCaption });
    setIsImageModalViewerOpen(true);
  };

  const handleCloseImageModal = () => {
    setIsImageModalViewerOpen(false);
    setSelectedImage(null);
  };

  return (
    <>
      <Header />
      <div className="main-container">
        <main>
          <UserProfile
            profileData={profileData}
            onEditProfileClick={() => setIsEditProfileModalOpen(true)}
            onNewPostClick={() => setIsNewPostDialogOpen(true)}
          />
          <PostSection
            posts={posts}
            onDeletePost={handleDeletePost}
            onImageClick={handleOpenImageModal}
          />
          <EditProfileModal
            isOpen={isEditProfileModalOpen}
            onClose={() => setIsEditProfileModalOpen(false)}
            profileData={profileData}
            onSave={handleProfileUpdate}
          />
          <NewPostDialog
            isOpen={isNewPostDialogOpen}
            onClose={() => setIsNewPostDialogOpen(false)}
            onAddPost={handleAddPost}
          />
          <ImageModalViewer
            isOpen={isImageModalViewerOpen}
            onClose={handleCloseImageModal}
            image={selectedImage}
          />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;