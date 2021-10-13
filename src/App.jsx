import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import USTracker from './components/USTracker';
import StateTracker from './components/StateTracker';
import MenuBar from './components/MenuBar';

function App() {
  return (
    <Router>
      <MenuBar/>
      <Switch>
        <Route path="/state/:abbr">
          <StateTracker />
        </Route>
        <Route path="/">
          <USTracker />
        </Route>
      </Switch>
    </Router>
    )  
}

export default App;