import React, {Component} from 'react';
import {
  Nav,
  Navbar,
  Button,
  FormControl,
  FormGroup
} from 'react-bootstrap';
import {
  Link,
} from 'react-router-dom';
import {
  connect
} from 'redxjs';
import dm from '../externals/chatAppAdapter';
import {
  ChasingDots,
  Circle,
  CubeGrid,
  DoubleBounce,
  FadingCircle,
  FoldingCube,
  Pulse,
  RotatingPlane,
  ThreeBounce,
  WanderingCubes,
  Wave
} from 'better-react-spinkit'


class ChatLogin extends Component {
  componentWillUnmount() {
    let {resetLogin} = this.props;
    resetLogin();
  }
  render = () => {
    let {onLoginAttempt, onUsernameChange, onPasswordChange, username, password, loginFieldsValid, isLoggingIn} = this.props;

    return (
        <Navbar.Form className="login" pullRight onKeyDown={(e) => {
          console.log(e.keyCode)
          if (e.keyCode === 13) {
            onLoginAttempt(username, password, e);
          } 
        }}>
          <FormGroup>
              <FormControl className="username" type="text" placeholder="Username"  onChange={onUsernameChange} />
          </FormGroup>
          <FormGroup>
              <FormControl className="password" type="password" placeholder="Password" onChange={onPasswordChange} />
          </FormGroup>
          <FormGroup>
          </FormGroup>
          <FormGroup>
              <Button className="login-button" disabled={isLoggingIn} bsStyle="primary" onClick={onLoginAttempt.bind(this, username, password)}>
                Log in
              </Button>
              <FadingCircle className={isLoggingIn ? "wave" : "wave wave-hide"} color="white" size={30}/>
          </FormGroup>
          <div className={loginFieldsValid ? "valid" : "invalid"} style={{color: "#FF563C"}}><i className="fa fa-window-close-o"></i> Username or password invalid.</div>
        </Navbar.Form>
    )
  }
}
// {loginFieldsValid ? null : <div style={{color: "#FF563C"}}><i className="fa fa-window-close-o"></i> Username or password invalid.</div>}
let mapStateToProps = (state) => ({
  ...state.login
})

let mapActionsToProps = (dispatch) => (
  {
    onLoginAttempt: function(username, password, e) {
      dispatch({
        type: 'IS_LOGGING_IN'
      });
      setTimeout(() => {
      dm.login(username, password);
    }, 1000)
      // dm.login(username, password);
      // dispatch({
      //   type: 'IS_LOGGIN_IN'
      // });
    },
    resetLogin: function() {
    dispatch({
      type: 'RESET_LOGIN'
    });
    },
    onUsernameChange: function(e: Event) {
      dispatch({
        type: 'KP_LOGIN_USERNAME',
        username: e.target.value
      })
    },
    onPasswordChange: function(e: Event) {
      dispatch({
        type: 'KP_LOGIN_PASSWORD',
        password: e.target.value
      })
    }
  }
)

export default connect(mapStateToProps, mapActionsToProps)(ChatLogin);
