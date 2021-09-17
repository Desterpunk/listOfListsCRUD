import React,{createContext,useReducer} from 'react';
import reducer from './Reducer';

const initialStateListas = {
  toDoList: { list: [], item: {}},
  toDo: {list: [],item: {}}
}
export const StoreListas = createContext(initialStateListas)

export const StoreProvider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialStateListas);
  
    return <StoreListas.Provider value={{state,dispatch}}>
      {children}
    </StoreListas.Provider>
  }