import { useTasks } from "../hooks/useTasks";
import { Box, VStack, Heading, Spinner, Text, Button } from "@chakra-ui/react";
import TaskCard from "../components/TaskCard";
import DialogTask from "../components/DialogTask";

export default function TasksPage() {
  const { tasksQuery, createMutation } = useTasks();

  if (tasksQuery.isLoading) return <Spinner size="xl" color="green.400" />;
  if (tasksQuery.isError) return <Text>Erro: {tasksQuery.error.message}</Text>;

  const tasks = tasksQuery.data;

  const isComplete = (task) =>
    task.subtasks?.length > 0 && task.subtasks.every((s) => s.completed);

  // Ordenar:
  // 1º - incompletas primeiro
  // 2º - dentro do grupo, pela data de execução ascendente
  const orderedTasks = [...tasks].sort((a, b) => {
    const aComplete = isComplete(a);
    const bComplete = isComplete(b);

    if (aComplete !== bComplete) {
      return aComplete - bComplete; // incompletas (false=0) vêm primeiro
    }

    const aDate = a.executionDate ? new Date(a.executionDate) : new Date(8640000000000000); // se não tem data, vai para o fim
    const bDate = b.executionDate ? new Date(b.executionDate) : new Date(8640000000000000);

    return aDate - bDate; // ordem crescente
  });

  return (
    <Box>
      <Heading size="lg" mb={6} color="white" textAlign="center">
        As minhas tarefas
        <DialogTask mutation={createMutation} />
      </Heading>

      <VStack spacing={4}>
        {orderedTasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </VStack>
    </Box>
  );
}
