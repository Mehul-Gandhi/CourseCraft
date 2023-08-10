import openai
import json
import webVariables
import academicCalendars
#import constants
#Given the current holiday calendar and schedule, update it to next year with this new holiday calendar. Base the holidays off of the new calendar dates and the new calendar schedule

from classes import details
current_year = webVariables.YEAR

current_holidays = json.dumps(academicCalendars.calendarJSON["Fall 2023"])
class_details = details()

#print(holidays)
print(current_holidays)
#print(schedule_table)

session_value = class_details.get("Session", "")
if "Summer" in session_value:
    summerSession = "Session C" if "Session C" in session_value else None
else:
    summerSession = ""

session_value = class_details.get("Session", "")
if "Fall" in session_value:
    term = "Fall"
elif "Summer" in session_value:
    term = "Summer"
elif "Spring" in session_value:
    term = "Spring"
else:
    term = ""

course_details_value = class_details.get("Course Details", "")
course = course_details_value.split(" - ")[0]

role = "You are developing a course schedule for a class at University of California, Berkeley for the Computer Science department."
courseDescription = " Here is the current description of the class at UC Berkeley as a JSON. Class:" + json.dumps(class_details)
#course = "CS70"             #TODO edit fstring to have the proper term and stuff
#term = "summer"             #TODO edit fstring to have the proper term and stuff
future_year = "2024"        #TODO edit fstring to have the proper term and stuff
#summerSession = "Session C" #TODO edit fstring to have the proper term and stuff
#print(course)
#print(term)
#print(summerSession)

newTableGeneration = f"Generate a course calendar for the {term} {future_year} {course} class based on the current calendar here: schedule which was provided before, but then update it to follow the {future_year} List of summer session dates, where {course} is Session type: {summerSession}. The important things to update for the new schedule are the start date, end date, and if there are any holidays that would cause the schedule to be shifted. Output for me: A table with the following headers: Week, Date, Lecture, Lab, Discussion, again, which is updated for the {future_year} {term} {summerSession}. Do not simply repeat the previous semester's calendar."

messages=[
    {"role" : "system", "content": role + courseDescription},
    {"role" : "user", "content" : courseDescription},
    {"role" : "assistant", "content" : courseDescription},
    {"role" : "user", "content" : "Given the current course calendar outline for " + term + " " + "2024" + " " + newTableGeneration + "output the table formatted as a csv."}
]
# openai.api_key = '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'

# response = openai.ChatCompletion.create(
#     model = "gpt-3.5-turbo-16k",
#     messages = messages
# )

# with open('response.txt', 'w') as f:
#     f.write(response['choices'][0]['message']['content'])

#Get the URL for the previous semester iteration of the course (If planning for Fall 2023, look for Fall 2022's course calendar)
#Run the ultimate.py (Lines 153/154, creating styled table and creating fstring representation) with the past (Fall 2022's) calendar to generate a json/mapping.txt (whichever is more convenient)
#Once the json/txt is generated, prompt OpenAI's API with the compressed calendar data, as well as the JSON that contains that year's start/end date & holidays (See academicCalendars.py for the list of academic calendars)
#Ask the bot to make a future json/txt mapping for the new semester, and also give it the new academic semester dates/deadlines
#Make sure to prompt the bot to only give back the JSON/txt and nothing else.
#Create a new function which goes through the json/new txt file, (OR just use modify_mapping_file to take in a new txt file)
#Execute lines 184/185 to generate a new file
#Display the new, modified HTML as you so please