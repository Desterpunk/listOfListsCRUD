import React from 'react';
import FormToDoList from './components/FormTodoList';
import ListToDoList from './components/ListTodoList';
import { StoreProvider } from './components/StoreProvider';

export const HOST_API = "http://localhost:8080/api";

function App() {
  return (
    <StoreProvider className="container text-align-center">
      <style >{'body {background-color: #8f8f8f}'}</style>
        <h3 className="text-center text-white mt-5">To-DO List</h3>
        <FormToDoList/>
        <ListToDoList/>
    </StoreProvider>
  );
}

export default App;
