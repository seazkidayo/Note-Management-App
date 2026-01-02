import axios from 'axios';

// Define the base URL for the API
const API_URL = process.env.REACT_APP_API_URL;

// Get all notes
export const getNotes = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching notes:', error);
    throw error;
  }
};

// Get a note by ID
export const getNoteById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching note:', error);
    throw error;
  }
};

// Create a new note
export const createNote = async (note) => {
  try {
    const response = await axios.post(API_URL, note);
    return response.data;
  } catch (error) {
    console.error('Error creating note:', error);
    throw error;
  }
};

// Update an existing note
export const updateNote = async (id, note) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, note);
    return response.data;
  } catch (error) {
    console.error('Error updating note:', error);
    throw error;
  }
};

// Delete a note by ID
export const deleteNote = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting note:', error);
    throw error;
  }
};
