# Usage limit: 1,000,000 queries per day

# https://www.youtube.com/watch?v=YWcuVN2HbsE&list=PL3JVwFmb_BnTO_sppfTh3VkPhfDWRY5on&index=5&ab_channel=JieJenn

from pprint import pprint
from Google import Create_Service;

CLIENT_SECRET_FILE = 'client_secret_GoogleCloudDemo.json'
API_NAME = 'calendar'
API_VERSION = 'v3'
SCOPES = {'https://www.googleapis.com/auth/calendar'}

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)

# Use this service to create and delete a calendar
request_body = {
    'summary': 'San Francisco Events' 
}

"""
Create a Calendar
"""
response = service.calendars().insert(body=request_body).execute()
print(response)


"""
Delete a Calendar
"""
# service.calendars().delete(calendarID="xxx.calendar.google.com").execute()


"""
Get the Colors
"""
colorProfiles = service.colors().get().execute()
pprint(colorProfiles)
# Have color profiles from 1-10 and 1-24


response = service.calendarList().list(
    maxResults = 250,
    showDeleted = False,
    showHidden = False
).execute()

calendarItems = response.get('items')
nextPageToken = response.get('nextPageToken')

while nextPageToken:
    print('x')
    response = service.calendarList().list(
      maxResults = 250,
      showDeleted = False,
      showHidden = False
      pageToken = nextPageToken
    ).execute()
    calendarItems.extend(response.get('items'))
    nextPageToken = response.get('nextPageToken')

  # pprint(calendarItems)
