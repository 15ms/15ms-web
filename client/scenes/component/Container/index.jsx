import React, { Component } from 'react';
import './index.scss';

export default class extends Component {
  render() {
    return (
      <div className="container">
        { this.props.children }
      </div>
    );
  }
}
