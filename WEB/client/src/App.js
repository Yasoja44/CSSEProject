import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import addSupplier from './components/forms/addSupplier';
import getSuppliers from './components/views/viewsSuppliers';
import addPolicyOne from './components/forms/addPolicyOne';
import addSupplierItems from "./components/forms/addSupplierItems";
import viewSupplierItem from "./components/views/viewSupplierItem";
import EditSupplierAdmin from "./components/forms/EditSupplierAdmin";
import viewSuppliersPolicy from "./components/views/viewSuppliersPolicy";
import policyViewStockItem from "./components/views/viewSuppliersItemPolicy";
import viewOrder from "./components/views/viewOrder";

function App() {
  return (
      <div className="App">
        <div>
          <Router>
            <section>
              <Switch>
                  <Route path="/addSupplier" component={addSupplier}  />
                  <Route path="/getSuppliers" component={getSuppliers}  />
                  <Route path="/addSupplierItems/:id" component={addSupplierItems}  />
                  <Route path="/getSupplierItems/:id" component={viewSupplierItem}  />
                  <Route path="/editItem/:id" component={EditSupplierAdmin}  />


                  <Route path="/addPolicyOne" component={addPolicyOne}  />
                  <Route path="/viewSuppliersPolicy" component={viewSuppliersPolicy}  />
                  <Route path="/policyViewStockItem/:id" component={policyViewStockItem}  />
                  <Route path="/viewOrder" component={viewOrder}  />
              </Switch>
            </section>
          </Router>
        </div>
      </div>
  );
}

export default App;
