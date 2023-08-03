import React from 'react';
import '../styles/UploadButton.css'; // assuming you have a css file named UploadButton.css
/*import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';*/

export default function UploadButton() {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // Implement file upload logic here
  };

  // return (
  
  //   <div className="upload-btn-wrapper">
  //     <button className="btn">Upload</button>
  //     <PictureAsPdfIcon /> 
  //     <input type="file" name="myfile" onChange={handleFileUpload} />
  //   </div>
  // );
  return (
    <div className = "container">
  <div className="div-sc">
  <img
    className="div-sc-syt"
    alt="Div sc"
    src="https://generation-sessions.s3.amazonaws.com/570315c98db69b6fc376ac6e0aee4b0d/img/div-sc-8s01yt-4.svg"
  />
  <div className="div-wrapper">
    <div className="text-wrapper">or drop files here</div>
  </div>
  <div className="div">
    <div className="button">
      <img
        className="SVG"
        alt="Svg"
        src="https://generation-sessions.s3.amazonaws.com/570315c98db69b6fc376ac6e0aee4b0d/img/svg.svg"
      />
      <div className="span-sc">
        <div className="choose-files">CHOOSE FILES</div>
      </div>
    </div>
    <img
      className="img"
      alt="Button"
      src="https://generation-sessions.s3.amazonaws.com/570315c98db69b6fc376ac6e0aee4b0d/img/button.svg"
    />
  </div>
</div>
</div>
);
};
