import { createSlice } from "@reduxjs/toolkit";

const saved = (() => { try { return localStorage.getItem("atlas-theme"); } catch { return null; } })();
const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

const slice = createSlice({
  name: "ui",
  initialState: {
    theme: saved || (prefersDark ? "dark" : "light"),
    q: "",
    formOpen: false,
    collapsed: false,
    files: [],
    integrations: { Slack: true, GitHub: false, "Google Drive": false, Figma: false },
  },
  reducers: {
    setTheme(s, { payload }) { s.theme = payload; },
    toggleTheme(s) { s.theme = s.theme === "dark" ? "light" : "dark"; },
    setQ(s, { payload }) { s.q = payload; },
    openForm(s) { s.formOpen = true; },
    closeForm(s) { s.formOpen = false; },
    toggleCollapsed(s) { s.collapsed = !s.collapsed; },
    addFiles(s, { payload }) { s.files.push(...payload); },
    removeFile(s, { payload }) { s.files = s.files.filter((f) => f.id !== payload); },
    toggleIntegration(s, { payload }) { s.integrations[payload] = !s.integrations[payload]; },
  },
});

export const { setTheme, toggleTheme, setQ, openForm, closeForm, toggleCollapsed, addFiles, removeFile, toggleIntegration } = slice.actions;
export default slice.reducer;
