import type { Note } from "~/types/Note";

class StorageService {
  getNotes() {
    const notes = localStorage.getItem("notes");
    if (notes) {
      return JSON.parse(notes);
    }
  }

  setNotes(notes: Array<Note>) {
    const data = JSON.stringify(notes);
    localStorage.setItem("notes", data);
  }

  getNote(id: string): Note | null {
    const notes = this.getNotes();

    for (let i = 0; i < notes.length; i++) {
      const note = notes[i];
      if (note.id === id) {
        return note;
      }
    }

    return null;
  }

  createNote(title = "", content = "", tags = [], emoji = "🦀") {
    let notes = this.getNotes();
    const note = {
      id: crypto.randomUUID(),
      title: title,
      content: content,
      tags: tags,
      emoji: emoji,
    };

    if (notes) {
      notes.push(note);
    } else {
      notes = [note];
    }

    this.setNotes(notes);
  }

  deleteNote(id: string) {
    let notes = this.getNotes();

    notes.forEach((note: Note, i: number) => {
      if (note.id === id) {
        notes.splice(i, 1);
      }
    });

    this.setNotes(notes);
  }

  editNote(updatedNote: Note) {
    let notes = this.getNotes();

    notes.forEach((note: Note, i: number) => {
      if (note.id === updatedNote.id) {
        notes[i] = updatedNote;
      }
    });

    this.setNotes(notes);
  }
}

export default new StorageService();
