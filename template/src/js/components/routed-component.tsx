import * as React from 'react';

import PropTypes from 'prop-types';
import {matchPath, match as matchResult} from 'react-router';

import Dictionary from '../models/dictionary';

export default function routedComponent<P = {}>(rawPath: string, WrappedComponent: React.ComponentClass<any>): React.ComponentClass<P>{
  return class extends React.Component<P, {routerParams: Dictionary}>{
    static contextTypes = {
      router: PropTypes.shape({
        history: PropTypes.object.isRequired,
        route: PropTypes.object.isRequired,
        staticContext: PropTypes.object
      })
    };

    static childContextTypes = {
      history: PropTypes.object.isRequired
    };

    constructor(props: P){
      super(props);
      this.state = {routerParams: {}};
    }

    render(): JSX.Element{
      return <WrappedComponent {...this.props} routerParams={this.state.routerParams}/>;
    }

    componentDidMount(): void{
      return this.componentWillReceiveProps(null, this.context);
    }

    componentWillReceiveProps(_props: P, context: any): void{
      const url: string = context.router.route.location.pathname;
      const path: string = '/' + rawPath.split('/').filter((t: string) => t).map((t: string) => `${t}?`).join('/');
      const match: matchResult<{}> = matchPath(url, {path, exact: false, strict: false});

      this.setState(() => ({routerParams: match ? match.params : null}));
    }

    getChildContext(): {history: any}{
      return {history: this.context.router.history};
    }
  };
}
