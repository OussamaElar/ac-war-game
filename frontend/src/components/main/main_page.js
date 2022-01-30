import React from 'react';
import './main_page.css'

class MainPage extends React.Component {
      constructor(props) {
            super(props);
            this.state = {
                  name: '',
                  err: ''
            }
            this.handleSubmitNew = this.handleSubmitNew.bind(this);
            this.handleSubmitOld = this.handleSubmitOld.bind(this)
      }

      componentDidMount() {
            this.props.fetchPlayers()
      }

      topPlayer() {
            let highestScore = 0
            let topPlayer;
            this.props.players.forEach(player => {
                  if (highestScore < player.score) {
                        highestScore = player.score
                        topPlayer = player.name
                  }
            });
            return {highestScore, topPlayer}
      }

      update(field) {
            return e => {
                  this.setState({
                        [field]: e.target.value
                  })
            }
      }

      handleSubmitNew(e) {
            e.preventDefault();
            let player = {
                  name: this.state.name
            }
            this.props.creatPlayer(player)
                  .then(() => this.props.history.push(`/game/${player.name}`))
                  .catch((error) => this.setState({ err: 'Player already exists'}))
            
      }

      handleSubmitOld(e) {
            e.preventDefault();
            let player = {
                  name: this.state.name
            }
            this.props.fetchPlayer({name: player.name}).then((player) => {
                  if (player.player.data.length === 0) {
                        this.setState({ err: 'Player Not found' })
                        setInterval(() => {
                              window.location.reload()
                        }, 2000)
                  } else {
                        this.props.history.push(`/game/${player.player.data[0].name}`)
                  }
            })
      }


      render() {
            return (
                  <div className='main_comtainer'>
                        <h1>Cards War</h1>
                        <div className='h-score'>
                              <h3>Top Player: {this.topPlayer().topPlayer}</h3>
                              <h3>Highest Score: { this.topPlayer().highestScore}</h3>
                        </div>
                        <div className='start-game'>
                              <form className='player-sub' onSubmit={this.handleSubmitNew}>
                                    <input placeholder='New Player' onChange={this.update('name')}></input>
                                    <button> Play </button>
                              </form>
                              <form className='player-sub' onSubmit={this.handleSubmitOld}>
                                    <input placeholder='Existing Player' onChange={this.update('name')}></input>
                                    <button> Play </button>
                              </form>
                              <p className='error'>{ this.state.err}</p>
                        </div>
                  </div>
            );
      }
}

export default MainPage;