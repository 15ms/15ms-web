/* global window, fetch */
import React, { Component } from 'react';
import Container from '../component/ContainerSlim';
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
      <Container>
        <div className="card-list">
          { this.renderCard('User Agent', model.device.ua) }
          { this.renderCard('Client IP', model.device.ip) }
          { this.renderCard('Network Time', new Date(model.server.timestamp).toLocaleString()) }
        </div>
      </Container>
    );
  }
}
