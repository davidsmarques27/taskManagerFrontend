export const API_BASE = import.meta.env.VITE_API_BASE;

export const getTasks = async () => {
  const res = await fetch(`${API_BASE}/tasks`);
  if (!res.ok) throw new Error('Erro ao carregar tarefas');
  return res.json();
};

export const getTaskById = async (id) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`);
  if (!res.ok) throw new Error('Erro ao carregar tarefa');
  return res.json();
};

export const createTask = async (task) => {
  console.log("Cheguei aqui")
  console.log(task)
  const res = await fetch(`${API_BASE}/tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });

  console.log(res)

  if (!res.ok) throw new Error('Erro ao criar tarefa');
  return res.json();
};

export const updateTask = async (id, task) => {
  console.log("Sending task:", task);
  const res = await fetch(`${API_BASE}/tasks/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task),
  });
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || 'Erro ao atualizar tarefa');
  }

  // Only parse JSON if status is not 204
  if (res.status === 204) {
    return null; // no content
  }

  return res.json();
};

export const deleteTask = async (id) => {
  const res = await fetch(`${API_BASE}/tasks/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Erro ao deletar tarefa');
};
