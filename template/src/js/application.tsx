import "./utils/polyfills";
import {Environment} from "./models/environment";

declare const env: Environment;
declare const version: string;

// Import assets
import "../css/main.scss";

// Imports
import * as React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router/*, Route, Switch*/} from "react-router-dom";
import {Provider} from "react-redux";

import {store} from "./data/store";

import IconsDefinitions from "./components/icons-definitions";

// Routes

const syncServiceWorker = async function(registration: ServiceWorkerRegistration): Promise<void>{
  // Fetch the manifest to see if version matches
  try{
    const response: Response = await fetch("/manifest.json");
    const latestVersion: string = await response.json();

    if(latestVersion !== version)
      registration.update().catch(console.error);
  }catch(e){
    // No-op
  }
};

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <div id="main" className="main">
          <IconsDefinitions/>
        </div>
      </Router>
    </Provider>,
    document.getElementById("root")
  );

  // Service workers
  if(navigator.serviceWorker){
    if(env.serviceWorkerEnabled && env.environment === "production")
      navigator.serviceWorker.register("/sw.js").then(syncServiceWorker).catch(console.error);
    else{
      navigator.serviceWorker.getRegistrations().then((registrations: Array<ServiceWorkerRegistration>) => (
        registrations.map((r: ServiceWorkerRegistration) => r.unregister())
      ));
    }
  }
});
