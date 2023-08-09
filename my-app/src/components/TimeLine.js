import React from 'react';
import '../styles/TimeLine.css';

function TimeLine() {
    const items = ['Bacon', 'Rib', 'Sausage'];

    return (
        <div className="container">
            <h1 className="title">Status</h1>
            <ul className="timeline">
                {items.map((item, index) => (
                    <li 
                        className={`timeline-item ${index === 0 ? "active" : ""} hello`} 
                        key={index}
                    >
                        <div className="circle">{index + 1}</div>
                        {item}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TimeLine;
