import React, { Component } from 'react';
import './App.css';
import {
  Navbar,
  MenuItem,
  Nav,
  NavDropdown,
  Grid,
  Col,
  Row
} from 'react-bootstrap';
import {
  Link,
  Route,
  BrowserRouter as Router,
  withRouter,
  NavLink,
  Redirect
} from 'react-router-dom';
import SignUp from './signup';
import Login from './Login';
import {connect} from 'redxjs';
import store from './stores/redxjsStore';
import dm from './externals/chatAppAdapter.js';
class App extends Component {
  componentWillMount() {
    dm.masterObservable.subscribe((e: any) => {
      console.log(e, 'master')
    })
  }
  render() {
    return (
      <Router>
      <div className="App">
        <Foo />
        <Grid className="show-grid">
          <Row>
            <Col xs={12}>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={AboutTwo}/>
              <Route path ="/login" component={Login}/>
              <Route path="/topics" component={Topics}/>
              <Route path="/signup" component={SignUp}/>
            </Col>
          </Row>
        </Grid>
      </div>
      </Router>
    );
  }
}
App = connect(stateToProps)(App);
export default App;

let Foo = ({location}) => {
  return (
  <Navbar inverse collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
        <RouterLink to="/" className="navbar-brand">Home</RouterLink>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
      <Nav pullRight>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
        <RouterLink to="/topics">Topic</RouterLink>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)
}
Foo = withRouter(Foo);
const Home = ({location}) => {
  return (
  <div>
    <h2 className="home">Home</h2>
  </div>
)
}
let stateToProps = (state) => ({
  auth: state.auth
})
let About = ({auth}, context) => {
  return (
  <div>
    <h1>{JSON.stringify(auth)}</h1>
    <h2>About</h2>
  </div>
)
}
let AboutTwo = connect(stateToProps)(About);
const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)
const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

let RouterLink = ({ to, children, location, ...props }) => {
  // use activeStyle from bootstrap.css of your theme
  // search for:  .navbar-default .navbar-nav > .active > a,
  let {className} = props;
  return (
    <li>
      <NavLink to={to} className={className}>{children}</NavLink>
    </li>)
}
RouterLink = withRouter(RouterLink);



const PrivateRoute = ({ component: Component, isAuthenticated = false, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)
