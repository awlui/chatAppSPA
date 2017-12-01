import React, {Component} from 'react';
import { Observable } from 'rxjs/Rx';
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

import {
  connect
} from 'redxjs';
import dm from '../externals/chatAppAdapter';
import store from '../stores/redxjsStore';
import {emailVal, usernameVal, passwordVal, notEmptyVal } from '../formValidation/signup';


class SignUp extends Component {

  componentWillMount = () => {
    this.usrObsSub = Observable.create((obs) => {
        this._usernameObserver = obs.next.bind(obs);
    }).debounceTime(500).subscribe((value) => {
      dm.usernameExist(value);
    })
  }
  componentWillUnmount = () => {
    let {emptySignupState} = this.props;
    emptySignupState();
    this.usrObsSub.unsubscribe();
  }
  render = () => {
    let {onUsernameChange, onFirstNameChange, onLastNameChange, signUpAttempt, onEmailChange,
      onPasswordChange, username, password, lastName, firstName, email, validations, checkingExistence, checkUsername, exists} = this.props;
    return (
      <Col xs={10} xsOffset={1}  >
        <div>
        
        <h2>Sign Up</h2>
        <Form onKeyDown={(e) => {
        if (e.keyCode === 13) {
          signUpAttempt({username, password, email, firstName, lastName});
        }
      }
    }
        >
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Email:
            </Col>
            <Col xs={12} md={6}>
              <FormControl  type="email" placeholder="Email" onChange={onEmailChange.bind(this, validations)}/>
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
              <FormControl  type="text" placeholder="Username"  onChange={(e) => {
                onUsernameChange(validations, e);
                this._usernameObserver(e.target.value)
                checkUsername();
              }} />
              {checkingExistence && usernameVal(username) ? <Wave color="#337ab7" /> : null}
              {(!checkingExistence && usernameVal(username) ? (exists === false ? <div style={{color: "#00B233"}}>
                <i className="fa fa-check-square-o"></i> Username is available</div> : <div style={{color: "#FF563C"}}><i className="fa fa-window-close-o"></i> Username is taken</div>) : null) }
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
              <FormControl  type="text" placeholder="First Name"  onChange={onFirstNameChange.bind(this, validations)} />
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
              <FormControl type="text" placeholder="Last Name"  onChange={onLastNameChange.bind(this, validations)} />
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
              <FormControl type="password" placeholder="Password" onChange={onPasswordChange.bind(this, validations)} />
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
        let flag = false;
        Object.keys(validations).forEach((val) => {
          if (!validations[val]) {
            flag = true;
          }
        });
        if (!flag) {
          dm.signUp(data);
        }
    },
    onUsernameChange: function(validations, e: Event) {
      if (validations && (validations.usernameVal === false) && usernameVal(e.target.value)) {
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { usernameVal: true }
        });
      }
        dispatch({
        type: 'KP_SIGNUP_USERNAME',
        username: e.target.value
      });
    },
    onPasswordChange: function(validations, e: Event) {
      if (validations && (validations.passwordVal === false) && passwordVal(e.target.value)) {
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { passwordVal: true }
        });
      }
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
    onFirstNameChange: function(validations, e: Event) {
      if (validations && (validations.firstNameVal === false) && notEmptyVal(e.target.value)) {
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { firstNameVal: true }
        });
      }
      dispatch({
        type: 'KP_FIRSTNAME',
        firstName: e.target.value
      })
    },
    onLastNameChange: function(validations, e: Event) {
      if (validations && (validations.lastNameVal === false) && notEmptyVal(e.target.value)) {
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { lastNameVal: true }
        });
      }
      dispatch({
        type: 'KP_LASTNAME',
        lastName: e.target.value
      })
    },
    onEmailChange: function(validations, e: Event) {
      if (validations && (validations.emailVal === false) && emailVal(e.target.value)) {
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { emailVal: true }
        });
      }
      dispatch({
        type: 'KP_EMAIL',
        email: e.target.value
      });
    },
    checkUsername: function() {
      dispatch({
        type: 'CHECKING_USERNAME',
        value: true
      })
    }
  }
)

export default connect(mapStateToProps, mapActionsToProps)(SignUp);
