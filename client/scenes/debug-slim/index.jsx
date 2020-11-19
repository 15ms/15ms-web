/* global window, fetch */
import React, { Component } from 'react';
import 'whatwg-fetch';
import '../component/frame-slim.scss';
import './index.scss';

export default class extends Component {
  constructor() {
    super();
    const { state } = window.epii;
    this.state = {
      model: {
        server: state.server,
        device: state.device
      }
    };
  }

  renderCard(title, content) {
    return (
      <div className="card">
        <h1>{title}</h1>
        <div>{content}</div>
      </div>
    );
  }

  render() {
    const { model } = this.state;
    return (
      <div className="container">
        <div className="card-list">
          { this.renderCard('User Agent', model.device.ua) }
          { this.renderCard('Client IP', model.device.ip) }
          { this.renderCard('Network Time', new Date(model.server.timestamp).toLocaleString()) }
        </div>
        <div className="footer">
          <p>{model.server.version}.{model.server.buildId}</p>
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
