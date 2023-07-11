
import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'http://localhost:5000/api';

function NoteMS() {
  const [notes, setNotes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [topics, setTopics] = useState([]);
  const [category, setCategory] = useState('');
  const [topic, setTopic] = useState('');
  const [note, setNote] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [editCategory, setEditCategory] = useState('');
  const [editTopic, setEditTopic] = useState('');
  const [editNote, setEditNote] = useState('');

  // Fetch all notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes`);
      const data = await response.json();
      setNotes(data);
      setCategories(Object.keys(data));
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setTopics(Object.keys(notes[selectedCategory]));
  };

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (category && topic && note) {
      try {
        const response = await fetch(`${API_BASE_URL}/notes/${category}/${topic}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ note }),
        });
        console.log(response.data);
        setCategory('');
        setTopic('');
        setNote('');
        fetchNotes();
      } catch (error) {
        console.error('Error adding note:', error);
      }
    }
  };

  const handleNoteDelete = async (category, topic, index) => {
    try {
      const response = await fetch(`${API_BASE_URL}/notes/${category}/${topic}/${index + 1}`, {
        method: 'DELETE',
      });
      console.log(response.data);
      fetchNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleNoteEdit = (category, topic, index) => {
    const selectedNote = notes[category][topic][index];
    setEditIndex(index);
    setEditCategory(category);
    setEditTopic(topic);
    setEditNote(selectedNote);
  };

  const handleNoteUpdate = async (e) => {
    e.preventDefault();
    if (editCategory && editTopic && editNote && editIndex !== null) {
      try {
        const response = await fetch(
          `${API_BASE_URL}/notes/${editCategory}/${editTopic}/${editIndex + 1}`,
          {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ note: editNote }),
          }
        );
        console.log(response.data);
        setEditIndex(null);
        setEditCategory('');
        setEditTopic('');
        setEditNote('');
        fetchNotes();
      } catch (error) {
        console.error('Error updating note:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Note Management</h1>

      {/* Note Form */}
      <form onSubmit={handleNoteSubmit} className="mb-4">
        <div className="flex items-center mb-2 max-w-lg mx-auto">
          <select
            value={category}
            onChange={handleCategoryChange}
            className="w-1/4 px-3 py-2 mr-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-1/4 px-3 py-2 mr-2 border rounded"
          >
            <option value="">Select Topic</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-1/2 px-3 py-2 mr-2 border rounded"
          />
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Add Note
          </button>
        </div>
      </form>

      {/* Notes List */}
      <div>
        {Object.entries(notes).map(([category, topics]) => (
          <div key={category} className="mb-4">
            <h1 className="text-xl font-bold mb-4 mt-12">({category})</h1>
            {Object.entries(topics).map(([topic, notesList]) => (
              <div key={topic} className="mb-2">
                <h3 className="text-lg font-semibold mb-2">{topic}:</h3>
                {notesList.map((note, index) => (
                  <div key={index} className="flex items-center mb-1">
                    <span className="mr-2">{index + 1}.</span>
                    {editIndex === index && editCategory === category && editTopic === topic ? (
                      <input
                        type="text"
                        value={editNote}
                        onChange={(e) => setEditNote(e.target.value)}
                        className="w-2/3 px-3 py-2 mr-2 border rounded"
                      />
                    ) : (
                      <span className="mr-2">{note}</span>
                    )}
                    <button
                      onClick={() => handleNoteEdit(category, topic, index)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleNoteDelete(category, topic, index)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                    {editIndex === index && editCategory === category && editTopic === topic && (
                      <button
                        onClick={handleNoteUpdate}
                        className="px-2 py-1 bg-green-500 text-white rounded ml-2"
                      >
                        Update
                      </button>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoteMS;



