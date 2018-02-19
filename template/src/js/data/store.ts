import * as React from 'react';

import * as firebase from 'firebase';
import {History} from 'history';
import createHistory from 'history/createBrowserHistory';
import {RouteComponentProps} from 'react-router';
import {routerReducer, routerMiddleware, RouterAction} from 'react-router-redux';
import {createStore, applyMiddleware, compose, combineReducers, Store} from 'redux';
import thunk from 'redux-thunk';

import {GlobalState} from '../data/state';
import {Environment} from '../models/environment';
import {reducer} from './reducers';

const onServer = typeof window === 'undefined'; // tslint:disable-line strict-type-predicates

interface ExtendedWindow extends Window{
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  process: {env: any};
  showEnvironment(): void;
}

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

declare const env: Environment;
let composeEnhancers = compose;

if(!onServer){
  const extendedWindow: ExtendedWindow = window as ExtendedWindow;
  composeEnhancers = extendedWindow.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  extendedWindow.showEnvironment = () => console.log(env);
  extendedWindow.process = {env: process.env};
}

export type Dispatch = (action: Action | AsyncAction | RouterAction) => Action;

export interface Dispatcher{
  dispatch?: Dispatch;
}

export interface Action{
  type: string;
  payload?: any;
}

export type AsyncAction = (dispatch: Dispatch, getState?: () => GlobalState) => void;

export type ConnectedProps<T> = T & Dispatcher;
export type ConnectedComponent<S, O = RouteComponentProps<{}>> = React.ComponentClass<Omit<S, keyof S> & O>;
export type RouteMapper<T, R> = (state: GlobalState, ownProps?: RouteComponentProps<R>) => T;

export function createRouteMapStateToProps<T, R>(mapper: RouteMapper<T, R>): RouteMapper<T, R>{
  return function(state: GlobalState, ownProps: RouteComponentProps<R>){
    return mapper(state, ownProps);
  };
}

// The main store
export const history = !onServer ? createHistory() : null;
export const store = createStore(
  combineReducers({application: reducer, router: routerReducer}),
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

// Initialize Firebase
if(!onServer)
  firebase.initializeApp(env.firebase);
