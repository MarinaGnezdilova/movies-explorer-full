import React from "react";
import { useNavigate } from "react-router-dom";
import Promo from "../Promo/Promo";
import Header from "../Header/Header";
import Techs from "../Techs/Techs";
import AboutMe from "../AboutMe/AboutMe";
import Portfolio from "../Portfolio/Portfolio";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import { Link } from "react-router-dom";
import accountButton from "../../images/account-logo.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function Main() {
  const navigate = useNavigate();
  const { setLoggedIn } = React.useContext(CurrentUserContext);
  const { loggedIn } = React.useContext(CurrentUserContext);
  function handleClickEnter() {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      setLoggedIn(true);
      navigate("/movies");
    } else {
      navigate("/signin");
    }
  }

  return (
    <main className="Main">
      <header
        className={
          !loggedIn ? `Main__container-main` : `Main__container-main_loggedIn`
        }
      >
        <Header />
              {loggedIn && (
                <>
                        <div className="Navigation__wrapper">
                          <input type="checkbox" id="check-menu" />
                          <label
                            className="Navigation__label"
                            for="check-menu"
                          ></label>
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
                            <Link to="/profile" className="Navigation__link">
                              <button className="Navigation__button-header Navigation__button-header_opening-menu">
                                <div className="Navigation__account-button-text">
                                  Аккаунт
                                </div>
                                <div className="Navigation__button-circle">
                                  <img
                                    src={accountButton}
                                    alt="Логотип на кнопке"
                                  />
                                </div>
                              </button>
                            </Link>
                          </div>
                        </div>
                        <div className="Navigation__menu">
                          <div className="Navigation__buttons-about-films Navigation__buttons-about-films_main">
                            <Link to="/movies" className="Navigation__button">
                              <button className="Navigation__button-header Navigation__button-header_main">
                                Фильмы
                              </button>
                            </Link>
                            <Link
                              to="/saved-movies"
                              className="Navigation__button"
                            >
                              <button className="Navigation__button-header Navigation__button-header_main">
                                Сохранённые фильмы
                              </button>
                            </Link>
                          </div>
                          <Link to="/profile" className="Navigation__link">
                            <button className="Navigation__button-header Navigation__button-header_main">
                              <div className="Navigation__account-button-text">
                                Аккаунт
                              </div>
                              <div className="Navigation__button-circle Navigation__button-circle_main">
                                <img
                                  src={accountButton}
                                  alt="Логотип на кнопке"
                                />
                              </div>
                            </button>
                          </Link>
                        </div>   
              </>
              )}
              <div
                className={
                  !loggedIn ? `Navigation__main` : `Navigation__main_hidden`
                }
              >
                <Link to="/signup">
                  <button className="Navigation__button-register ">
                    Регистарция
                  </button>
                </Link>

                <button
                  onClick={handleClickEnter}
                  className="Navigation__button-enter"
                >
                  Войти
                </button>
              </div>
      </header>

      <Promo />
      <AboutProject
        children={
          <>
            <section className="BlockTitle">
              <h2 className="BlockTitle__title">О проекте</h2>
            </section>
          </>
        }
      />
      <Techs
        children={
          <div className="Main__Techs-blockTitle">
            <h2 className="Main__Techs-blockTitle-title">Технологии</h2>
          </div>
        }
      />
      <AboutMe
        children={
          <>
            <section className="BlockTitle">
              <h2 className="BlockTitle__title">Студент</h2>
            </section>
          </>
        }
      />
      <Portfolio />
      <Footer />
    </main>
  );
}

export default Main;
