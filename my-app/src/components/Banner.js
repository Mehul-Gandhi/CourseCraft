import React from 'react';
import '../styles/Banner.css';

function Banner() {
  return (
    <div className="banner">
      <div className="banner-rectangle"></div>
      <h1 className="banner-title">CourseLogistics.ai</h1>
      <p className="banner-text">Welcome to Course Logistics.AI, a course schedule generator dedicated for UC Berkeley Computer Science and Data Science classes.</p>
    </div>
  );
}

export default Banner;
