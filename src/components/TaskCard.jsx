import { useState } from "react";
import {
  Box,
  Text,
  HStack,
  Badge,
  Button,
  Dialog,
  CloseButton,
  Portal,
} from "@chakra-ui/react";
import { FiFolder, FiUser, FiBriefcase } from "react-icons/fi";
import { FaTrash, FaPencilAlt } from "react-icons/fa";
import TaskSubtasks from "../components/TaskSubtasks";
import { useTasks } from "../hooks/useTasks";
import { Toaster, toaster } from "@/components/ui/toaster";

function TaskCard({ task }) {
  const { deleteMutation, updateMutation } = useTasks();
  const [updatedSubs, setUpdatedSubs] = useState([]);
  const [showSave, setShowSave] = useState(false);

  const categoryIcon = (category) => {
    switch (category) {
      case "Pessoal":
        return <FiUser />;
      case "Trabalho":
        return <FiBriefcase />;
      case "Outro":
        return <FiFolder />;
      default:
        return <FiFolder />;
    }
  };

  const priorityColorScheme = (priority) => {
    switch (priority) {
      case "Alta":
        return "red";
      case "Média":
        return "yellow";
      case "Baixa":
        return "green";
      default:
        return "gray";
    }
  };

  const handleSubtasksChange = (subs) => {
    setUpdatedSubs(subs);
    setShowSave(true);
  };

  const handleSave = () => {
    const updatedTask = { ...task, subtasks: updatedSubs };

    updateMutation.mutate(
      { id: task.id, task: updatedTask },
      {
        onSuccess: () => {
          console.log("Success");
          setShowSave(false); // hide button
          toaster.success({
            title: "Gravado com Sucesso",
          });
        },
        onError: (err) => {
          console.log("Error");
        },
      }
    );
  };

  return (
    <Box w="40%" p={4} borderRadius="md" bg="gray.800" color="white" mb={4}>
      <HStack justify="space-between" mb={2}>
        <Text fontWeight="bold">{task.title}</Text>
        <Badge mr={3} colorPalette={priorityColorScheme(task.priority)}>
          {task.priority}
        </Badge>
      </HStack>

      {task.description && <Text mb={2}>{task.description}</Text>}

      {/* Subtasks */}
      <TaskSubtasks subtasks={task.subtasks} onChange={handleSubtasksChange} onSave={handleSave}/>

      <HStack justify="space-between" mb={2}>
        <HStack>
          <Badge display="flex" alignItems="center" gap={1}>
            {categoryIcon(task.category)}
            <Text>{task.category}</Text>
          </Badge>
          {task.executionDate && (
            <Text fontSize="sm">
              {new Date(task.executionDate).toLocaleDateString()}
            </Text>
          )}
        </HStack>

          
<Button ml={2} colorPalette="red" variant="outline" color="red.800">
              {" "}
              <FaPencilAlt />
            </Button>
        <Dialog.Root>
          <Dialog.Trigger asChild>
            <Button ml={2} colorPalette="red" variant="outline" color="red.800">
              {" "}
              <FaTrash />
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Confirmar eliminação</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    Tem a certeza que deseja eliminar a tarefa "{task.title}" ?
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancelar</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    onClick={() =>
                      deleteMutation.mutate(task.id, {
                        onSuccess: () => {
                          toaster.success({
                            title: "Tarefa eliminada",
                            description: `A tarefa "${task.title}" foi removida com sucesso.`,
                          });
                        },
                        onError: (err) => {
                          toaster.error({
                            title: "Erro ao eliminar",
                            description: `Não foi possível eliminar a tarefa "${task.title}".`,
                          });
                        },
                      })
                    }
                    isLoading={deleteMutation.isPending}
                  >
                    Sim
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </HStack>
      {/* Subtasks inside Collapsible */}
      <Toaster />
    </Box>
  );
}

export default TaskCard;
