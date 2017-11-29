import React from 'react';
import {
  Route,
  Redirect
} from 'react-router-dom';

const PublicOnlyRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => {
    return (
    !rest.isAuthenticated ? (
      <div>
      <Component {...props}/>
      </div>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: { from: props.location }
      }}/>
    )
  )}}/>
)
export default PublicOnlyRoute;