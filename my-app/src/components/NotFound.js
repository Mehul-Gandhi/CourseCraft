// NotFound.js
import React from 'react';
import notFoundImage from './../assets/image.png'; 

const NotFound = () => {
    return (
        <div className="App flex items-center justify-center bg-gray-100">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
                <img src={notFoundImage} alt="Not Found" className="mb-4 w-1/2 mx-auto rounded-md shadow-md"/>
                <p className="text-gray-700">The page you are looking for doesn't exist.</p>
            </div>
        </div>
    );
}

export default NotFound;
