import requests
from bs4 import BeautifulSoup
import json
import openai 
openai.api_key = "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"


year = 2023
semester = "summer"
department = "compsci"
code = "61a"
url = f"https://classes.berkeley.edu/content/{year}-{semester}-{department}-{code}-001-lec-001"
response = requests.get(url)

soup = BeautifulSoup(response.text, 'html.parser')

# Now you can find elements by tag name, and class name. 
# For example, to find all 'div' elements with class 'content':

#handlebarData theme_is_whitehot
divs = soup.find_all('div', class_='handlebarData theme_is_whitehot')

# Extract and parse JSON from the data-json attribute
data_json = json.loads(divs[0]['data-json'])


course_details = {
    "Course Details": f"{data_json.get('class').get('course').get('displayName')} - {data_json.get('class').get('course').get('title')}",
    "Course Number": data_json.get("number"),
    "Program": data_json.get("academicOrganization").get("description"),
    "Instruction Mode": data_json.get("instructionMode").get("description"),
    "Description": data_json.get("displayName"),
    "Course description": data_json.get('course').get('description'),
    "Start Date": data_json.get("startDate"),
    "End Date": data_json.get("endDate"),
    "Enrollment Status": data_json.get("enrollmentStatus").get("status").get("description"),
    "Currently Enrolled Count": data_json.get("enrollmentStatus").get("enrolledCount"),
    "Maximum Enrollment Count": data_json.get("enrollmentStatus").get("maxEnroll"),
    "Attribute": [(attr.get('attribute').get('description'), attr.get('value').get('description')) 
                 for attr in data_json.get("sectionAttributes")],
    "Note": next((attr.get('value').get('formalDescription') for attr in data_json.get("sectionAttributes") 
                   if attr.get('attribute').get('formalDescription') == 'Class Notes'), None),
    "Email": next((attr.get('value').get('formalDescription').split(' ')[2] for attr in data_json.get("sectionAttributes") 
                   if attr.get('attribute').get('formalDescription') == 'Class Notes' and '@' in attr.get('value').get('formalDescription')), None),
    "Exams": [f"{exam.get('type').get('description')}: {exam.get('date')} from {exam.get('startTime')} to {exam.get('endTime')}" 
              for exam in data_json.get("exams")],
    "Important Notes": data_json.get("importantNotes")
}

def chat_with_chatgpt(prompt):
    response = openai.ChatCompletion.create(
        model="gpt-4",
        messages=[
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": prompt},
        ]
    )

    message = response["choices"][0]["message"]["content"]
    return message
'''
print(x := chat_with_chatgpt("Please show the information in the following format: Course Details,\
Course Number, Program, Instruction Mode, Description, Start Date, End Date, Enrollment Status,\
Currently Enrolled Count, Maximum Enrollment Count, Attribute, Note, Email, Exams, and Important Notes." + str(divs[0])))
'''


# # for div in divs:
# #     print(div)
