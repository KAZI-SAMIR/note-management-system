
from flask import Flask, jsonify, render_template, request
from flask_restful import Api, Resource
import json
import redis

app = Flask(__name__)
api = Api(app)

# Create a Redis client instance
redis_client = redis.Redis(host='localhost', port=6379, db=0)

# Load notes from Redis or JSON file
def load_notes():
    notes_data = redis_client.get('notes')
    if notes_data is None:
        with open('notes.json') as file:
            notes = json.load(file)
            redis_client.set('notes', json.dumps(notes))
            return notes
    else:
        return json.loads(notes_data)

# Save notes to Redis
def save_notes(notes):
    redis_client.set('notes', json.dumps(notes))

class Notes(Resource):
    def get(self):
        return jsonify(load_notes())

class NotesByCategoryTopic(Resource):
    def get(self, category, topic, index=None):
        notes = load_notes()
        if category in notes and topic in notes[category]:
            if index is None:
                return jsonify(notes[category][topic])
            else:
                notes_list = notes[category][topic]
                if index >= 1 and index <= len(notes_list):
                    note = notes_list[index - 1]
                    return jsonify({"note": note})
                else:
                    return {"error": "Invalid note index"}, 404
        else:
            return {"error": "Category or topic not found"}, 404

    def post(self, category, topic):
        note = request.json.get('note')
        if note:
            notes = load_notes()
            if category in notes and topic in notes[category]:
                notes[category][topic].append(note)
            else:
                return {"error": "Category or topic not found"}, 404
            save_notes(notes)
            return {"message": "Note added successfully"}
        else:
            return {"error": "Invalid note data"}, 400

    def put(self, category, topic, index):
        note = request.json.get('note')
        if note:
            notes = load_notes()
            if category in notes and topic in notes[category]:
                notes_list = notes[category][topic]
                if index >= 1 and index <= len(notes_list):
                    notes_list[index - 1] = note
                    save_notes(notes)
                    return {"message": "Note updated successfully"}
                else:
                    return {"error": "Invalid note index"}, 404
            else:
                return {"error": "Category or topic not found"}, 404
        else:
            return {"error": "Invalid note data"}, 400

    def delete(self, category, topic, index):
        notes = load_notes()
        if category in notes and topic in notes[category]:
            notes_list = notes[category][topic]
            if index >= 1 and index <= len(notes_list):
                del notes_list[index - 1]
                save_notes(notes)
                return {"message": "Note deleted successfully"}
            else:
                return {"error": "Invalid note index"}, 404
        else:
            return {"error": "Category or topic not found"}, 404

api.add_resource(Notes, '/api/notes')
api.add_resource(NotesByCategoryTopic, '/api/notes/<string:category>/<string:topic>', '/api/notes/<string:category>/<string:topic>/<int:index>')

@app.route('/', methods=['GET'])
def index():
    categories = load_notes().keys()
    return render_template('index.html', categories=categories, notes=load_notes())

if __name__ == '__main__':
    app.run(debug=True)
