import React, { useState } from 'react';
import '../styles/WebsiteInput.css'; // Rename the CSS file to a more generic name

function CourseWebsiteInput( { courseWebsite , setCourseWebsite }) {

  const handleInputChange = (event) => {
    setCourseWebsite(event.target.value);
  };

  return (
    <div className="website-container">
      <h1 className="website-input-title">COURSE WEBSITE*</h1>
      <p className="website-input-instructions">Custom-built Personal Course Website
ex. https://cs10.org/su23/
</p>
      <div className="input-container">
        <input 
          type="text" 
          className="website-input-field" 
          placeholder="Input Course Website here" 
          value={courseWebsite} 
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
}

export default CourseWebsiteInput;