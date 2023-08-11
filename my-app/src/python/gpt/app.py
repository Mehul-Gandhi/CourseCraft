from flask import Flask, request, jsonify, send_file
import subprocess
import os

app = Flask(__name__)

@app.route('/new-website-calendar', methods=['POST'])
def run_script():
    try:
        script_path = os.path.join(os.path.dirname(__file__), 'driver.py')
        # Run the Python script using subprocess
        subprocess.run(['python', script_path], check=True)
        return jsonify({"message": "Script executed successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})
    
@app.route('/generate-google-calendar', methods=['POST'])
def run_script2():
    try:
        # Run the Python script using subprocess
        script_path = os.path.join(os.path.dirname(__file__), 'googleschedule.py')
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
    app.run(debug=True)
