import React from 'react';
import '../../styles/ConfirmButton.css';
import UpdateIcon from '@mui/icons-material/Update';

function UpdateButton({ onClick }) {
  

  return (
    <button className="button-container" onClick={onClick}>
        <UpdateIcon />
      <span className="button-text">Regenerate</span>
    </button>
  );
}

export default UpdateButton;