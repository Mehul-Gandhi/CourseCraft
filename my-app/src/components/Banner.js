import React from 'react';
function Banner({text}) {
  return (
    <div className="container text-center mt-5 d-flex flex-column align-items-center text-white">
      {/* Title */}
      <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: "6rem" }}>CourseCraft.ai</h1>
      {/* Yellow Bar */}
      <div style={{ width: '70%', height: '5px', backgroundColor: '#FFC007', marginBottom: '20px' }}></div>
      {/* Subtitle */}
      <p className="h3" style={{ fontWeight: '300', maxWidth: '50rem' }}>{text}</p>
    </div>
  );
}
export default Banner;