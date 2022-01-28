import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MainPageContainer from './main/main_container'
// import MainPage from './main/main_page';

const App = () => (
    <div>
          <Switch>
            <Route exact path="/" component={MainPageContainer} />
          </Switch>
    </div>
    
);

export default App;