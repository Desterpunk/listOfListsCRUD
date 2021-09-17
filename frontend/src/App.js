import React from 'react';
import {BrowserRouter,Route,Switch} from "react-router-dom";
import CoverPage from './components/CoverPage';
import PrincipalPage from './components/PrincipalPage';
export const HOST_API = "http://localhost:8080/api";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={CoverPage}/>
        <Route path = "/todo-list" component={PrincipalPage} />
      </Switch>
    </BrowserRouter>

    
  );
}

export default App;
