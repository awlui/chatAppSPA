import React, {Component} from 'react';
import {
  Col,
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  Button,
  Row,
  Alert
} from 'react-bootstrap';

import {
  connect
} from 'redxjs';
import dm from '../externals/chatAppAdapter';
import store from '../stores/redxjsStore';
import {emailVal, usernameVal, passwordVal, notEmptyVal } from '../formValidation/signup';


class SignUp extends Component {
  componentWillUnmount = () => {
    let {emptySignupState} = this.props;
    emptySignupState();
  }
  render = () => {
    let {onUsernameChange, onFirstNameChange, onLastNameChange, signUpAttempt, onEmailChange,
      onPasswordChange, username, password, lastName, firstName, email, validations} = this.props;
    return (
      <Col xs={10} xsOffset={1}  >
        <div>
        <h2>Sign Up</h2>
        <Form>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Email:
            </Col>
            <Col xs={12} md={6}>
              <FormControl  type="email" placeholder="Email" onChange={onEmailChange}/>
            </Col>
            <Col xs={12} md={6}>
            {(!validations || validations.emailVal) ? null :
            <Alert bsStyle='danger'>
            <div>List valid email</div>
          </Alert>
            }
            </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Username:
            </Col>
            <Col xs={12} md={6}>
              <FormControl  type="text" placeholder="Username"  onChange={onUsernameChange} />
            </Col>
            {(!validations || validations.usernameVal) ? null :
              <Col xs={12} md={6}>
            <Alert bsStyle='danger'>
            <div>Username must be between 6 to 20 characters</div>
          </Alert>
            </Col>
            }
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              First Name:
            </Col>
            <Col xs={12} md={6}>
              <FormControl  type="text" placeholder="First Name"  onChange={onFirstNameChange} />
            </Col>
            <Col xs={12} md={6}>
            {(!validations || validations.firstNameVal) ? null :
            <Alert bsStyle='danger'>
            <div>Must fill in first name.</div>
          </Alert>
            }
            </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Last Name:
            </Col>
            <Col xs={12} md={6}>
              <FormControl type="text" placeholder="Last Name"  onChange={onLastNameChange} />
            </Col>
            <Col xs={12} md={6}>
            {(!validations || validations.lastNameVal) ? null :
            <Alert bsStyle='danger'>
            <div>Must fill in last name.</div>
          </Alert>
            }
            </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Password:
            </Col>
            <Col xs={12} md={6}>
              <FormControl type="password" placeholder="Password" onChange={onPasswordChange} />
            </Col>
            <Col xs={12} md={6}>
            {(!validations || validations.passwordVal) ? null :
            <Alert bsStyle='danger'>
            <div>Password must be between 6 to 20 characters.</div>
          </Alert>
            }
            </Col>
            </Row>
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
    ...state.signup
  }
);

let mapActionsToProps = (dispatch) => (
  {
    signUpAttempt: function(data: any, e: Event) {
        let validations = {
          usernameVal: usernameVal(data.username),
          passwordVal: passwordVal(data.password),
          emailVal: emailVal(data.email),
          firstNameVal: notEmptyVal(data.firstName),
          lastNameVal: notEmptyVal(data.lastName)
        }
        console.log(validations, store.getState())
        let flag = false;
        Object.keys(validations).forEach((val) => {
          if (!validations[val]) {
            flag = true;
          }
        });
        if (flag) {
          dispatch({
            type: 'SIGNUP_VALIDATION_FAIL',
            validations
          })
          console.log(flag, 'flag')
        } else {
          dispatch({
            type: 'SIGNUP_VALIDATION_SUCCESS'
          })
          dm.signUp(data);
        }
    },
    onUsernameChange: function(e: Event) {
      dispatch({
        type: 'KP_SIGNUP_USERNAME',
        username: e.target.value
      })
    },
    onPasswordChange: function(e: Event) {
      dispatch({
        type: 'KP_SIGNUP_PASSWORD',
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
        type: 'KP_FIRSTNAME',
        firstName: e.target.value
      })
    },
    onLastNameChange: function(e: Event) {
      dispatch({
        type: 'KP_LASTNAME',
        lastName: e.target.value
      })
    },
    onEmailChange: function(e: Event) {
      dispatch({
        type: 'KP_EMAIL',
        email: e.target.value
      })
    }
  }
)

export default connect(mapStateToProps, mapActionsToProps)(SignUp);
