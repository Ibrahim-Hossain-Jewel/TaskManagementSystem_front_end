import React from 'react';

import Home from '../home';
import SignIn from '../SignIn';
import Signup from '../signup';
import TaskList from '../list';
import { Route, Switch,BrowserRouter,Redirect } from 'react-router-dom'


const checkAuth = () =>{
	const token = sessionStorage.getItem('token');
	return !!token
}

const AuthRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    checkAuth() ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{ pathname: '/login'}} />
      
    )
  )}/>
)

export default () => (
  
  <BrowserRouter>
  	<Switch>
      <Route exact path="/login" render={props=><SignIn {...props} />} />
      <Route exact path="/Signup" render={props=><Signup {...props} />} />
      <AuthRoute exact path="/" component={Home} />
      <AuthRoute exact path="/tasklist" component={TaskList} />
    </Switch>
  </BrowserRouter>
  
)








