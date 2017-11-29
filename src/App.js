import React, { Component } from 'react';
import './App.css';
import {
  Grid,
  Col,
  Row,
} from 'react-bootstrap';
import {
  Link,
  Route,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import {connect} from 'redxjs';
import store from './stores/redxjsStore';
import dm from './externals/chatAppAdapter.js';
import {SignUp, ChatNav, Login} from './components';
import {PublicOnlyRoute} from './helpers';
class App extends Component {
  componentWillMount() {
    let {reducerObservable} = this.props;
    reducerObservable();
  }
  render() {
    let {logout} = this.props;
    let {token} = this.props.auth;
    return (
      <Router>
      <div className="App">
        <ChatNav logout={logout} isAuthenticated={token}/>
        <Grid className="show-grid">
          <Row>
            <Col xs={12}>
              <Route exact path="/" component={Home}/>
              <Route path="/about" component={AboutTwo}/>
              <Route path="/topics" component={Topics}/>
              <PublicOnlyRoute path="/login" isAuthenticated={token} component={Login}/>
              <PublicOnlyRoute path="/signup" isAuthenticated={token} component={SignUp}/>
            </Col>
          </Row>
        </Grid>
      </div>
      </Router>
    );
  }
}
let stateToProps = (state) => ({
  auth: state.auth
})
let dispatchToProps = (dispatch) => ({
  logout: (history, e) => {
    dispatch({
      type: 'DEAUTHENTICATE'
    });
    history.push("/");
  },
  reducerObservable: () => {
    dm.masterObservable.subscribe((e: any) => {
      console.log("EVENT NAME", e.name, store.getState())
      switch(e.name) {
        case 'authenticated':
          dispatch({
            type: 'AUTHENTICATE',
            token: e.wsmessage.token
          })
          break;
        case 'unauthorized':
          break;
        case 'reconnected':
          dm.relogin(store.getState().auth.token);
      default:
        break;


      }
    })
  } 
})
App = connect(stateToProps, dispatchToProps)(App);
export default App;

const Home = ({location}) => {
  return (
  <div>
    <h2 className="home">Home</h2>
  </div>
)
}

let About = ({auth}, context) => {
  return (
  <div>
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




