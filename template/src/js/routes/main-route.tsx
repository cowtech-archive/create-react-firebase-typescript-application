import * as React from 'react';

import {connect} from 'react-redux';

import {GlobalState} from '../data/state';
import {ConnectedComponent, ConnectedProps, createRouteMapStateToProps} from '../data/store';

interface MainRouteProps{

}

const mapStateToProps = createRouteMapStateToProps(function(_state: GlobalState): MainRouteProps{
  return {};
});

export class MainRouteComponent extends React.Component<ConnectedProps<MainRouteProps>>{
  render(): JSX.Element{
    return (
      <main/>
    );
  }
}

export const MainRoute: ConnectedComponent<MainRouteProps> = connect(mapStateToProps, null)(MainRouteComponent);
