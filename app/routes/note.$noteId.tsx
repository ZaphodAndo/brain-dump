import { useEffect, useState } from "react";
import { Link, useLoaderData, useNavigate } from "@remix-run/react";
import type { LoaderArgs } from "@remix-run/node";
import type { Note } from "~/types/Note";
import StorageService from "~/services/StorageService";

export function loader({ params }: LoaderArgs) {
  return params.noteId;
}

export default function NotePage() {
  const noteId = useLoaderData<string>();
  const [note, setNote] = useState<Note>();
  const navigate = useNavigate();

  const deleteNote = () => {
    StorageService.deleteNote(noteId);
    navigate("/");
  };

  useEffect(() => {
    const note = StorageService.getNote(noteId);
    if (note) {
      setNote(note);
    }
  }, [noteId]);

  return (
    <main>
      <h1>{note?.title}</h1>
      <p>{note?.content}</p>
      <Link to={"/edit/" + note?.id}>Edit</Link>
      <button onClick={deleteNote}>Delete</button>
    </main>
  );
}
