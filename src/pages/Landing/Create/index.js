import React, { useState, useRef, useEffect } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import CustomInput from "../../../components/CustomInput";

import { onSetData, onSetLoader, onWriteuser } from "../../../actions";

import "./style.scss";

function Create(props) {
  const [titleError, setTitleError] = useState("");
  const [title, setTitle] = useState("");
  const [imgError, setImgError] = useState("");
  const [imageSrc, setImgSrc] = useState("");
  const [bodyError, setBodyError] = useState("");

  const titleRef = useRef(null);
  const imgRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (props.location.data) {
      const newProps = props.location.data.props;
      const { title, img, content } = newProps;
      setTitle(title);
      setImgSrc(img);
      bodyRef.current.innerText = content;
    }

    bodyRef.current.addEventListener("paste", e => {
      e.preventDefault();
      const text = (e.originalEvent || e).clipboardData.getData("text/plain");
      window.document.execCommand("insertText", false, text);
    });
  }, [props.location.data]);

  const handleCreatePost = () => {
    if (handleValidation()) {
      const { userData, dataStorage } = props;
      const post = {
        id: parseInt(+new Date()),
        author: {
          id: props.userData.id,
          name: props.userData.name,
          mail: props.userData.mail
        },
        title: titleRef.current.value.trim(),
        img: imgRef.current.value.trim(),
        content: bodyRef.current.innerText,
        comments: []
      };

      userData.posts.push(post);

      for (let i = 0; i < dataStorage.length; i++) {
        if (dataStorage[i].id === userData.id) {
          dataStorage[i] = userData;
        }
      }

      props.onSetLoader(true);

      setTimeout(() => {
        props.onWriteuser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        props.onSetData(dataStorage);
        props.onSetLoader(false);
        handleClearData();
        alert("Публікацію успішно створено");
      }, 1500);
    }
  };

  const handleClearData = () => {
    titleRef.current.value = "";
    imgRef.current.value = "";
    bodyRef.current.innerText = "";
  }

  const handleEditPost = () => {
    if (handleValidation() && props.location.data) {
      const currentPost = props.location.data.props;
      const { posts } = props.userData;
      const { dataStorage, userData } = props;
      const post = {
        id: currentPost.id,
        author: {
          id: props.userData.id,
          name: props.userData.name,
          mail: props.userData.mail
        },
        title: titleRef.current.value.trim(),
        img: imgRef.current.value.trim(),
        content: bodyRef.current.innerText,
        comments: currentPost.comments
      };
      for (let i = 0; i < posts.length; i++) {
        if (posts[i].id === post.id) {
          posts[i] = post;
        }
      }

      for (let i = 0; i < dataStorage.length; i++) {
        if (dataStorage[i].id === userData.id) {
          dataStorage[i] = userData;
        }
      }

      props.onSetLoader(true);

      setTimeout(() => {
        props.onWriteuser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        props.onSetData(dataStorage);
        props.onSetLoader(false);
        handleClearData();
        alert("Публікацію успішно збережено");
      }, 1500);


    }
  }

  console.log("props", props);

  const handleValidation = () => {
    const titleValid = titleValidation();
    const imgValid = imageValidation();
    const bodyValid = bodyValidation();

    return titleValid && imgValid && bodyValid;
  };

  const titleValidation = () => {
    setTitleError("");
    if (titleRef.current.value.trim().length >= 10) {
      return true;
    } else {
      setTitleError("мінімальна довжина заголовка 10 символів");
      return false;
    }
  };

  const imageValidation = () => {
    setImgError("");
    if (imgRef.current.value.trim().length > 20) {
      return true;
    } else {
      setImgError("Вставте посилання на картинку");
      return false;
    }
  };

  const bodyValidation = () => {
    setBodyError("");
    if (bodyRef.current.innerText.trim().length > 5) {
      return true;
    } else {
      setBodyError("Додайте тіло публікації");
      return false;
    }
  };

  return (
    <section className="create-post">
      <CustomInput
        heading="Заголовок"
        type="text"
        placeholder="введіть назву публікації"
        value={title}
        refs={titleRef}
        error={titleError}
      // onChange={handleBlur}
      />

      <CustomInput
        heading="Зображення"
        type="text"
        placeholder="вставте посилання на картинку"
        refs={imgRef}
        value={imageSrc}
        error={imgError}
      // onChange={handleBlur}
      />

      <h3 className="heading">Тіло публікації</h3>
      <div contentEditable={true} className="area-creating" ref={bodyRef}></div>
      <p className="form-error">{bodyError}</p>

      {
        props.location.data ?
          <div className="guest-btns" onClick={handleEditPost}>
            Редагувати
        </div>
          :
          <div className="guest-btns" onClick={handleCreatePost}>
            Зберегти
        </div>
      }
    </section>
  );
}

const mapStateToProps = state => {
  return {
    dataStorage: state.dataStorage,
    userData: state.currentUser
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onSetData,
      onSetLoader,
      onWriteuser
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Create);
