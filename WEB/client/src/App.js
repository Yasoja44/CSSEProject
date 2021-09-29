import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import addSupplier from './components/forms/addSupplier';
import getSuppliers from './components/views/viewsSuppliers';

function App() {
  return (
      <div className="App">
        <div>
          <Router>
            <section>
              <Switch>
                <Route path="/addSupplier" component={addSupplier}  />
                  <Route path="/getSuppliers" component={getSuppliers}  />
              </Switch>
            </section>
          </Router>
        </div>
      </div>
  );
}

export default App;
