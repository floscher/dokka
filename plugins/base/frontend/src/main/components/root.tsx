import React from 'react';
import {render} from 'react-dom';
import RedBox from 'redbox-react';

import App from "./app";
import './app/index.scss';
import { NavigationPaneSearch } from './navigationPaneSearch/navigationPaneSearch';
import { PageSummary } from './pageSummary/pageSummary';

const appEl = document.getElementById('searchBar');
const rootEl = document.createElement('div');

const renderNavigationPane = () => {
  render(
    <NavigationPaneSearch />,
    document.getElementById('paneSearch')
  )
}

const renderOnThisPage = () => {
  const data = {
    category: 'functions',
    entries: [
      {
        dri: 'XD',
        label: 'First'
      },
      {
        dri: 'XD',
        label: 'Second'
      },
      {
        dri: 'XD',
        label: 'Third'
      }
    ]
  }
  console.log('byClass', document.getElementsByClassName)
  console.log('byQuery', document.querySelectorAll)

  setTimeout(() => {
    for(const e of document.querySelectorAll('.tabs-section-body > div[data-togglable]')){
      const category = e.getAttribute('data-togglable')
      const element = document.createElement('div')
      render(<PageSummary category={category} entries={data.entries}/>, element)
      e.appendChild(element)
    }
  })
}

let renderApp = () => {
  render(
      <App/>,
      rootEl
  );
  renderNavigationPane();
  renderOnThisPage();
};

// @ts-ignore
if (module.hot) {
  const renderAppHot = renderApp;
  const renderError = (error: Error) => {
    render(
        <RedBox error={error}/>,
        rootEl
    );
  };

  renderApp = () => {
    try {
      renderAppHot();
    } catch (error) {
      renderError(error);
    }
  };

  // @ts-ignore
  module.hot.accept('./app', () => {
    setTimeout(renderApp);
  });
}

renderApp();
appEl!.appendChild(rootEl);
