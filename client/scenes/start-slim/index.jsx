/* global window, fetch */
import React, { Component } from 'react';
import 'whatwg-fetch';
import Container from '../component/ContainerSlim';
import './index.scss';

const SEARCH_ENGINES = {
  google: 'https://www.google.com/#q=',
  baidu: 'https://www.baidu.com/s?wd='
};

function jumpSearch(engine, keyword) {
  const searchURL = SEARCH_ENGINES[engine] + keyword;
  window.location = searchURL;
}

function reshapeData(items, group) {
  const result = {};
  if (Array.isArray(items)) {
    items.forEach(item => {
      const key = item[group];
      if (!result[key]) result[key] = [];
      result[key].push(item);
    });
  }
  return result;
}

export default class extends Component {
  constructor() {
    super();
    const { state } = window.epii;
    this.state = {
      query: {
        keyword: '',
        google: false,
      },
      model: {
        server: state.server,
        addons: []
      }
    };
  }

  componentDidMount() {
    this.loadAddons();
  }

  loadAddons(query) {
    return fetch('/proxy/getAddons')
      .then(response => response.json())
      .then(json => {
        const { model } = this.state;
        model.addons = reshapeData(json.model, 'category');
        this.setState({ model });
      })
      .catch(error => {
        console.error(error);
      });
  }

  changeInput(e) {
    const { query } = this.state;
    query.keyword = e.target.value;
    this.setState({ query });
  }

  invokeSearch(e) {
    const { query } = this.state;
    e.preventDefault();
    const { keyword } = query;
    if (keyword) {
      if (query.google) {
        jumpSearch('google', keyword);
      } else {
        jumpSearch('baidu', keyword);
      }
      query.keyword = '';
      this.setState({ query });
    }
  }

  toggleGoogle() {
    const { query } = this.state;
    query.google = !query.google;
    this.setState({ query });
  }

  renderLinkList(title, items) {
    return (
      <div key={title} className="link-list">
        <h1>{title === 'undefined' ? '未分类' : title}</h1>
        <ul>
          { items.map(item => (
            <li key={item.name}>
              <a href={item.start || `/addon/${item.name}`}>
                <p>{item.title}</p>
                <p className="meta">
                  <span>{item.vendor}</span>
                  <span>/</span>
                  <span>{item.version}</span>
                </p>
              </a>
            </li>
          )) }
        </ul>
      </div>
    );
  }

  render() {
    const { query, model } = this.state;    
    return (
      <Container>
        <div className="search">
          <form onSubmit={e => this.invokeSearch(e)}>
            <input type="text" maxLength="1024" value={query.keyword} onChange={e => this.changeInput(e)} />
            <button type="button" className="icon"><i>&#xe8ef;</i></button>
            <button type="button" className="icon google" onClick={() => this.toggleGoogle()}>
              <i className={query.google ? 'enabled' : null}>&#xe87a;</i>
            </button>
          </form>
        </div>
        { Object.keys(model.addons).map(category => {
          const items = model.addons[category];
          return this.renderLinkList(category, items);
        }) }
      </Container>
    );
  }
}
