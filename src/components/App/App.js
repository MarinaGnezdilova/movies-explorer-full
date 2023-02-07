import React, { useCallback, useEffect, useState } from "react";
import Main from "../Main/Main";
import { Route, Routes, useNavigate } from "react-router-dom";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Profile from "../Profile/Profile";
import { api } from "../../utils/MoviesApi.js";
import { mainApi } from "../../utils/MainApi.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { Formik } from "formik";
import Header from "../Header/Header";
import * as yup from "yup";
import { Link } from "react-router-dom";
import PrivateRoute from "../../utils/PrivateRoute";
import NotFound from "../NotFound/NotFound";

function App() {
  const regexName = /^[a-zа-я\ \-]+$/gi;

  const [currentUser, setCurrentUser] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [initialMovies, setInitialMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [initialSavedMovies, setInitialSavedMovies] = useState([]);
  const [searchValueSavedFilm, setSearchValueSavedFilm] = useState("");
  const [isRegisterUnsuccessful, setIsRegisterUnsuccessful] =
    React.useState(false);
  const [isCheckboxActive, setIsCheckboxActive] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [isResultSearchNull, setIsResultSearchNull] = React.useState(true);

  const navigate = useNavigate();

  //получаем фильмы из внешнего апи, получаем фильмы из localStorage.filtredMovies
  const getFilms = useCallback(
    () =>
      api
        .getFilms()
        .then((res) => {
          const localFilteredMovies = JSON.parse(
            localStorage.getItem("filtredMovies")
          );
          setInitialMovies(res);
          setIsLoading(false);

          if (!localFilteredMovies) {
            setFilteredMovies([]);
          }
        })
        .catch((e) => {
          alert(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        }),
    []
  );

  React.useEffect(() => {
    setIsLoading(true);
    getFilms();
    const localFilteredMovies = JSON.parse(
      localStorage.getItem("filtredMovies")
    );
    const localQuery = JSON.parse(localStorage.getItem("query"));
    const statusCheckbox = JSON.parse(localStorage.getItem("checkbox"));
    if (!localFilteredMovies) {
      setFilteredMovies([]);
    } else {
      const filteredShortMovie = localFilteredMovies.filter((el) => {
        return el.duration <= 40;
      });
      if (!statusCheckbox) {
        localFilteredMovies && setFilteredMovies(localFilteredMovies);
      } else {
        setFilteredMovies(filteredShortMovie);
      }
    }
    
    localQuery && setSearchValue(localQuery);
  }, []);

  const getSavedfilms = useCallback(
    () =>
      mainApi
        .getMovies()
        .then((res) => {
          const user = JSON.parse(localStorage.getItem("currentUser"));
          const filtred = res.data.filter((el) => {
            return el.owner === user.data._id;
          });
          localStorage.setItem("savedMovies", JSON.stringify(filtred));
          const statusCheckbox = JSON.parse(localStorage.getItem("checkbox"));
          const filteredShortMovie = filtred.filter((el) => {
            return el.duration <= 40;
          });
          if (!statusCheckbox) {
            setInitialSavedMovies(filtred);
          } else {
            setInitialSavedMovies(filteredShortMovie);
          }
        })
        .catch((e) => {
          alert(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        }),
    []
  );

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      getSavedfilms();
    }
  }, []);

  //вызывается при валидной форме регистриции
  function onRegisterCompleted(email, password) {
    mainApi.login(email, password).then((res) => {
      const token = res.token;
      localStorage.setItem("jwt", token);
      onLoginCompleted();
    });
  }

  //вызывается при валидной форме авторизации
  function onLoginCompleted() {
    navigate("/movies");
    setLoggedIn(true);
  }

  React.useEffect(() => {
    setIsResultSearchNull(false);
    if (searchValue.length !== 0 && !initialMovies === false) {
      const filtered = initialMovies.filter((el) => {
        return el.nameRU.toLowerCase().includes(searchValue.toLowerCase());
      });
      localStorage.setItem("filtredMovies", JSON.stringify(filtered));
      const filteredShortMovie = filtered.filter((el) => {
        return el.duration <= 40;
      });
      const statusCheckbox = JSON.parse(localStorage.getItem("checkbox"));
      if (!statusCheckbox) {
        setFilteredMovies(filtered);
      } else {
        setFilteredMovies(filteredShortMovie);
      }
      if (filtered.length === 0) {
        setIsResultSearchNull(true);
      }
    }
  }, [searchValue, initialMovies, isCheckboxActive]);

  React.useEffect(() => {
    setIsResultSearchNull(false);
    const initiaMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const filtered =
      initiaMovies &&
      initiaMovies.filter((el) => {
        return el.nameRU
          .toLowerCase()
          .includes(searchValueSavedFilm.toLowerCase());
      });
      if (!filtered) {
        setInitialSavedMovies([]);
      } else {
        const filteredShortMovie = filtered.filter((el) => {
          return el.duration <= 40;
        });
        const statusCheckbox = JSON.parse(localStorage.getItem("checkbox"));
        if (!statusCheckbox) {
          setInitialSavedMovies(filtered);
        } else {
          setInitialSavedMovies(filteredShortMovie);
        }
        if (filtered.length === 0) {
          setIsResultSearchNull(true);
        }
      }
    setIsLoading(true);
  }, [searchValueSavedFilm, isCheckboxActive]);

  const auth = (jwt) => {
    return mainApi
      .getUserInfo(jwt)
      .then((res) => {
        setLoggedIn(true);
      })
      .catch((e) => {
        alert(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  };

  React.useEffect(() => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth(jwt);
    }
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      mainApi
        .getUserInfo()
        .then((res) => {
          setCurrentUser(res);
          localStorage.setItem("currentUser", JSON.stringify(res));
        })
        .catch((e) => {
          alert(
            "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
          );
        });
    }
  }, [loggedIn]);

  //схема валидации формы авторизации
  const validationsSchemaLogin = yup.object().shape({
    email: yup
      .string()
      .email("Поле должно быть email")
      .required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
  });

  //схема валидации формы регистации
  const validationsSchemaRegister = yup.object().shape({
    email: yup
      .string()
      .email("Поле должно быть email")
      .required("Обязательное поле"),
    password: yup.string().required("Обязательное поле"),
    name: yup
      .string()
      .required("Обязательное поле")
      .matches(
        regexName,
        "Используйте только русские или латинские буквы, пробел или тире"
      ),
  });

  //сохранение фильма
  function handleSaveMovie(movie) {
    mainApi
      .saveMovie(movie)
      .then((res) => {
        if (!initialSavedMovies) {
          setInitialSavedMovies(res.data);
        } else {
          setInitialSavedMovies([...initialSavedMovies, res.data]);
        }
      })
      .then(() => {
        getSavedfilms();
      })
      .catch((e) => {
        alert(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }

  //удаление фильма из сохраненных
  function hadleDeleteMovie(movie) {
    mainApi
      .deleteMovie(movie.id)
      .then(() => {
        getSavedfilms();
      })
      .catch((e) => {
        alert(
          "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
        );
      });
  }

  //вызывается при смене положения чекбокса короткометрижки
  function handleActiveCheckbox() {
    if (isCheckboxActive) {
      setIsCheckboxActive(false);
    } else {
      setIsCheckboxActive(true);
    }
  }

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
        setLoggedIn,
        setCurrentUser,
        loggedIn,
        setSearchValue,
        filteredMovies,
        initialSavedMovies,
        setSearchValueSavedFilm,
        setInitialSavedMovies,
        isCheckboxActive,
        isLoading,
        setIsLoading,
        isResultSearchNull,
        setIsResultSearchNull,
      }}
    >
      <page className="App">
        <Routes>
          <Route element={<PrivateRoute />}>
            <Route
              path="/movies"
              element={
                <Movies
                  onCardSave={handleSaveMovie}
                  onCardDelete={hadleDeleteMovie}
                  onActiveCheckbox={handleActiveCheckbox}
                  exact
                />
              }
            />
            <Route
              path="/saved-movies"
              element={
                <SavedMovies
                  onDeleteMovie={hadleDeleteMovie}
                  onActiveCheckbox={handleActiveCheckbox}
                />
              }
            />
            <Route exact path="/profile" element={<Profile />}></Route>
          </Route>
          <Route exact path="/" element={<Main />} />
          <Route
            path="/signup"
            element={
              <div>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    password: "",
                  }}
                  validateOnBlur
                  onSubmit={(values) => {
                    mainApi
                      .register(values.name, values.email, values.password)
                      .then((res) => {
                        setIsRegisterUnsuccessful(false);
                        onRegisterCompleted(values.email, values.password);
                      })
                      .catch((e) => {
                        setIsRegisterUnsuccessful(true);
                      });
                  }}
                  validationSchema={validationsSchemaRegister}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                    handleSubmit,
                    dirty,
                  }) => (
                    <main className="Register">
                      <div className="Register__header">
                        <div className="Register__button-top">
                          <Header />
                        </div>
                        <h2 className="Register__title">Добро пожаловать!</h2>
                        <div className="Register__form">
                          <div className="Register__inputs">
                            <label className="Register__label-form">Имя</label>
                            <input
                              type={`text`}
                              name={`name`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              className="Register__input"
                            />
                            {touched.name && errors.name && (
                              <span className={`FormEnter__label-error`}>
                                {errors.name}
                              </span>
                            )}
                            <label className="Register__label-form">
                              Email
                            </label>
                            <input
                              type={`text`}
                              name={`email`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              className="Register__input"
                            />
                            {touched.email && errors.email && (
                              <span className={`FormEnter__label-error`}>
                                {errors.email}
                              </span>
                            )}
                            <label className={`Register__label-form`}>
                              Пароль
                            </label>
                            <input
                              type={`password`}
                              name={`password`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className="Register__input"
                            />
                            {touched.password && errors.password && (
                              <span className={`FormEnter__label-error`}>
                                {errors.password}
                              </span>
                            )}
                            <span
                              className={`${
                                isRegisterUnsuccessful
                                  ? "Register__error-message_active"
                                  : "Register__error-message"
                              }`}
                            >
                              Ошибка регистации
                            </span>
                            <button
                              disabled={!isValid || !dirty}
                              onClick={handleSubmit}
                              type="submit"
                              className="Register__button"
                            >
                              Зарегистрироваться
                            </button>

                            <div className="Register__block-under-button">
                              <p className="Register__text">
                                Уже зарегистрированы?
                              </p>
                              <button
                                onClick={onRegisterCompleted}
                                className="Register__text-link-under-button"
                              >
                                Войти
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </main>
                  )}
                </Formik>
              </div>
            }
          ></Route>
          <Route
            path="/signin"
            element={
              <div>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  validateOnBlur
                  onSubmit={(values) => {
                    mainApi
                      .login(values.email, values.password)
                      .then((res) => {
                        const token = res.token;
                        localStorage.setItem("jwt", token);
                      })
                      .then(() => {
                        onLoginCompleted();
                      })
                      .catch((e) => {
                        alert("Неверный логин или пароль");
                      });
                  }}
                  validationSchema={validationsSchemaLogin}
                >
                  {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    isValid,
                    handleSubmit,
                    dirty,
                  }) => (
                    <main className="FormEnter">
                      <div className="FormEnter__header">
                        <div className="FormEnter__button-top">
                          <Header />
                        </div>
                        <h2 className="FormEnter__title">Рады видеть!</h2>
                        <div className="FormEnter__form">
                          <div className="FormEnter__inputs">
                            <label className={`FormEnter__label-form`}>
                              E-mail
                            </label>
                            <input
                              type={`text`}
                              name={`email`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.name}
                              className="FormEnter__input"
                            />
                            {touched.email && errors.email && (
                              <span className={`FormEnter__label-error`}>
                                {errors.email}
                              </span>
                            )}
                            <label className={`FormEnter__label-form`}>
                              Пароль
                            </label>
                            <input
                              type={`password`}
                              name={`password`}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                              className="FormEnter__input"
                            />
                            {touched.password && errors.password && (
                              <span className={`FormEnter__label-error`}>
                                {errors.password}
                              </span>
                            )}
                          </div>
                          <button
                            disabled={!isValid || !dirty}
                            onClick={handleSubmit}
                            type="submit"
                            className="FormEnter__button"
                          >
                            Войти
                          </button>
                          <div className="FormEnter__block-under-button">
                            <p className="FormEnter__text">
                              Еще не зарегистрированы?
                            </p>
                            <Link
                              to="/signup"
                              className="FormEnter__text-link-under-button"
                            >
                              Регистрация
                            </Link>
                          </div>
                        </div>
                      </div>
                    </main>
                  )}
                </Formik>
              </div>
            }
          ></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </page>
    </CurrentUserContext.Provider>
  );
}

export default App;
