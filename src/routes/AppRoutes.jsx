import { Routes, Route } from 'react-router-dom';
import TaskPage from '../pages/TaskPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<TaskPage />} />
    </Routes>
  );
}
