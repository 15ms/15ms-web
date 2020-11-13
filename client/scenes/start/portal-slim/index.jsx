/* global window, fetch */
import React, { Component } from 'react';
import 'whatwg-fetch';
import './index.scss';

const SEARCH_ENGINES = {
  google: 'https://www.google.com/#q=',
  baidu: 'https://www.baidu.com/s?wd='
};

function jumpSearch(engine, keyword) {
  const searchURL = SEARCH_ENGINES[engine] + keyword;
  window.location = searchURL;
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
        model.addons = json.model || [];
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

  render() {
    const { query, model } = this.state;
    return (
      <div className="container">
        <div className="search">
          <form onSubmit={e => this.invokeSearch(e)}>
            <input type="text" maxLength="1024" value={query.keyword} onChange={e => this.changeInput(e)} />
            <button type="button" className="icon"><i>&#xe8ef;</i></button>
            <button type="button" className="icon google" onClick={() => this.toggleGoogle()}>
              <i className={query.google ? 'enabled' : null}>&#xe87a;</i>
            </button>
          </form>
        </div>
        <div className="link-list addons">
          <ul>
            { model.addons.map(item => (
              <li key={item.name}>
                <a href={item.meta.start || `/addon/${item.name}`}>{item.meta.title}</a>
              </li>
            )) }
          </ul>
        </div>
        <div className="footer">
        </div>
      </div>
    );
  }
}
