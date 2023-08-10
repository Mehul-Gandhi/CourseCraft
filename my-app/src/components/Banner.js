import React from 'react';

function Banner({text}) {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-[84px] font-bold text-white mb-4 text-center">CourseCraft.ai</h1>
      <p className="text-xl text-white max-w-2xl text-center mx-auto">{text}</p>
    </div>
  );
}

export default Banner;