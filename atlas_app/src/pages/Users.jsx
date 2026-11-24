import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../tasksSlice";

export default function Users() {
  const users = useSelector((s) => s.tasks.users);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    dispatch(addUser({ name: name.trim(), role: role.trim() || "Member" }));
    setName(""); setRole("");
  };
  return (
    <>
      <h1 className="big">Team</h1>
      <form className="filters" onSubmit={submit}>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={role} onChange={(e) => setRole(e.target.value)} placeholder="Role" />
        <button className="primary">Add member</button>
      </form>
      <div className="panel">
        {users.map((u) => (
          <div key={u.id} className="logrow">
            <span><b>{u.name}</b> — {u.role}</span>
            <button className="link" onClick={() => dispatch(removeUser(u.id))}>Remove</button>
          </div>
        ))}
      </div>
    </>
  );
}
