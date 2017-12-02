import React from 'react';
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


export default class Email extends React.Component {
  render() {
    const sharedProps = {
      container: this,
      target: () => ReactDOM.findDOMNode(this.refs.target),
    };

    return (
      <Row style={{position: 'relative'}}>
        <Col xs={6} className="" style={{ display: 'inline-block'}} ref="target" >
          <FormControl placeholder="Email" />
        </Col>

        <Overlay show={true} {...sharedProps} placement="left">
          <Tooltip id="overload-left">Tooltip overload!</Tooltip>
        </Overlay>

      </Row>
    );
}
}
