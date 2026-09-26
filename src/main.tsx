import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { SmoothScrollProvider } from "./components/SmoothScroll.tsx";

// The site used to live on /work/* routes. Keep old links working by mapping
// them onto sections of the single page (and ?p=<slug> onto ?project=<slug>).
const LEGACY_ROUTES: Record<string, string> = {
  "/work": "#work",
  "/work/projects": "#work",
  "/work/career": "#experience",
  "/work/contact": "#contact",
};

const { pathname, search, hash } = window.location;
if (pathname !== "/") {
  const legacyProject = new URLSearchParams(search).get("p");
  const query = legacyProject ? `?project=${encodeURIComponent(legacyProject)}` : "";
  const section = LEGACY_ROUTES[pathname.replace(/\/+$/, "")] ?? hash;
  window.history.replaceState(null, "", `/${query}${section}`);
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <SmoothScrollProvider>
      <App />
    </SmoothScrollProvider>
  </StrictMode>,
);
