// src/services/notesService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/notes'; // Change port if necessary

// Fetch all notes
export const getNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    return [];
  }
};

// Fetch note by ID
export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note:', error);
    return null;
  }
};

// Create a new note
export const createNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    return null;
  }
};

// Update an existing note
export const updateNote = async (id, note) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, note);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    return null;
  }
};

// Delete a note
export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting note:', error);
  }
};
