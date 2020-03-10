import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/style.scss';
import Header from './common/Header';
import Footer from './common/Footer';
import ProductCatalogue from './products/ProductCatalogue';
import LoginForm from './login/LoginForm';

const App = () => {
  return (
    <div>
      <Header />
      <div className="content">
        <Switch>
          <Route exact path="/" component={LoginForm} />
          <Route path="/products" component={ProductCatalogue} />
        </Switch>
      </div>
      <Footer />
    </div>
  );
}

export default App;
