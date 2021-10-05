import './App.css';
import React, {useEffect} from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import addSupplier from './components/forms/addSupplier';
import getSuppliers from './components/views/viewsSuppliers';
import addPolicyOne from './components/forms/addPolicyOne';
import addSupplierItems from "./components/forms/addSupplierItems";
import viewSupplierItem from "./components/views/viewSupplierItem";
import EditSupplierAdmin from "./components/forms/EditSupplierAdmin";
import EditSupplierItems from "./components/forms/EditSupplierItems";
import viewSuppliersPolicy from "./components/views/viewSuppliersPolicy";
import viewOrder from "./components/views/viewOrder";
import viewOrderItems from "./components/views/viewOrderItems";
import policyViewStockItem from "./components/views/viewSuppliersItemPolicy";
import viewOrderHistory from "./components/views/viewOrderHistory";
import viewOrderItemsHistory from "./components/views/viewOrderItemsHistory";



import Register from "./umesh/pages/register/register";
import {setToken} from "./setToken";
import store from "./Store";
import {LoadUser} from "./Actions/Authentication";
import {Provider} from "react-redux";
import Login from "./umesh/pages/login/login";
import About from "./umesh/about";
import Profile from "./umesh/pages/profile/profile";
import Forgot from "./umesh/pages/forgot/forgot";
import Reset from "./umesh/pages/reset/reset";
import ConfirmEmail from "./Actions/confirmEmail";
import Accountant from "./umesh/accountant";
import Manager from "./umesh/manager";
import Supervisor from "./umesh/supervisor";
import Header from "./umesh/Header/header";
import Footer from "./umesh/footer/footer";


if(localStorage.getItem('token')){
    setToken(localStorage.getItem('token'));
}

function App() {

    useEffect(() => {
        store.dispatch(LoadUser())
    },[]);

  return (
      <div className="App">
        <div>
            <Header/>
            <Provider store={store}>
          <Router>
            <section>
              <Switch>
                  <Route path="/" component={Login} exact/>
                  <Route path="/about" component={About} />
                  <Route path="/supervisor" component={Supervisor} />
                  <Route path="/accountant" component={Accountant} />
                  <Route path="/manager" component={Manager} />
                  <Route path="/login" component={Login} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/forgot" component={Forgot} />
                  <Route path="/register" component={Register} />
                  <Route path="/users/reset_password/:id" component={Reset}/>
                  <Route path="/users/activate/:auth_token" component={ConfirmEmail}/>


                  <Route path="/addSupplier" component={addSupplier}  />
                  <Route path="/getSuppliers" component={getSuppliers}  />
                  <Route path="/editSupplier/:id" component={EditSupplierAdmin}  />

                  <Route path="/addSupplierItems/:id" component={addSupplierItems}  />
                  <Route path="/getSupplierItems/:id" component={viewSupplierItem}  />
                  <Route path="/editItem/:id" component={EditSupplierItems}  />


                  <Route path="/addPolicyOne" component={addPolicyOne}  />
                  <Route path="/viewSuppliersPolicy" component={viewSuppliersPolicy}  />
                  <Route path="/policyViewStockItem/:id" component={policyViewStockItem}  />
                  <Route path="/viewOrder" component={viewOrder}  />
                  <Route path="/orderViewStockItem/:id" component={viewOrderItems}  />
                  <Route path="/viewOrderHistory" component={viewOrderHistory}  />
                  <Route path="/orderViewStockItemHistory/:id" component={viewOrderItemsHistory}  />
              </Switch>
            </section>
          </Router>
            </Provider>
        </div>
    <Footer/>
      </div>
  );
}

export default App;
