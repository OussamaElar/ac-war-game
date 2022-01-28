import { combineReducers } from 'redux';
import players from './player_reducer';

const RootReducer = combineReducers({
  players
});

export default RootReducer;