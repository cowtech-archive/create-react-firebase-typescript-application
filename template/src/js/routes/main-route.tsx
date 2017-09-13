import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';

import {GlobalState} from '../data/state';
import {ConnectedComponent, ConnectedProps} from '../data/store';
import {BEM, BEMClass} from '../utils/dom-utils';

interface MainRouteProps{

}

const mapStateToProps = function(_state: GlobalState, _ownProps: RouteComponentProps<{}>): MainRouteProps{
  return {};
};

export class MainRouteComponent extends React.Component<ConnectedProps<MainRouteProps>>{
  private bem: BEMClass = BEM('MainRoute');

  render(): JSX.Element{
    return (
      <main className={bem()}/>
    );
  }
}

export const MainRoute: ConnectedComponent<ConnectedProps<MainRouteProps>, RouteComponentProps<{}>> = connect(mapStateToProps, null)(MainRouteComponent);
