import {
  Box,
  Text,
  VStack,
  Flex,
  Collapsible,
  Checkbox,
  Button
} from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa";
import { useState, useEffect } from "react";
import { FiSave } from "react-icons/fi";

function TaskSubtasks({ subtasks, onChange, onSave }) {
  const [localSubs, setLocalSubs] = useState([]);
  const [hasChanges, setHasChanges] = useState(false);

  const completedCount = localSubs.filter((s) => s.completed).length;

 useEffect(() => {
    setLocalSubs(subtasks);
    setHasChanges(false); // reset change state when subtasks prop changes
  }, [subtasks]);

  const toggleSubtask = (id) => {
    const updated = localSubs.map((sub) =>
      sub.id === id ? { ...sub, completed: !sub.completed } : sub
    );
    setLocalSubs(updated);
    onChange(updated);
    setHasChanges(true); // mark changes
  };

  if (!subtasks || subtasks.length === 0) return null;

  return (
    <Collapsible.Root py={2} px={4}>
      <Collapsible.Trigger fontWeight="bold">
        <Flex w="100%" align="center" justify="space-between">
          {/* Icon + text */}
          <Flex align="center">
            <FaArrowDown />
            <Text ml={1}> {completedCount} / {subtasks.length} Subtarefas</Text>
          </Flex>

          {/* Save button, only if there are changes */}
          {hasChanges && (
            <Button
              size="xs"
              ml={3}
              colorPalette="green"
              variant="outline"
              color="green.800"
              onClick={() => onSave(localSubs)}
            >
              <FiSave />
            </Button>
          )}
        </Flex>
      </Collapsible.Trigger>
      <Collapsible.Content px={4}>
        <VStack spacing={2} align="start" mt={2}>
          {localSubs.map((sub) => {
            const inputId = `cbx-${sub.id}`; // unique id for each checkbox
            return (
              <Box
                key={sub.id}
                as="label"
                display="flex"
                alignItems="center"
                cursor="pointer"
                gap={2}
              >
                {/* Hidden checkbox */}
                <input
                  id={inputId}
                  type="checkbox"
                  checked={sub.completed}
                  onChange={() => toggleSubtask(sub.id)}
                  style={{ display: "none" }}
                />

                {/* Custom SVG checkbox */}
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
                  transition="all 0.2s"
                >
                  {sub.completed && (
                    <svg
                      width="12px"
                      height="12px"
                      viewBox="0 0 12 12"
                      fill="none"
                      stroke="white"
                      strokeWidth="2"
                    >
                      <polyline points="1 7 4 10 11 1" />
                    </svg>
                  )}
                </Box>

                <Text>{sub.title}</Text>
              </Box>
            );
          })}
        </VStack>
        </Collapsible.Content>
    </Collapsible.Root>
  );
}

export default TaskSubtasks;