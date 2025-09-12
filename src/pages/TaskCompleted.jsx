import { useTasks } from "../hooks/useTasks";
import { Box, Table, Heading, Spinner, Text, Button } from "@chakra-ui/react";
import TaskCard from "../components/TaskCard";

export default function TasksPage() {
  const { tasksQuery, createMutation } = useTasks();

  if (tasksQuery.isLoading) return <Spinner size="xl" color="green.400" />;
  if (tasksQuery.isError) return <Text>Erro: {tasksQuery.error.message}</Text>;

  const tasks = tasksQuery.data;

   const completedTasks = tasks.filter(
    (t) => t.subtasks?.length > 0 && t.subtasks.every((s) => s.completed)
  );

  return (
    <Box w="60%" p={4}  color="white" mb={4} mx="auto">
      <Heading size="lg" mb={6} color="white" textAlign="center">
        Tarefas Completas
      </Heading>

      {completedTasks.length === 0 ? (
        <Text color="white" textAlign="center">Nenhuma tarefa concluída.</Text>
      ) : (
        <Table.Root size="sm" p={4} borderRadius="md" bg="gray.800" interactive stickyHeader>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Título</Table.ColumnHeader>
              <Table.ColumnHeader>Descrição</Table.ColumnHeader>
              <Table.ColumnHeader>Categoria</Table.ColumnHeader>
              <Table.ColumnHeader>Prioridade</Table.ColumnHeader>
              <Table.ColumnHeader>Data Execução</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {completedTasks.map((task) => (
              <Table.Row key={task.id}>
                <Table.Cell>{task.title}</Table.Cell>
                <Table.Cell>{task.description}</Table.Cell>
                <Table.Cell>{task.category}</Table.Cell>
                <Table.Cell>{task.priority}</Table.Cell>
                <Table.Cell>
                  {task.executionDate
                    ? new Date(task.executionDate).toLocaleDateString()
                    : "-"}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}