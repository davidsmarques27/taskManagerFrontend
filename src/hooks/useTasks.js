import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks,getTaskById , createTask, updateTask, deleteTask } from '../api/tasks';

export const useTasks = () => {
  const queryClient = useQueryClient();

  // Lista de tasks
  const tasksQuery = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  // Criar task
  const createMutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  // Atualizar task
  const updateMutation = useMutation({
    mutationFn: ({ id, task }) => updateTask(id, task),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  // Eliminar task
  const deleteMutation = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['tasks'] }),
  });

  return { tasksQuery, createMutation, updateMutation, deleteMutation };
};

export const useTaskByID = (id) => {
  const taskQuery = useQuery({
    queryKey: ['task', id],
    queryFn: () => getTaskById(id),
  });

  return { taskQuery };
};