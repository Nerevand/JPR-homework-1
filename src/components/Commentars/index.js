import React, { useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import { onSetData, onSetLoader } from '../../actions';

import './style.scss'

function Commentars(props) {
  const { content, author, userData, id } = props;
  const comentarRef = useRef(null);
  const spanRef = useRef(null);
  const parentRef = useRef(null);
  const [edit, setEdit] = useState(false);

  const handleChangeContentEditable = () => {
    setEdit(true);
    setTimeout(() => {
      comentarRef.current.focus();
    }, 1000);
  }

  const handleRemoveCommentar = () => {
    const { dataStorage } = props;

    for (let i = 0; i < dataStorage.length; i++) {
      const posts = dataStorage[i].posts;

      for (let j = 0; j < posts.length; j++) {
        const comments = posts[j].comments.filter(ii => ii.id !== id);
        posts[j].comments = comments;
      }
    }

    props.onSetLoader(true);

    setTimeout(() => {
      props.onSetLoader(false);
      props.onSetData([])
      props.onSetData(dataStorage)
    }, 1500);
  }

  const handleCloseContentEditable = (e) => {
    if(edit && e.keyCode === 13) {
      setEdit(false)     
      
      const { dataStorage } = props;

      dataStorage.map(user => {
        return user.posts.map(post => {
          return post.comments.map(comments => {
            if (comments.id === id) comments.content = comentarRef.current.innerHTML
            return null;
          })
        })
      })

      props.onSetData(dataStorage)

    }
  }

  useEffect(() => {
    comentarRef.current.addEventListener('keydown', handleCloseContentEditable)

    comentarRef.current.addEventListener("paste", e => {
      e.preventDefault();
      const text = (e.originalEvent || e).clipboardData.getData('text/plain');
      window.document.execCommand('insertText', false, text);
    })
  })

  return (
    <div className='commentar-block'>
      <div className='commentar-img'>
        <img
          src='https://c7.uihere.com/icons/235/22/335/default-avatar-53614a6c1f9acc7e201729102976634e.png'
          alt='' title={author.name} width='40px' />
      </div>
      <div className='commentar-info' ref={parentRef}>
        <p contentEditable={edit} ref={comentarRef} className='commentar-content'>{content}</p>
        {
          author.id === userData.id ?
            <div>
              <span onClick={handleChangeContentEditable} ref={spanRef} className='edit-commentar guest-btns'>Редагувати</span>
              <span onClick={handleRemoveCommentar} className='remove-commentar guest-btns'>Видалити</span>
            </div>
            : null
        }
      </div>
    </div>
  )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Commentars);