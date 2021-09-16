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
    const request = {
      name: state.name,
      id: null
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

  const onEdit = (event) => {
    const request = {
      name:state.name,
      id:item.id
    };

    fetch(HOST_API+"/todoList", {
      method: "PUT",
      body: JSON.stringify(request),
      headers: {
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then((toDoList) => {
      dispatch({type:"update-toDoList-item",item:toDoList});
      setState({name: ""});
      formRef.current.reset();
    })
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
    {item.id && <button onClick={onEdit}>Update List</button>}  
    {!item.id &&<button onClick={onAdd}>New list</button>}
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

  const onDelete = (id) => {
    fetch(HOST_API + "/" + id + "/todoList",{
      method:"DELETE"
    }).then((list) => {
      dispatch({type: "delete-toDoList-item",id})
    })
  };

  const onEdit = (toDoList) => {
    dispatch({type:"edit-toDoList-item",item:toDoList})
  };

  return <div>
    {currentList.map((toDoList) => {
      return <div key={toDoList.id}>
        <p className="text-white">{toDoList.id} {toDoList.name}</p>
        <button onClick={() => onDelete(toDoList.id)}>Eliminar</button>
        <button onClick={() => onEdit(toDoList)}>Editar</button>
        <FormToDo idTodoList={toDoList.id}/>
        <ListToDo toDoList = {toDoList.toDoList}/>
      </div>
    })}
  </div>
}


const FormToDo = (props) => {
  const formRef = useRef(null);
  const {dispatch,state: {toDo}} = useContext(Store);
  const item = toDo.item;
  const toDoListId = props.idTodoList;
  const [state, setState] = useState(item);

  const onAdd = (event) => {
    const request = {
      name: state.name,
      id: null,
      completed: false,
      toDoListId: toDoListId
    };
    fetch(HOST_API + "/todo",{
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then((toDoList) => {
      dispatch({ type: "add-toDo-item",item:toDoList});
      setState({name: ""});
      formRef.current.reset();
    });
  }

  return <form ref={formRef}>
    <input
      type="text"
      name="name"
      placeholder="Objetivos"
      defaultValue={item.name}
      onChange={(event) => {
        setState({ ...state, name: event.target.value })
      }}  ></input> 
    {!item.id &&<button onClick={onAdd}>Nuevo</button>}
  </form>
}

const ListToDo = (props) => {
  const {dispatch} = useContext(Store);
  const currentList = props.toDoList;
  console.log(currentList)
  return <div>
        {currentList.map((toDo) => {
      return <div>
        {toDo.id} {toDo.name}
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
    case 'delete-toDoList-item':
      const toDoListUpDelete = state.toDoList;
      const toDoListUp = toDoListUpDelete.list.filter((item) => {
        return item.id !== action.id
      })
      toDoListUpDelete.list = toDoListUp;
      return {...state, toDoList: toDoListUpDelete} 
    case 'add-toDo-item':
      const toDoUpEdit = state.toDo;
      toDoUpEdit.item = action.item;
      return{ ...state,toDo: toDoUpEdit};   

    case 'edit-toDoList-item':
      const toDoListUpEdit = state.toDoList;
      toDoListUpEdit.item = action.item;
      return{ ...state,toDoList: toDoListUpEdit};
  
    case 'update-toDoList-item':
      const toDoListUpateItem = state.toDoList;
      const toDoListUpdateEdit = toDoListUpateItem.lista.map((item) => {
        if(item.id === action.item.id) {
          return action.item;
        }
        return item;
      })
      toDoListUpateItem.lista = toDoListUpdateEdit;
      toDoListUpateItem.item = {}
      return {...state, toDoList: toDoListUpateItem};

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
