import * as React from 'react';

import {Spinner} from '../components/misc';

export function LoadingRoute(): JSX.Element{
  return <main className="Route"><Spinner/></main>;
}
