/* global window */
import React, { Component } from 'react';
import Container from '../../component/Container';
import './index.scss';

export default class extends Component {
  constructor() {
    super();
    const { state } = window.epii;
    this.state = {
      model: {
        server: state.server
      },
      stage: ''
    };
  }

  componentDidMount() {
    const url = new URL(window.location.href);
    const stage = url.hash.slice(1);
    this.changeStage(stage);
  }

  changeStage(stage) {
    if (!stage) return;
    this.setState({ stage });
    const url = new URL(window.location.href);
    if (url.hash !== stage) {
      url.hash = stage;
      window.history.pushState(null, stage, url.toString());
    }
  }

  render() {
    const { model, stage } = this.state;
    return (
      <Container>
        <div className="block header">
          <h1>15ms</h1>
        </div>
        <div className="block footer">
          <p>{model.server.version}.{model.server.buildId}</p>
        </div>
      </Container>
    );
  }
}
