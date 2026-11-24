import { createSlice } from "@reduxjs/toolkit";

const seed = [
  ["Design System Audit", "Amazon Dashboard", "2026-01-10", "Complete", "High"],
  ["Landing Page Copywriting", "Microsoft", "2026-01-12", "Complete", "High"],
  ["Mobile App Redesign", "Apple", "2026-01-14", "Complete", "High"],
  ["Key Metrics Layout", "Facebook Dashboard", "2026-01-16", "Overdue", "Low"],
  ["Wireframe v2 Upload", "Netflix", "2026-01-17", "In Progress", "Low"],
  ["QA Testing", "Nvidia", "2026-01-17", "In Progress", "Low"],
  ["Prototype Review", "Behance", "2026-01-18", "In Progress", "Medium"],
  ["Copywriting Review", "Google Dashboard", "2026-01-24", "To Do", "Medium"],
  ["UX Audit", "Grab Map App", "2026-01-25", "To Do", "Medium"],
  ["Review Landing Page", "Lego", "2026-01-04", "To Do", "Medium"],
].map(([title, project, due, status, priority], i) => ({
  id: i + 1, title, project, due, status, priority,
}));

const now = () => new Date().toLocaleString();

const slice = createSlice({
  name: "tasks",
  initialState: {
    items: seed,
    nextId: seed.length + 1,
    log: [{ at: now(), text: "Workspace loaded" }],
    users: [
      { id: 1, name: "Reyhan Adinata", role: "Lead Product" },
      { id: 2, name: "Amarsaihan", role: "Developer" },
    ],
  },
  reducers: {
    addTask(state, { payload }) {
      state.items.unshift({ id: state.nextId++, ...payload });
      state.log.unshift({ at: now(), text: `Created task "${payload.title}"` });
    },
    setStatus(state, { payload: { id, status } }) {
      const t = state.items.find((x) => x.id === id);
      if (t) {
        t.status = status;
        state.log.unshift({ at: now(), text: `"${t.title}" → ${status}` });
      }
    },
    deleteTask(state, { payload }) {
      const t = state.items.find((x) => x.id === payload);
      state.items = state.items.filter((x) => x.id !== payload);
      if (t) state.log.unshift({ at: now(), text: `Deleted "${t.title}"` });
    },
    addUser(state, { payload }) {
      state.users.push({ id: Date.now(), ...payload });
      state.log.unshift({ at: now(), text: `Added user ${payload.name}` });
    },
    removeUser(state, { payload }) {
      state.users = state.users.filter((u) => u.id !== payload);
    },
  },
});

export const { addTask, setStatus, deleteTask, addUser, removeUser } = slice.actions;
export default slice.reducer;
