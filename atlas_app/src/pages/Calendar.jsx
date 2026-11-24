import { useSelector } from "react-redux";

export default function Calendar() {
  const items = useSelector((s) => s.tasks.items);
  const dates = [...new Set(items.map((t) => t.due))].sort();
  return (
    <>
      <h1 className="big">Schedule</h1>
      <div className="panel">
        {dates.map((d) => (
          <div key={d} className="logrow col2">
            <b>{new Date(d + "T00:00:00").toLocaleDateString("en-GB", { weekday: "short", day: "2-digit", month: "short", year: "numeric" })}</b>
            <span>{items.filter((t) => t.due === d).map((t) => t.title).join(", ")}</span>
          </div>
        ))}
      </div>
    </>
  );
}
