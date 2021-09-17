function Reducer(state,action){
    switch (action.type) {
      case 'add-todoList-item':
        const todoListUp = state.toDoList.list;
        todoListUp.push(action.item);
        return { ...state, todoList: { list: todoListUp, item: {} } }
      case 'update-toDoList-list':
        const toDoUpList = state.toDoList;
        toDoUpList.list = action.list;
        return {...state, toDoList: toDoUpList}  
      case 'delete-toDoList-item':
        const toDoListUpDelete = state.toDoList;
        const toDoListUpNotDelete = toDoListUpDelete.list.filter((item) => {
          return item.id !== action.id
        })
        toDoListUpDelete.list = toDoListUpNotDelete;
        return {...state, toDoList: toDoListUpDelete}    
  
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
      case 'add-toDo-item':
        const toDoUp = state.toDo.list;
        toDoUp.push(action.item);
        return{ ...state,toDo: {list:toDoUp,item: {}}}
      case 'update-toDo-list':
        const toDoUpdate = state.toDo;
        toDoUpdate.list = action.list;
        return {...state, toDo: toDoUpdate}   
      case 'delete-toDo-item':
        const toDoUpDelete = state.toDo;
        const toDoUpNotDelete = toDoUpDelete.list.filter((item) => {
          return item.id !== action.id
        }) 
        toDoUpDelete.list = toDoUpNotDelete;
        return {...state, toDo: toDoUpDelete}
      case 'update-item':
        const toDoUpItem = state.toDo;
        const listUpdateEdit = toDoUpItem.list.map((item) => {
          if (item.id === action.item.id) {
            return action.item;
          }
          return item;
        });
        toDoUpItem.list = listUpdateEdit;
        toDoUpItem.item = {};
        return { ...state, todo: toDoUpItem } 
      case "edit-toDo-item":
        const toDOUpEdit = state.toDo;
        toDOUpEdit.item = action.item;
        return{...state,toDo:toDOUpEdit};
      case "update-toDo-item":
        const toDoUpdateItem = state.toDo;
        const toDoUpdateEdit = toDoUpdateItem.list.map((item) => {
          return action.item;
        })
        toDoUpdateItem.lista = toDoUpdateEdit;
        toDoUpdateItem.item = {}
        return {...state, toDoList: toDoUpdateItem};
      default:
 
        return state;  
  
    }
  }

  export default Reducer;