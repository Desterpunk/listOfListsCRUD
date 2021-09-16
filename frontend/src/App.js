import React,{useReducer,createContext,useRef,useContext,useState,useEffect} from 'react';

const HOST_API = "http://localhost:8080/api";
const initialState = {
  toDoList: { list: [], item: {}},
  toDo: {list: [], item: {}}
}
const Store = createContext(initialState)

const FormToDoList = () => {
  const formRef = useRef(null);
  const {dispatch,state: {toDoList}} = useContext(Store);
  const item = toDoList.item;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    event.preventDefault();
    const request = {
      name: state.name,
      id: null,
      isCompleted:false
    };
    fetch(HOST_API + "/todoList",{
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((toDoList) => {
      dispatch({ type: "add-toDoList-item",item:toDoList});
      setState({name: ""});
      formRef.current.reset();
    });
  }

  return <form ref={formRef}>
    <input
      type="text"
      name="name"
      placeholder="To-Do List"
      defaultValue={item.name}
      onChange={(event) => {
        setState({ ...state, name: event.target.value })
      }}  ></input>
    {!item.id && <button onClick={onAdd}>New list</button>}
  </form>
}

const ListToDoList = () => {
  const {dispatch,state:{toDoList}} = useContext(Store);
  const currentList = toDoList.list;

  useEffect(() => {
    fetch(HOST_API + "/todosList")
    .then(response => response.json())
    .then((list) => {
      dispatch({type: "update-toDoList-list",list})
    })
  }, [dispatch])

  return <div>
    {currentList.map((toDoList) => {
      return <div>
        <p className="text-white">{toDoList.id} {toDoList.name}</p>
      </div>
    })}
  </div>
}


function reducer(state,action){
  switch (action.type) {
    case 'add-todoList-item':
      const todoListUp = state.toDoList.list;
      todoListUp.push(action.item);
      return { ...state, todoList: { list: todoListUp, item: {} } }
    case 'update-toDoList-list':
      const toDoUpList = state.toDo;
      toDoUpList.list = action.list;
      return {...state, toDoList: toDoUpList}  
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
        <FormToDoList/>
        <ListToDoList/>

    </StoreProvider>
  );
}

export default App;
