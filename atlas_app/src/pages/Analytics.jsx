import { useSelector } from "react-redux";

function Bars({ title, keys, field, items }) {
  const max = Math.max(1, ...keys.map((k) => items.filter((t) => t[field] === k).length));
  return (
    <div className="panel">
      <b>{title}</b>
      {keys.map((k) => {
        const n = items.filter((t) => t[field] === k).length;
        return (
          <div key={k} className="brow"><span>{k}</span><div className="bar"><div style={{ width: (n / max) * 100 + "%" }} /></div><b>{n}</b></div>
        );
      })}
    </div>
  );
}

export default function Analytics() {
  const items = useSelector((s) => s.tasks.items);
  return (
    <>
      <h1 className="big">Reports</h1>
      <Bars title="By status" keys={["To Do", "In Progress", "Complete", "Overdue"]} field="status" items={items} />
      <Bars title="By priority" keys={["High", "Medium", "Low"]} field="priority" items={items} />
    </>
  );
}
