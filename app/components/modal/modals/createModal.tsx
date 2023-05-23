import { useState } from "react";
import StorageService from "~/services/StorageService";

export default function CreateModal() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [tag, setTag] = useState("");
  const [emoji, setEmoji] = useState("");

  const addTag = () => {
    setTags([...tags, tag]);
  }

  const createNote = () => {
    StorageService.createNote(title, content, tags, emoji);
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
      <input placeholder="Tags" onChange={(e) => setTag(e.currentTarget.value)}/>
      <button type="button" onClick={addTag}>Add tag</button>
      <input placeholder="Emoji" value={emoji} onChange={(e) => setEmoji(e.currentTarget.value)}/>
      <button type="submit">Create</button>
    </form>
  );
}
