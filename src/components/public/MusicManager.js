import React from 'react'
import { Switch, Route } from 'react-router-dom';
import LoginPage from './login/LoginPage'
 
  
const MusicManager = (props) => {
    return (
      <Switch>
        <Route exact path='/' component={LoginPage}/>
        <Route path='/musicmanager/login' component={LoginPage} />
      </Switch>
    );
  };

  export default MusicManager;
