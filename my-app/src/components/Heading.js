import React, { useState } from 'react';

import GridOnIcon from '@mui/icons-material/GridOn';
import ArticleIcon from '@mui/icons-material/Article';
import ExtensionIcon from '@mui/icons-material/Extension';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CodeIcon from '@mui/icons-material/Code';

export default function Heading({ text }) {
      return (
        <div className="container">
        <div className="row justify-content-center align-items-stretch"> {/* Modified this line */}
            <div className="col-12 text-center mb-5 ">
                <div className="text-warning font-inter display-4">
                    {text}
                </div>
            </div>
            <div className="col-12 text-center mb-5 ">
                <div className="text-warning font-inter display-4">
                    {text}
                </div>
            </div>
            </div>
        </div>
    );
    
  }

