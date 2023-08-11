from flask import Flask, request, jsonify
import subprocess
import os
import googleschedule
import df
import classes
from flask_cors import CORS  # Import the CORS library
# from googleschedule import exportEventsToCalendar

app = Flask(__name__)

CORS(app) 

@app.route('/export-to-calendar', methods=['POST'])
def export_to_calendar():
    try:
        googleschedule.exportEventsToCalendar()
        return jsonify({'message': 'Success'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500

@app.route('/create-csv', methods=['POST'])
def create_csv():
    try:
        data = request.get_json()
        url = data['url']
        df.driver(url)
        return jsonify({'message': 'Successfully created class JSON'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


@app.route('/new-website-calendar', methods=['POST'])
def run_script():
    try:
        script_path = os.path.join(os.path.dirname(__file__), 'driver.py')
        # Run the Python script using subprocess
        subprocess.run(['python', script_path], check=True)
        return jsonify({"message": "Script executed successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/download-ics', methods=['POST'])
def run_script3():
    try:
        # Generate the file (replace this with your script's logic)
        script_path = os.path.join(os.path.dirname(__file__), 'icsschedule.py')
        subprocess.run(['python', script_path], check=True)

        # Specify the path to the generated file
        generated_file_path = os.path.join(os.path.dirname(__file__), 'events.ics')

        # Return the file as response
        return send_file(
            generated_file_path,
            as_attachment=True,
            download_name='events.ics'
        )
    except Exception as e:
        return str(e)

if __name__ == '__main__':
    app.run(debug=True, port = 5000)
