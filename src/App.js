import React, { Component } from 'react'
import Layout from "./components/Layout/Layout"
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder"
import {Route,Switch} from 'react-router-dom'
import Checkout from './containers/Checkout/Checkout'
import Orders from  './containers/Orders/Orders'
import Auth from './containers/Auth/Auth'
import Logout from './containers/Auth/Logout/Logout'
class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>

          <Route path="/checkout" component={Checkout}/>
          <Route path="/orders" component={Orders}/>
          <Route path="/" exact component={BurgerBuilder}/>
          <Route path="/auth" component={Auth}/>
          <Route path="/logout" component={Logout}/>
          </Switch>
          
        </Layout>
      </div>
    );
  }
}

export default App;
