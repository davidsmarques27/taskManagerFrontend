import { useState } from "react";
import {
  Button,
  Dialog,
  CloseButton,
  Portal,
  Input,
  Textarea,
  SegmentGroup,
  VStack,
  Flex,
  Text,
  HStack,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { toaster } from "@/components/ui/toaster";
import { FaPlus, FaTrash, FaPencilAlt } from "react-icons/fa";

export default function DialogTask({task, mutation }) {
  const isEdit = !!task;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [executionDate, setExecutionDate] = useState("");
  const [category, setCategory] = useState("Outro");
  const [priority, setPriority] = useState("Média");
  const [subtasks, setSubtasks] = useState([{ title: "", completed: false }]);

  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setExecutionDate(
        task.executionDate ? task.executionDate.split("T")[0] : ""
      );
      setCategory(task.category || "Outro");
      setPriority(task.priority || "Média");
      setSubtasks(task.subtasks?.length ? task.subtasks : [{ title: "", completed: false }]);
    }
  }, [task]);

  const handleAddSubtask = () => {
    setSubtasks([...subtasks, { title: "", completed: false }]);
  };

  const handleRemoveSubtask = (index) => {
    setSubtasks(subtasks.filter((_, i) => i !== index));
  };

  const handleSubtaskChange = (index, value) => {
    setSubtasks(
      subtasks.map((sub, i) => (i === index ? { ...sub, title: value } : sub))
    );
  };

  const handleSave = (store) => {
    const formattedDate = executionDate
      ? new Date(executionDate).toISOString()
      : null;

    const newTask = {
      id: task?.id, // only used in edit
      title,
      description,
      executionDate: formattedDate,
      category,
      priority,
      subtasks,
    };

    mutation.mutate(newTask, {
      onSuccess: () => {
        toaster.success({
          title: isEdit ? "Tarefa atualizada com sucesso" : "Tarefa criada com sucesso",
        });

        // reset state only when creating
        if (!isEdit) {
          setTitle("");
          setDescription("");
          setCategory("Outro");
          setPriority("Média");
          setExecutionDate("");
          setSubtasks([{ title: "", completed: false }]);
        }

        // close dialog
        store.setOpen(false);
      },
      onError: () => {
        toaster.error({
          title: isEdit ? "Erro ao atualizar tarefa" : "Erro ao criar tarefa",
        });
      },
    });
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {isEdit ? (
          <Button
            ml={2}
            colorPalette="yellow"
            variant="outline"
            color="yellow.400"
            size="sm"
          >
            <FaPencilAlt />
          </Button>
        ) : (
          <Button
            ml={2}
            colorPalette="green"
            variant="outline"
            color="green.800"
            size="sm"
          >
            <FaPlus />
          </Button>
        )}
      </Dialog.Trigger>

      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Context>
              {(store) => (
                <>
                  <Dialog.Header>
                    <Dialog.Title>
                      {isEdit ? "Editar Tarefa" : "Criar Nova Tarefa"}
                    </Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <VStack spacing={3}>
                      <Input
                        placeholder="Título"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                      <Textarea
                        placeholder="Descrição"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />

                      {/* Categoria */}
                      <Flex w="100%" align="center" justify="space-between">
                        <Text fontWeight="medium">Categoria</Text>
                        <SegmentGroup.Root
                          defaultValue={category}
                          onValueChange={(val) =>
                            setCategory(typeof val === "string" ? val : val.value)
                          }
                        >
                          <SegmentGroup.Indicator />
                          <SegmentGroup.Items
                            items={["Pessoal", "Trabalho", "Outro"]}
                          />
                        </SegmentGroup.Root>
                      </Flex>

                      {/* Prioridade */}
                      <Flex w="100%" align="center" justify="space-between">
                        <Text fontWeight="medium">Prioridade</Text>
                        <SegmentGroup.Root
                          defaultValue={priority}
                          onValueChange={(val) =>
                            setPriority(typeof val === "string" ? val : val.value)
                          }
                        >
                          <SegmentGroup.Indicator />
                          <SegmentGroup.Items
                            items={["Alta", "Média", "Baixa"]}
                          />
                        </SegmentGroup.Root>
                      </Flex>

                      {/* Data */}
                      <Flex w="100%" align="center" justify="space-between">
                        <Text fontWeight="medium">Data</Text>
                        <Input
                          type="date"
                          value={executionDate}
                          onChange={(e) => setExecutionDate(e.target.value)}
                          w="50%"
                        />
                      </Flex>

                      {/* Subtarefas */}
                      <Box
                        borderWidth="1px"
                        borderRadius="3%"
                        w="100%"
                        align="center"
                        p={2}
                        justify="space-between"
                      >
                        <Text fontWeight="medium" mb={2}>
                          Subtarefas
                        </Text>
                        <VStack spacing={2} align="stretch">
                          {subtasks.map((sub, index) => (
                            <HStack key={index}>
                              <Input
                                placeholder="Título da subtarefa"
                                value={sub.title}
                                onChange={(e) =>
                                  handleSubtaskChange(index, e.target.value)
                                }
                              />
                              <IconButton
                                aria-label="Remover"
                                size="sm"
                                colorPalette="red"
                                onClick={() => handleRemoveSubtask(index)}
                              >
                                <FaTrash />
                              </IconButton>
                            </HStack>
                          ))}
                          <Button
                            size="sm"
                            variant="outline"
                            leftIcon={<FaPlus />}
                            onClick={handleAddSubtask}
                          >
                            Adicionar Subtarefa
                          </Button>
                        </VStack>
                      </Box>
                    </VStack>
                  </Dialog.Body>

                  <Dialog.Footer>
                    <Dialog.ActionTrigger asChild>
                      <Button variant="outline">Cancelar</Button>
                    </Dialog.ActionTrigger>
                    <Button
                      colorPalette={isEdit ? "blue" : "green"}
                      onClick={() => handleSave(store)}
                    >
                      {isEdit ? "Atualizar" : "Criar"}
                    </Button>
                  </Dialog.Footer>

                  <Dialog.CloseTrigger asChild>
                    <CloseButton size="sm" />
                  </Dialog.CloseTrigger>
                </>
              )}
            </Dialog.Context>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}