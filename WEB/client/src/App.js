import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import addSupplier from './components/forms/addSupplier';

function App() {
  return (
      <div className="App">
        <div>
          <Router>
            <section>
              <Switch>
                <Route path="/addSupplier" component={addSupplier}  />
              </Switch>
            </section>
          </Router>
        </div>
      </div>
  );
}

export default App;