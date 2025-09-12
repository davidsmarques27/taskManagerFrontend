import { VStack, Text, Button } from "@chakra-ui/react"
import { useState } from "react"

function MainContent() {
  const [count, setCount] = useState(0)

  return (
    <VStack spacing={4} py={10}>
      <Text fontSize="xl">Welcome to my site 🎉</Text>
      <Button colorScheme="teal" onClick={() => setCount(count + 1)}>
        You clicked {count} times
      </Button>
    </VStack>
  )
}

export default MainContent
