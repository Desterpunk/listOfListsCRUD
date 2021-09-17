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
      <table>
        <thead>
          <tr>
              <td className="clear">ID</td>
              <td className="clear">Tarea</td>
              <td className="clear">Crear to-do?</td>
              <td className="clear">Acciones</td>
          </tr>
        </thead>
        <tbody>
          {currentList.map((toDoList) => {
            return <tr key={toDoList.id}>
              <td>{toDoList.id}</td>
              <td> {toDoList.name}</td>
              <td><FormToDo idTodoList={toDoList.id}/></td>
              <td> <ListToDo idTodoList = {toDoList.id}/></td>
              <td><button className="button edit" onClick={() => onDelete(toDoList.id)}>Eliminar</button></td>
              <td><button className="button delete" onClick={() => onEdit(toDoList)}>Editar</button></td>
              
            </tr>
          })}
        </tbody>
      </table>
    </div>
  }

  export default ListToDoList;