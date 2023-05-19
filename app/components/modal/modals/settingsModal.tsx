import type { ChangeEvent } from "react";
import StorageService from "~/services/StorageService";

export default function SettingsModal() {
  const exportNotes = () => {
    const a = document.createElement("a");
    const notes = StorageService.getNotes();
    const file = new Blob([JSON.stringify(notes)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "notes.json";
    a.click();
  };

  const loadNotes = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const json = JSON.parse(await e.target.files[0].text());
      StorageService.setNotes(json);
    }
  };

  return (
    <div>
      <button type="button" onClick={exportNotes}>
        Export
      </button>
      <input type="file" accept=".json" onChange={(e) => loadNotes(e)} />
    </div>
  );
}
