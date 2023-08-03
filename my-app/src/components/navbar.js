import React from 'react';
import { Link } from "react-router-dom";
import "../styles/HomePage.css"

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
            </ul>
        </nav>
    );
}
