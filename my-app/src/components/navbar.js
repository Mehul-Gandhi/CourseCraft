import React from 'react';
import { Link } from "react-router-dom";
import "../index.css";

export default function NavBar() {
    return (
        <nav className="bg-[#032054] py-6 px-8">
             <p class="text-lg font-medium">
        “Tailwind CSS is the only framework that I've seen scale
        on large teams. It's easy to customize, adapts to any design,
        and the build size is tiny.”
      </p>
            <div className="container mx-auto flex justify-between items-center flex-col md:flex-row">
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
