import React, { Fragment } from 'react';
import { Route } from 'react-router-dom';

import Header from '../../components/Header';
import MainPage from './MainPage';
import Posts from './Posts';
import Info from './Info'

export default function Landing(props) {
  return (
    <Fragment>
      <Header />      
      <Route exact path="/" component={MainPage} />
      <Route exact path="/posts" component={Posts} />
      <Route exact path="/info" component={Info} />
    </Fragment>
  )
}