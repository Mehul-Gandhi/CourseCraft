import React from 'react';
import '../styles/UploadButton.css'; // assuming you have a css file named UploadButton.css
/*import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';*/

export default function UploadButton () {
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
  return (<div></div>);
};
