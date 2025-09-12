import { useTasks } from "../hooks/useTasks";
import { Box, VStack, Heading, Spinner, Text, Button } from "@chakra-ui/react";
import TaskCard from "../components/TaskCard";
import DialogTask from "../components/DialogTask";

export default function TasksPage() {
  const { tasksQuery, createMutation } = useTasks();

  if (tasksQuery.isLoading) return <Spinner size="xl" color="green.400" />;
  if (tasksQuery.isError) return <Text>Erro: {tasksQuery.error.message}</Text>;

  const tasks = tasksQuery.data;

  return (
    <Box>
      <Heading size="lg" mb={6} color="white" textAlign="center">
        Minhas Tarefas
        <DialogTask mutation={createMutation} />
      </Heading>

      <VStack spacing={4}>
        {tasksQuery.data.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </VStack>

      
    </Box>
  );
}
