# Usage limit: 1,000,000 queries per day

from pprint import pprint
from Google import Create_Service;

CLIENT_SECRET_FILE = 'client_secret_GoogleCloudDemo.json'
API_NAME = 'calendar'
API_VERSION = 'v3'
SCOPES = {'https://www.googleapis.com/auth/calendar'}

service = Create_Service(CLIENT_SECRET_FILE, API_NAME, API_VERSION, SCOPES)


# Use this service to create and delete a calendar
