// NotFound.js
import React from 'react';
import notFoundImage from "./../assets/image.png";

const NotFound = () => {
    return (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: '#003262' }}>
            <div className="text-center">
                <h1 className="display-1 text-danger mb-4">404</h1>
                <h2 className="h3 text-danger mb-2">Page Not Found</h2>
                <img src={notFoundImage} alt="Not Found" className="mb-4 img-fluid rounded shadow mx-auto" style={{ width: '50%' }}/>
                <p className=" text-danger">The page you are looking for doesn't exist.</p>
            </div>
        </div>
    );
}

export default NotFound;
