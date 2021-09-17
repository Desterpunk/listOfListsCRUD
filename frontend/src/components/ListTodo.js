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

    const decorationDone = {
      textDecoration: 'line-through'
    };

    const onChange = (event, toDo) => {
      const request = {
        name: toDo.name,
        id: toDo.id,
        toDoListId:props.idTodoList,
        completed: event.target.checked
      };
      fetch(HOST_API + "/todo", {
        method: "PUT",
        body: JSON.stringify(request),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then((toDo) => {
          dispatch({ type: "update-item", item: toDo });

        });
    }
  
    return <div>
      <table>
        <thead>
          <tr>
              <td className="clean">ID</td>
              <td className="clean">Tarea</td>
              <td className="clean">¿Completado?</td>
          </tr>
        </thead>
          <tbody>
            {todoList.map((toDo) => {
              if(toDo.toDoListId === toDoListId){
                return <tr key={toDo.id } style={toDo.completed ? decorationDone : {}}>
                <td>{toDo.id}</td>
                <td> {toDo.name}</td>
                <td><input type="checkbox" defaultChecked={toDo.completed} onChange={(event) => onChange(event, toDo)}></input></td>
                <td><button className="button delete" onClick={() => onDelete(toDo.id)}>Eliminar</button></td>
              </tr>
              }
              return null
            })}
        </tbody>
      </table>
    </div>
  }

  export default ListToDo;