import React, {Component} from 'react';
import { Observable } from 'rxjs/Rx';
import ReactDOM from 'react-dom';
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
      onPasswordChange, username, password, lastName, firstName, email, checkingExistence, 
      checkUsername, exists, makeDirty, inFocus, outFocus, allInvalid} = this.props;
      const emailProps = {
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.email),
    };
    const usernameProps = {
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.username)
    }
    const firstNameProps = {
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.firstName)
    }
    const lastNameProps = {
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.lastName)  
    }
    const passwordProps = {
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.password)  

    }
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
            <Row style={{position: 'relative'}}>
            <Col xs={12} componentClass={ControlLabel}>
              Email:
            </Col>
            <Col xs={12} md={6}  className="" style={{ display: 'inline-block'}} ref="email" >
                                  {(!email || !email.valid) &&  (!email || email.dirty) && (!email || !email.inFocus) ? (<i className="fa fa-times invalid-icon" aria-hidden="true"></i>) : null
                      
                      }
              <FormControl  type="email"  onFocus={inFocus.bind(this, 'email')} onBlur={() => { makeDirty('email'); outFocus("email"); }} placeholder="Email" onChange={onEmailChange}/>
            </Col>

            <Overlay {...emailProps} show={email.inFocus && email.dirty && !email.valid} placement="top">
              <Tooltip id="overload-top">Please input valid email.</Tooltip>
            </Overlay>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Username:
            </Col>
            <Col xs={12} md={6}  className="" style={{ display: 'inline-block'}} ref="username" >
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

            <Overlay {...usernameProps} show={username.inFocus && username.dirty && !username.valid} placement="top">
              <Tooltip id="overload-top">Username must be 6 to 20 characters long.</Tooltip>
            </Overlay>

            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              First Name:
            </Col>
            <Col xs={12} md={6}  className="" style={{ display: 'inline-block'}} ref="firstName" >
                                  {(!firstName || !firstName.valid) &&  (!firstName || firstName.dirty) && (!firstName || !firstName.inFocus) ? (<i className="fa fa-times invalid-icon" aria-hidden="true"></i>) : null
                      
                      }
              <FormControl  type="text" onFocus={inFocus.bind(this, 'firstName')} onBlur={() => {makeDirty('firstName'); outFocus('firstName') }}  placeholder="First Name"  onChange={onFirstNameChange} />
            </Col>
            <Overlay {...firstNameProps} show={firstName.inFocus && firstName.dirty && !firstName.valid} placement="top">
              <Tooltip id="overload-top">Please input your first name.</Tooltip>
            </Overlay>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Last Name:
            </Col>
            <Col xs={12} md={6}  className="" style={{ display: 'inline-block'}} ref="lastName" >
                                  {(!lastName || !lastName.valid) &&  (!lastName || lastName.dirty) && (!lastName || !lastName.inFocus) ? (<i className="fa fa-times invalid-icon" aria-hidden="true"></i>) : null
                      
                      }
              <FormControl  type="text" onFocus={inFocus.bind(this, 'lastName')} onBlur={() => {makeDirty('lastName'); outFocus('lastName') }}  placeholder="Last Name"  onChange={onLastNameChange} />
            </Col>
            <Overlay {...lastNameProps} show={lastName.inFocus && lastName.dirty && !lastName.valid} placement="top">
              <Tooltip id="overload-top">Please input your last name.</Tooltip>
            </Overlay>
            </Row>
          </FormGroup>
          <FormGroup>
            <Row>
            <Col xs={12} componentClass={ControlLabel}>
              Password:
            </Col>
            <Col xs={12} md={6}  className="" style={{ display: 'inline-block'}} ref="password" >
                                  {(!password || !password.valid) &&  (!password || password.dirty) && (!password || !password.inFocus) ? (<i className="fa fa-times invalid-icon" aria-hidden="true"></i>) : null
                      
                      }
              <FormControl  type="password" onFocus={inFocus.bind(this, 'password')} onBlur={() => {makeDirty('password'); outFocus('password') }}  placeholder="Password"  onChange={onPasswordChange} />
            </Col>
            <Overlay {...passwordProps} show={password.inFocus && password.dirty && !password.valid} placement="top">
              <Tooltip id="overload-top">Please input your password. Between 6 to 20 characters long.</Tooltip>
            </Overlay>
            </Row>
          </FormGroup>
          <FormGroup>
            <Col className="signup">
              <Button bsStyle="primary" onClick={signUpAttempt.bind(this, {username, password, email, firstName, lastName})}>
                Sign up
              </Button>
              {
                allInvalid ? <div>Fix invalid fields then try again.</div> : null
              }
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
        let flag = false;
        Object.keys(data).forEach((val) => {
          if (!data[val].valid) {
            flag = true;
          }
        });
        let {username, password, email, firstName, lastName} = data;
        if (!flag) {
          dm.signUp({
            username: username.value,
            password: password.value,
            email: email.value,
            firstName: firstName.value,
            lastName: lastName.value
          });
        } else {
        Object.keys(data).forEach((val) => {
          dispatch({
            type: 'MAKE_DIRTY',
            field: val
          })
        });
        dispatch({
          type: 'ALL_FIELDS_INVALID'
        })
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
      console.log(store.getState(), 'state');
      dispatch({
        type: 'FOCUS_FIELD',
        field
      })
            console.log(store.getState(), 'state');
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
