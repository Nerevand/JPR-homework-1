import React, { Fragment, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom';

import Commentars from '../Commentars';

import { onSetData, onSetLoader, onWriteuser } from '../../actions';

import './style.scss';

function Post(props) {
  const { id, title, img, content, author, comments, userData, dataStorage } = props;
  const commentRef = useRef(null);
  let voted = false;
  const [open, setOpen] = useState(false)

  const postPage = window.location.pathname === '/posts';

  comments.forEach(comments => {
    if (comments.author.id === userData.id) voted = true
  })

  const handleCreateComment = () => {
    const { dataStorage } = props;

    const currentComment = {
      id: parseInt(+new Date()),
      content: commentRef.current.innerText,
      author: {
        id: props.userData.id,
        name: props.userData.name,
        mail: props.userData.mail
      }
    }

    for (let i = 0; i < dataStorage.length; i++) {
      const posts = dataStorage[i].posts;

      for (let j = 0; j < posts.length; j++) {
        const comments = posts[j].comments;

        if (posts[j].id === id) {
          comments.push(currentComment);
        }
      }
    }

    props.onSetLoader(true);

    setTimeout(() => {
      props.onSetLoader(false);
      props.onSetData([]);
      props.onSetData(dataStorage);
    }, 1500);
  }

  const handleRemove = () => {
    const { posts } = userData;
    userData.posts = posts.filter(post => post.id !== id);

    for (let i = 0; i < dataStorage.length; i++) {
      if (dataStorage[i].id === userData.id) {
        dataStorage[i] = userData;
      }
    }
    props.onWriteuser({});
    props.onWriteuser(userData);
    localStorage.setItem('user', JSON.stringify(userData))
    props.onSetData(dataStorage)
  }

  return (
    <section className='publication'>

      <div className='publication-author'>
        author: <span>{author.name}</span>
      </div>
      <h1 className='publication-title'>
        {title}
      </h1>

      <div className='publication-img__wrapper'>
        <img src={img} alt='' />
      </div>

      <p>
        {content}
      </p>

      <div>
        <h2>Коментарі</h2>
        {
          voted || author.id === props.userData.id ? null :
            <Fragment>
              <h3>Залишити коментар</h3>
              <div className='leave-wrapper'>
                <div contentEditable className='comment-field' ref={commentRef} />
                <div className='guest-btns send-btn' onClick={handleCreateComment}>Надіслати</div>
              </div>
            </Fragment>
        }
        {
          comments.map(props => <Commentars {...props} key={props.id} />)
        }
      </div>

      {
        postPage && author.id === userData.id ?
          <div className='absolute-block'>
            <img
              src='https://image.flaticon.com/icons/svg/61/61140.svg' alt='' width='20px'
              onClick={() => setOpen(!open)} />
            {
              open ? <div>
                <ul className='absolute-list'>
                  <li className='absolute-items'>
                    <NavLink to={{
                      pathname: '/create',
                      data: { props }
                    }} >Редагувати</NavLink>
                  </li>
                  <li className='absolute-items' onClick={handleRemove}>Видалити</li>
                </ul>
              </div>
                : null
            }
          </div>
          : null
      }
    </section>
  )
}

Post.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  img: PropTypes.string,
  content: PropTypes.string,
  author: PropTypes.object,
  comments: PropTypes.array
};

const mapStateToProps = (state) => {
  return {
    dataStorage: state.dataStorage,
    userData: state.currentUser
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  onSetData,
  onSetLoader,
  onWriteuser
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post);