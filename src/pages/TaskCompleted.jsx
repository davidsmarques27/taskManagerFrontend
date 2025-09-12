import { useTasks } from "../hooks/useTasks";
import {
  Box,
  Table,
  Heading,
  Spinner,
  Text,
  AbsoluteCenter,
} from "@chakra-ui/react";
import DialogTask from "../components/DialogTask";

export default function TasksPage() {
  const { tasksQuery, updateMutation } = useTasks();

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

  const completedTasks = tasks.filter(
    (t) => t.subtasks?.length > 0 && t.subtasks.every((s) => s.completed)
  );

  return (
    <Box w="60%" p={4} color="white" mb={4} mx="auto">
      <Heading size="lg" mb={6} color="white" textAlign="center">
        Tarefas Completas
      </Heading>

      {completedTasks.length === 0 ? (
        <Text color="white" textAlign="center">
          Nenhuma tarefa concluída.
        </Text>
      ) : (
        <Table.Root
          size="sm"
          p={4}
          borderRadius="md"
          bg="gray.800"
          interactive
          stickyHeader
        >
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>Título</Table.ColumnHeader>
              <Table.ColumnHeader>Descrição</Table.ColumnHeader>
              <Table.ColumnHeader>Categoria</Table.ColumnHeader>
              <Table.ColumnHeader>Prioridade</Table.ColumnHeader>
              <Table.ColumnHeader>Data Execução</Table.ColumnHeader>
              <Table.ColumnHeader>Detalhes</Table.ColumnHeader>
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
                <Table.Cell>
                  <DialogTask task={task} mutation={updateMutation} />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      )}
    </Box>
  );
}
