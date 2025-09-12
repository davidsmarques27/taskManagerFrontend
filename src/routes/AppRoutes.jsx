import { Routes, Route } from 'react-router-dom';
import TaskPage from '../pages/TaskPage';
import TaskCompleted from '../pages/TaskCompleted';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TaskPage />} />
      <Route path="/tarefas-completas" element={<TaskCompleted />} />
    </Routes>
  );
}
