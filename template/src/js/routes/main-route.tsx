import * as React from 'react';
import {connect} from 'react-redux';

import {GlobalState} from '../data/state';
import {ConnectedComponent, ConnectedProps, createRouteMapStateToProps} from '../data/store';
import {BEM, BEMClass} from '../utils/dom-utils';

interface MainRouteProps{

}

const mapStateToProps = createRouteMapStateToProps(function(_state: GlobalState): MainRouteProps{
  return {};
});

export class MainRouteComponent extends React.Component<ConnectedProps<MainRouteProps>>{
  private bem: BEMClass = BEM('MainRoute');

  render(): JSX.Element{
    return (
      <main className={this.bem()}/>
    );
  }
}

export const MainRoute: ConnectedComponent<MainRouteProps> = connect(mapStateToProps, null)(MainRouteComponent);
