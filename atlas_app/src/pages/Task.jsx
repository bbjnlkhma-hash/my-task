import { useDispatch, useSelector } from "react-redux";
import { setStatus } from "../tasksSlice";
import Logo from "../components/Logo";

const cols = ["To Do", "In Progress", "Complete", "Overdue"];

export default function Task() {
  const items = useSelector((s) => s.tasks.items);
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="big">Board</h1>
      <div className="board">
        {cols.map((c) => (
          <div key={c} className="col">
            <h3>{c} <small>{items.filter((t) => t.status === c).length}</small></h3>
            {items.filter((t) => t.status === c).map((t) => (
              <div key={t.id} className="gcard">
                <b>{t.title}</b>
                <span className="proj"><Logo name={t.project} />{t.project}</span>
                <select value={t.status} onChange={(e) => dispatch(setStatus({ id: t.id, status: e.target.value }))}>
                  {cols.map((x) => <option key={x}>{x}</option>)}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}
