import axios from 'axios';

export const createPlayer = data => {
      return axios.post('/api/players/create', data)
}

export const fetchPlayers = () => {
      return axios.get('api/players')
}

export const fetchPlayer = (player) => {
      return axios.get('api/players/game', {
            params: player
      })
}

export const updatePlayer = (playerData) => {
      return axios.patch(`/api/players/update/${playerData.id}`, playerData)
}