import React from 'react';

function Banner({text}) {
  return (
    <div className="container text-center mt-5 d-flex flex-column align-items-center">
      {/* Title */}
      <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: "6rem" }}>CourseCraft.ai</h1>
      
      {/* Subtitle */}
      <p className="h3" style={{ fontWeight: '300', maxWidth: '32rem' }}>{text}</p>
    </div>
  );
}

export default Banner;
