import { ChakraProvider, Container } from '@chakra-ui/react'
import './App.css'
import Events from './components/organisms/Events/Events'

function App() {
  return (
    <ChakraProvider>
      <Container py="10">
        <Events />
      </Container>
    </ChakraProvider>
  )
}

export default App
