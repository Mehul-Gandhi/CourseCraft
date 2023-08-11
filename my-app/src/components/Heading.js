import React, { useState } from 'react';

import GridOnIcon from '@mui/icons-material/GridOn';
import ArticleIcon from '@mui/icons-material/Article';
import ExtensionIcon from '@mui/icons-material/Extension';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CodeIcon from '@mui/icons-material/Code';

export default function Heading({ title, subtitle }) {
    return (
    <div className="container" style={{marginBottom: "10px", maxWidth: '800px'}}>
        <div className="row justify-content-center align-items-stretch"> {/* Modified this line */}
            <div className="col-12 text-center mb-0">
                {/* Title */}
                <div className="text-warning font-inter" style={{fontSize: "30px", fontWeight: "800", letterSpacing: "6px", textTransform: "uppercase"}}>
                    {title}
                </div>
                {/* Subtitle */}
                <div className="text-white font-inter" style={{fontSize: "18px", fontWeight: "400", marginTop: "10px", textAlign: "center"}}>
                    {subtitle}
                </div>
            </div>
        </div>
    </div>
    );
    
  }

