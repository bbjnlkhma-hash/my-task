import { useSelector } from "react-redux";

export default function Activity() {
  const log = useSelector((s) => s.tasks.log);
  return (
    <>
      <h1 className="big">Activity</h1>
      <div className="panel">
        {log.map((l, i) => <div key={i} className="logrow"><small>{l.at}</small><span>{l.text}</span></div>)}
      </div>
    </>
  );
}
