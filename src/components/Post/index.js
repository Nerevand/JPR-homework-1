import React, { Fragment, useRef } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import Commentars from '../Commentars';

import { onSetData, onSetLoader } from '../../actions';

import './style.scss';

function Post(props) {
  const { id, title, img, content, author, comments, userData } = props;
  const commentRef = useRef(null);
  let voted = false;

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

        if(posts[j].id === id) {
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
    </section>
  )
}

Post.propTypes = {
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
  onSetLoader
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Post);