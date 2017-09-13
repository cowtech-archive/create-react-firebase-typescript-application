import {State} from '../data/state';
import {Action} from './store';

const initialState: State = {};

export function reducer(state: State, {type/*, payload*/}: Action): State{
  let newState: State = state;

  if(typeof newState === 'undefined')
    newState = initialState;

  switch(type){

  }

  return newState;
}
