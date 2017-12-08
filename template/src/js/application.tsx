import {Environment} from './models/environment';

declare const env: Environment;

// Import assets
import '../css/main.scss';

// Imports
import * as React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router-dom';
import {ConnectedRouter as Router} from 'react-router-redux';
import {Provider} from 'react-redux';

import {store, history} from './data/store';

import {handleIOSMinHeight} from './utils/dom-utils';

// Routes

document.addEventListener('DOMContentLoaded', () => {
  const legacyBrowser: boolean =
    navigator.userAgent.indexOf('MSIE') !== -1 || typeof CSS.supports !== 'function' || !CSS.supports('display', 'grid') || !CSS.supports('display', 'flex');
  const root: HTMLElement = document.getElementById('root');
  root.innerHTML = '';

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div id="main" className="main">
          {legacyBrowser && <BrowseHappy/>}
          <NewVersionChecker/>
        </div>
      </Router>
    </Provider>,
    root
  );

  // Service workers
  if(navigator.serviceWorker){
    if(env.serviceWorkerEnabled && env.environment === 'production')
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    else{
      navigator.serviceWorker.getRegistrations()
        .then((rs: Array<ServiceWorkerRegistration>) => rs.map((r: ServiceWorkerRegistration) => r.unregister()))
        .catch(console.error);
    }
  }

  // Fix iOS vh height
  handleIOSMinHeight(0);
});
