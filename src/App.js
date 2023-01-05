import { connect } from 'react-redux';
import { lazy, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { getUserAuth } from './actions';
import Loading from './components/Fallbacks/Loading';
import NotFound from './components/Fallbacks/NotFound';

import Functionalities from './components/Functionalities';
import './App.css';
import './utilities.css';

import Login from './components/Login';
import AgreementLogin from "./components/AgreementLogin";
import Navbar from './components/Navbar';
const Home = lazy(() => import('./components/Home'));
const Resource = lazy(() => import('./components/Resource'));
const Notifications = lazy(() => import('./components/Notifications'));
const Network = lazy(() => import('./components/Network'));
const Messaging = lazy(() => import('./components/Messaging'));
const Profile = lazy(() => import('./components/Profile'));

const AboutUs = lazy(() => import('./components/AboutUs'));

function App(props) {
  useEffect(() => {
    props.getUserAuth();
  }, []);

  return (
    <div className='App'>
      <Suspense fallback={<Loading />}>
        <Router>
          <Switch>
            <Route exact path='/'>
              <Login />
            </Route>
            <Route exact path='/agreement'>
              <AgreementLogin />
            </Route>
            <Route path='/functionalities'>
              <Functionalities />
            </Route>
            <Route path='/home'>
              <Navbar />
              <Home />
            </Route>
            <Route path='/resource'>
              <Navbar />
              <Resource />
            </Route>
            <Route path='/notifications'>
              <Navbar />
              <Notifications />
            </Route>
            <Route path='/network'>
              <Navbar />
              <Network />
            </Route>
            <Route path='/messaging:receiverId'>
              <Navbar />
              <Messaging />
            </Route>
            <Route path='/profile'>
              <Navbar />
              <Profile />
            </Route>
            <Route path='/aboutus'>
              <Navbar />
              <AboutUs />
            </Route>
            <Route path='/*'>
              <Navbar />
              <NotFound />
            </Route>
          </Switch>
        </Router>
      </Suspense>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => ({
  getUserAuth: () => dispatch(getUserAuth()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
