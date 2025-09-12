import { useState } from "react";
import { useTasks } from "../hooks/useTasks";
import {
  Box,
  Text,
  Badge,
  VStack,
  HStack,
  Checkbox,
  Button,
  Dialog,
  CloseButton,
  Portal,
  Accordion,
} from "@chakra-ui/react";
import { FiFolder, FiUser, FiBriefcase } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";

function TaskAccordion({ task }) {
  const [showDetails, setShowDetails] = useState(false);
  const { deleteMutation } = useTasks();

  const onClose = () => setIsOpen(false);
  const onDelete = () => {
    deleteMutation.mutate(task.id);
    setIsOpen(false);
  };

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

  return (
    <Accordion.Root type="multiple" collapsible>
      <Accordion.Item value={String(task.id)}>
        <Accordion.ItemTrigger>
          <HStack justify="space-between" flex="1">
            <Text fontWeight="bold">{task.title}</Text>
            <Badge colorScheme={priorityColorScheme(task.priority)}>
              {task.priority}
            </Badge>
          </HStack>
          <Accordion.ItemIndicator />
        </Accordion.ItemTrigger>

        <Accordion.ItemContent>
          <Accordion.ItemBody>
            <Box p={3} bg="gray.800" color="white" borderRadius="md">
              {task.description && <Text mb={2}>{task.description}</Text>}

              <HStack justify="space-between" mb={3}>
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

                <Dialog.Root>
                  <Dialog.Trigger asChild>
                    <Button ml={2} color="red.400" variant="ghost">
                      <RiDeleteBin6Line />
                    </Button>
                  </Dialog.Trigger>
                  <Portal>
                    <Dialog.Backdrop />
                    <Dialog.Positioner>
                      <Dialog.Content bg="gray.900" color="white">
                        <Dialog.Header>
                          <Dialog.Title>Confirmar eliminação</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body>
                          Tem a certeza que deseja eliminar a tarefa "
                          {task.title}"?
                        </Dialog.Body>
                        <Dialog.Footer>
                          <Dialog.ActionTrigger asChild>
                            <Button variant="outline">Não</Button>
                          </Dialog.ActionTrigger>
                          <Button
                            colorScheme="red"
                            onClick={() => deleteMutation.mutate(task.id)}
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

              {task.subtasks?.length > 0 && (
                <VStack spacing={1} align="start" mt={2}>
                  {task.subtasks.map((sub) => (
                    <Checkbox
                      key={sub.id}
                      isChecked={sub.completed}
                      colorScheme="green"
                    >
                      {sub.title}
                    </Checkbox>
                  ))}
                </VStack>
              )}
            </Box>
          </Accordion.ItemBody>
        </Accordion.ItemContent>
      </Accordion.Item>
    </Accordion.Root>
  );
}

export default TaskAccordion;
