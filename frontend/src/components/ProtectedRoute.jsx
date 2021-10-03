import { Redirect, Route } from 'react-router-dom';
import { IsLoginContext } from '../contexts/IsLoginContext';
import React from 'react';



function ProtectedRoute(props) {

  const isLoggedIn = React.useContext(IsLoginContext);

  if (!isLoggedIn) {
    return <Redirect to='/sign-in'></Redirect>
  }

  return (
    <Route path={props.path}>
      {props.children}
    </Route>
  );
}

export default ProtectedRoute;