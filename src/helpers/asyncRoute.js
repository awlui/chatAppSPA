import {AsyncComponent} from '../components'
import {
  Route,
} from 'react-router-dom';
const AsyncHomeRoute = ({ ...rest }) => {
  return (
  <Route  render={props => {
    return (
      <AsyncComponent {...props} {...rest}/>
  )}}/>
  )



export default AsyncHomeRoute;