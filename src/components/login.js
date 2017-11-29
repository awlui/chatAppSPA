import React, {Component} from 'react';
import {
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import {
  Link,
} from 'react-router-dom';
import {
  connect
} from 'redxjs';
import dm from '../externals/chatAppAdapter';



class Login extends Component {
  componentWillUnmount() {
    let {resetLogin} = this.props;
    resetLogin();
  }
  render = () => {
    let {onLoginAttempt, onUsernameChange, onPasswordChange, username, password, loginFieldsValid} = this.props;

    return (
      <Col xs={10} xsOffset={1} md={4} mdOffset={4} >
        <div>
        <h2 className="login">Login</h2>
        <Form className="login" onKeyDown={(e) => {
        if (e.keyCode === 13) {
          onLoginAttempt(username, password, e);
        }
        }}>
          <FormGroup>
            <Col componentClass={ControlLabel}>
              Username:
            </Col>
            <Col>
              <FormControl type="text" placeholder="Username"  onChange={onUsernameChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel}>
              Password:
            </Col>
            <Col>
              <FormControl type="password" placeholder="Password" onChange={onPasswordChange} />
            </Col>
          </FormGroup>
          {loginFieldsValid ? null : <h2>Username or password invalid</h2>}
          <FormGroup>
            <Col className="loginButton">
              <Button bsStyle="primary" onClick={onLoginAttempt.bind(this, username, password)}>
                Log in
              </Button>
            </Col>
            <Col className="signup">
            <Button className="signup" componentClass={Link} to="/signup" bsStyle="default" type="submit">
              Sign up
            </Button>
            </Col>
          </FormGroup>
      </Form>
        </div>

      </Col>
    )
  }
}

let mapStateToProps = (state) => ({
  ...state.login
})

let mapActionsToProps = (dispatch) => (
  {
    onLoginAttempt: function(username, password, e) {

      dm.login(username, password);
      dispatch({
        type: 'IS_LOGGIN_IN'
      });
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

export default connect(mapStateToProps, mapActionsToProps)(Login);
