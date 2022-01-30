import * as APIUtil from '../util/player_api_util';


export const RECEIVE_PLAYER = 'RECEIVE_PLAYER';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';



export const receivePlayers = players => ({
      type: RECEIVE_PLAYERS,
      players
})

export const receivePlayer = player => ({
      type: RECEIVE_PLAYER,
      player
})

export const fetchPlayers = () => dispatch => (
      APIUtil.fetchPlayers().then((players) => dispatch(receivePlayers(players)))
)

export const fetchPlayer = (player) => dispatch => (
      APIUtil.fetchPlayer(player).then((player) => dispatch(receivePlayer(player)))
)

export const creatPlayer = (playerData) => dipatch => (
      APIUtil.createPlayer(playerData).then((player) => dipatch(receivePlayer(player)))
)

export const updatePlayer = (playerData) => dispatch => (
      APIUtil.updatePlayer(playerData).then((player) => dispatch(receivePlayer(player)))
)