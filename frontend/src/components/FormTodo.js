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
  
    return <form ref={formRef}  className={"containerCreateTodo"}>
      <h2 className="title titleCreate">Create To-Do</h2>
      <div className="containerCreateTodo">
      <input
        className = "form-control"
        type="text"
        name="name"
        placeholder="To-do"
        defaultValue={state.name}
        onChange={(event) => {
          setState({ ...state, name: event.target.value })
        }}  ></input> 
      <div className="containerButtons">    
        {!state.id &&<button className="buttons" onClick={onAdd}>Nuevo</button>}
      </div>
      </div>
    </form>
  }

  export default FormToDo;