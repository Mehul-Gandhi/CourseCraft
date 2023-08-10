import React from 'react';
import CheckIcon from '@mui/icons-material/Check';

function Button({ onClick, icon, text }) {
  return (
    <button 
    className="flex items-center justify-center bg-[#FFB81C] text-white px-4 py-2 rounded text-base" 
    onClick={ onClick }
    >
      {icon}
      <span className="ml-2">{text}</span>
    </button>
  );
}

export default Button;