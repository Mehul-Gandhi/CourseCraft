import React from 'react';

function Banner({text}) {
  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold text-white mb-4">CourseCraft.ai</h1>
      <p className="text-xl text-white">{text}</p>
    </div>
  );
}

export default Banner;