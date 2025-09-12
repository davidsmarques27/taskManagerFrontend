import { useState, useEffect } from "react";
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

export default function DialogTask({ task, mutation }) {
  const isEdit = !!task;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [executionDate, setExecutionDate] = useState("");
  const [category, setCategory] = useState("Outro");
  const [priority, setPriority] = useState("Média");
  const [subtasks, setSubtasks] = useState([{ title: "", completed: false }]);

  const makeUiId = () => Date.now() + Math.random();

   useEffect(() => {
    if (task) {
      setTitle(task.title ?? "");
      setDescription(task.description ?? "");
      setExecutionDate(task.executionDate ? task.executionDate.split("T")[0] : "");
      setCategory(task.category ?? "Outro");
      setPriority(task.priority ?? "Média");

      const mapped = (task.subtasks ?? []).map((s) => ({
        uiId: makeUiId(),
        id: typeof s.id === "number" ? s.id : s.id ? Number(s.id) : 0,
        title: s.title ?? "",
        completed: !!s.completed,
      }));

      setSubtasks(mapped.length ? mapped : [{ uiId: makeUiId(), id: 0, title: "", completed: false }]);
    } else {
      setTitle("");
      setDescription("");
      setExecutionDate("");
      setCategory("Outro");
      setPriority("Média");
      setSubtasks([{ uiId: makeUiId(), id: 0, title: "", completed: false }]);
    }
  }, [task]);

  // Add a new subtask (new ones have id: 0)
  const handleAddSubtask = () => {
    setSubtasks((s) => 
      [...s, { uiId: makeUiId(), id: 0, title: "", completed: false }]);
  };

  // Remove by uiId
  const handleRemoveSubtask = (uiId) => {
    setSubtasks((s) => s.filter((sub) => sub.uiId !== uiId));
  };

  // Update title by uiId
  const handleSubtaskChange = (uiId, value) => {
    setSubtasks((s) => s.map((sub) => (sub.uiId === uiId ? { ...sub, title: value } : sub)));
  };

  // Toggle completed by uiId
  const toggleSubtask = (uiId) => {
    setSubtasks((s) => s.map((sub) => (sub.uiId === uiId ? { ...sub, completed: !sub.completed } : sub)));
  };

  // Prepare payload subtasks for API:
  // include id (existing backend id or 0) and title/completed
  const buildPayloadSubtasks = () =>
    subtasks
      .map((s) => ({ id: s.id ?? 0, title: s.title ?? "", completed: !!s.completed }))
      .filter((s) => s.title.trim().length > 0); // optionally remove empty titles

  const handleSave = (store) => {
  const formattedDate = executionDate ? new Date(executionDate).toISOString() : null;

  // Build payload subtasks for the API (strip uiId)
  const payloadSubtasks = subtasks
    .map((s) => ({
      ID: s.id ?? 0,          // backend subtask id (existing) or 0 for new
      Title: s.title ?? "",
      Completed: !!s.completed,
    }))
    .filter((s) => s.Title.trim().length > 0); // remove empty titles if you want

  // Build task body; include ID (PascalCase to match your C# model)
  const taskBody = {
    ID: isEdit ? task.id : 0,          // <-- make sure this is present and correct
    Title: title,
    Description: description,
    ExecutionDate: formattedDate,      // server will bind this to ExecutionDate
    Category: category,                // ensure this is a string that matches your enum names
    Priority: priority,
    Subtasks: payloadSubtasks,
  };

  // If your useTasks updateMutation expects { id, task } (as you posted earlier),
  // pass exactly that shape so updateTask(id, taskBody) will call fetch(..., body: JSON.stringify(taskBody))
  const payload = isEdit ? { id: task.id, task: taskBody } : taskBody;

  console.log("PUT payload ->", payload); // inspect payload in console BEFORE the request

  // call the mutation (make sure `mutation` is the react-query mutation object)
  mutation.mutate(payload, {
    onSuccess: () => {
      toaster.success({ title: isEdit ? "Tarefa atualizada" : "Tarefa criada" });
      if (!isEdit) { /* reset fields for create */ }
      if (store?.setOpen) store.setOpen(false);
    },
    onError: () => toaster.error({ title: "Erro ao gravar" }),
  });
};

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {isEdit ? (
          <Button size="sm" variant="outline" colorPalette="yellow" title="Editar">
            <FaPencilAlt />
          </Button>
        ) : (
          <Button size="sm" mx={3} variant="outline" colorPalette="green" title="Criar">
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
                    <Dialog.Title>{isEdit ? "Editar Tarefa" : "Criar Nova Tarefa"}</Dialog.Title>
                  </Dialog.Header>

                  <Dialog.Body>
                    <VStack spacing={3}>
                      <Input placeholder="Título" value={title} onChange={(e) => setTitle(e.target.value)} />
                      <Textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} />

                      <Flex w="100%" align="center" justify="space-between">
                        <Text fontWeight="medium">Categoria</Text>
                        <SegmentGroup.Root
                          value={category}
                          onValueChange={(val) => setCategory(typeof val === "string" ? val : val.value)}
                        >
                          <SegmentGroup.Indicator />
                          <SegmentGroup.Items items={["Pessoal", "Trabalho", "Outro"]} />
                        </SegmentGroup.Root>
                      </Flex>

                      <Flex w="100%" align="center" justify="space-between">
                        <Text fontWeight="medium">Prioridade</Text>
                        <SegmentGroup.Root
                          value={priority}
                          onValueChange={(val) => setPriority(typeof val === "string" ? val : val.value)}
                        >
                          <SegmentGroup.Indicator />
                          <SegmentGroup.Items items={["Alta", "Média", "Baixa"]} />
                        </SegmentGroup.Root>
                      </Flex>

                      <Flex w="100%" align="center" justify="space-between">
                        <Text fontWeight="medium">Data</Text>
                        <Input type="date" value={executionDate} onChange={(e) => setExecutionDate(e.target.value)} w="50%" />
                      </Flex>

                      <Box borderWidth="1px" borderRadius="md" w="100%" p={3}>
                        <Text fontWeight="medium" mb={2}>
                          Subtarefas
                        </Text>

                        <VStack spacing={2} align="start">
                          {subtasks.map((sub) => (
                            <HStack key={sub.uiId} w="100%">
                              {/* custom checkbox only for edit mode (you can show for create too if you want) */}
                              {isEdit && (
                                <Box as="label" display="flex" alignItems="center" cursor="pointer" gap={2}>
                                  {/* hidden native checkbox (for accessibility) */}
                                  <input
                                    type="checkbox"
                                    checked={!!sub.completed}
                                    onChange={() => toggleSubtask(sub.uiId)}
                                    style={{ display: "none" }}
                                  />
                                  <Box
                                    as="span"
                                    width="18px"
                                    height="18px"
                                    border="2px solid #999"
                                    borderRadius="4px"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    bg={sub.completed ? "blue.500" : "transparent"}
                                    transition="all 0.15s"
                                  >
                                    {sub.completed && (
                                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                                        <polyline points="1 7 4 10 11 1" />
                                      </svg>
                                    )}
                                  </Box>
                                </Box>
                              )}

                              <Input
                                placeholder="Título da subtarefa"
                                value={sub.title}
                                onChange={(e) => handleSubtaskChange(sub.uiId, e.target.value)}
                              />

                              <Button
                                aria-label="Remover"
                                size="sm"
                                colorPalette="red"
                                onClick={() => handleRemoveSubtask(sub.uiId)}
                              >
                                <FaTrash />
                                </Button>
                            </HStack>
                          ))}

                          <Button size="sm" variant="outline" leftIcon={<FaPlus />} onClick={handleAddSubtask}>
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
                    <Button colorPalette={isEdit ? "yellow" : "green"} onClick={() => handleSave(store)}>
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