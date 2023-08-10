import React, { useState } from 'react';
import '../styles/ClassWebsiteInput.css';

function CourseWebsiteInput( { courseWebsite , setCourseWebsite }) {

  const handleInputChange = (event) => {
    setCourseWebsite(event.target.value);
  };

  return (
    <div className="class-container">
      <h1 className="class-input-title">COURSE WEBSITE (Required) </h1>
      <p className="class-input-instructions">Custom-built Personal Course Website
ex. https://cs10.org/su23/
</p>
      <div className="input-container">
        <input 
          type="text" 
          className="class-input-field" 
          placeholder="Input Course Website here" 
          value={courseWebsite} 
          onChange={handleInputChange} 
        />
      </div>
    </div>
  );
}

export default CourseWebsiteInput;