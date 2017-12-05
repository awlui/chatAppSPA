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
} from 'react-router-dom';
import {connect} from 'redxjs';
import store from './stores/redxjsStore';
import dm from './externals/chatAppAdapter.js';
import {SignUp, ChatNav, Login, AsyncComponent} from './components';
import {PublicOnlyRoute, PrivateRoute} from './helpers';
import {Observable} from 'rxjs/Rx'

let chatApp = Observable.defer(() => {
  return Observable.fromPromise(import('./components/chatAppHome').then((comp) => { console.log(comp); return comp;}));
}).share();


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
        <div className="show-grid">
              <Route exact path="/" render={(props) => {
                return (
                  <div>
                      {token ? <AsyncComponent moduleProvider={chatApp} /> : null}
                </div>
                )
              }
              }/>
          <Grid className="show-grid">
          <Row>
            <Col xs={12}>
              {token ? null : (<Route path="/" render={() => (<SignUp />)} />) }
              <Route path="/about" component={AboutTwo}/>
              <Route path="/topics" component={Topics}/>
              <PublicOnlyRoute path="/login" isAuthenticated={token} component={Login}/>
              <PublicOnlyRoute path="/signup" isAuthenticated={token} component={SignUp}/>
            </Col>
          </Row>
          </Grid>
        </div>
      </div>
      </Router>
    );
  }
}

// <Route exact path='/' render={(props) => 
//   (
//   <PageContent {...props} pass_to_page_content='hi' />
// )

// }/>
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
      console.log("Observable Event:", e.name, e)
      switch(e.name) {
        case 'authenticated':
          dispatch({
            type: 'AUTHENTICATE',
            token: e.wsmessage.token
          })
          break;
        case 'unauthorized':
          dispatch({
            type: 'UNAUTHORIZED'
          });
          break;
        case 'reconnected':
          dm.relogin(store.getState().auth.token);
          break;
        case 'usernameExist':
          dispatch({
            type: 'CHECKING_USERNAME',
            value: false
          });
          if (e.wsmessage.data.exist) {
            dispatch({
              type: 'USERNAME_EXISTS',
            });
          } else {
            dispatch({
              type: 'USERNAME_DOESNT_EXIST'
            });
          }
          break;
      default:
        break;


      }
    })
  } 
})
App = connect(stateToProps, dispatchToProps)(App);
export default App;



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




