import { configureStore } from "@reduxjs/toolkit";
import tasksReducer from "./tasksSlice";
import uiReducer from "./uiSlice";

export const store = configureStore({ reducer: { tasks: tasksReducer, ui: uiReducer } });

let last = store.getState().ui.theme;
store.subscribe(() => {
  const t = store.getState().ui.theme;
  if (t !== last) {
    last = t;
    try { localStorage.setItem("atlas-theme", t); } catch { /* ignore */ }
  }
});
