import { Routes, Route } from "react-router-dom";
import TaskPage from "../pages/TaskPage";
import TaskCompleted from "../pages/TaskCompleted";
import About from "../pages/About";

export default function AppRoutes({ search }) {
  return (
    <Routes>
      <Route path="/" element={<TaskPage search={search} />} />
      <Route path="/tarefas-completas" element={<TaskCompleted search={search} />} />
      <Route path="/sobre" element={<About />} />
    </Routes>
  );
}
