import { useState } from "react";
import type { FormEvent } from "react";
import StorageService from "~/services/StorageService";

export default function CreateModal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createNote = (e: FormEvent) => {
    StorageService.createNote(title, content);
    setTitle("");
    setContent("");
  };

  return (
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
  );
}
