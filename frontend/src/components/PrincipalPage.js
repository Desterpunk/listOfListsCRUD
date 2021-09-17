import React from 'react';
import FormToDoList from './FormTodoList';
import ListToDoList from './ListTodoList';
import { StoreProvider } from './StoreProvider';

export const HOST_API = "http://localhost:8080/api";

function App() {
  return (
    <StoreProvider>
        <FormToDoList/>
        <ListToDoList/>
    </StoreProvider>
  );
}

export default App;