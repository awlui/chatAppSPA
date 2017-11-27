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
  Link
} from 'react-router-dom';
import {
  connect
} from 'redxjs';
import dm from './externals/chatAppAdapter';
import store from './stores/redxjsStore';
class SignUp extends Component {
  componentWillUnmount = () => {
    let {emptySignupState} = this.props;
    emptySignupState();
  }
  render = () => {
    let {onUsernameChange, onFirstNameChange, onLastNameChange, signUpAttempt, onEmailChange,
      onPasswordChange, username, password, lastName, firstName, email} = this.props;
    return (
      <Col xs={10} xsOffset={1} md={4} mdOffset={4} >
        <div>
        <h2>Sign Up</h2>
        <Form>
          <FormGroup>
            <Col componentClass={ControlLabel}>
              Email:
            </Col>
            <Col>
              <FormControl type="email" placeholder="Email" onChange={onEmailChange}/>
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
              First Name:
            </Col>
            <Col>
              <FormControl type="text" placeholder="First Name"  onChange={onFirstNameChange} />
            </Col>
          </FormGroup>
          <FormGroup>
            <Col componentClass={ControlLabel}>
              Last Name:
            </Col>
            <Col>
              <FormControl type="text" placeholder="Last Name"  onChange={onLastNameChange} />
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
            <Col className="signup">
              <Button bsStyle="primary" onClick={signUpAttempt.bind(this, {username, password, email, firstName, lastName})}>
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

let mapStateToProps = (state) => (
  {
    ...state.auth
  }
);

let mapActionsToProps = (dispatch) => (
  {
    signUpAttempt: function(data: any, e: Event) {

      dm.signUp(data);
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
    },
    emptySignupState: function() {
      dispatch({
        type: 'EMPTY_SIGNUP'
      })
    },
    onFirstNameChange: function(e: Event) {
      dispatch({
        type: 'KEYPRESS_FNAME',
        firstName: e.target.value
      })
    },
    onLastNameChange: function(e: Event) {
      dispatch({
        type: 'KEYPRESS_LNAME',
        lastName: e.target.value
      })
    },
    onEmailChange: function(e: Event) {
      dispatch({
        type: 'KEYPRESS_EMAIL',
        email: e.target.value
      })
    }
  }
)

export default connect(mapStateToProps, mapActionsToProps)(SignUp);
