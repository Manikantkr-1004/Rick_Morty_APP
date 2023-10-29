import { useState } from 'react';
import './App.css';
import {Flex, Button} from "@chakra-ui/react"
import { Favourite } from './Component/Favourite';
import { Home } from './Component/Home';

function App() {

  const [state,setState] = useState(false);

  return (
    <div className="App">
      <Flex w="90%" m="auto" justifyContent="space-between" mt="20px">
        <Button onClick={()=> setState(false)} w="48%" variant="unstyled" bg={state?"black":"blue"} color="white">Home</Button>
        <Button onClick={()=> setState(true)} w="48%" variant="unstyled" bg={state?"blue":"black"} color="white">Favourite</Button>
      </Flex>
      {
        state? <Favourite /> : <Home />
      }
    </div>
  );
}

export default App;
