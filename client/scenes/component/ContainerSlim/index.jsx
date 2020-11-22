/* global window, fetch */
import React, { Component } from 'react';
import './index.scss';

export default class extends Component {
  constructor() {
    super();
    const { state } = window.epii;
    this.state = {
      model: {
        server: state.server,
      }
    };
  }

  render() {
    const { model } = this.state;
    return (
      <div className="container">
        { this.props.children }
        <div className="footer">
          <p>
            <span>version</span>
            <span>{model.server.version}.{model.server.buildId}</span>
            <span><a href="/debug">debug</a></span>
          </p>
          <p>
            <span>powered by</span>
            <span><a href="https://github.com/15ms">15ms</a></span>
            <span>&</span>
            <span><a href="https://github.com/epiijs">epiijs</a></span>
          </p>
        </div>
      </div>
    );
  }
}
