import { Flex, Text } from "@chakra-ui/react"

function Footer() {
  return (
    <Flex
      as="footer"
      p={2}
      bg="blue.700"
      color="white"
      justify="center"
      align="center"
      mt={8}
    >
      <Text fontSize="sm" textAlign="center">
          © {new Date().getFullYear()} Projeto de candidatura para vaga de
          desenvolvedor na <strong>X3IT</strong> — desenvolvido por{" "}
          <strong>David Marques</strong>
        </Text>
    </Flex>
  )
}

export default Footer
