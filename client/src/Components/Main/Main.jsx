import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from '../Home';
import Register from '../Register';
import RegisterStep2 from '../RegisterStep2';
import RegisterStep3 from '../RegisterStep3';
import Login from '../Login';
import Error from '../Error';
import ScrollButton from '../ScrollButton/ScrollButton';
import Map from '../Map/Map';

const Main = () => {
  return (
    <main>
      <Router>
        <Switch>
          <Route path='/' component={Home} exact />
          <Route path='/map' component={Map} />
          <Route path='/register' component={Register} />
          <Route path='/registerstep2' component={RegisterStep2} />
          <Route path='/registerstep3' component={RegisterStep3} />
          <Route path='/login' component={Login} />
          <Route component={Error} />
        </Switch>
      </Router>
      <ScrollButton />
    </main>
  );
};

export default Main;
