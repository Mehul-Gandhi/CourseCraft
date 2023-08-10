import React, { useState } from 'react';

import GridOnIcon from '@mui/icons-material/GridOn';
import ArticleIcon from '@mui/icons-material/Article';
import ExtensionIcon from '@mui/icons-material/Extension';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CodeIcon from '@mui/icons-material/Code';

export default function Instructions() {
    const elements = [
        [ArticleIcon, "1. Input Course Title", "Course Logistics Master: Input course department, intended semester, and intended year."],
        [GridOnIcon, "2. Generate New Schedule", "Based on reference past schedules, AI-generate a new schedule for the intended semester and year."],
        [ExtensionIcon,"3. Plugin Generated Schedule", "General Course Staff: use the shared link to access the new calendar for exporting."],
        [ScheduleIcon,"4. Export New Schedule", "Export the new calendar as a .ics file to then upload in a calendar application of your choice."],
        [CalendarTodayIcon, "5. Export Google Calendar", "Export the new calendar into your personal google calendar."],
        [CodeIcon, "6. Export Website Code", "Export the new calendar as website code to update the current class website front-end with one click."],
      ];

      return (
        <div className="container">
        <div className="row justify-content-center align-items-stretch"> {/* Modified this line */}
                <div className="col-12 text-center mb-5 ">
                    <div className="text-warning font-inter display-4">
                        I N S T R U C T I O N S
                    </div>
                </div>
    
                {elements.map((el, index) => {
                    const Icon = el[0]; // extract the icon component
                    const title = el[1];
                    const description = el[2];
    
                    return (
                      <div key={index} className="col-md-4 mb-4 d-flex justify-content-center">
                          <div className="p-4 rounded d-flex flex-column justify-content-center align-items-center" style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}>
                              <Icon style={{ color: '#ffffff' }} className="mb-2 " />
                              <h2 style={{ color: '#ffffff' }} className="h6 font-weight-bold mb-2 text-center">{title}</h2>
                              <p style={{ color: '#FFB81C' }} className="mb-0 text-center">{description}</p>
                          </div>
                      </div>
                  );
                })}
            </div>
        </div>
    );
    
  }
