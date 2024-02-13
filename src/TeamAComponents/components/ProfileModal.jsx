import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import Profile from './Profile';
import ProfileEdit from './ProfileEdit';

const ProfileModal = ({ showModal, handleClose }) => {
  const [isEditModal, setIsEditModal] = useState(false);

  const handleToggleEditModal = () => {
    setIsEditModal((prevIsEditModal) => !prevIsEditModal);
  };

  const handleModalHide = () => {
    setIsEditModal(false);
  };

  const customModalStyles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backdropFilter: showModal ? 'blur(5px)' : 'none',
    },
    modalContent: {
      position: 'relative',
      width: '100%',
      maxWidth: '600px',
      margin: '0 auto',
      background: 'none', // Set the background to none or transparent
      padding: '20px',
      borderRadius: '8px',
    },
  };

  return (
    <Modal show={showModal} onHide={() => { handleClose(); handleModalHide(); }}>
      <div style={customModalStyles.overlay} onClick={handleClose}>
        <div style={customModalStyles.modalContent} onClick={(e) => e.stopPropagation()}>
          {isEditModal ? (
            <ProfileEdit handleClose={handleModalHide} />
          ) : (
            <Profile handleClose={handleClose} handleEditClick={handleToggleEditModal} />
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ProfileModal;
