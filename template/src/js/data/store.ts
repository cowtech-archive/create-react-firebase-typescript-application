const onServer: boolean = typeof window === 'undefined'; // tslint:disable-line strict-type-predicates

import {createStore, applyMiddleware, compose, combineReducers, Store} from 'redux';
import {History} from 'history';
import createHistory from 'history/createBrowserHistory';
import {routerReducer, routerMiddleware, RouterAction} from 'react-router-redux';
import thunk from 'redux-thunk';
import * as firebase from 'firebase';

import {Environment} from '../models/environment';
import {GlobalState} from '../data/state';
import {reducer} from './reducers';

interface ExtendedWindow extends Window{
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  showEnvironment(): void;
}

// Diff / Omit taken from https://github.com/Microsoft/TypeScript/issues/12215#issuecomment-311923766
type Diff<T extends string, U extends string> = ({ [P in T]: P } & { [P in U]: never } & { [x: string]: never })[T];
type Omit<T, K extends keyof T> = Pick<T, Diff<keyof T, K>>;

declare const env: Environment;
let composeEnhancers = compose;

if(!onServer){
  composeEnhancers = (window as ExtendedWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  (window as ExtendedWindow).showEnvironment = () => console.log(env);
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
export type ConnectedComponent<S, O = {}> = React.ComponentClass<Omit<S, keyof S> & O>;

// The main store
export const history: History = !onServer ? createHistory() : null;
export const store: Store<GlobalState> = createStore(
  combineReducers({application: reducer, router: routerReducer}),
  composeEnhancers(applyMiddleware(routerMiddleware(history), thunk))
);

// Initialize Firebase
if(!onServer){
  firebase.initializeApp(env.firebase);
}
