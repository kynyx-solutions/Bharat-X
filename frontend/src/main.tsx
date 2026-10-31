import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { preloadFirstPage } from "./routes";
import "./index.css";

// Pages other than Home load on demand: wait for the one being opened so it renders with the rest of the site
// (a failed download still renders, and React.lazy retries it).
preloadFirstPage()
  .catch(() => undefined)
  .then(() => {
    createRoot(document.getElementById("root")!).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  });
