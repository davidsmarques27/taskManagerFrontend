import { Box, Flex } from "@chakra-ui/react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import AppRoutes from "./routes/AppRoutes";

function App() {

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.950">
      <header className="fixed top-0 left-0 w-full z-50">
        <Header />
      </header>
        <Box flex="1" mt="20px" mb="20px" w="100%" px={4} >
          <AppRoutes />
        </Box>
      <footer className="fixed top-0 left-0 w-full z-50">
        <Footer />
      </footer>
    </Box> 
  )
}

export default App
