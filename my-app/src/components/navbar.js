import React from 'react';
import { Link } from "react-router-dom";
import "../index.css";

export default function NavBar() {
    return (
        <nav className="bg-[#032054]" style={{"backgroundColor": "#003262"}}>
            <div style={{backgroundColor: '#FFB81C', height: '20px', width: '100%'}}></div>
            <div className="mx-auto flex justify-end items-center flex-col md:flex-row" >
                <ul className="flex space-x-4">
                    <li>
                        <Link to="/schedule" className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium">
                            Generate Schedule
                        </Link>
                    </li>
                    <li>
                        <Link to="/update" className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium">
                            Update Website
                        </Link>
                    </li>
                    <li>
                        <Link to="/calendar" className="text-white hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium">
                            GCal & Tasks
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
