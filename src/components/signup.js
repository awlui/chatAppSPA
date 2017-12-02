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
  Alert,
  Tooltip,
  Overlay,
  OverlayTrigger
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

const tooltip = (
  <Tooltip id="tooltip"><strong>Holy guacamole!</strong> Check this info.</Tooltip>
);

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
      onPasswordChange, username, password, lastName, firstName, email, checkingExistence, checkUsername, exists, makeDirty, inFocus, outFocus} = this.props;
      console.log(this.props, 'val')
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
            <OverlayTrigger  rootClose={true} placement="right" trigger={true} overlay={tooltip}>
              <Col xs={12} md={6}>
                      {(!email || !email.valid) &&  (!email || email.dirty) && (!email || !email.inFocus) ? (<i className="fa fa-times invalid-icon" aria-hidden="true"></i>) : null
                      
                      }
                      <FormControl  type="email"  onFocus={inFocus.bind(this, 'email')} onBlur={() => { makeDirty('email'); outFocus("email"); }} placeholder="Email" onChange={onEmailChange}/>
              </Col>
            </OverlayTrigger>

            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Username:
            </Col>
            <OverlayTrigger rootClose={true} placement="right" trigger={true} overlay={tooltip}>
              <Col xs={12} md={6}>
                      {(!username || !username.valid) &&  (!username || username.dirty) && (!username || !username.inFocus) ? (<i className="fa fa-times invalid-icon" aria-hidden="true"></i>) : null
                      
                      }
                      <FormControl  type="text"  onFocus={inFocus.bind(this, 'username')} 
                        onBlur={() => { makeDirty('username'); outFocus("username"); }} placeholder="Username" onChange={(e) => {
                        onUsernameChange(e);
                        this._usernameObserver(e.target.value)
                        checkUsername();
              }}/>
              {checkingExistence && usernameVal(username.value) ? <Wave color="#337ab7" /> : null}
              {(!checkingExistence && usernameVal(username.value) ? (exists === false ? <div style={{color: "#00B233"}}>
                <i className="fa fa-check-square-o"></i> Username is available</div> : <div style={{color: "#FF563C"}}><i className="fa fa-window-close-o"></i> Username is taken</div>) : null) }
              </Col>
            </OverlayTrigger>


            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              First Name:
            </Col>
            <Col xs={12} md={6}>
              <FormControl  type="text" onBlur={makeDirty.bind(this, 'firstName')}  placeholder="First Name"  onChange={onFirstNameChange} />
            </Col>
            <Col xs={12} md={6}>
            {(firstName || firstName.valid) ? null :
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
              <FormControl type="text" onBlur={makeDirty.bind(this, 'lastName')}  placeholder="Last Name"  onChange={onLastNameChange} />
            </Col>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Password:
            </Col>
            <Col xs={12} md={6}>
              <FormControl type="password" onBlur={makeDirty.bind(this, 'password')}  placeholder="Password" onChange={onPasswordChange} />
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
          usernameVal: usernameVal(data.username.value),
          passwordVal: passwordVal(data.password.value),
          emailVal: emailVal(data.email.value),
          firstNameVal: notEmptyVal(data.firstName.value),
          lastNameVal: notEmptyVal(data.lastName.value)
        }
        let flag = false;
        Object.keys(validations).forEach((val) => {
          if (!validations[val]) {
            flag = true;
          }
        });
        
        if (!flag) {
          dm.signUp(data);
        } else {
          // dispatch({
          //   type: 'FAIL_VALIDATION',
          //   validations
          // });
        }
    },
    onUsernameChange: function(e: Event) {
      dispatch({
        type: 'KP_SIGNUP_USERNAME',
        username: e.target.value
      });
      if (usernameVal(e.target.value)) {
      dispatch({
          type: 'PASS_VALIDATION',
          validation: { field: 'username', value: true }
        });
      } else {
      dispatch({
        type: 'FAIL_VALIDATION',
        validation: { field: 'username', value: false}
      })
      }
    },
    onPasswordChange: function(e: Event) {
      dispatch({
        type: 'KP_SIGNUP_PASSWORD',
        password: e.target.value
      })
      if (passwordVal(e.target.value)) {
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { field: 'password', value: true }
        });
      } else {
      dispatch({
        type: 'FAIL_VALIDATION',
        validation: { field: 'password', value: false }
      })
      }
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
      if (notEmptyVal(e.target.value)) {
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { field: 'firstName', value: true }
        });
      } else {
        dispatch({
          type: 'FAIL_VALIDATION',
          validation: { field: 'firstName', value: false}
        })
      }
    },
    onLastNameChange: function(e: Event) {
      if (notEmptyVal(e.target.value)) {
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { field: 'lastName', value: true }
        });
      }
      dispatch({
        type: 'KP_LASTNAME',
        lastName: e.target.value
      })
    },
    onEmailChange: function(e: Event) {
        dispatch({
        type: 'KP_EMAIL',
        email: e.target.value
      });
      if (emailVal(e.target.value)) {
        console.log(e.target.value, 'valid')
        dispatch({
          type: 'PASS_VALIDATION',
          validation: { field: 'email', value: true }
        });
      } else {
        dispatch({
          type: 'FAIL_VALIDATION',
          validation: { field: 'email', value: false}
        })
      }
    },
    checkUsername: function() {
      dispatch({
        type: 'CHECKING_USERNAME',
        value: true
      })
    },
    makeDirty: function(field) {
      dispatch({
        type: 'MAKE_DIRTY',
        field
      });
    },
    inFocus: function(field) {
      dispatch({
        type: 'FOCUS_FIELD',
        field
      })
    },
    outFocus: function(field) {
      dispatch({
        type: 'FOCUS_FIELD_FALSE',
        field
      })
    }
  }
)

export default connect(mapStateToProps, mapActionsToProps)(SignUp);
