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

function Information() {
    const elements = [
        [ArticleIcon, "Input Website & Current Schedule", "Drag and drop your file into the toolbox above to begin. Word, Excel, PPT and image files will convert to PDF format. PDF files will convert to the file type you choose."],
        [GridOnIcon, "Generate New Schedule", "Based on the current year's schedule and academic holidays, generate a new schedule  given the next start, end dates, & holidays. Generate a new tabular schedule."],
        [GetAppIcon,"Export New Schedule", "Export the newly generated schedule for updating the website code, and auto-creating google calendar and google tasks. Save hundreds of hours of repetitive work."],
        [VerifiedUserIcon, "Great quality", "Test and see for yourself! To ensure best quality of PDF conversion, we partnered with Solid Documents - the best solution provider on the market."],
        [DevicesIcon, "Perform on all devices", "You do not need to register or install a software. The online PDF converter works perfectly on all devices and popular browsers: IE, Firefox, Chrome & Opera."],
        [CloudIcon, "Access from anywhere", "You can access the free PDF file converter anywhere, with an internet connection. Smallpdf PDF converter operates fully in the cloud."]
      ];
    return (
      <div className="grid grid-cols-3 grid-rows-2 md:grid-cols-3  gap-4">
        {elements.map((el, index) => {
          const Icon = el[0]; // extract the icon component
          const title = el[1];
          const description = el[2];
  
          return (
            <div key={index}>
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
    <div className="flex flex-col items-center justify-center p-4 w-full">
        <div className="bg-[#FFB81C] md:w-1/2 h-50 rounded-full flex items-center justify-center p-4">
            <div>
                Our program takes in the following inputs:
                <List>
                    <ListItem><CalendarMonthIcon /> Current Course Calendar (.xlsx, .txt from website)</ListItem>
                    <ListItem><GridOnIcon /> Master Course Logistics Spreadsheet (.xlsx, .csv)</ListItem>
                    <ListItem><BookIcon /> Instructor/TA Handbook (.doc, .docx, .pdf)</ListItem>
                    <ListItem><ArticleIcon /> Additional Documentation</ListItem>
                </List>
                <div>Accepted formats: .pdf, .csv, .xlsx</div>
            </div>
        </div>
        <div className="text-[#FFB81C] font-inter text-3xl" style={{ marginTop: '50px' }}>I N S T R U C T I O N S</div>
        <div style={{margin: "25px"}}>
          <Information />
         </div>
    </div>
);
}
