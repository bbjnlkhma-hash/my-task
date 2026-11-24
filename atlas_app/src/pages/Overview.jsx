import { useSelector } from "react-redux";

export default function Overview() {
  const items = useSelector((s) => s.tasks.items);
  const log = useSelector((s) => s.tasks.log);
  const stats = ["To Do", "In Progress", "Complete", "Overdue"];
  const pct = items.length ? Math.round((items.filter((t) => t.status === "Complete").length / items.length) * 100) : 0;
  return (
    <>
      <h1 className="big">Overview</h1>
      <div className="stats">
        {stats.map((s) => (
          <div key={s} className="stat"><span>{s === "Complete" ? "Completed" : s}</span><b>{items.filter((t) => t.status === s).length}</b></div>
        ))}
      </div>
      <div className="panel">
        <p>Completion: {pct}%</p>
        <div className="bar"><div style={{ width: pct + "%" }} /></div>
        <p>Total tasks: {items.length}</p>
      </div>
      <div className="panel">
        <b>Recent activity</b>
        {log.slice(0, 5).map((l, i) => <div key={i} className="logrow"><small>{l.at}</small><span>{l.text}</span></div>)}
      </div>
    </>
  );
}
