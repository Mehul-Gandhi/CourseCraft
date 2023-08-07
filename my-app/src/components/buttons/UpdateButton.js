import React from 'react';
import '../../styles/ConfirmButton.css';
import UpdateIcon from '@mui/icons-material/Update';

function UpdateButton() {
  const handleClick = () => {
    console.log('Button clicked');
    // Implement your button click logic here
  };

  return (
    <button className="button-container" onClick={handleClick}>
        <UpdateIcon />
      <span className="button-text">Update</span>
    </button>
  );
}

export default UpdateButton;