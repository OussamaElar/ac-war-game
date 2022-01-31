import React from 'react';
import './game.css'
import * as Util from './initialSetup';

class Game extends React.Component {
      constructor(props) {
            super(props)
            this.state = {
                  player: {
                        id: '',
                        name: '',
                        score: ''
                  },
                  compThrownCard: {
                        suit: '',
                        val: '',
                        color: ''
                  },
                  playerThrownCard:  {
                        suit: '',
                        val: '',
                        color: ''
                  },
                  playerDeck: Util.playerDeck,
                  compDeck: Util.compDeck,
                  playerDeckCount: Util.playerDeckCards,
                  compDeckCount: Util.playerDeckCards,
            }
            this.faceUpCard = this.faceUpCard.bind(this);
            this.endGame = this.endGame.bind(this)
            
      }

      componentDidMount() {
            this.props.fetchPlayer({ name: this.props.playerName }).then((ikhan) => 
                  this.setState({
                        player: {
                              id: ikhan.player.data[0]._id,
                              name: ikhan.player.data[0].name,
                              score: ikhan.player.data[0].score
                        }
                  })
            )
            
      }

      checkRoundWinner(cardA, cardB) {
            return Util.card_value[cardA.val] > Util.card_value[cardB.val]
      }

      gameOver(playerDeck) {
            return playerDeck.cards.length === 0
      }

      

      faceUpCard(e) {
            e.preventDefault();
            
            const playerCard = this.state.playerDeck.pop();
            const compCard = this.state.compDeck.pop();
            if (this.checkRoundWinner(playerCard, compCard)) {
                  this.state.playerDeck.push(playerCard);
                  this.state.playerDeck.push(compCard)
                  
            } else if (this.checkRoundWinner(compCard, playerCard)){
                  this.state.compDeck.push(playerCard);
                  this.state.compDeck.push(compCard)
            } else {
                  this.state.playerDeck.push(playerCard);
                  this.state.compDeck.push(compCard)
            }
            this.setState({
                  playerThrownCard: {
                        suit: playerCard.suit,
                        val: playerCard.val,
                        color: playerCard.color
                  },
                  compThrownCard: {
                        suit: compCard.suit,
                        val: compCard.val,
                        color: compCard.color
                  },
            })

            setInterval(() => {
                  this.setState({
                        playerDeckCount: Util.playerDeck.cards.length,
                        compDeckCount: Util.compDeck.cards.length
                  })
            }, 1500)

            if (this.gameOver(this.state.compDeck)) {
                  let player = {
                        id: this.state.player.id,
                        score: this.state.player.score + 100
                  }
                  setInterval(() => {

                        this.props.updatePlayer(player).then(() => window.location.reload())
                  }, 2000)
            } else if (this.gameOver(this.state.playerDeck)) {
                  setInterval(() => {
                        window.location.reload();
                  }, 2000)
            }
      }

      endGame() {
            return this.props.history.push('/')
      }
      

      render() {
            if (this.state.player.length === 0) return null

            return (
                  <div className='game'>
                        <div className='name-score'>
                              <p>Player: {this.state.player.name}</p>
                              <p>Score: {this.state.player.score}</p>
                        </div>
                        {this.gameOver(this.state.compDeck) ? <h3 className='win'>You Win!!</h3> : null}
                        { this.gameOver(this.state.playerDeck) ? <h3 className='win'>You Lose!!</h3> : null}
                        <p className='names'>Computer</p>
                        <div className='player-container'>
                              <div className='comp-deck deck' >{this.state.compDeckCount }</div>
                              <div className='player-card'>
                                    <div className={'card ' + this.state.compThrownCard.color}>
                                          {this.state.compThrownCard.val}{this.state.compThrownCard.suit}
                                    </div>
                              </div>
                        </div>
                        <p className='names'>{this.state.player.name}</p>
                        <div className='player-container'>
                              <div className='player-deck deck'>{this.state.playerDeckCount }</div>
                              <div className={'player-card ' + this.state.playerThrownCard.color}>
                                    <div className='card black'>
                                          {this.state.playerThrownCard.val}{this.state.playerThrownCard.suit}
                                    </div>
                              </div>
                        </div>
                        <div className='buttons'>
                              <button onClick={this.faceUpCard}>Face Up Card</button>
                              <button onClick={() => (window.location.reload())}>Restart</button>
                              <button onClick={this.endGame}>End Game</button>
                        </div>
                  </div>
            )
      }

}

export default Game;