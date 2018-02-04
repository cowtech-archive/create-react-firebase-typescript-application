import * as React from 'react';

import {BrowseHappy} from '@cowtech/react-lazily/components/browse-happy';
import {NewVersionChecker} from '@cowtech/react-lazily/components/new-version-checker';
import {TopAnchor} from '@cowtech/react-lazily/components/top-anchor';
import {handleIOSMinHeight} from '@cowtech/react-lazily/utils/dom-utils';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {ConnectedRouter as Router} from 'react-router-redux';

import {store, history} from './data/store';
import {Environment} from './models/environment';
import {mainClassName} from './styling/environment';

declare const env: Environment;

document.addEventListener('DOMContentLoaded', () => {
  const legacyBrowser: boolean =
    navigator.userAgent.indexOf('MSIE') !== -1 || typeof CSS.supports !== 'function' || !CSS.supports('display', 'grid') || !CSS.supports('display', 'flex');
  const root: HTMLElement = document.getElementById('root');
  root.innerHTML = '';

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history}>
        <div id="main" className={mainClassName}>
          <TopAnchor/>
          {legacyBrowser && <BrowseHappy/>}
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
        .then((rs: Array<ServiceWorkerRegistration>) => rs.map((r: ServiceWorkerRegistration) => r.unregister()))
        .catch(console.error);
    }
  }

  // Fix iOS vh height
  handleIOSMinHeight(0);
});
