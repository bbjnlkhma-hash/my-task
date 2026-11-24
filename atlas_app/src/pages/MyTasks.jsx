import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, setStatus, deleteTask } from "../tasksSlice";
import { setQ, openForm, closeForm } from "../uiSlice";
import Logo from "../components/Logo";

const STATUSES = ["To Do", "In Progress", "Complete", "Overdue"];
const PRIORITIES = ["High", "Medium", "Low"];
const fmt = (d) => new Date(d + "T00:00:00").toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
const emptyForm = { title: "", project: "", due: "", priority: "Medium", status: "To Do" };

export default function MyTasks() {
  const items = useSelector((s) => s.tasks.items);
  const q = useSelector((s) => s.ui.q);
  const formOpen = useSelector((s) => s.ui.formOpen);
  const dispatch = useDispatch();
  const [f, setF] = useState({ project: "", time: "", status: "", priority: "" });
  const [view, setView] = useState("list");
  const [page, setPage] = useState(1);
  const [size, setSize] = useState(10);
  const [menuId, setMenuId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [split, setSplit] = useState(false);

  useEffect(() => {
    const close = () => { setMenuId(null); setSplit(false); };
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  const projects = [...new Set(items.map((t) => t.project))];
  const filtered = useMemo(
    () => items.filter((t) => {
      const day = +t.due.slice(8, 10);
      return (
        (!f.project || t.project === f.project) &&
        (!f.status || t.status === f.status) &&
        (!f.priority || t.priority === f.priority) &&
        (!f.time || (f.time === "first" ? day <= 15 : day >= 16)) &&
        (!q || (t.title + " " + t.project).toLowerCase().includes(q.toLowerCase()))
      );
    }),
    [items, f, q]
  );
  const pages = Math.max(1, Math.ceil(filtered.length / size));
  const cur = Math.min(page, pages);
  const rows = filtered.slice((cur - 1) * size, cur * size);
  const set = (k, v) => { setF({ ...f, [k]: v }); setPage(1); };

  const submit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.project.trim() || !form.due) return;
    dispatch(addTask({ ...form, title: form.title.trim(), project: form.project.trim() }));
    setForm(emptyForm);
    dispatch(closeForm());
  };
  const today = new Date().toISOString().slice(0, 10);

  const StatusPill = ({ t }) => (
    <span className={"pill " + t.status.replace(" ", "")}>
      <i className="dot" />
      <select value={t.status} onChange={(e) => dispatch(setStatus({ id: t.id, status: e.target.value }))}>
        {STATUSES.map((s) => <option key={s}>{s}</option>)}
      </select>
    </span>
  );

  const RowMenu = ({ t }) => (
    <div className="rowmenu" onClick={(e) => e.stopPropagation()}>
      <button className="icon" onClick={() => setMenuId(menuId === t.id ? null : t.id)}>⋮</button>
      {menuId === t.id && (
        <div className="dropdown right">
          <button onClick={() => { dispatch(setStatus({ id: t.id, status: "Complete" })); setMenuId(null); }}>Mark complete</button>
          <button onClick={() => { dispatch(setStatus({ id: t.id, status: "In Progress" })); setMenuId(null); }}>Start progress</button>
          <button className="danger" onClick={() => { dispatch(deleteTask(t.id)); setMenuId(null); }}>Delete</button>
        </div>
      )}
    </div>
  );

  return (
    <>
      <h1 className="big">My Tasks</h1>

      <div className="toolbar">
        <div className="seg">
          <button className={view === "grid" ? "on" : ""} onClick={() => setView("grid")} title="Grid">▦</button>
          <button className={view === "list" ? "on" : ""} onClick={() => setView("list")} title="List">☰</button>
        </div>
        <div className="split" onClick={(e) => e.stopPropagation()}>
          <button className="primary" onClick={() => dispatch(openForm())}>+ Create New Task</button>
          <button className="primary caret" onClick={() => setSplit(!split)}>▾</button>
          {split && (
            <div className="dropdown right">
              <button onClick={() => { dispatch(openForm()); setSplit(false); }}>New task</button>
              <button onClick={() => { setForm({ ...emptyForm, due: today }); dispatch(openForm()); setSplit(false); }}>New task due today</button>
            </div>
          )}
        </div>
      </div>

      <div className="filters">
        <select value={f.project} onChange={(e) => set("project", e.target.value)}>
          <option value="">All Project</option>{projects.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={f.time} onChange={(e) => set("time", e.target.value)}>
          <option value="">All Time</option><option value="first">First half of month</option><option value="second">Second half of month</option>
        </select>
        <select value={f.status} onChange={(e) => set("status", e.target.value)}>
          <option value="">All Status</option>{STATUSES.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={f.priority} onChange={(e) => set("priority", e.target.value)}>
          <option value="">All Priority</option>{PRIORITIES.map((p) => <option key={p}>{p}</option>)}
        </select>
        <div className="tsearch">
          <span>⌕</span>
          <input placeholder="Search task / project" value={q} onChange={(e) => { dispatch(setQ(e.target.value)); setPage(1); }} />
        </div>
      </div>

      <div className="stats">
        {STATUSES.map((s) => (
          <button key={s} className={"stat" + (f.status === s ? " on" : "")} onClick={() => set("status", f.status === s ? "" : s)}>
            <span>{s === "Complete" ? "Completed" : s}</span>
            <b>{items.filter((t) => t.status === s).length}</b>
          </button>
        ))}
      </div>

      {view === "list" ? (
        <div className="tablewrap">
          <table className="tbl">
            <thead><tr><th>Task Title</th><th>Project</th><th>Due Date</th><th>Status</th><th>Priority</th><th></th></tr></thead>
            <tbody>
              {rows.map((t) => (
                <tr key={t.id}>
                  <td>{t.title}</td>
                  <td><span className="proj"><Logo name={t.project} />{t.project}</span></td>
                  <td>{fmt(t.due)}</td>
                  <td><StatusPill t={t} /></td>
                  <td><span className={"prio " + t.priority}>{t.priority}</span></td>
                  <td><RowMenu t={t} /></td>
                </tr>
              ))}
              {!rows.length && <tr><td colSpan="6" className="empty">No tasks found</td></tr>}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="gridcards">
          {rows.map((t) => (
            <div key={t.id} className="gcard">
              <div className="ghd"><b>{t.title}</b><RowMenu t={t} /></div>
              <span className="proj"><Logo name={t.project} />{t.project}</span>
              <small>{fmt(t.due)}</small>
              <div className="gft"><StatusPill t={t} /><span className={"prio " + t.priority}>{t.priority}</span></div>
            </div>
          ))}
          {!rows.length && <p className="empty">No tasks found</p>}
        </div>
      )}

      <div className="pager">
        <div className="pg">
          <button disabled={cur === 1} onClick={() => setPage(cur - 1)}>‹</button>
          {Array.from({ length: pages }, (_, i) => (
            <button key={i} className={cur === i + 1 ? "cur" : ""} onClick={() => setPage(i + 1)}>{i + 1}</button>
          ))}
          <button disabled={cur === pages} onClick={() => setPage(cur + 1)}>›</button>
        </div>
        <div className="tot">
          <span>Total {filtered.length} Data</span>
          <select value={size} onChange={(e) => { setSize(+e.target.value); setPage(1); }}>
            {[5, 10, 20, 50].map((n) => <option key={n} value={n}>Show {n} Data</option>)}
          </select>
        </div>
      </div>

      {formOpen && (
        <div className="overlay" onClick={() => dispatch(closeForm())}>
          <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={submit}>
            <h3>Create New Task</h3>
            <label>Task title<input autoFocus value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></label>
            <label>Project<input list="plist" value={form.project} onChange={(e) => setForm({ ...form, project: e.target.value })} /></label>
            <datalist id="plist">{projects.map((p) => <option key={p} value={p} />)}</datalist>
            <label>Due date<input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} /></label>
            <div className="two">
              <label>Priority
                <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })}>{PRIORITIES.map((p) => <option key={p}>{p}</option>)}</select>
              </label>
              <label>Status
                <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>{STATUSES.map((p) => <option key={p}>{p}</option>)}</select>
              </label>
            </div>
            <div className="mactions">
              <button type="button" className="outline" onClick={() => dispatch(closeForm())}>Cancel</button>
              <button className="primary">Save task</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
