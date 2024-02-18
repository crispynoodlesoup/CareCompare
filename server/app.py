from flask import Flask, request
from flask_cors import CORS
from extractor import parseandgather

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/imgProcessing", methods=['POST'])
def imgProcessing():
    if 'file' not in request.files:
        return 'no file'
    file = request.files['file']
    if file.filename == '':
        return 'no selected file'
    return parseandgather(file)