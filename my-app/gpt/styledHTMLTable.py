# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import urljoin

# def scrape_and_save_table_with_styles(url, output_file):
#     response = requests.get(url)
    
#     if response.status_code == 200:
#         soup = BeautifulSoup(response.content, "html.parser")
        
#         # Extract tables and styles
#         tables = soup.find_all("table")
        
#         external_css_urls = []
#         inline_css = []
#         for link in soup.find_all("link", rel="stylesheet"):
#             css_url = link.get("href")
#             if css_url.startswith("/"):  # Check if it's a relative URL
#                 css_url = urljoin(url, css_url)  # Construct the complete URL
#             external_css_urls.append(css_url)
#         for style_tag in soup.find_all("style"):
#             inline_css.append(style_tag.get_text())
        
#         css_content = []
#         for css_url in external_css_urls:
#             css_response = requests.get(css_url)
#             if css_response.status_code == 200:
#                 css_content.append(css_response.text)
        
#         # Combine CSS content
#         all_css_content = "\n".join(css_content + inline_css)
        
#         # Combine HTML content
#         html_content = ""
#         for idx, table in enumerate(tables, 1):
#             html_content += f"<h2>Table {idx}</h2>\n"
#             html_content += str(table) + "\n"
        
#         # Create the complete HTML content
#         complete_html = f"""
#         <!DOCTYPE html>
#         <html>
#         <head>
#             <style>
#                 {all_css_content}
#             </style>
#         </head>
#         <body>
#             {html_content}
#         </body>
#         </html>
#         """
        
#         # Save the complete HTML content to a file
#         with open(output_file, "w", encoding="utf-8") as html_file:
#             html_file.write(complete_html)
        
#         print(f"Table and associated styles saved as '{output_file}'")
#     else:
#         print("Failed to fetch the webpage.")

# # Example usage:
# url = "https://www.eecs70.org/"  # Replace this with the URL of the website you want to scrape
# output_file = "table_with_styles.html"  # Output file name
# scrape_and_save_table_with_styles(url, output_file)
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

def scrape_and_save_table_with_styles(url, output_file):
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
            <link rel="stylesheet" href="styles.css">
        </head>
        <body>
            {html_content}
        </body>
        </html>
        """
        
        # Save the complete HTML content to a file
        with open(output_file, "w", encoding="utf-8") as html_file:
            html_file.write(complete_html)
        
        # Save the CSS content to a separate file
        with open("styles.css", "w", encoding="utf-8") as css_file:
            css_file.write(all_css_content)
        
        print(f"Table and associated styles saved as '{output_file}' and 'styles.css'")
    else:
        print("Failed to fetch the webpage.")

# Example usage:
url = "https://cs10.org/su23/"  # Replace this with the URL of the website you want to scrape
output_file = "table_with_styles.html"  # Output file name
scrape_and_save_table_with_styles(url, output_file)
