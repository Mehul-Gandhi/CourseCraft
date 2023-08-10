import React, { useState } from 'react';
import '../styles/WebsiteInput.css';

function ClassWebsiteInput({ classWebsite, setClassWebsite }) {

  const handleInputChange = (event) => {
    setClassWebsite(event.target.value);
  };

  return (
    <div className="website-container">
      <h1 className="website-input-title">CLASS WEBSITE*</h1>
      <p className="website-input-instructions">Website from the classes.berkeley.edu, ex. https://classes.berkeley.edu/content/2023-fall-compsci-10-001-lec-001
</p>
      <div className="input-container">
        <input 
          type="text" 
          className="website-input-field" 
          placeholder="Input Class Website here" 
          value={classWebsite} 
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
}

export default ClassWebsiteInput;
