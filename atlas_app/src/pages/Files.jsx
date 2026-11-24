import { useDispatch, useSelector } from "react-redux";
import { addFiles, removeFile } from "../uiSlice";

export default function Files() {
  const files = useSelector((s) => s.ui.files);
  const dispatch = useDispatch();
  const onPick = (e) => {
    const list = [...e.target.files].map((f, i) => ({ id: Date.now() + i, name: f.name, size: Math.round(f.size / 1024) }));
    dispatch(addFiles(list));
    e.target.value = "";
  };
  return (
    <>
      <h1 className="big">Documents</h1>
      <div className="filters"><input type="file" multiple onChange={onPick} /></div>
      <div className="panel">
        {!files.length && <span className="empty">No files yet</span>}
        {files.map((f) => (
          <div key={f.id} className="logrow"><span>{f.name} <small>({f.size} KB)</small></span><button className="link" onClick={() => dispatch(removeFile(f.id))}>Remove</button></div>
        ))}
      </div>
    </>
  );
}
