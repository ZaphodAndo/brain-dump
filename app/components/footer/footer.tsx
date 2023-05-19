import { useState } from "react";
import Modal from "../modal/modal";
import SettingsModal from "../modal/modals/settingsModal";

export default function Footer() {
  const [open, setOpen] = useState(false);

  return (
    <footer>
      <div className="links">
        <a
          href="https://mastodonapp.uk/@ZaphodAndo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Mastodon
        </a>
        <a
          href="https://github.com/ZaphodAndo"
          target="_blank"
          rel="noopener noreferrer"
        >
          Github
        </a>
      </div>
      <p className="copyright-text">© 2023 Ethan Anderson</p>
      <button className="settings-button" onClick={() => setOpen(!open)}>
        Settings
      </button>
      <Modal open={open}>
        <SettingsModal />
      </Modal>
    </footer>
  );
}
