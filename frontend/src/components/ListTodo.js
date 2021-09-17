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
          {todoList.map((toDo) => {
            if(toDo.toDoListId === toDoListId){
              return <tr key={toDo.id } style={toDo.completed ? decorationDone : {}}>
              {toDo.id} {toDo.name}
              <input type="checkbox" defaultChecked={toDo.completed} onChange={(event) => onChange(event, toDo)}></input>
              <button className="btn btn-link" onClick={() => onDelete(toDo.id)}>Eliminar</button>
            </tr>
            }
            return null
      })}
    </div>
  }

  export default ListToDo;