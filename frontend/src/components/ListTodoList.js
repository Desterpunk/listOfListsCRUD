import React,{useContext,useEffect} from 'react';
import { HOST_API } from '../App';
import FormToDo from './FormTodo';
import ListToDo from './ListTodo';
import { StoreListas } from './StoreProvider';


const ListToDoList = () => {
    const {dispatch,state:{toDoList}} = useContext(StoreListas);
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
          <ListToDo idTodoList = {toDoList.id}/>
        </div>
      })}
    </div>
  }

  export default ListToDoList;