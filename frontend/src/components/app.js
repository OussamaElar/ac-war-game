import React from 'react';
import { Switch, Route } from 'react-router-dom';
import GameContainer from './game/game_container';
import MainPageContainer from './main/main_container'
// import MainPage from './main/main_page';

const App = () => (
    <div>
          <Switch>
            <Route exact path="/" component={MainPageContainer} />
            <Route exact path="/game/:name" component={GameContainer}/>
          </Switch>
    </div>
    
);

export default App;