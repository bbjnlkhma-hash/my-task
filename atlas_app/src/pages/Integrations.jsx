import { useDispatch, useSelector } from "react-redux";
import { toggleIntegration } from "../uiSlice";

export default function Integrations() {
  const ints = useSelector((s) => s.ui.integrations);
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="big">Apps</h1>
      <div className="panel">
        {Object.entries(ints).map(([name, on]) => (
          <div key={name} className="logrow">
            <span><b>{name}</b> <small>{on ? "Connected" : "Not connected"}</small></span>
            <button className={on ? "outline" : "primary"} onClick={() => dispatch(toggleIntegration(name))}>{on ? "Disconnect" : "Connect"}</button>
          </div>
        ))}
      </div>
    </>
  );
}
