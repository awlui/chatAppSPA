
import React, { PureComponent, Component } from 'react';

export default class AsyncComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Component: null
    }
  }

  componentWillMount() {
    if(!this.state.Component) {
      this.props.moduleProvider.subscribe(
        ({Component}) => {
        this.setState({Component})
      }
        );
    }
  }

  render() {
    const { Component } = this.state;

    //The magic happens here!
    return (
      <div>
        {Component ? <Component /> : null }
      </div>
    );
  }
};