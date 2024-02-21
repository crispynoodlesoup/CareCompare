from flask import Flask, request, jsonify
from flask_cors import CORS
from extractor import parseandgather
import requests

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

@app.route("/getNearbyAttorneys", methods=['GET'])
def getNearbyAttorneys():
    try:
        user_lat = float(request.args.get('lat'))
        user_lon = float(request.args.get('lon'))
        overpass_url = "https://overpass-api.de/api/interpreter"
        overpass_query = f"""
            [out:json];
            (
                node["office"="lawyer"](around:16000, {user_lat}, {user_lon});
            );
            out body;
        """
        response = requests.get(overpass_url, params={'data': overpass_query})
        data = response.json()
        attorneys = []
        for node in data.get('elements', []):
            attorney = {
                'id': node.get('id'),
                'lat': node.get('lat'),
                'lon': node.get('lon'),
                'name': node['tags'].get('name', 'Unnamed Attorney'),
                'email': node['tags'].get('contact:email', ''),
                'full_address': ', '.join(filter(None, [
                    node['tags'].get('addr:housenumber', ''),
                    node['tags'].get('addr:street', ''),
                    node['tags'].get('addr:unit', ''),
                    node['tags'].get('addr:postcode', ''),
                    node['tags'].get('addr:city', ''),
                    node['tags'].get('addr:state', ''),
                    node['tags'].get('addr:country', '')
                ]))
            }
            attorneys.append(attorney)
        attorneys = list(filter(lambda attorney: len(attorney["full_address"]) < 6 or attorney["email"] != "", attorneys))
        attorneys = attorneys[:9]
        return jsonify({'attorneys': attorneys})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)