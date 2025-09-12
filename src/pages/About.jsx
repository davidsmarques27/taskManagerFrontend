import {
  Box,
  Heading,
  Text,
  AbsoluteCenter,
  VStack,
  List,
} from "@chakra-ui/react";

export default function AboutPage() {
  return (
    <Box w="60%" p={4} color="white" mb={4} mx="auto">
      <Heading size="lg" mb={6} textAlign="center">
        Sobre
      </Heading>

      <AbsoluteCenter>
        <Box color="white" textAlign="left" fontWeight="medium">
          <Text mb={3}>
            Este projeto é uma aplicação de gestão de tarefas com subtarefas,
            composta por **Frontend em React.js** e **Backend com API REST em C#
            (.NET Core)**.
          </Text>
          <Text mb={3}>Funcionalidades:</Text>
          <VStack as="ul" spacing={2} align="start">
            <List.Root px={10}>
              <List.Item>
                Criar, editar e eliminar tarefas e subtarefas.
              </List.Item>
              <List.Item>
                Acompanhar o progresso das subtarefas (ex.: 2/4 concluídas).
              </List.Item>
              <List.Item>
                Ordenação automática das tarefas: incompletas primeiro, depois
                as completas, com ordenação por data de execução.
              </List.Item>
              <List.Item>
                Modal de criação/edição com validação mínima e feedback visual
                para tarefas concluídas.
              </List.Item>
            </List.Root>
          </VStack>

          <Text mt={4} fontWeight="bold">
            O projeto foi realizado por David Marques como parte do processo
            para a vaga de developer na X3IT.
          </Text>
        </Box>
      </AbsoluteCenter>
    </Box>
  );
}
