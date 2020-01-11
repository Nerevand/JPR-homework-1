import React from 'react'
import { NavLink, Route, Redirect } from 'react-router-dom';

import Signin from './SignIn';
import SignUp from './SignUp';

export default function Auth() {
  const logined = localStorage.getItem('user') ? true : false;

  if (logined) return <Redirect push to='/' />

  return (
    <section className='auth-wrapper'>
      <div className="container">
        <div className="links" >
          <NavLink to='/sign-up'>Sign Up</NavLink>
          <NavLink to='/sign-in'>Sign In</NavLink>
        </div>

        <Route exact path='/sign-in' component={Signin} />
        <Route exact path='/sign-up' component={SignUp} />

      </div>
    </section>
  )
}