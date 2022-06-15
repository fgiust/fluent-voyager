import * as React from 'react';
import { render } from 'react-dom';

import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../src/components/MUITheme';
import { GraphQLVoyager } from '../src';
import LogoIcon from './icons/logo-small.svg';

import { defaultPreset } from './presets';

import './components.css';

export default class Demo extends React.Component {
  state = {
    changeSchemaModalOpen: false,
    introspection: defaultPreset,
  };

  constructor(props) {
    super(props);

    const { url, withCredentials } = getQueryParams();
    if (url) {
      this.state.introspection = (introspectionQuery) =>
        fetch(url, {
          method: 'post',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: introspectionQuery }),
          ...(withCredentials === 'true'
            ? { credentials: 'include', mode: 'cors' }
            : {}),
        }).then((response) => response.json());
    }
  }

  public render() {
    const { introspection } = this.state;

    return (
      <ThemeProvider theme={theme}>
        <GraphQLVoyager introspection={introspection}>
          <GraphQLVoyager.PanelHeader>
            <div className="voyager-panel">
              <Logo />
            </div>
          </GraphQLVoyager.PanelHeader>
        </GraphQLVoyager>
      </ThemeProvider>
    );
  }
}

function getQueryParams(): { [key: string]: string } {
  const query = window.location.search.substring(1);
  const params = {};

  for (const param of query.split('&')) {
    const [key, value] = param.split('=');
    params[key] = value ? decodeURIComponent(value.replace(/\+/g, ' ')) : '';
  }
  return params;
}

class Logo extends React.Component {
  render() {
    return (
      <div className="voyager-logo">
        <a
          href="https://github.com/IvanGoncharov/graphql-voyager"
          target="_blank"
        >
          <div className="logo">
            <LogoIcon />
            <h2 className="title">
              <strong>GraphQL</strong> Voyager
            </h2>
          </div>
        </a>
      </div>
    );
  }
}

render(<Demo />, document.getElementById('root'));
