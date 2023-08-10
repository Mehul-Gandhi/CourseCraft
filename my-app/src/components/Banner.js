import React from 'react';

function Banner({text}) {
  return (
    <div className="container text-center">
      <h1 className="display-1 font-weight-bold text-white mb-10">CourseCraft.ai</h1>
      <p className=" text-white">{text}</p>
    </div>
  );
}

export default Banner;
