import { useState } from "react";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import StorageService from "~/services/StorageService";
import styles from "~/styles/create.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Brain dump | Create" }];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Index() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState<Array<string>>([]);
  const [tag, setTag] = useState("");
  const [emoji, setEmoji] = useState("");

  const addTag = () => {
    setTags([...tags, tag]);
  };

  const createNote = () => {
    StorageService.createNote(title, content, tags, emoji);
  };

  return (
    <main>
      <h1>Brain dump</h1>
      <form onSubmit={createNote}>
        <input
          placeholder="Enter title..."
          required
          value={title}
          onChange={(e) => setTitle(e.currentTarget.value)}
        />
        <textarea
          placeholder="Enter content..."
          required
          value={content}
          onChange={(e) => setContent(e.currentTarget.value)}
        ></textarea>
        <input
          placeholder="Tags"
          onChange={(e) => setTag(e.currentTarget.value)}
        />
        <button type="button" onClick={addTag}>
          Add tag
        </button>
        <input
          placeholder="Emoji"
          value={emoji}
          onChange={(e) => setEmoji(e.currentTarget.value)}
        />
        <button type="submit">Save</button>
      </form>
    </main>
  );
}
