// tslint:disable jsx-self-close jsx-boolean-value

require('@cowtech/react-lazily/images/favicon.png');
require('@cowtech/react-lazily/images/cowtech.png');
require('./manifest.json');
require('./robots.txt');

import * as React from 'react';

import {IconsDefinitions} from '@cowtech/react-lazily/components/icons';
import {Spinner} from '@cowtech/react-lazily/components/spinner';
import {colorGrey500} from '@cowtech/react-lazily/styling/colors';
import ReactDOMServer from 'react-dom/server';

import {Environment} from './js/models/environment';
import {LoadingRoute} from './js/routes/loading-route';

declare const env: Environment;

const structuredData: any = {

};

const html: string = ReactDOMServer.renderToStaticMarkup(
  <React.Fragment>
    <IconsDefinitions/>

    <div id="root" className="root">
      <div id="main" className="main">
      <Spinner color={colorGrey500}/>
      </div>
    </div>
  </React.Fragment>
);

const index: string = ReactDOMServer.renderToStaticMarkup(
  <html lang="en">
    <head>
      <title>{env.title}</title>
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
      <meta charSet="utf8"/>
      <meta name="description" content={env.description}/>
      <meta name="keywords" content={env.keywords}/>
      <meta name="author" content={env.author}/>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <meta name="apple-mobile-web-app-capable" content="yes"/>
      <meta name="theme-color" content="#000000"/>
      <link rel="icon" href="/images/favicon.png" sizes="32x32"/>
      <link rel="shortcut icon" href="images/favicon.png" sizes="196x196"/>
      <link rel="manifest" href="/manifest.json"/>

      <style dangerouslySetInnerHTML={{__html: getStyles()}} />
      <script defer={true} type="text/javascript" src="https://www.gstatic.com/firebasejs/4.5.0/firebase-app.js"></script>
      {env.environment === 'development' && <script defer={true} type="text/javascript" src="webpack-bootstrap.js"></script>}
      <script defer={true} type="text/javascript" src="/js/app.js"></script>

      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}/>
      <meta property="og:url" content=""/>
      <meta property="og:type" content="profile"/>
      <meta property="og:title" content={env.title}/>
      <meta property="og:description" content={env.description}/>
      <meta property="og:image" content=""/>
      <meta property="og:image:width" content="250"/>
      <meta property="og:image:height" content="250"/>
      <meta property="og:image:alt" content={env.description}/>
      <meta property="og:locale" content="it"/>
      <meta property="fb:app_id" content=""/>
      <meta property="fb:profile_id" content=""/>
      <meta name="twitter:card" content="summary"/>
      <meta name="twitter:site" content=""/>
      <meta name="twitter:title" content={env.title}/>
      <meta name="twitter:description" content={env.description}/>
      <meta name="twitter:image" content=""/>
    </head>
    <body dangerouslySetInnerHTML={{__html: html}} />
  </html>
);

export default index;

// tslint:enable jsx-self-close jsx-boolean-value
