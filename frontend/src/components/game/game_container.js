import { connect } from "react-redux";
import { fetchPlayers, fetchPlayer, updatePlayer } from "../../actions/player_actions";
import Game from "./game";



const mSTP = (state, ownProps) => {
      
      return {
            playerName: ownProps.match.params.name,
      }
}

const mDTP = (dispatch) => {
      return {
            fetchPlayers: () => dispatch(fetchPlayers()),
            fetchPlayer: (player) => dispatch(fetchPlayer(player)),
            updatePlayer: (playerData) => dispatch(updatePlayer(playerData))
      }
}

export default connect(mSTP, mDTP)(Game)