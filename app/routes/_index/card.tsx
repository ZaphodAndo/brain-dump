import { Link } from "@remix-run/react";
import type { Note } from "~/types/Note";

type CardProps = {
  note: Note;
};

export default function Card({ note }: CardProps) {
  return (
    <div className="card">
      <div className="top-row">
        <Link to={"/note/" + note.id}>{note.title}</Link>
        <span role="img">{note.emoji}</span>
      </div>
      <div className="tags">
        {note.tags.map((tag, i) => {
          return <p key={i}>{tag}</p>;
        })}
      </div>
    </div>
  );
}
