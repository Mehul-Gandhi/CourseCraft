import React from 'react';
import { List, ListItem, ListItemButton } from '@mui/material';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import GridOnIcon from '@mui/icons-material/GridOn';
import BookIcon from '@mui/icons-material/Book';
import ArticleIcon from '@mui/icons-material/Article';


function Information() {
    const elements = [
        [ArticleIcon, "Input Website & Current Schedule", "Drag and drop your file into the toolbox above to begin. Word, Excel, PPT and image files will convert to PDF format. PDF files will convert to the file type you choose."],
        // Fill the rest of the arrays similar to above
      ];
    return (
      <div className="grid grid-cols-2 grid-rows-3 gap-4">
        {elements.map((el, index) => {
          const Icon = el[0]; // extract the icon component
          const title = el[1];
          const description = el[2];
  
          return (
            <div key={index} className="border border-gray-300 p-4">
              <Icon className="mb-2" />
              <h2 className="text-lg font-semibold mb-2">{title}</h2>
              <p className="text-sm">{description}</p>
            </div>
          );
        })}
      </div>
    );
  }
  
 
  
  
  
  

  
export default function Instructions() {



    return (<div className="App flex flex-col items-center justify-center h-screen w-screen  md:h-auto ">
            <div className="bg-[#FFB81C] w-full md:w-1/2 h-50 rounded-full flex items-center justify-center p-4">
                <div>
                    Our program takes in the following inputs:
                    <List>
                        <ListItem><CalendarMonthIcon /> Current Course Calendar (.xlsx, .txt from website)</ListItem>
                        <ListItem><GridOnIcon /> Master Course Logistics Spreadsheet (.xlsx, .csv)</ListItem>
                        <ListItem><BookIcon /> Instructor/TA Handbook (.doc, .docx, .pdf)</ListItem>
                        <ListItem><ArticleIcon /> Additional Documentation</ListItem>
                    </List>
                    <div>Accepted formats: .pdf,.csv, .xlsx</div>
                </div>
            </div>
            <div className="text-[#FFB81C] font-inter text-3xl"  style={{ marginTop: '50px'}}>I N S T R U C T I O N S</div>
            <Information />

        </div>
    )
}
