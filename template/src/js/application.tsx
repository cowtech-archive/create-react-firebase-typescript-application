import * as React from 'react';

import {BrowseHappy, isModernBrowser, NewVersionChecker, TopAnchor, handleIOSMinHeight} from '@cowtech/react-lazily';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter as Router} from 'react-router-redux';

import {store, history} from './data/store';
import {Environment} from './models/environment';
import {mainClassName} from './styling/environment';

declare const env: Environment;

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  root.innerHTML = '';

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div id="main" className={mainClassName}>
          <TopAnchor/>
          {!isModernBrowser() && <BrowseHappy/>}
          <NewVersionChecker currentVersion={env.version}/>
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
        .then(rs => rs.map(r => r.unregister()))
        .catch(console.error);
    }
  }

  // Fix iOS vh height
  handleIOSMinHeight(0);
});
