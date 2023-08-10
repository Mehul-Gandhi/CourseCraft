import requests
from bs4 import BeautifulSoup
from bs4 import Comment
from bs4 import Tag
from bs4 import NavigableString
import re
from bs4 import Comment
from urllib.parse import urljoin
import json

def scrape_and_save_table_with_styles(url):
    response = requests.get(url)
    if response.status_code == 200:
        soup = BeautifulSoup(response.content, "html.parser")

        # Extract tables and styles
        tables = soup.find_all("table")

        external_css_urls = []
        inline_css = []
        for link in soup.find_all("link", rel="stylesheet"):
            css_url = link.get("href")
            if css_url.startswith("/"):  # Check if it's a relative URL
                css_url = urljoin(url, css_url)  # Construct the complete URL
            external_css_urls.append(css_url)
        for style_tag in soup.find_all("style"):
            inline_css.append(style_tag.get_text())

        css_content = []
        for css_url in external_css_urls:
            css_response = requests.get(css_url)
            if css_response.status_code == 200:
                css_content.append(css_response.text)

        # Combine CSS content
        all_css_content = "\n".join(css_content + inline_css)

        # Combine HTML content
        html_content = ""
        for idx, table in enumerate(tables, 1):
            html_content += f"<h2>Table {idx}</h2>\n"
            html_content += str(table) + "\n"

        # Create the complete HTML content
        complete_html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="../../styles/CompareSchedule.css">
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """

        # Save the complete HTML content to a file
        with open("old_course.html", "w", encoding="utf-8") as html_file:
            html_file.write(complete_html)

        # Save the CSS content to a separate file
        with open("../../styles/CompareSchedule.css", "w", encoding="utf-8") as css_file:
            css_file.write(all_css_content)

        print(f"Table and associated styles saved as 'old_course.html' and '../styles/CompareSchedule.css'")
    else:
        print("Failed to fetch the webpage.")

def save_mapping_to_file(variables, filename='mapping.txt'):
    with open(filename, 'w', encoding='utf-8') as file:
        for key, value in variables.items():
            value = value.replace('\n', '↵').replace('\t', 'τ')  # Encode line breaks and tabs
            file.write(f"{key}: {value}\n")


def save_mapping_to_json(data, json_file_path):
    with open(json_file_path, 'w', encoding='utf-8') as file:
        json.dump(data, file, ensure_ascii=False, indent=4)


def write_to_file(content, file_path):
    with open(file_path, 'w', encoding='utf-8') as file:
        file.write(content)

def create_fstring_representation():
    file_path = "old_course.html"
    with open(file_path, 'r', encoding='utf-8') as file:
        html_content = file.read()

    soup = BeautifulSoup(html_content, 'html.parser')

    # Remove all the anchors href attributes
    for a_tag in soup.find_all("a"):
        a_tag.attrs['href'] = "#"

    # Extract dates and replace with placeholders in the cells
    date_texts = []
    for idx, cell in enumerate(soup.select("table td:nth-child(1), table th:nth-child(1)")):
        
        # Remove comments within the cell
        for comment in cell.find_all(text=lambda text: isinstance(text, Comment)):
            comment.extract()
        
        # Replace <br/> tags with the special symbol '↵'
        for br in cell.find_all("br"):
            br.replace_with("↵")
        
        # Extract just the text content from the cell and strip whitespace
        content = cell.get_text(strip=True)
        
        # Replace newline and tab characters with special symbols
        cleaned_content = content.replace('\n', '↵').replace('\t', 'τ')
        
        date_texts.append(cleaned_content)
        
        # Now, replace the cell's content with the f-string variable placeholder
        cell.clear()
        cell.string = "{" + f"_{idx}" + "}"

    variables = {f"_{index}": text for index, text in enumerate(date_texts)}

    f_string_template = str(soup)
    save_mapping_to_file(variables, 'mapping.txt')
    save_mapping_to_json(variables, 'mapping.json')
    write_to_file(f_string_template, 'template.html')
    #return f_string_template, variables


def fill_fstring_template_from_mapping(f_string_template, mapping_file):
    with open(mapping_file, 'r', encoding='utf-8') as file:
        mappings = {}
        for line_number, line in enumerate(file, 1):
            line = line.strip()
            if ": " in line:
                key, value = line.split(": ", 1)
                value = value.replace('↵', '<br>').replace('τ', '\t')  # Replace "↵" with <br> and 'τ' with tabs
            elif line.endswith(':'):
                key, value = line[:-1], ""
            else:
                print(f"Error parsing line {line_number}: {line}. Expected format 'key: value'.")
                continue
            mappings[key] = value

    filled_html = f_string_template.format(**mappings)
    return filled_html




def read_from_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as file:
        return file.read()


def writeModifiedCourse():
    loaded_template = read_from_file('template.html')
    filled_html = fill_fstring_template_from_mapping(loaded_template, 'mapping.txt')
    with open("modified_course.html", "w", encoding="utf-8") as file:
        file.write(filled_html)

# Example usage:
url = "https://www.eecs70.org/"  # Replace this with the URL of the website you want to scrape
scrape_and_save_table_with_styles(url)
create_fstring_representation()
writeModifiedCourse()