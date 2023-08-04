import React from 'react';
import '../styles/UploadButton.css';

export default function UploadButton() {
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
  };

  return (
    <div>
      <h1 className="upload-title">UPLOAD DOCUMENTS</h1>
      <div className="upload-container">
        <div className="upload-instructions">
          <img
            className="upload-image"
            alt="Upload"
            src="https://generation-sessions.s3.amazonaws.com/570315c98db69b6fc376ac6e0aee4b0d/img/div-sc-8s01yt-4.svg"
          />
          <p className="upload-text">or drop files here</p>
        </div>
        <div className="upload-button-container">
          <label htmlFor="file-upload" className="upload-button">
            <img
              className="upload-icon"
              alt="Upload Icon"
              src="https://generation-sessions.s3.amazonaws.com/570315c98db69b6fc376ac6e0aee4b0d/img/svg.svg"
            />
            <span className="upload-button-text">CHOOSE FILES</span>
          </label>
          <input 
            id="file-upload"
            type="file" 
            style={{display: 'none'}} 
            onChange={handleFileUpload} 
          />
        </div>
      </div>
    </div>
  );
};

// import React from 'react';
// import '../styles/UploadButton.css'; // assuming you have a css file named UploadButton.css
// /*import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';*/

// export default function UploadButton() {
//   const handleFileUpload = (event) => {
//     const file = event.target.files[0];
//     console.log('Selected file:', file);
//   };

//   return (
//     <div>
//       <h1 className="title">UPLOAD DOCUMENTS</h1>
//       <div className="container">
//         <div className="div-sc">
//           <img
//             className="div-sc-syt"
//             alt="Div sc"
//             src="https://generation-sessions.s3.amazonaws.com/570315c98db69b6fc376ac6e0aee4b0d/img/div-sc-8s01yt-4.svg"
//           />
//           <div className="div-wrapper">
//             <div className="text-wrapper">or drop files here</div>
//           </div>
//           <div className="div">
//             <label htmlFor="file-upload" className="button">
//               <img
//                 className="SVG"
//                 alt="Svg"
//                 src="https://generation-sessions.s3.amazonaws.com/570315c98db69b6fc376ac6e0aee4b0d/img/svg.svg"
//               />
//               <div className="span-sc">
//                 <div className="choose-files">CHOOSE FILES</div>
//               </div>
//             </label>
//             <input 
//               id="file-upload"
//               type="file" 
//               style={{display: 'none'}} 
//               onChange={handleFileUpload} 
//             />
//             <img
//               className="img"
//               alt="Button"
//               src="https://generation-sessions.s3.amazonaws.com/570315c98db69b6fc376ac6e0aee4b0d/img/button.svg"
//             />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };