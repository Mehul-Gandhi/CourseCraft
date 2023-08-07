import React from 'react';
import '../styles/Banner.css';

function Banner({text}) {
  return (
    <div className="banner">
      <div className="banner-rectangle"></div>
      <h1 className="banner-title">CourseLogistics.ai</h1>
      <p className="banner-text">{text}</p>
    </div>
  );
}

export default Banner;
