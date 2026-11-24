import { Routes, Route, Navigate } from "react-router";
import Layout from "./layouts/DashboardLayout";
import Overview from "./pages/Overview";
import MyTasks from "./pages/MyTasks";
import Activity from "./pages/Activity";
import Users from "./pages/Users";
import Task from "./pages/Task";
import Projects from "./pages/Projects";
import Calendar from "./pages/Calendar";
import Analytics from "./pages/Analytics";
import Files from "./pages/Files";
import Integrations from "./pages/Integrations";
import Settings from "./pages/Settings";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Navigate to="/my-tasks" replace />} />
        <Route path="dashboard" element={<Overview />} />
        <Route path="my-tasks" element={<MyTasks />} />
        <Route path="activity" element={<Activity />} />
        <Route path="projects" element={<Projects />} />
        <Route path="task" element={<Task />} />
        <Route path="calendar" element={<Calendar />} />
        <Route path="analytics" element={<Analytics />} />
        <Route path="users" element={<Users />} />
        <Route path="files" element={<Files />} />
        <Route path="integrations" element={<Integrations />} />
        <Route path="settings" element={<Settings />} />
        <Route path="*" element={<p>404 — Page not found</p>} />
      </Route>
    </Routes>
  );
}
