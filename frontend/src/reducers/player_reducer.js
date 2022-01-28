import { RECEIVE_PLAYER, RECEIVE_PLAYERS } from "../actions/player_actions";


const PlayerReducer = (state = { all: {}, new: undefined }, action) => {
      let newState = Object.assign({}, state)
      switch (action.type) {
            case RECEIVE_PLAYERS:
                  newState.all = action.players.data;
                  return newState;
            case RECEIVE_PLAYER: 
                  newState.all = { 0: action.player.data }
                  return newState
            default:
                  return state;
      }
}

export default PlayerReducer;