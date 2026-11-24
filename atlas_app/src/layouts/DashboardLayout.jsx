import { useEffect, useRef, useState } from "react";
import { Outlet, NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme, toggleCollapsed, setQ, openForm } from "../uiSlice";

const groups = [
  { key: "dashboard", icon: "▦", label: "Dashboard", items: [["/dashboard", "Overview"], ["/my-tasks", "My Tasks"], ["/activity", "Activity"]] },
  { key: "projects", icon: "⚑", label: "Projects", items: [["/projects", "All Projects"]] },
  { key: "tasks", icon: "✓", label: "Tasks", items: [["/task", "Board"]] },
  { key: "calendar", icon: "▤", label: "Calendar", items: [["/calendar", "Schedule"]] },
  { key: "analytics", icon: "◔", label: "Analytics", items: [["/analytics", "Reports"]] },
  { key: "team", icon: "☺", label: "Team", items: [["/users", "Members"]] },
  { key: "files", icon: "❐", label: "Files", items: [["/files", "Documents"]] },
  { key: "integrations", icon: "⇄", label: "Integrations", items: [["/integrations", "Apps"]] },
  { key: "settings", icon: "⚙", label: "Settings", items: [["/settings", "Preferences"]] },
];

export default function Layout() {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const dispatch = useDispatch();
  const theme = useSelector((s) => s.ui.theme);
  const collapsed = useSelector((s) => s.ui.collapsed);
  const q = useSelector((s) => s.ui.q);
  const items = useSelector((s) => s.tasks.items);
  const badge = items.filter((t) => t.status === "To Do" || t.status === "In Progress").length;
  const [open, setOpen] = useState(() =>
    Object.fromEntries(groups.map((g) => [g.key, g.key === "dashboard" || g.items.some(([to]) => to === pathname)]))
  );
  const [menu, setMenu] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => { document.documentElement.dataset.theme = theme; }, [theme]);
  useEffect(() => {
    const close = () => setMenu(false);
    const key = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", key);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", key); };
  }, []);

  const onSearch = (v) => {
    dispatch(setQ(v));
    if (pathname !== "/my-tasks") nav("/my-tasks");
  };

  return (
    <div className={"app" + (collapsed ? " collapsed" : "")}>
      <aside className="sidebar">
        <div className="brand">
          <span className="mark">◎</span>
          <b className="txt">Atlas</b>
          <button className="icon" title="Collapse" onClick={() => dispatch(toggleCollapsed())}>{collapsed ? "⇥" : "⇤"}</button>
        </div>
        <nav>
          {groups.map((g) => (
            <div key={g.key} className="group">
              <button className="ghead" onClick={() => setOpen({ ...open, [g.key]: !open[g.key] })}>
                <span className="gi">{g.icon}</span>
                <span className="txt">{g.label}</span>
                <span className="chev txt">{open[g.key] ? "▴" : "▾"}</span>
              </button>
              {open[g.key] && !collapsed &&
                g.items.map(([to, label]) => (
                  <NavLink key={to} to={to} className={({ isActive }) => "sub" + (isActive ? " active" : "")}>
                    {label}
                    {to === "/my-tasks" && <span className="badge">{badge}</span>}
                  </NavLink>
                ))}
            </div>
          ))}
        </nav>
      </aside>

      <div className="content">
        <header className="topbar">
          <div className="gsearch">
            <span>⌕</span>
            <input ref={searchRef} placeholder="Search" value={q} onChange={(e) => onSearch(e.target.value)} />
            <kbd>Ctrl K</kbd>
          </div>
          <div className="topright">
            <div className="split" onClick={(e) => e.stopPropagation()}>
              <button className="outline" onClick={() => { dispatch(openForm()); nav("/my-tasks"); }}>+ Create New</button>
              <button className="outline caret" onClick={() => setMenu(!menu)}>▾</button>
              {menu && (
                <div className="dropdown">
                  <button onClick={() => { dispatch(openForm()); nav("/my-tasks"); setMenu(false); }}>New Task</button>
                  <button onClick={() => { nav("/users"); setMenu(false); }}>New Member</button>
                </div>
              )}
            </div>
            <button className="icon round" title="Light / Dark" onClick={() => dispatch(toggleTheme())}>
              {theme === "dark" ? "☀" : "☾"}
            </button>
            <button className="icon round" title="Activity" onClick={() => nav("/activity")}>🔔</button>
            <div className="user">
              <span className="avatar">R</span>
              <span className="uinfo"><b>Reyhan Adinata</b><small>Lead Product</small></span>
            </div>
          </div>
        </header>
        <main className="page"><Outlet /></main>
      </div>
    </div>
  );
}
