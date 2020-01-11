import React, { useState, useRef } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import CustomInput from '../../../components/CustomInput';

import { onSetLoader } from '../../../actions';

function SignUp(props) {
  const name = useRef(null);
  const mail = useRef(null);
  const password = React.createRef(); // можна двома варіантами, або через createRef() або через хуки
  const [nameError, setNameError] = useState('');
  const [mailError, setMailError] = useState('');
  const [passError, setPassError] = useState('');
  const [redirect, setRedirect] = useState(false);

  if (redirect) return <Redirect push to='/sign-in' />

  const handleCreateUser = () => {
    const validName = handleValidationName();
    const validMail = handleValidationMail();
    const validPassword = handleValidationPassword();

    if (validName && validMail && validPassword) {
      let userStorage = JSON.parse(localStorage.getItem('dataStorage'));
      const userData = {
        id: parseInt(+new Date()),
        name: name.current.value.trim(),
        mail: mail.current.value.trim(),
        password: password.current.value.trim(),
        posts: []
      }
      userStorage = [...userStorage, userData];
      props.onSetLoader(true);

      setTimeout(() => {
        props.onSetLoader(false);
        localStorage.setItem('dataStorage', JSON.stringify(userStorage));
        setRedirect(true)
      }, 1500);
    }
  }

  const handleValidationName = () => {
    let username = name.current.value.trim();
    if (username.length === 0) {
      setNameError('This field can not be empty');
      username = false;
    } else if (!name.current.validity.valid) {
      setNameError('Name is not valid. Use only letters');
      username = false;
    } else {
      setNameError('');
      username = true;
    }
    return username;
  }

  const handleValidationMail = () => {
    let email = mail.current.value.trim();
    const userStorage = JSON.parse(localStorage.getItem('dataStorage'));
    let uniqueMail = userStorage.some(el => el.mail === mail.current.value.trim())

    if (email.length === 0) {
      setMailError('This field can not be empty');
      email = false;
    } else if (!mail.current.validity.valid) {
      setMailError('Mail is not valid');
      email = false;
    } else if (uniqueMail) {
      setMailError('Already used');
      email = false;
    } else {
      setMailError('');
      email = true;
    }
    return email;
  }

  const handleValidationPassword = () => {
    let pass = password.current.value.trim();
    if (pass.length === 0) {
      setPassError('This field can not be empty');
      pass = false;
    } else if (pass.length < 6) {
      setPassError('Password too short. Min length 6 characters');
      pass = false;
    } else if (pass.length > 16) {
      setPassError('Password too long. Max length 16 characters');
      pass = false;
    } else if (!password.current.validity.valid) {
      setPassError('Password is not valid');
      pass = false;
    } else {
      setPassError('');
      pass = true;
    }
    return pass;
  }

  return (
    <div className="form">
      <CustomInput
        heading='Name'
        type='text'
        placeholder='Your name'
        refs={name}
        error={nameError}
        pattern="[A-Za-zА-Яа-яЇїІіЄєЁёҐґ]{2,30}"
        onBlur={handleValidationName}
      />

      <CustomInput
        heading='E-MAI'
        type='text'
        placeholder='example@example.com'
        refs={mail}
        error={mailError}
        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
        onBlur={handleValidationMail}
      />

      <CustomInput
        heading='PASSWORD'
        type='password'
        placeholder='Password'
        refs={password}
        error={passError}
        pattern="[A-Za-z0-9]{6,16}"
        onBlur={handleValidationPassword}
      />

      <button className="button" onClick={handleCreateUser}>sign up</button>
    </div>
  )
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onSetLoader
}, dispatch)

export default connect(null, mapDispatchToProps)(SignUp);