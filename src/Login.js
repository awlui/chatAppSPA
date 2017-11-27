import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button
} from 'react-bootstrap';
import {
  Link
} from 'react-router-dom';
import {
  connect
} from 'redxjs';
import dm from './externals/chatAppAdapter';
import store from './stores/redxjsStore';
class Login extends Component {
  render = () => {
    let {onLoginAttempt, onUsernameChange, onPasswordChange, username, password} = this.props;
    return (
      <Col xs={10} xsOffset={1} md={4} mdOffset={4} >
        <div>
        <h2>Login</h2>
        <Form>
          <FormGroup>
            <Col componentClass={ControlLabel}>
              Email:
            </Col>
            <Col>
              <FormControl type="email" placeholder="Email" />
            </Col>
          </FormGroup>
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
          <FormGroup>
            <Col className="login">
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
  ...state.auth
})

let mapActionsToProps = (dispatch) => (
  {
    onLoginAttempt: function(username, password, e) {

      dm.login(username, password);
    },
    onUsernameChange: function(e: Event) {
      dispatch({
        type: 'KEYPRESS_USERNAME',
        username: e.target.value
      })
    },
    onPasswordChange: function(e: Event) {
      dispatch({
        type: 'KEYPRESS_PASSWORD',
        password: e.target.value
      })
    }
  }
)

export default connect(mapStateToProps, mapActionsToProps)(Login);
