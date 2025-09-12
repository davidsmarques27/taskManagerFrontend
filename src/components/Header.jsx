import {
  Flex,
  Button,
  HStack,
  Heading,
  Input,
  InputGroup,
  Box,
} from "@chakra-ui/react";
import { FaTasks, FaSearch } from "react-icons/fa";
import { BiTask } from "react-icons/bi";
import { IoPersonSharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

function Header({ search, setSearch }) {
  const location = useLocation();
  const showSearch =
    location.pathname === "/" || location.pathname === "/tarefas-completas";

  return (
    <Flex
      as="header"
      position="fixed"
      top="0"
      left="0"
      w="100%"
      zIndex="1000"
      p={6}
      color="white"
      align="center"
      bg="gray.950"
      justify="space-between"
    >
      <Box flex="1">
        <Heading size="xl">Gestor de Tarefas</Heading>
      </Box>

      <HStack spacing={4} flex="1" justify="center">
        <Button as={Link} to="/" variant="outline" colorScheme="pink">
          <FaTasks /> Tarefas
        </Button>
        <Button
          as={Link}
          to="/tarefas-completas"
          variant="outline"
          colorScheme="pink"
        >
          <BiTask /> Tarefas Completas
        </Button>
        <Button as={Link} to="/sobre" variant="outline" colorScheme="pink">
          <IoPersonSharp /> Sobre
        </Button>
      </HStack>

      <Box flex="1" display="flex" justifyContent="flex-end">
        {showSearch && (
          <InputGroup maxW="sm" startElement={<FaSearch />}>
            <Input
              placeholder="Pesquisar tarefas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              bg="gray.700"
              color="white"
              size="sm"
            />
          </InputGroup>
        )}
      </Box>
    </Flex>
  );
}

export default Header;
