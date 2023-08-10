import React, { useState } from 'react';
import '../styles/ClassWebsiteInput.css';

function ClassWebsiteInput({ classWebsite, setClassWebsite }) {

  const handleInputChange = (event) => {
    setClassWebsite(event.target.value);
  };

  return (
    <div className="class-container">
      <h1 className="class-input-title">CLASS WEBSITE (Required) </h1>
      <p className="class-input-instructions">Website from the classes.berkeley.edu, ex. https://classes.berkeley.edu/content/2023-fall-compsci-10-001-lec-001
</p>
      <div className="input-container">
        <input 
          type="text" 
          className="class-input-field" 
          placeholder="Input Class Website here" 
          value={classWebsite} 
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
}

export default ClassWebsiteInput;