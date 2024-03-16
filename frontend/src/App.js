import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import MapPage from './components/MapPage';

function App() {
  return (
    <Router>
        <Switch>
          <Route exact path="/">
            <Home />
          </ Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/map">
            <MapPage />
          </Route>
        </Switch>
    </Router>
  );
}


export default App;
