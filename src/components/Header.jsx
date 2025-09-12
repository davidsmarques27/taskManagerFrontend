import { Flex, Button, HStack, Heading, Box } from "@chakra-ui/react";
import { FaTasks } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";

function Footer() {
  return (
    <Flex
      as="header"
      p={6}
      bg="ref.400"
      color="white"
      align="center"
      gap={4}
      position="relative"
    >
      <Heading size="xl">Gestor de Tarefas</Heading>

      <Box
        position="absolute"
        left="50%"
        transform="translateX(-50%)"
        display="flex"
        gap={2}
        bg="fg.disabled"
        borderWidth="1px"
        borderColor="blue.700"
        borderRadius={10}
        p={2}
      >
    <HStack wrap="wrap" gap="4">
      <Button colorPalette="pink" color="pink.600" variant="outline"> <FaTasks /> Tarefas </Button>
      <Button colorPalette="pink" color="pink.600" variant="outline"> <BiTask /> Tarefas Completas</Button>
      <Button colorPalette="pink" color="pink.600" variant="outline"> <IoPersonSharp /> Sobre</Button>
    </HStack>
      </Box>
    </Flex>
  );
}

export default Footer;
