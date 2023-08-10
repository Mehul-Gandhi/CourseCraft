import React from 'react';
import '../styles/TimeLine.css';
import CheckIcon from '@mui/icons-material/Check';

function TimeLine({ page }) {
    const items = ['Upload Files', 'Generate New Schedule', 'Confirm New Schedule'];

    return (
        <div className="container" >
            <ul className="timeline">
                {items.map((item, index) => (
                    <li 
                        className={`timeline-item ${index < page ? "active" : ""} hello`} 
                        key={index}
                    >
                        <div className="circle">{index < page?  <CheckIcon />: "" }</div>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TimeLine;
