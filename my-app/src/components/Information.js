import React, { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookIcon from '@mui/icons-material/Book';
import ArticleIcon from '@mui/icons-material/Article';



export default function Information() {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="d-flex flex-column align-items-center justify-content-center">
            <div 
    className={`d-flex flex-column align-items-center justify-content-center p-8 mb-4 ${isHovered ? 'bg-light-yellow' : 'bg-warning'}`}
    style={{ 
        width: '450px',  
        height: '250px',
        borderRadius: '50px', 
        transition: 'background-color 0.3s ease' 
    }} 
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
>
                <div className="text-lg font-weight-bold mb-4">
                    Our program takes in the following inputs:
                </div>
                
                <ul>
                    <li className="mb-2 d-flex align-items-center">
                        <CalendarMonthIcon />
                        <span className="ml-2">Current Course Calendar (.xlsx, .txt from website)</span>
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                        <GridOnIcon />
                        <span className="ml-2">Master Course Logistics Spreadsheet (.xlsx, .csv)</span>
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                        <BookIcon />
                        <span className="ml-2">Instructor/TA Handbook (.doc, .docx, .pdf)</span>
                    </li>
                    <li className="mb-2 d-flex align-items-center">
                        <ArticleIcon />
                        <span className="ml-2">Additional Documentation</span>
                    </li>
                </ul>

                <div className="text-sm mt-4">
                    Accepted formats: .pdf, .csv, .xlsx
                </div>
            </div>
            
        </div>
    );
}
