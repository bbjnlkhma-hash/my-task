import { useDispatch, useSelector } from "react-redux";
import { setTheme, toggleCollapsed } from "../uiSlice";

export default function Settings() {
  const theme = useSelector((s) => s.ui.theme);
  const collapsed = useSelector((s) => s.ui.collapsed);
  const dispatch = useDispatch();
  return (
    <>
      <h1 className="big">Preferences</h1>
      <div className="panel">
        <b>Appearance</b>
        <div className="filters">
          <button className={theme === "light" ? "primary" : "outline"} onClick={() => dispatch(setTheme("light"))}>☀ Light</button>
          <button className={theme === "dark" ? "primary" : "outline"} onClick={() => dispatch(setTheme("dark"))}>☾ Dark</button>
        </div>
        <label className="check"><input type="checkbox" checked={collapsed} onChange={() => dispatch(toggleCollapsed())} /> Collapsed sidebar</label>
      </div>
    </>
  );
}
