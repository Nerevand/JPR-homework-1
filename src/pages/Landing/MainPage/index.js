import React from 'react';
import { connect } from 'react-redux';

import Post from '../../../components/Post';

import './style.scss';

function MainPage(props) {
  const { dataStorage } = props;
  const posts = [];
  if (dataStorage) dataStorage.map(item => posts.push(...item.posts))

  return (
    <section className='mainPage-wrapper'>
      {
        posts.map(item => <Post {...item} key={item.id} />)
      }
    </section>
  )
}

const mapStateToProps = (state) => {
  return {
    dataStorage: state.dataStorage
  }
}

export default connect(mapStateToProps, null)(MainPage);