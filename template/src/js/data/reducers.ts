import {State} from '../models/state';
import {Action} from './store';

export function reducer(state: State, {type/*, payload*/}: Action): State{
  let newState: State = state;

  if(typeof newState === 'undefined')
    newState = {};

  switch(type){

  }

  return newState;
}
