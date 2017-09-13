import {Environment} from './models/environment';

declare const env: Environment;

// Import assets
import '../css/main.scss';

// Imports
import * as React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router/*, Route, Switch*/} from 'react-router-dom';
import {Provider} from 'react-redux';

import {store} from './data/store';

import {IconsDefinitions, BrowseHappy} from './components/misc';

// Routes

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div id="main" className="main">
          <BrowseHappy/>
          <IconsDefinitions/>
        </div>
      </Router>
    </Provider>,
    document.getElementById('root')
  );

  // Service workers
  if(navigator.serviceWorker){
    if(env.serviceWorkerEnabled && env.environment === 'production')
      navigator.serviceWorker.register('/sw.js').catch(console.error);
    else{
      navigator.serviceWorker.getRegistrations().then((registrations: Array<ServiceWorkerRegistration>) => (
        registrations.map((r: ServiceWorkerRegistration) => r.unregister())
      ));
    }
  }

  // Browse Happy
  const browseHappy: HTMLElement = document.getElementById('browseHappy');
  if(navigator.userAgent.indexOf('MSIE') !== -1 || typeof CSS.supports !== 'function' || !CSS.supports('display', 'grid') || !CSS.supports('display', 'flex'))
    browseHappy.classList.remove('BrowseHappy--hidden');
  else
    browseHappy.remove();
});
