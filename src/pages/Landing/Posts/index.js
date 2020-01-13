import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

import Post from '../../../components/Post';

import './style.scss';

function Posts(props) {
  const { userData } = props;
  let posts = [];

  if (userData) posts = userData.posts

  return (
    <section className='mainPage-wrapper'>
      <div className='btn-create__wrapper'>
        <NavLink to='/create' className='btn-create'>
          <span>Create new publication</span>
        </NavLink>
      </div>
      {
        posts ? posts.map(item => <Post {...item} key={item.id} />) : null
      }
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    dataStorage: state.dataStorage,
    userData: state.currentUser
  }
}

export default connect(mapStateToProps, null)(Posts);