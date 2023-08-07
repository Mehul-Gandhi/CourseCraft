import React from 'react';
import '../../styles/ConfirmButton.css';
import CheckIcon from '@mui/icons-material/Check';

function Button({ onClick, icon, text }) {

  return (
    <button className="button-container" onClick={ onClick }>
      {icon}
      <span className="button-text">{text}</span>
    </button>
  );
}

export default Button;