import React,{useContext,useEffect} from 'react';
import { HOST_API } from '../App';
import { StoreListas } from './StoreProvider';


const ListToDo = (props) => {
    const {dispatch,state:{toDo}} = useContext(StoreListas);
    const todoList = toDo.list
    const toDoListId = props.idTodoList;
  
    useEffect(() => {
      fetch(HOST_API + "/todos")
      .then(response => response.json())
      .then((list) => {
        dispatch({type: "update-toDo-list",list})
      })
    },[dispatch])
  
    const onDelete = (id) => {
      fetch(HOST_API + "/" + id + "/todo",{
        method:"DELETE"
      }).then((list) => {
        dispatch({type: "delete-toDo-item",id})
      })
    };
  
    return <div>
          {todoList.map((toDo) => {
            if(toDo.toDoListId === toDoListId){
              return <div key={toDo.id}>
              {toDo.id} {toDo.name}
              <button className="btn btn-link" onClick={() => onDelete(toDo.id)}>Eliminar</button>
            </div>
            }
            return null
      })}
    </div>
  }

  export default ListToDo;