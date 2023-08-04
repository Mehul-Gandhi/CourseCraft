import React from 'react';
import '../../styles/ConfirmButton.css';

function ConfirmButton() {
  const handleClick = () => {
    console.log('Button clicked');
    // Implement your button click logic here
  };

  return (
    <button className="button-container" onClick={handleClick}>
      <span className="button-text">Confirm</span>
    </button>
  );
}

export default ConfirmButton;