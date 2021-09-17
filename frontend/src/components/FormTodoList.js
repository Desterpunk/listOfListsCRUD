import React,{useRef,useContext,useState} from 'react';
import { HOST_API } from '../App';
import { StoreListas } from './StoreProvider';


const FormToDoList = () => {
    const formRef = useRef(null);
    const {dispatch,state: {toDoList}} = useContext(StoreListas);
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

  export default FormToDoList;