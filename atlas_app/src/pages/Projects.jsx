import { useSelector } from "react-redux";
import Logo from "../components/Logo";

export default function Projects() {
  const items = useSelector((s) => s.tasks.items);
  const names = [...new Set(items.map((t) => t.project))];
  return (
    <>
      <h1 className="big">Projects</h1>
      <div className="gridcards">
        {names.map((n) => {
          const list = items.filter((t) => t.project === n);
          const done = list.filter((t) => t.status === "Complete").length;
          const pct = Math.round((done / list.length) * 100);
          return (
            <div key={n} className="gcard">
              <span className="proj"><Logo name={n} /><b>{n}</b></span>
              <small>{list.length} tasks · {done} completed</small>
              <div className="bar"><div style={{ width: pct + "%" }} /></div>
            </div>
          );
        })}
      </div>
    </>
  );
}
