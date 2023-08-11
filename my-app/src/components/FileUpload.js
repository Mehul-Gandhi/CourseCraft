import React, { useRef, useEffect } from 'react';
import '../styles/FileUpload.css'; // Assuming you have a CSS file for styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudUploadAlt, faFileAlt, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import CryptoJS from 'crypto-js';

function FileUpload({ uploadData, setUploadData }) {
  const fileInput = useRef(null);

  const handleClick = () => {
    fileInput.current.click();
  }

  function formatFileSize(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
   
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  
    const i = Math.floor(Math.log(bytes) / Math.log(k));
  
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  }
  
  const generateUniqueKey = (filename) => {
    const data = `${filename}-${Date.now()}`;
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
  };
  
  const getUniqueFileName = (fileName, uploadData) => {
    let newFileName = fileName;
    let counter = 1;
    
    while (uploadData.some(data => data.name === newFileName)) {
        console.log("Conflict with:", newFileName); 
        const splitName = fileName.lastIndexOf(".");
        const baseName = fileName.substring(0, splitName);
        const extension = fileName.substring(splitName);
        newFileName = `${baseName} (${counter})${extension}`;
        counter++;
    }
    
    return newFileName;
};

  const handleRemove = (fileName) => {
    const updatedUploadData = uploadData.filter(data => data.name !== fileName);
    setUploadData(updatedUploadData);
    if (fileInput.current) {
      fileInput.current.value = '';
    }
  };

  useEffect(() => {
    console.log(uploadData);
  }, [uploadData]);

  const handleChange = async (event) => {
    if (uploadData.length >= 10) {
      alert("You can upload a maximum of 10 files.");
      return;
    }
    var file = event.target.files[0];
    console.log(file);
    // Convert to base64
    const base64 = await convertToBase64(file);

    if (file) {
      var fileName = file.name;
      fileName = getUniqueFileName(fileName, uploadData);
      console.log(file);
      var splitName = fileName.split('.');
      var fileExtension = splitName[splitName.length - 1];
      

      var fileSize = formatFileSize(file.size);
      const uniqueKey = generateUniqueKey(file.name);

      // Append the base64 representation of the file to uploadData state
      setUploadData(prevData => [...prevData, {
        name: fileName,
        base64: base64,
        key: uniqueKey,
        file: file,
        extension: fileExtension,
        progress: 50,
        fileSize: fileSize,
        status: 'Pending'
      }]);
      
      uploadFile(file, fileName, base64);
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

  function downloadBase64File(base64Data, fileName) {
    const blobData = base64ToBlob(base64Data, 'text/plain'); // replace 'type_here' with the appropriate MIME type
    const url = window.URL.createObjectURL(blobData);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
}

function base64ToBlob(base64, type = '') {
  // Remove the Data URI prefix
  const pureBase64 = base64.split(',')[1];

  const byteCharacters = atob(pureBase64);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: type });
}


  const uploadFile = (file, name) => {
    var formData = new FormData();
    formData.append('file', file, name);

    setUploadData(prevData => {
      return prevData.map(data => {
          if (data.name === name) {
              return {
                  ...data,
                  progress: 100,
                  status: "Uploaded",
              };
          }
          return data;
      });
  });
  }

  return (
    <div className="wrapper">
      <header className="my-4">Upload Files Here</header>
      <ul className="list-unstyled">
      <li className="d-flex align-items-center mb-3" style={{ color: "#FFB81C" }}>
        <span className="flex-grow-1">(Optional) Class Schedule Calendar </span>
          <Tooltip title={
            <div className="text-medium">
              Supported file types: .xls, .html, .js, .md etc.
            </div>
          }>
            <InfoOutlinedIcon fontSize="medium" style={{ marginLeft: '5px', cursor: 'pointer' }} />
      
          </Tooltip>
          <Tooltip title={
  <div className="text-medium">
    Upload a Google Spreadsheet, MarkDown, or HTML file, of a previous semeseters' schedule that contains a week-by-week schedule of: <br />
  <ul>
    <li>• Lecture Topics</li>
    <li>• Lab Topics</li>
    <li>• Discussion Topics</li>
    <li>• Homework Assignments</li>
    <li>• Other Resources</li>
  </ul>
  Use a previous semesters' schedule that most closely resembles your intended schedule.
  </div>
}>
            <HelpOutlineIcon fontSize="medium" style={{ marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }} />

          </Tooltip>
        </li>
        <li className="flex items-center space-x-2 relative group" style={{ color: "#FFB81C" }}>
        <span className="d-inline-block hover-expand">
        (Optional) TA/Reader Role Description Handbook </span>
          <Tooltip title="Supported file types: .pdf, .txt, etc.">
            <InfoOutlinedIcon fontSize="medium" style={{ marginLeft: '5px', cursor: 'pointer' }} />
          </Tooltip>
          <Tooltip title={
  <div>
    The TA/Reader role descriptions show an hourly breakdown of tasks for each ASE employee in your class.<br />
    Example: Mehul (30h Admin + Pedagogy TA)<br />
    2 labs and a discussion- 11h/w + 2h prep: ~13h/w<br />
    1h staff meeting - total 14h/w<br />
    2h misc - total 16h/w [Exam Review Amortized / checking slack / …]<br />
    2h/w Ed Lieutenant - total 18h/w<br />
    12h/w logistics - working with Yishu
  </div>
}>
          <HelpOutlineIcon fontSize="medium" style={{ marginLeft: '5px', marginRight: '5px', cursor: 'pointer' }} />
          </Tooltip>

        </li>
      </ul>

      {/* Handle click area */}
      <form className="text-center my-4">
          <input ref={fileInput} className="d-none" type="file" name="file" onChange={handleChange} />
          <button 
              type="button" 
              onClick={handleClick} 
              tabIndex="0" 
              aria-label="File uploader" 
              className="btn btn-link"
          >
              <FontAwesomeIcon icon={faCloudUploadAlt} className="mb-3" />
              <p>Browse File to Upload</p>
          </button>
      </form>

      {/* Dynamic file visualizer section */}
      <section className="progress-area">
    {Object.keys(uploadData).filter(name => uploadData[name].status !== 'Uploaded').map(name => (
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
            <span className="name">{uploadData[name].name} • Uploaded {<FontAwesomeIcon icon={faCheck} />}</span>
            <span className="size">{uploadData[name].fileSize}</span>
            
          </div>
          
        </div>
        <FontAwesomeIcon 
            icon={faTimes} 
            className="remove-icon" //remove
            onClick={() => handleRemove(uploadData[name].name)} 
          />
      </div>
    ))}
</section>
    </div>
  );
};

export default FileUpload;