import { useEffect, useState } from "react";
import type { LinksFunction, V2_MetaFunction } from "@remix-run/node";
import type { Note } from "~/types/Note";
import StorageService from "~/services/StorageService";
import PlusIcon from "~/Icons/plusIcon";
import Card from "./card";
import SearchInput from "./searchInput";
import Modal from "~/components/modal/modal";
import CreateModal from "~/components/modal/modals/createModal";
import styles from "~/styles/index.css";

export const meta: V2_MetaFunction = () => {
  return [{ title: "Brain dump | Home" }];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
};

export default function Index() {
  const [notes, setNotes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const localNotes = StorageService.getNotes();
    if (localNotes) {
      setNotes(localNotes);
    }
  }, []);

  return (
    <main>
      <h1>Brain dump</h1>
      <div className="controls">
        <SearchInput />
        <button
          className="create-button"
          type="button"
          onClick={() => setOpen(!open)}
        >
          <PlusIcon />
          <span>Create</span>
        </button>
      </div>
      <div className="notes">
        {notes.map((note: Note, i: number) => {
          return <Card key={i} note={note} />;
        })}
      </div>
      <Modal open={open}>
        <CreateModal />
      </Modal>
    </main>
  );
}
