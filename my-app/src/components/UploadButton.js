import React, { Component } from 'react';
import '../styles/UploadButton.css'; // assuming you have a css file named UploadButton.css

class UploadButton extends Component {
  handleFileUpload = (event) => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    // Implement file upload logic here
  };

  render() {
    return (
      <div className="upload-btn-wrapper">
        <button className="btn">Upload</button>
        <input type="file" name="myfile" onChange={this.handleFileUpload} />
      </div>
    );
  }
}

export default UploadButton;
