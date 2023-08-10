import React from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookIcon from '@mui/icons-material/Book';
import ArticleIcon from '@mui/icons-material/Article';

import GetAppIcon from '@mui/icons-material/GetApp';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import DevicesIcon from '@mui/icons-material/Devices';
import CloudIcon from '@mui/icons-material/Cloud';
import ExtensionIcon from '@mui/icons-material/Extension';
import ScheduleIcon from '@mui/icons-material/Schedule';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import CodeIcon from '@mui/icons-material/Code';

function Information() {
    const elements = [
        [ArticleIcon, "1. Input Course Title", "Course Logistics Master: Input course department, intended semester, and intended year."],
        [GridOnIcon, "2. Generate New Schedule", "Based on reference past schedules, AI-generate a new schedule for the intended semester and year."],
        [ExtensionIcon,"3. Plugin Generated Schedule", "General Course Staff: use the shared link to access the new calendar for exporting."],
        [ScheduleIcon,"4. Export New Schedule", "Export the new calendar as a .ics file to then upload in a calendar application of your choice."],
        [CalendarTodayIcon, "5. Export Google Calendar", "Export the new calendar into your personal google calendar."],
        [CodeIcon, "6. Export Website Code", "Export the new calendar as website code to update the current class website front-end with one click."],
      ];

    return (
      <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-3 gap-4">
        {elements.map((el, index) => {
          const Icon = el[0]; // extract the icon component
          const title = el[1];
          const description = el[2];
  
          return (
            <div key={index} className="p-6 bg-[rgba(255,255,255,0.2)] rounded-2xl">
              <Icon style={{color: '#ffffff'}} className="mb-2" />
              <h2 style={{color: '#ffffff'}} className="text-md font-semibold mb-2">{title}</h2>
              <p style={{color: '#FFB81C'}} className="text-md">{description}</p>
            </div>
          );
        })}
      </div>
    );
  }


  export default function Instructions() {
    return (
      <div className="flex flex-col items-center justify-center p-4 w-full space-y-12 ml-10 mr-10">
          <div className="bg-[#FFB81C] md:w-1/2 h-50 rounded-full flex items-center justify-center p-8 space-y-4">
              <div className="text-lg font-medium">
                  Our program takes in the following inputs:
              </div>
              <List className="space-y-2">
                  <ListItem className="flex items-center space-x-2">
                      <CalendarMonthIcon />
                      <span>Current Course Calendar (.xlsx, .txt from website)</span>
                  </ListItem>
                  <ListItem className="flex items-center space-x-2">
                      <GridOnIcon />
                      <span>Master Course Logistics Spreadsheet (.xlsx, .csv)</span>
                  </ListItem>
                  <ListItem className="flex items-center space-x-2">
                      <BookIcon />
                      <span>Instructor/TA Handbook (.doc, .docx, .pdf)</span>
                  </ListItem>
                  <ListItem className="flex items-center space-x-2">
                      <ArticleIcon />
                      <span>Additional Documentation</span>
                  </ListItem>
              </List>
              <div className="text-sm mt-4">
                  Accepted formats: .pdf, .csv, .xlsx
              </div>
          </div>
          <div className="text-[#FFB81C] font-inter text-3xl">
              I N S T R U C T I O N S
          </div>
          <div className="mt-6">
            <Information />
          </div>
      </div>
    );
  }
  
