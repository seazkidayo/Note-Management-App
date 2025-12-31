using NoteManagementApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace NoteManagementApp.Data;

public class NoteRepository
{
    private static List<Note> _notes = new List<Note>();
    private static int _nextId = 1;

    // Get all notes
    public IEnumerable<Note> GetAll()
    {
        return _notes;
    }

    // Get a note by ID
    public Note GetById(int id)
    {
        return _notes.FirstOrDefault(n => n.Id == id);
    }

    // Create a new note
    public Note Create(Note note)
    {
        note.Id = _nextId++;
        note.CreatedAt = DateTime.UtcNow;
        note.UpdatedAt = DateTime.UtcNow;
        _notes.Add(note);
        return note;
    }

    // Update an existing note
    public Note Update(int id, Note updatedNote)
    {
        var note = _notes.FirstOrDefault(n => n.Id == id);
        if (note != null)
        {
            note.Title = updatedNote.Title;
            note.Content = updatedNote.Content;
            note.UpdatedAt = DateTime.UtcNow;
            return note;
        }
        return null;
    }

    // Delete a note
    public bool Delete(int id)
    {
        var note = _notes.FirstOrDefault(n => n.Id == id);
        if (note != null)
        {
            _notes.Remove(note);
            return true;
        }
        return false;
    }
}

