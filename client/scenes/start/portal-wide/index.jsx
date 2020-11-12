/* global window */
import React, { Component } from 'react';
import Container from '../../component/Container';
import '../../component/shell.scss';
import './index.scss';

export default class extends Component {
  constructor() {
    super();
    const { state } = window.epii;
    this.state = {
      query: {
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
    const { query, stage } = this.state;
    return (
      <Container>
        <div className="block footer">
          <p>
            <a href="?lang=en">English</a>
            <span>|</span>
            <a href="?lang=zh">中文</a>
          </p>
          <p>{query.server.version}.{query.server.buildId}</p>
          <p><a href="https://github.com/epiijs">powered by epiijs</a></p>
          <p><a href="http://www.beian.miit.gov.cn">ICP备</a></p>
        </div>
      </Container>
    );
  }
}
