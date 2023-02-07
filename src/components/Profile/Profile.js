import React, { useState}  from "react";
import { useNavigate } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import { Link } from "react-router-dom";
import accountButton from "../../images/account-logo.svg";
import { mainApi } from "../../utils/MainApi";
import { Formik } from "formik";
import * as yup from "yup";

function Profile(props) {
  const regexName = /^[a-zа-я\ \-]+$/gi; 

  const {currentUser} = React.useContext(CurrentUserContext);
  const {setLoggedIn} = React.useContext(CurrentUserContext);
  const {setCurrentUser} = React.useContext(CurrentUserContext);
  const [ isEditProfileSuccess, setIsEditProfileSuccess] = useState('');
  const [ isEditProfileUnsuccess, setIsEditProfileUnsuccess] = useState('');
  const navigate = useNavigate();

function signOut() {
  localStorage.removeItem("jwt");
  localStorage.removeItem("query");
  localStorage.removeItem("savedMovies");
  localStorage.removeItem("filtredMovies");
  localStorage.removeItem("movies");
  localStorage.removeItem("querySaved");
  localStorage.removeItem("checkbox");
  navigate("/");
  setLoggedIn(false);
}
 
const validationsSchemaProfile = yup.object().shape({
  email: yup
    .string()
    .email("Поле должно быть email")
    .notOneOf([currentUser.data.email], "Новая и старая почта не должны совпадать")
    ,
  name: yup.string()
    .matches(regexName, "Используйте только русские или латинские буквы, пробел или тире")
    .notOneOf([currentUser.data.name], "Новое и старое имя не должны совпадать")
});

React.useEffect(() => {
  setIsEditProfileSuccess('');
  setIsEditProfileUnsuccess('');
}, [])

  return (
    <>
    <header className="App__profile">
      <Header />
      <Navigation
          children={
            <>
              <div className="Navigation__wrapper">
                <input type="checkbox" id="check-menu" />
                <label for="check-menu" className="Navigation__label"></label>
                <div className="Navigation__burger-line Navigation__first"></div>
                <div className="Navigation__burger-line Navigation__second"></div>
                <div className="Navigation__burger-line Navigation__third"></div>
                <div className="Navigation__burger-line Navigation__fourth"></div>
                <div className="Navigation__menu1">
                  <div className="Navigation__menu-opening-buttons">
                    <Link to="/" className="">
                      <button className="Navigation__menu-opening-button">
                        Главная
                      </button>
                    </Link>
                    <Link to="/movies" className="">
                      <button className="Navigation__menu-opening-button">
                        Фильмы
                      </button>
                    </Link>
                    <Link to="/saved-movies" className="">
                      <button className="Navigation__menu-opening-button">
                        Сохранённые фильмы
                      </button>
                    </Link>
                  </div>
                  <Link to="/profile" className="Navigation__button">
                    <button className="Navigation__button-header Navigation__button-header_opening-menu">
                      <div className="Navigation__account-button-text">
                        Аккаунт
                      </div>
                      <div className="Navigation__button-circle">
                        <img src={accountButton} alt="Логотип на кнопке" />
                      </div>
                    </button>
                  </Link>
                </div>
              </div>
              <div className="Navigation__menu">
                <div className="Navigation__buttons-about-films">
                  <Link to="/movies" className="Navigation__button">
                    <button className="Navigation__button-header">
                      Фильмы
                    </button>
                  </Link>
                  <Link to="/saved-movies" className="Navigation__button">
                    <button className="Navigation__button-header">
                      Сохранённые фильмы
                    </button>
                  </Link>
                </div>
                <Link to="/profile" className="Navigation__link">
                  <button className="Navigation__button-header">
                    <div className="Navigation__account-button-text">
                      Аккаунт
                    </div>
                    <div className="Navigation__button-circle">
                      <img src={accountButton} alt="Логотип на кнопке" />
                    </div>
                  </button>
                </Link>
              </div>
            </>
          }
        />
      </header>
       <form className="Profile">
        <h2 className="Profile__title">Привет, {currentUser.data.name}!</h2>
        <Formik
        initialValues={{
                  name: "",
                  email: ""
                }}
                 validateOnBlur
                 onSubmit = {(values) => {
                  /*const { name, email } = values;*/
                  const name = values.name?values.name:currentUser.data.name;
                  const email = values.email?values.email:currentUser.data.email;
                  mainApi.editUserInfo( name, email)
                  .then((res) => {
                    setCurrentUser(res);
                    setIsEditProfileSuccess('Данные изменены');
                  })
                  .catch((e) => {
                    setIsEditProfileUnsuccess('Ошибка при редактировании');
                  });
                }}
                 validationSchema={validationsSchemaProfile}
                 >
                  { ({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                    handleSubmit,
                    dirty
                  }) => (
                    <>
                    <div className="Profile__block-input">
                    <div className="Profile__input">
                      <label className="Profile__label-input">Имя</label>
                      <input 
                      className="Profile__input-name"
                      placeholder={currentUser.data.name}
                      value={values.name}
                      name={`name`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      />
                      </div>
                      {touched.name && errors.name && (
                              <span className="Profile__label-error">
                                {errors.name}
                              </span>
                      )}
                    </div>
                    <div className="Profile__block-input">
                    <div className="Profile__input">
                      <label className="Profile__label-input">E-mail</label>
                      <input 
                      className="Profile__input-email"
                      placeholder={currentUser.data.email}
                      value={values.email}
                      name={`email`}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      />
                      </div>
                      {touched.email && errors.email && (
                              <span className="Profile__label-error">
                                {errors.email}
                              </span>
                      )}
                    </div>
                        <span className="Profile__message-edit-result">{isEditProfileSuccess}{isEditProfileUnsuccess}</span>
                       <button 
                       type="submit"
                       className="Profile__button Profile__button-edit"
                       disabled={!isValid || !dirty}
                       onClick={handleSubmit}
                        >Редактировать</button>
                       <button className="Profile__button Profile__button-exit" onClick={signOut}>Выйти из аккаунта</button>      
                       </>          

                  )

                  }
        </Formik>
        </form>
   </>
  )}

export default Profile;
