import React,{useReducer,createContext} from 'react';

const initialState = {
  toDoList: { List: [], item: {}},
  todo: {List: [], item: {}}
}
const Store = createContext(initialState)

function reducer(state,action){
  switch (action.type) {
    case 'prueba':
      return state;
    default:
      return state;  

  }
}

const StoreProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Store.Provider value={{state,dispatch}}>
    {children}
  </Store.Provider>
}

function App() {
  return (
    <StoreProvider>
      <style >{'body {background-color: #8f8f8f}'}</style>
        <h3 className="text-center text-white">To-DO List</h3>

    </StoreProvider>
  );
}

export default App;
