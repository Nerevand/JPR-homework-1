import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Auth from './pages/Auth';
import Landing from './pages/Landing'
import Loader from './components/Loader';
import PrivateRoute from './components/PrivateRouter'

import { onWriteuser, onSetData } from './actions'

import { dataStorage } from './dataStorage';

import './App.scss'

function App(props) {
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (!localStorage.getItem('dataStorage')) localStorage.setItem('dataStorage', JSON.stringify(dataStorage))

    if (userData) props.onWriteuser(userData);

    props.onSetData(JSON.parse(localStorage.getItem('dataStorage')))
  })

  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route exact path="/sign-in" component={Auth} />
          <Route exact path="/sign-up" component={Auth} />

          <Route exact path="/" component={Landing} />
          <PrivateRoute exact={true} path="/posts" component={Landing} />
          <Route exact path="/info" component={Landing} />
        </Switch>
      </BrowserRouter>
      {props.loader ? <Loader /> : null}
    </Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    loader: state.loader
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onWriteuser,
  onSetData
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(App);
