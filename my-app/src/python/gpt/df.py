import requests
from bs4 import BeautifulSoup
import pandas as pd
import re

def get_table_from_url(url):
    response = requests.get(url)
    response.raise_for_status()
    soup = BeautifulSoup(response.content, 'html.parser')
    table = soup.find('table')
    df = pd.read_html(str(table))[0]
    return df
def dataframe_to_html(df):
    return df.to_html(index=False)
def save_html_to_file(html_content, filename="output.html"):
    with open(filename, "w", encoding="utf-8") as file:
        file.write(html_content)
      
def get_file_name(url, file_extension):
    match = re.search(r'https:\/\/(\w+)\.org', url)
    file_name =''
    if match:
        file_name = match.group(1) + 'table' + file_extension
    else:
        file_name = 'table' + file_extension
    return file_name


def driver(url):                        #Pass in the course url to get all the stuff
    df = get_table_from_url(url)
    file_name = 'output_table.csv'#get_file_name(url, '.csv')
    df.to_csv(file_name, encoding='utf-8', index=False)
    html_table = dataframe_to_html(df)
    file_name = get_file_name(url, '.html')
    save_html_to_file(html_table, file_name)

# Example usage:
# url = 'https://cs10.org/su23/'
# df = get_table_from_url(url)
# file_name = 'output_table.csv'#get_file_name(url, '.csv')
# df.to_csv(file_name, encoding='utf-8', index=False)

# # Save html website code in a file
# html_table = dataframe_to_html(df)
# file_name = get_file_name(url, '.html')
# save_html_to_file(html_table, file_name)
