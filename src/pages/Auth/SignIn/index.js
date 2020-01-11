import React, { useState, useRef } from 'react'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import CustomInput from '../../../components/CustomInput';

import { onSetUser, onSetLoader } from '../../../actions';

import './style.scss'

function SignIn(props) {
  const [mailError, setMail] = useState('');
  const [passwordError, setError] = useState('');
  const [redirect, setRedirect] = useState(false);
  const mail =  useRef();
  const password =  useRef();

  const handleLogin = () => {
    const mailField = mailValidation();
    const passField = passwordValidation();
    if (mailField && passField) {
      const userData = {
        mail: mail.current.value.trim(),
        password: password.current.value.trim(),
        handleError,
        handleSuccess
      }

      props.onSetUser(userData)
      props.onSetLoader(true)
      setTimeout(() => {
        props.onSetLoader(false);
      }, 1500);
    }
  }

  const handleSuccess = () => {
    setRedirect(true)
  }

  const handleError = () => {
    setMail('Incorrect username or password')
    setError('Incorrect username or password')
  }

  const handleBlur = () => {
    setMail('')
    setError('')
  }

  const mailValidation = () => {
    let email = mail.current.value.trim();
    if (email.length === 0) {
      setMail('This field can not be empty')
      email = false;
    } else {
      email = true;
    }
    return email
  }

  const passwordValidation = () => {
    let pass = password.current.value.trim();
    if (password.length === 0) {
      setMail('This field can not be empty')
      pass = false;
    } else {
      pass = true;
    }
    return pass
  }


  if (redirect) return <Redirect push to='/' />

  return (
    <div className="form">
      <CustomInput
        heading='E-MAI'
        type='text'
        placeholder='example@example.com'
        refs={mail}
        error={mailError}
        onChange={handleBlur}
      />

      <CustomInput
        heading='PASSWORD'
        type='password'
        placeholder='Password'
        refs={password}
        error={passwordError}
        onChange={handleBlur}
      />

      <button className="button" onClick={handleLogin}>sign in</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onSetUser,
  onSetLoader
}, dispatch)

export default connect(null, mapDispatchToProps)(SignIn);