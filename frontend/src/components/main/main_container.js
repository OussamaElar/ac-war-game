import { connect } from "react-redux";
import { creatPlayer, fetchPlayers, fetchPlayer, updatePlayer } from "../../actions/player_actions";
import MainPage from "./main_page";


const mSTP = (state) => {
      return {
            players: Object.values(state.players.all)
      }
}

const mDTP = (dispatch) => {
      return {
            fetchPlayers: () => dispatch(fetchPlayers()),
            fetchPlayer: (player) => dispatch(fetchPlayer(player)),
            creatPlayer: (playerData) => dispatch(creatPlayer(playerData)),
            updatePlayer: (playerData) => dispatch(updatePlayer(playerData))
      }
}

export default connect(mSTP, mDTP)(MainPage)