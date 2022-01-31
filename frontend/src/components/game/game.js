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
                  compThrownCard: {},
                  compThrownCardA: {},
                  compThrownCardB: {},
                  playerThrownCard:  {},
                  playerThrownCardA:  {},
                  playerThrownCardB: {},
                  faceDownCard: '',
                  cardBstyle: '',
                  playerDeck: Util.playerDeck,
                  compDeck: Util.compDeck,
                  playerDeckCount: Util.playerDeckCards,
                  compDeckCount: Util.playerDeckCards,
            }
            this.faceUpCard = this.faceUpCard.bind(this);
            this.endGame = this.endGame.bind(this)
            
      }

      componentDidMount() {
            this.props.fetchPlayer({ name: this.props.playerName }).then((res) => 
                  this.setState({
                        player: {
                              id: res.player.data[0]._id,
                              name: res.player.data[0].name,
                              score: res.player.data[0].score
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
            this.setState({
                  playerThrownCard: {
                        suit: playerCard.suit,
                        val: playerCard.val,
                              color: playerCard.color,
                        cardStyle: 'player-card'
                  },
                  compThrownCard: {
                        suit: compCard.suit,
                        val: compCard.val,
                        color: compCard.color,
                        cardStyle: 'player-card'
                  },
                  compThrownCardA: {},
                  compThrownCardB: {},
                  playerThrownCardA:  {},
                  playerThrownCardB: {},
                  faceDownCard: '',
                  cardBstyle: '',
            })
            if (this.checkRoundWinner(playerCard, compCard)) {
                  this.state.playerDeck.push(playerCard);
                  this.state.playerDeck.push(compCard)
                  
            } else if (this.checkRoundWinner(compCard, playerCard)){
                  this.state.compDeck.push(playerCard);
                  this.state.compDeck.push(compCard)
                     
            } else {
                  const player2Cards = this.state.playerDeck.pop2Cards();
                  const comp2Cards = this.state.compDeck.pop2Cards();
                  if (this.checkRoundWinner(player2Cards[0], comp2Cards[0])) {
                        this.state.playerDeck.push(playerCard)
                        this.state.playerDeck.push(compCard)
                        this.state.playerDeck.push2Cards(player2Cards[0], player2Cards[1])
                        this.state.playerDeck.push2Cards(comp2Cards[0], comp2Cards[1])
                  } else if (this.checkRoundWinner(comp2Cards[0], player2Cards[0])) {
                        this.state.compDeck.push(playerCard)
                        this.state.compDeck.push(compCard)
                        this.state.compDeck.push2Cards(player2Cards[0], player2Cards[1])
                        this.state.compDeck.push2Cards(comp2Cards[0], comp2Cards[1])
                  }
                  this.setState({
                        playerThrownCardA: {
                              suit: player2Cards[0].suit,
                              val: player2Cards[0].val,
                              color: player2Cards[0].color,
                              cardStyle: 'player-card'
                        },
                        compThrownCardA: {
                              suit: comp2Cards[0].suit,
                              val: comp2Cards[0].val,
                              color: comp2Cards[0].color,
                              cardStyle: 'player-card'
                        },
                        faceDownCard: 'face-down-card',
                        cardBstyle: 'player-card'
                  
                  })
            }
            

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
                              <div className={this.state.compThrownCardA.cardStyle + ' ' + this.state.compThrownCardA.color}>
                                    <div className='card'>
                                          {this.state.compThrownCardA.val}{this.state.compThrownCardA.suit}
                                    </div>
                              </div>
                              <div className={this.state.faceDownCard + ' ' + this.state.cardBstyle}>
                                    <div className='card'>
                                          {this.state.compThrownCardB.val}{this.state.compThrownCardB.suit}
                                    </div>
                              </div>
                              <div className={this.state.compThrownCard.cardStyle + ' ' + this.state.compThrownCard.color}>
                                    <div className='card'>
                                          {this.state.compThrownCard.val}{this.state.compThrownCard.suit}
                                    </div>
                              </div>
                        </div>
                        
                        <p className='names'>{this.state.player.name}</p>
                        <div className='player-container'>
                              <div className='player-deck deck'>{this.state.playerDeckCount }</div>
                              <div className={this.state.playerThrownCardA.cardStyle + ' ' + this.state.playerThrownCardA.color}>
                                    <div className='card'>
                                          {this.state.playerThrownCardA.val}{this.state.playerThrownCardA.suit}
                                    </div>
                              </div>
                              <div className={this.state.faceDownCard + ' ' + this.state.cardBstyle}>
                                    <div className='card'>
                                          {this.state.playerThrownCardB.val}{this.state.playerThrownCardB.suit}
                                    </div>
                              </div>
                              <div className={this.state.playerThrownCard.cardStyle + ' ' + this.state.playerThrownCard.color}>
                                    <div className='card'>
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