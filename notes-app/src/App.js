import logo from './logo.svg';
import './App.css';

// src/App.js
import React, { useState, useEffect } from 'react';
import { getNotes, createNote, deleteNote, updateNote } from './services/notesService';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [editedNote, setEditedNote] = useState({ id: null, text: '' });

  // Fetch notes when the component mounts
  useEffect(() => {
    const fetchNotes = async () => {
      const notes = await getNotes();
      setNotes(notes);
    };
    fetchNotes();
  }, []);

  // Handle adding a new note
  const handleAddNote = async () => {
    if (newNote.trim()) {
      const createdNote = await createNote({ text: newNote });
      if (createdNote) {
        setNotes([...notes, createdNote]);
        setNewNote('');
      }
    }
  };

  // Handle editing a note
  const handleEditNote = async () => {
    if (editedNote.text.trim()) {
      const updatedNote = await updateNote(editedNote.id, { text: editedNote.text });
      if (updatedNote) {
        setNotes(notes.map(note => (note.id === updatedNote.id ? updatedNote : note)));
        setEditedNote({ id: null, text: '' });
      }
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (id) => {
    await deleteNote(id);
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div>
      <h1>Notes App</h1>
      <div>
        <input
          type="text"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          placeholder="Add a new note"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>

      <h2>Edit Note</h2>
      {editedNote.id !== null && (
        <div>
          <input
            type="text"
            value={editedNote.text}
            onChange={(e) => setEditedNote({ ...editedNote, text: e.target.value })}
            placeholder="Edit the note"
          />
          <button onClick={handleEditNote}>Save</button>
        </div>
      )}

      <h2>Notes List</h2>
      <ul>
        {notes.map((note) => (
          <li key={note.id}>
            <p>{note.text}</p>
            <button onClick={() => setEditedNote({ id: note.id, text: note.text })}>
              Edit
            </button>
            <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;

