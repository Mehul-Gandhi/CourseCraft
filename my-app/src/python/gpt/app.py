from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/run-script', methods=['POST'])
def run_script():
    try:
        # Run the Python script using subprocess
        subprocess.run(['python', 'path_to_your_script.py'], check=True)
        return jsonify({"message": "Script executed successfully"})
    except Exception as e:
        return jsonify({"error": str(e)})

if __name__ == '__main__':
    app.run(debug=True)
