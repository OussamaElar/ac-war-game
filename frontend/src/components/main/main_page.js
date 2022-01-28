import React from 'react';

class MainPage extends React.Component {
      constructor(props) {
            super(props);
            
      }

      componentDidMount() {
            this.props.fetchPlayers()
      }


      render() {
            return (
                  <div>
                        <h1>Card game</h1>
                        {this.props.players.map((player, i) => (
                              <p key={i}>{player.name}</p>
                        ))}
                        <footer>
                              Copyright &copy; 2019 Oussys
                        </footer>
                  </div>
            );
      }
}

export default MainPage;