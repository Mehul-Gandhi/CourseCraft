# import requests
# from bs4 import BeautifulSoup
# import pandas as pd

# url = "https://su23.cs161.org/"  # Replace this with the URL of the website you want to scrape

# response = requests.get(url)

# if response.status_code == 200:
#     soup = BeautifulSoup(response.content, "html.parser")
#     tables = soup.find_all("table")

#     if tables:
#         for idx, table in enumerate(tables, 1):
#             # Extract the table data into a list of lists
#             rows = []
#             for row in table.find_all("tr"):
#                 row_data = [cell.get_text(strip=True) for cell in row.find_all(["th", "td"])]
#                 rows.append(row_data)

#             # Convert the list of lists to a pandas DataFrame
#             headers = rows[0]
#             data = rows[1:]
#             df = pd.DataFrame(data, columns=headers)

#             # Save the DataFrame as an Excel file
#             file_name = f"table_{idx}.xlsx"
#             df.to_excel(file_name, index=False)
#             print(f"Table {idx} saved as '{file_name}'")

#     else:
#         print("No tables found on the page.")
# else:
#     print("Failed to fetch the webpage.")
