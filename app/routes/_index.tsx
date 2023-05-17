import { useEffect, useState } from "react";
import { Link } from "@remix-run/react";
import type { ChangeEvent, FormEvent } from "react";
import type { V2_MetaFunction } from "@remix-run/node";
import type { Note } from "~/types/Note";
import StorageService from "~/services/StorageService";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Brain dump | Home" }];
};

export default function Index() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const loadNotes = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const json = JSON.parse(await e.target.files[0].text());
      StorageService.setNotes(json);
      setNotes(json);
    }
  };

  const createNote = (e: FormEvent) => {
    e.preventDefault();
    StorageService.createNote(title, content);
    setNotes(StorageService.getNotes());
    setTitle("");
    setContent("");
  };

  const exportNotes = () => {
    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(notes)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "notes.json";
    a.click();
  };

  useEffect(() => {
    const localNotes = StorageService.getNotes();
    if (localNotes) {
      setNotes(localNotes);
    }
  }, []);

  return (
    <main>
      <form onSubmit={createNote}>
        <input
          placeholder="Title"
          required
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <textarea
          placeholder="Content"
          required
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
        <button type="submit">Create</button>
      </form>
      <b>Notes:</b>
      {notes.map((note: Note, i: number) => {
        return (
          <Link key={i} to={"/note/" + note.id}>
            {note.title}
          </Link>
        );
      })}
      <div>
        <button type="button" onClick={exportNotes}>
          Export
        </button>
        <input type="file" accept=".json" onChange={(e) => loadNotes(e)} />
      </div>
    </main>
  );
}
