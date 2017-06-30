const onServer: boolean = typeof window === "undefined"; // tslint:disable-line strict-type-predicates

import {createStore, applyMiddleware, compose} from "redux";
import {connect as reduxConnect} from "react-redux";
import {RouteComponentProps} from "react-router";
import thunk from "redux-thunk";
import * as firebase from "firebase";

import Environment from "../models/environment";

interface ExtendedWindow extends Window{
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: any;
  showEnvironment(): void;
}

declare const env: Environment;
let composeEnhancers = compose;

if(!onServer){
  composeEnhancers = (window as ExtendedWindow).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  (window as ExtendedWindow).showEnvironment = () => console.log(env);
}

export interface State{

}

export interface Action{
  type: string;
  payload?: any;
}

export type Dispatch = (action: Action | AsyncAction) => Action;

interface Dispatcher{
  dispatch: Dispatch;
}

export type AsyncAction = (dispatch: Dispatch, getState?: () => State) => void;

export type RouteState<T = {}> = State & RouteComponentProps<T> & Dispatcher;
export type ConnectedState = State & {dispatch?: Dispatch};

// A default no-op state connector
export function stateConnector<T = RouteState>(state: T): T{
  return state;
}

export function connectComponent<T = RouteState>(component: React.ComponentClass<T>, connector: (state: T) => T = stateConnector){
  return reduxConnect<T, {}, T>(connector, null)(component);
}

export function reducer(state: State, {type/*, payload*/}: Action): State{
  let newState: State = state;

  switch(type){

  }

  return newState;
}

export const initialState: State = {

};

// The main store
export const store: any = createStore(reducer, initialState, composeEnhancers(applyMiddleware(thunk)));

// Initialize Firebase
if(!onServer){
  firebase.initializeApp(env.firebase);
}
