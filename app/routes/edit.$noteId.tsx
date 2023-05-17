import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "@remix-run/react";
import type { FormEvent } from "react";
import type { LoaderArgs } from "@remix-run/node";
import StorageService from "~/services/StorageService";

export function loader({ params }: LoaderArgs) {
  return params.noteId;
}

export default function Index() {
  const noteId = useLoaderData<string>();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const save = (e: FormEvent) => {
    e.preventDefault();
    const note = { id: noteId, title: title, content: content };
    StorageService.editNote(note);
    navigate(`/note/${noteId}`);
  };

  useEffect(() => {
    const note = StorageService.getNote(noteId);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
    }
  }, [noteId]);

  return (
    <main>
      <h1>Edit {title}</h1>
      <form onSubmit={save}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
