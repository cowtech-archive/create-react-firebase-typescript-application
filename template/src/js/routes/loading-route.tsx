import * as React from 'react';

import {Spinner} from '@cowtech/react-lazily/components/spinner';

export function LoadingRoute(): JSX.Element{
  return <main className="Route"><Spinner/></main>;
}
