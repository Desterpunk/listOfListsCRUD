import React,{useRef,useContext,useState} from 'react';
import { HOST_API } from '../App';
import { StoreListas } from './StoreProvider';


const FormToDo = (props) => {
    const formRef = useRef(null);
    const {dispatch,state: {toDo}} = useContext(StoreListas);
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
      .then((toDo) => {
        dispatch({ type: "add-toDo-item",item:toDo});
        setState({name: ""});
        formRef.current.reset();
      });
    }
  
    return <form ref={formRef}>
      <input
        type="text"
        name="name"
        placeholder="Objetivos"
        defaultValue={state.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}  ></input> 
      {!state.id &&<button onClick={onAdd}>Nuevo</button>}
    </form>
  }

  export default FormToDo;