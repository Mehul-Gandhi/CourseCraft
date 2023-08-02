import requests
from bs4 import BeautifulSoup
from datetime import datetime

"""
holiday.py contains a function `extract_holidays` that 
webscrapes the `url` and returns a dictionary of holidays
{holiday: date}, which will be used by chatGPT when chatGPT
creates a new schedule for a class in an upcoming semester.
"""



def extract_holidays(semester: str, year: int) -> dict:
    """
    Webscrapes academic holidays from "https://guide.berkeley.edu/academic-calendar/"
    and returns this in a dictionary.
    Params:
        semester (int): The semester to extract a dictionary of holidays from.
    Returns:
        dict: A dictionary of holidays.
    """
    assert type(semester) == str and type(year) == int, "Type error."
    assert semester in ["Fall", "Spring", "Summer"], "Semester must be either Fall, Spring, or Summer.\
        Your input semester:{semester} year: {int}"
    url = "https://guide.berkeley.edu/academic-calendar/"

    response = requests.get(url)

    soup = BeautifulSoup(response.text, 'html.parser')
    header = "Semester" if semester != "Summer" else "Sessions"
    try:
        semester_table = soup.find("h3", string=f"{semester} {header} {year}").find_next("table")
    except Exception as e:
        raise RuntimeError(f"Calendar not found. Perhaps this semester does not exist on {url}. Error message: {e}")
    if not semester_table:
        raise RuntimeError(f"Calendar not found. Perhaps this semester does not exist on {url}")
    
    holidays = {}
    for row in semester_table.find_all("tr"):
        columns = row.find_all("td")
        if len(columns) == 2:
            if semester == "Summer" and "Session" in columns[0].text: #If summer session, do not include session Start Dates
                continue
            else:
                event = columns[0].text.strip()
                date = columns[1].text.strip()
                # try:
                #     date_obj = datetime.strptime(date, "%A, %B %d, %Y")
                #     date = date_obj.strftime("%m/%d/%Y")
                # except:
                #     pass
                # finally:
                #     holidays[date] = event
                holidays[date] = event
    keys = ["Last Day of Instruction", "Cal Day", "Formal Classes End", "To Be Determined"]
    for key in keys:
        if key in holidays:
            del holidays[key]
    return holidays

table = extract_holidays("Fall", 2023)
