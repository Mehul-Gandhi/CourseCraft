import React, { useRef, useState } from 'react';
import '../styles/FileUpload.css'; // Assuming you have a CSS file for styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileAlt, faCheck } from '@fortawesome/free-solid-svg-icons';

function FileUpload({ uploadData, setUploadData }) {
  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  }

  const handleChange = async (event) => {
    if (uploadData.length >= 10) {
      alert("You can upload a maximum of 10 files.");
      return;
    }
    var file = event.target.files[0];
    // Convert to base64
    const base64 = await convertToBase64(file);

    if (file) {
      var fileName = file.name;
      if (fileName.length >= 12) {
        var splitName = fileName.split('.');
        fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
      }

      // Append the base64 representation of the file to uploadData state
      setUploadData(prevData => [...prevData, {
        name: fileName,
        base64: base64,
        progress: 0,
        fileSize: "0 KB",
        status: 'Pending'
      }]);
      
      uploadFile(file, fileName);
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    });
  }


  const uploadFile = (file, name) => {
    var formData = new FormData();
    formData.append('file', file, name);

    let xhr = new XMLHttpRequest();
    xhr.open('POST', 'php/upload.php', true);

    xhr.upload.onprogress = function(event) {
      if (event.lengthComputable) {
        let percentComplete = Math.round((event.loaded / event.total) * 100);
        let fileTotal = Math.floor(event.total / 1000);
        let fileSize = fileTotal < 1024 ? fileTotal + " KB" : (event.loaded / (1024*1024)).toFixed(2) + " MB";

        setUploadData(prevData => {
          const fileIndex = prevData.findIndex(file => file.name === name);
          if (fileIndex !== -1) {
            const newFile = {...prevData[fileIndex], progress: percentComplete, fileSize, status: 'Uploading'};
            return [
              ...prevData.slice(0, fileIndex),
              newFile,
              ...prevData.slice(fileIndex + 1)
            ];
          }
          return prevData;
        });
      }
    };

    xhr.onload = function() {
      if (xhr.status === 200) {
        setUploadData(prevData => {
          const fileIndex = prevData.findIndex(file => file.name === name);
          if (fileIndex !== -1) {
            const newFile = {...prevData[fileIndex], status: 'Uploaded'};
            return [
              ...prevData.slice(0, fileIndex),
              newFile,
              ...prevData.slice(fileIndex + 1)
            ];
          }
          return prevData;
        });
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