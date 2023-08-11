import json

fa22 = {
  "Fall 2022": {
    "Fall Semester Begins": "Wednesday, August 17, 2022",
    "Convocation": "To Be Determined",
    "Instruction Begins": "Wednesday, August 24, 2022",
    "Midpoint grading rosters open for instructors": "Monday, September 26–Wednesday, October 19, 2022 (9AM)",
    "Academic and Administrative Holiday": "Monday, September 5, 2022",
    "Academic and Administrative Holiday": "Friday, November 11, 2022",
    "Non-Instructional Day": "Wednesday, November 23, 2022",
    "Academic and Administrative Holiday": "Thursday, November 24 & Friday, November 25, 2022",
    "Formal Classes End": "Friday, December 2, 2022",
    "Reading/Review/Recitation Week": "Monday, December 5–Friday, December 9, 2022",
    "Last Day of Instruction": "Friday, December 9, 2022",
    "Final Examinations": "Monday, December 12–Friday, December 16, 2022",
    "Fall Semester Ends": "Friday, December 16, 2022",
    "Winter Commencement": "Saturday, December 17, 2023",
    "Academic and Administrative Holiday": "Friday, December 23 & Monday, December 26, 2022",
    "Academic and Administrative Holiday": "Friday, December 30 & Monday, January 2, 2023"
  }
}

sp23 = {
  "Spring 2023": {
    "Spring Semester Begins": "Tuesday, January 10, 2023",
    "Academic and Administrative Holiday": "Monday, January 16, 2023",
    "Instruction Begins": "Tuesday, January 17, 2023",
    "Academic and Administrative Holiday": "Monday, February 20, 2023",
    "Midpoint grading rosters open for instructors": "Tuesday, February 21–Tuesday, March 14, 2023 (11:59 (PM))",
    "Spring Recess": "Monday, March 27–Friday, March 31, 2023",
    "Academic and Administrative Holiday": "Friday, March 31, 2023",
    "Cal Day": "Saturday, April 22, 2023",
    "Formal Classes End": "Friday, April 28, 2023",
    "Reading/Review/Recitation Week": "Monday, May 1– Friday, May 5, 2023",
    "Last Day of Instruction": "Friday, May 5, 2023",
    "Golden Bear Welcome": "May 6, 2023",
    "Final Examinations": "Monday, May 8–Friday, May 12, 2023",
    "Spring Semester Ends": "Friday, May 12, 2023",
    "Commencement": "Saturday, May 13, 2023",
    "Academic and Administrative Holiday": "Monday, May 29, 2023"
  }
}

su23 = {
  "Summer 2023": {
    "Session A (Six Weeks) Begins": "Monday, May 22, 2023",
    "Academic and Administrative Holiday": "Monday, May 29, 2023",
    "Session B (Ten Weeks) Begins": "Monday, June 5, 2023",
    "Academic and Administrative Holiday": "Monday, June 19, 2023",
    "Session C (Eight Weeks) Begins": "Tuesday, June 20, 2023",
    "Academic and Administrative Holiday": "Tuesday, July 4, 2023",
    "Session A Ends": "Friday, June 30, 2023",
    "Session D (Six Weeks) Begins": "Monday, July 3, 2023",
    "Session F (Three Weeks) Begins": "Monday, July 3, 2023",
    "Academic and Administrative Holiday": "Tuesday, July 4, 2023",
    "Session F Ends": "Friday, July 21, 2023",
    "Session E (Three Weeks) Begins": "Monday, July 24, 2023",
    "Sessions B, C, D, and E End": "Friday, August 11, 2023"
  }
}

fa23 = {
  "Fall 2023": {
    "Fall Semester Begins": "Wednesday, August 16, 2023",
    "Convocation": "To Be Determined",
    "Instruction Begins": "Wednesday, August 23, 2023",
    "Academic and Administrative Holiday": "Monday, September 4, 2023",
    "Academic and Administrative Holiday": "Friday, November 10, 2023",
    "Non-Instructional Day": "Wednesday, November 22, 2023",
    "Academic and Administrative Holiday": "Thursday, November 23 & Friday, November 24, 2023",
    "Formal Classes End": "Friday, December 1, 2023",
    "Reading/Review/Recitation Week": "Monday, December 4–Friday, December 8, 2023",
    "Last Day of Instruction": "Friday, December 8, 2023",
    "Final Examinations": "Monday, December 11–Friday, December 15, 2023",
    "Fall Semester Ends": "Friday, December 15, 2023",
    "Winter Commencement": "To Be Determined, commencement.berkeley.edu",
    "Academic and Administrative Holiday++": "Monday, December 25 & Tuesday, December 26, 2023",
    "Academic and Administrative Holiday++": "Monday, January 1 & Tuesday, January 2, 2024"
  }
}

sp24 = {
  "Spring 2024": {
    "Spring Semester Begins": "Tuesday, January 9, 2024",
    "Academic and Administrative Holiday": "Monday, January 15, 2024",
    "Instruction Begins": "Tuesday, January 16, 2024",
    "Academic and Administrative Holiday": "Monday, February 19, 2024",
    "Spring Recess": "Monday, March 25–Thursday, March 28, 2024",
    "Academic and Administrative Holiday": "Friday, March 29, 2024",
    "Cal Day": "To Be Determined, calday.berkeley.edu",
    "Formal Classes End": "Friday, April 26, 2024",
    "Reading/Review/Recitation Week": "Monday, April 29–Friday, May 3, 2024",
    "Last Day of Instruction": "Friday, May 3, 2024",
    "Final Examinations": "Monday, May 6–Friday, May 10, 2024",
    "Spring Semester Ends": "Friday, May 10, 2024",
    "Commencement": "Saturday, May 11, 2024"
  }
}

su24 = {
  "SU24": {
    "Session A (Six Weeks) Begins": "Monday, May 20, 2024",
    "Academic and Administrative Holiday": "Monday, May 27, 2024",
    "Session B (Ten Weeks) Begins": "Monday, June 3, 2024",
    "Session C (Eight Weeks) Begins": "Monday, June 17, 2024",
    "Academic and Administrative Holiday": "Wednesday, June 19, 2024",
    "Session A Ends": "Friday, June 28, 2024",
    "Session D (Six Weeks) Begins": "Monday, July 1, 2024",
    "Session F (Three Weeks) Begins": "Monday, July 1, 2024",
    "Academic and Administrative Holiday": "Thursday, July 4, 2024",
    "Session F Ends": "Friday, July 19, 2024",
    "Session E (Three Weeks) Begins": "Monday, July 22, 2024",
    "Sessions B, C, D, and E End": "Friday, August 9, 2024"
  }
}

calendarJSON = {}
calendarJSON.update(fa22)
calendarJSON.update(sp23)
calendarJSON.update(su23)
calendarJSON.update(fa23)
calendarJSON.update(sp24)
calendarJSON.update(su24)

#print(calendarJSON)