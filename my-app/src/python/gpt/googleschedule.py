import pandas as pd
import numpy as np
from datetime import datetime
import re
from ics import Calendar, Event
import pytz
import json
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
fixed_redirect_uri = 'http://localhost:64180/'
# Set up the OAuth 2.0 flow with the fixed redirect URI
flow = InstalledAppFlow.from_client_secrets_file('credentials.json', ['https://www.googleapis.com/auth/calendar'], redirect_uri=fixed_redirect_uri)
credentials = flow.run_local_server(port=64180)
# Set up the API credentials (replace 'credentials.json' with your credentials file)
# flow = InstalledAppFlow.from_client_secrets_file('credentials.json', ['https://www.googleapis.com/auth/calendar'])
# credentials = flow.run_local_server(port=0)
# Create a service instance to access Google Calendar API
service = build('calendar', 'v3', credentials=credentials)


# Open the JSON file for reading
with open("cs70details.json", "r") as file:
    data = json.load(file)

course_details = data["Course Details"]
course_number = data["Course Number"]
session = data["Session"]
program = data["Program"]
instructor_names = data["Instructor Names"]
instruction_mode = data["Instruction Mode"]
description = data["Description"]
course_description = data["Course description"]
location = data["Lecture Room"]
lecture_meet_days = data["Lecture Meet Days"]
start_date = data["Start Date"]
end_date = data["End Date"]
lecture_start_time = data["Start Time"]
lecture_end_time = data["End Time"]
enrollment_status = data["Enrollment Status"]
currently_enrolled_count = data["Currently Enrolled Count"]
maximum_enrollment_count = data["Maximum Enrollment Count"]
attribute = data["Attribute"]
note = data["Note"]
email = data["Email"]
exams = data["Exams"]
important_notes = data["Important Notes"]


def dataframe_to_events(df):
    # Events to be added to google calendar tracked here
    events = []

    # LECTURES TO EVENTS
    df.columns = df.columns.str.lower()
    constant_columns = ['week', 'date', 'lecture']

    year = int(re.search(r'(\d{4})', session).group(1))
    course_title = re.search(r'(\w+ \d{1,3})', course_details).group(1)
    pst = pytz.timezone('America/Los_Angeles')

    # Split the time strings and convert to integers
    start_hour, start_minute, start_second = map(int, lecture_start_time.split(':'))
    end_hour, end_minute, end_second = map(int, lecture_end_time.split(':'))
    
    for _, row in df.iterrows():
        lecture = row['lecture'].lower()

        # Skip creating an event if the lecture title contains specific phrases
        if 'no lecture' in lecture or 'no' in lecture or 'holiday' in lecture:
            continue

        description = ''
        description += f"{course_details}\n\n"
        description += f"Location: {location}\n"
        description += f"Lecture Days: {lecture_meet_days}\n\n"
        
        # take all remaining columns and put that into the description
        for col in df.columns:
            if col not in constant_columns: 
                if (not pd.isna(row[col])):   
                  col_capitalized = col.capitalize()
                  description += f"{col_capitalized}: {row[col]}\n\n"

        # Get the lecture date
        match = re.search(r"\d{1,2}\/\d{1,2}", row['date'])
        if match:
            date_str = match.group()
        else:
            date_str = None
        
        month, day = map(int, date_str.split('/'))
        starttime_obj = datetime(year, month, day, start_hour, start_minute).replace(tzinfo=pst)
        endtime_obj = datetime(year, month, day, end_hour, end_minute).replace(tzinfo=pst)

        starttime_iso = starttime_obj.isoformat()
        endtime_iso = endtime_obj.isoformat()

        event = {
            'summary': f"{course_title} Lecture {row['lecture']}",
            'description': description,
            'location': location,
            'start': {
                'dateTime': starttime_iso,
                'timeZone': 'America/Los_Angeles',
            },
            'end': {
                'dateTime': endtime_iso,
                'timeZone': 'America/Los_Angeles',
            },
            'reminders': {
                'useDefault': False,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                ],
            },
        }
        events.append(event)
    
    # EXAMS to events
    unique_exams = list(set(exams))
    # Sort the list for better readability
    unique_exams.sort()


    for exam in unique_exams:
        exam_type = re.search(r'(\w+(-)?\w+ Exam):', exam).group(1)
        exam_date = re.search(r'(\d{4}-\d{2}-\d{2})', exam).group(1)

        exam_start_time = re.search(r'from (\d{2}:\d{2}:\d{2})', exam).group(1)
        exam_end_time = re.search(r'to (\d{2}:\d{2}:\d{2})', exam).group(1)

        # Split the time strings and convert to integers
        start_hour, start_minute, start_second = map(int, exam_start_time.split(':'))
        end_hour, end_minute, end_second = map(int, exam_end_time.split(':'))

        year, month, day = map(int, exam_date.split('-'))
        starttime_obj = datetime(year, month, day, start_hour, start_minute).replace(tzinfo=pst)
        endtime_obj = datetime(year, month, day, end_hour, end_minute).replace(tzinfo=pst)

        starttime_iso = starttime_obj.isoformat()
        endtime_iso = endtime_obj.isoformat()

        event = {
            'summary': f"{course_title} {exam_type}",
            'description': description,
            'location': location,
            'start': {
                'dateTime': starttime_iso,
                'timeZone': 'America/Los_Angeles',
            },
            'end': {
                'dateTime': endtime_iso,
                'timeZone': 'America/Los_Angeles',
            },
            'reminders': {
                'useDefault': False,
                'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                ],
            },
        }
        events.append(event)

    return events

"""
Run examples below here
"""
df = pd.read_csv('cs10table.csv')
# Week,Date,Lecture,Reading,Section,Assignments
events = dataframe_to_events(df)
print(events)
for event in events:
    # Google Calendar API calls here
    event = service.events().insert(calendarId='primary', body=event).execute()
    print(f'Event created: {event.get("htmlLink")}')


    #print 'Event created: %s' % (event.get('htmlLink'))
# with open("output.txt", "w") as file:
#     file.write(output)
# print("Output written to output.txt")