import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import USTracker from './components/USTracker'

function App() {
  return (
    <Router>
      <Route path="/">
        <USTracker />
      </Route>

    </Router>
  )  
}

export default App