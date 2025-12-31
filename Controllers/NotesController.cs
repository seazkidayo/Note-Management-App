using Microsoft.AspNetCore.Mvc;
using NoteManagementApp.Data;
using NoteManagementApp.Models;

namespace NoteManagementApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly NoteRepository _noteRepository;

        public NotesController()
        {
            _noteRepository = new NoteRepository();
        }

        // GET: api/notes
        [HttpGet]
        public ActionResult<IEnumerable<Note>> GetNotes()
        {
            return Ok(_noteRepository.GetAll());
        }

        // GET: api/notes/{id}
        [HttpGet("{id}")]
        public ActionResult<Note> GetNoteById(int id)
        {
            var note = _noteRepository.GetById(id);
            if (note == null)
            {
                return NotFound();
            }
            return Ok(note);
        }

        // POST: api/notes
        [HttpPost]
        public ActionResult<Note> CreateNote([FromBody] Note note)
        {
            if (note == null)
            {
                return BadRequest();
            }

            var createdNote = _noteRepository.Create(note);
            return CreatedAtAction(nameof(GetNoteById), new { id = createdNote.Id }, createdNote);
        }

        // PUT: api/notes/{id}
        [HttpPut("{id}")]
        public ActionResult<Note> UpdateNote(int id, [FromBody] Note note)
        {
            if (note == null || id != note.Id)
            {
                return BadRequest();
            }

            var updatedNote = _noteRepository.Update(id, note);
            if (updatedNote == null)
            {
                return NotFound();
            }

            return Ok(updatedNote);
        }

        // DELETE: api/notes/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteNote(int id)
        {
            var isDeleted = _noteRepository.Delete(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
