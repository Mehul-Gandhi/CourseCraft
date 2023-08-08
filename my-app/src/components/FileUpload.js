import React, { useRef, useState } from 'react';
import '../styles/FileUpload.css'; // Assuming you have a CSS file for styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

function FileUpload() {
  const fileInput = useRef(null);
  const [uploadData, setUploadData] = useState({});

  const handleClick = () => {
    fileInput.current.click();
  }

  const handleChange = (event) => {
    var file = event.target.files[0];
    // If the file exists
    if (file) {
      var fileName = file.name;
      if (fileName.length >= 12) {
        var splitName = fileName.split('.');
        fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
      }
      uploadFile(file, fileName);
    }
  }

  const uploadFile = (file, name) => {
    var formData = new FormData();
    formData.append('file', file, name);

    // To display the progress upload bar
    let xhr = new XMLHttpRequest();
  
    xhr.open('POST', 'php/upload.php', true);
  
    // Event listener for the progress event
    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        let percentComplete = Math.round((event.loaded / event.total) * 100);
        let fileTotal = Math.floor(event.total / 1000);
        let fileSize = fileTotal < 1024 ? fileTotal + " KB" : (event.loaded / (1024*1024)).toFixed(2) + " MB";
        
        // Update the state with the progress
        setUploadData(prevData => ({
          ...prevData,
          [name]: { progress: percentComplete, fileSize, status: 'Uploading' }
        }));
      }
    };
  
    xhr.onload = function() {
      if (xhr.status === 200) {
        setUploadData(prevData => ({
          ...prevData,
          [name]: { ...prevData[name], status: 'Uploaded' }
        }));
      } else {
        // Handle the error
      }
    };
  
    xhr.send(formData);
  }

  return (
    <div className="wrapper">
      <header>Upload Files Here</header>

      {/* Handle click area */}
      <form onClick={handleClick}>
        <input ref={fileInput} className="file-input" type="file" name="file" hidden onChange={handleChange} />
        <FontAwesomeIcon icon={faCloudUploadAlt} />
        <p>Browse File to Upload</p>
      </form>

      {/* Dynamic file visualizer section */}
      <section className="progress-area">
        {Object.keys(uploadData).map(name => (
          <div key={name} className="row">
            <FontAwesomeIcon icon={faFileAlt} />
            <div className="content">
              <div className="details">
                <span className="name">{name} • {uploadData[name].status}</span>
                <span className="percent">{uploadData[name].progress}%</span>
              </div>
              <div className="progress-bar">
                <div className="progress" style={{width: `${uploadData[name].progress}%`}}></div>
              </div>
            </div>
          </div>
        ))}
      </section>
      <section className="uploaded-area">
        {Object.keys(uploadData).filter(name => uploadData[name].status === 'Uploaded').map(name => (
          <div key={name} className="row">
            <div className="content upload">
              <FontAwesomeIcon icon={faFileAlt} />
              <div className="details">
                <span className="name">{name} • Uploaded</span>
                <span className="size">{uploadData[name].fileSize}</span>
              </div>
            </div>
            <FontAwesomeIcon icon={faCheck} />
          </div>
        ))}
      </section>
    </div>
  );
};

export default FileUpload;