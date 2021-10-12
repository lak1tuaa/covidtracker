import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import USTracker from './components/USTracker';
import StateTracker from './components/StateTracker';

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route path="/state/:abbr">
            <StateTracker />
          </Route>
          <Route path="/">
            <USTracker />
          </Route>
        </Switch>
      </Router>
    </div>
    )  
}

export default App;