import { Box } from "@chakra-ui/react";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
import { useState } from "react";

function App() {
  const [search, setSearch] = useState("");

  return (
    <Box minH="100vh" display="flex" flexDirection="column" bg="gray.950">
      <Box position="fixed" top="0" left="0" w="100%" zIndex="50">
        <Header search={search} setSearch={setSearch} />
      </Box>

      <Box flex="1" mt="100px" mb="80px" w="100%" px={4}>
        <AppRoutes search={search} />
      </Box>

      <Box position="fixed" bottom="0" left="0" w="100%" zIndex="50">
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
