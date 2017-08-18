import * as React from 'react';
import {connect} from 'react-redux';
import {RouteComponentProps} from 'react-router';

import {GlobalState} from '../models/state';
import {ConnectedProps} from '../data/store';
import {BEM, BEMClass} from '../utils/dom-utils';

const bem: BEMClass = BEM('MainRoute');

interface MainRouteProps{

}

const mapStateToProps = function(_state: GlobalState, _ownProps: RouteComponentProps<{}>): MainRouteProps{
  return {};
};

export class MainRoute extends React.Component<ConnectedProps<MainRouteProps>>{
  render(): JSX.Element{
    return (
      <main className={bem()}/>
    );
  }
}

export default connect(mapStateToProps, null)(MainRoute);
