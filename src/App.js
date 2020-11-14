import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import CustomerSignUp from './components/pages/CustomerSignUp';
import PharmacySignUp from './components/pages/PharmacySignUp';

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/services' exact component={Services} />
          <Route path='/products' exact component={Products} />
          <Route path='/customer_signup' component={CustomerSignUp} />
          <Route path='/pharmacy_signup' component={PharmacySignUp} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
