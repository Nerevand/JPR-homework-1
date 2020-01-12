import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

import { onSetLoader, onWriteuser } from '../../actions';

import "./style.scss";

function Header(props) {
  const { name } = props.userData;
  const link = window.location.href.split("/");
  const [activeLink, setActiveLink] = useState(link[link.length - 1]);

  const homeClass = classnames("header-ul__link", {
    "active-header__link": activeLink === ''
  });

  const createClass = classnames("header-ul__link", {
    "active-header__link": activeLink === 'posts'
  });

  const infoClass = classnames("header-ul__link", {
    "active-header__link": activeLink === 'info'
  });

  const handleLogout = () => {
    props.onSetLoader(true);

    setTimeout(() => {
      props.onSetLoader(false);
      localStorage.removeItem('user');
      props.onWriteuser({})
    }, 1500);
  }

  return (
    <header className="header">
      <div className="header-container">
        <NavLink
          to="/"
          className="header-logo"
          onClick={() => setActiveLink('')}
        >
          <img
            src="https://www.seoclerk.com/pics/want54841-1To5V31505980185.png"
            alt=""
            title=""
          />
        </NavLink>
        <nav className="header-navigation">
          <ul className="header-navigation__ul">
            <li className="header-ul__item">
              <NavLink
                to="/"
                className={homeClass}
                onClick={() => setActiveLink('')}
              >
                Home
              </NavLink>
            </li>
            {
              name ? 
              <li className="header-ul__item">
                <NavLink
                  to="/posts"
                  className={createClass}
                  onClick={() => setActiveLink('posts')}
                >
                  My posts
                </NavLink>
              </li>
              : null
            }
            <li className="header-ul__item">
              <NavLink
                to="/info"
                className={infoClass}
                onClick={() => setActiveLink('info')}
              >
                Info
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
      <div className="header-info">
        <img
          className="header-user__avatar"
          src={name ?
            "https://c7.uihere.com/icons/235/22/335/default-avatar-53614a6c1f9acc7e201729102976634e.png"
            : 'http://www.iconarchive.com/download/i91933/icons8/windows-8/User-Interface-Login.ico'}
          alt=""
          title=""
        />
        <div className="header-absolute">
          {name ? (
            <div onClick={handleLogout}>
              <h1>Hello {name}</h1>
              <span className="guest-btns sign-out__btn">Sign out</span>
            </div>
          ) : (
              <div className="wrap">
                <NavLink to="/sign-in" className="guest-btns">
                  Login
              </NavLink>
                <span>or</span>
                <NavLink to="/sign-up" className="guest-btns">
                  Register
              </NavLink>
              </div>
            )}
        </div>
      </div>
    </header>
  );
}

const mapStateToProps = state => {
  return {
    userData: state.currentUser
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  onSetLoader,
  onWriteuser
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);
