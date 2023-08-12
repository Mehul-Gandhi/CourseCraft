import React, { useState } from 'react';
import '../styles/WebsiteInput.css'; // Rename the CSS file to a more generic name
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

function CourseWebsiteInput( { courseWebsite , setCourseWebsite }) {

  const handleInputChange = (event) => {
    setCourseWebsite(event.target.value);
  };

  return (
    <div className="website-container">
      <h1 className="website-input-title">COURSE WEBSITE*</h1>
      <p className="website-input-instructions">Custom-built Personal Course Website
ex. https://cs10.org/su23/
<Tooltip title={
            <h6 className="text-medium">
                Input the old course website. We will webscrape the calendar code from the inputted course website and use this to create
                the new course calendar.
            </h6>
          }>
            <InfoOutlinedIcon fontSize="medium" style={{ marginLeft: '5px', cursor: 'pointer' }} />
      
          </Tooltip>
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