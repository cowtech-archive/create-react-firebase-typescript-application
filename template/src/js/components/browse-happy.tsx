import * as React from 'react';

import {BEM, BEMClass} from '../utils/dom-utils';

const bem: BEMClass = BEM('BrowseHappy');

export default function BrowseHappy(): JSX.Element{
  return (
    <div id="browseHappy" className={bem(null, 'hidden')}>
      <span>Your browser is obsolete. For the best browsing experience, update it for free by visiting&nbsp;</span>
      <a href="https://browsehappy.com/" className={bem('link')} target="_blank" rel="noopener">BrowseHappy</a>.
    </div>
  );
}
