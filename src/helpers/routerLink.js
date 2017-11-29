import React  from 'react';

import {
  withRouter,
  NavLink,
} from 'react-router-dom';


let RouterLink = ({ to, children, location, ...props }) => {
  let {className} = props;
  return (
    <li>
      <NavLink to={to} className={className}>{children}</NavLink>
    </li>)
}
export default RouterLink = withRouter(RouterLink);