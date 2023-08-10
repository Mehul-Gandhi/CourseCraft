import React from 'react';

function Banner({text}) {
  return (
    <div className="container text-center mt-5">
      <h1 className="display-1 font-weight-bold text-white mb-10">CourseCraft.ai</h1>
      <p className="lead text-white">{text}</p>
    </div>
  );
}

export default Banner;
