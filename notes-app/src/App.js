import React, { useState, useEffect } from 'react';
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote
} from './services/notesService';  // Import the service functions

import './App.css'; // Import the styling

const App = () => {
  // State to hold the list of notes
  const [notes, setNotes] = useState([]);
  // State to hold the data for new/updated note
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const [editNote, setEditNote] = useState(null);

  // Fetch the notes when the app loads
  useEffect(() => {
    fetchNotes();
  }, []);

  // Fetch all notes
  const fetchNotes = async () => {
    try {
      const data = await getNotes(); // Call the service function to get notes
      setNotes(data);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  // Handle creating a new note
  const handleCreateNote = async () => {
    try {
      if (!newNote.title || !newNote.content) {
        alert('Title and content are required!');
        return;
      }
      const createdNote = await createNote(newNote); // Call the service function to create note
      setNotes([...notes, createdNote]);
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error creating note:', error);
    }
  };

  // Handle editing a note
  const handleEditNote = (note) => {
    setEditNote(note);
    setNewNote({ title: note.title, content: note.content });
  };

  // Handle updating a note
  const handleUpdateNote = async () => {
    try {
      if (!newNote.title || !newNote.content) {
        alert('Title and content are required!');
        return;
      }
      const updatedNote = await updateNote(editNote.id, newNote); // Call the service function to update note
      const updatedNotes = notes.map(note =>
        note.id === editNote.id ? updatedNote : note
      );
      setNotes(updatedNotes);
      setEditNote(null);
      setNewNote({ title: '', content: '' });
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  // Handle deleting a note
  const handleDeleteNote = async (id) => {
    try {
      await deleteNote(id); // Call the service function to delete note
      setNotes(notes.filter(note => note.id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="App">
      <h1>Notes App</h1>

      {/* Create/Update Note Form */}
      <div>
        <h2>{editNote ? 'Edit Note' : 'Create New Note'}</h2>
        <input
          type="text"
          placeholder="Title"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={newNote.content}
          onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
        />
        <button onClick={editNote ? handleUpdateNote : handleCreateNote}>
          {editNote ? 'Update Note' : 'Create Note'}
        </button>
      </div>

      {/* Display Notes */}
      <div>
        <h2>All Notes</h2>
        <ul>
          {notes.map(note => (
            <li key={note.id}>
              <h3>{note.title}</h3>
              <p>{note.content}</p>
              <button onClick={() => handleEditNote(note)}>Edit</button>
              <button onClick={() => handleDeleteNote(note.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;