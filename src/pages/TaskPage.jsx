import { useTasks } from "../hooks/useTasks";
import {
  Box,
  VStack,
  Heading,
  Spinner,
  Text,
  Input,
  AbsoluteCenter,
} from "@chakra-ui/react";
import TaskCard from "../components/TaskCard";
import DialogTask from "../components/DialogTask";

export default function TasksPage({ search }) {
  const { tasksQuery, createMutation } = useTasks();

  if (tasksQuery.isLoading)
    return (
      <AbsoluteCenter>
        <Spinner size="xl" color="gray.50" />
      </AbsoluteCenter>
    );

  if (tasksQuery.isError) {
    const error = tasksQuery.error;
    let errorMessage = "Ocorreu um erro ao carregar as tarefas.";

    if (error?.response?.status) {
      errorMessage = `Erro ${error.response.status}: ${
        error.response.statusText || "Falha na API"
      }`;
    } else if (error?.message) {
      errorMessage = `Erro: ${error.message}`;
    }

    return (
      <AbsoluteCenter>
        <Text color="white" textAlign="center" fontWeight="bold">
          {errorMessage}
        </Text>
      </AbsoluteCenter>
    );
  }

  const tasks = tasksQuery.data;

  const filteredTasks =
    tasksQuery.data?.filter(
      (task) =>
        task.title.toLowerCase().includes(search.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(search.toLowerCase()))
    ) || [];

  const isComplete = (task) =>
    task.subtasks?.length > 0 && task.subtasks.every((s) => s.completed);

  const orderedTasks = [...filteredTasks].sort((a, b) => {
    const aComplete = isComplete(a);
    const bComplete = isComplete(b);
    if (aComplete !== bComplete) return aComplete - bComplete;

    const aDate = a.executionDate
      ? new Date(a.executionDate)
      : new Date(8640000000000000);
    const bDate = b.executionDate
      ? new Date(b.executionDate)
      : new Date(8640000000000000);
    return aDate - bDate;
  });

  return (
    <Box>
      <Heading size="lg" mb={4} color="white" textAlign="center">
        As minhas tarefas
        <DialogTask mutation={createMutation} />
      </Heading>

      <VStack spacing={4}>
        {orderedTasks.length > 0 ? (
          orderedTasks.map((task) => <TaskCard key={task.id} task={task} />)
        ) : (
          <Text color="white">Nenhuma tarefa encontrada.</Text>
        )}
      </VStack>
    </Box>
  );
}
