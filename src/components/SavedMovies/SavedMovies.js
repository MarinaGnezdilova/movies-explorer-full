import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Header/Header";
import Navigation from "../Navigation/Navigation";
import accountButton from "../../images/account-logo.svg";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import Footer from "../Footer/Footer";
import SavedMoviesCardList from "../SavedMoviesCardList/SavedMoviesCardList";
import FilterCheckboxSavedMovies from "../FilterCheckBoxSavedMovies/FilterCheckboxSavedMovies";
import MoviesCard from "../MoviesCard/MoviesCard";
import SearchFormSavedFilm from "../SeachFormSavedFilm/SearchFormSavedFilm";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function SavedMovies(props) {
  const { initialSavedMovies } = React.useContext(CurrentUserContext);
  const { setSearchValueSavedFilm } = React.useContext(CurrentUserContext);
  const { setIsLoading } = React.useContext(CurrentUserContext);
  const { isLoading } = React.useContext(CurrentUserContext);
  const [renderMovies, setRenderMovies] = useState([]);
  const user = JSON.parse(localStorage.getItem("currentUser"));
  const { isCheckboxActiveSavedMovies } = React.useContext(CurrentUserContext);
  
  setIsLoading(false);

  React.useEffect(() => {
    setRenderMovies(initialSavedMovies);
  }, [initialSavedMovies, isCheckboxActiveSavedMovies])

  React.useEffect(() => {
    const savedFilms =  JSON.parse(localStorage.getItem("savedMovies"));
    savedFilms && setRenderMovies(savedFilms);
  }, [])

  React.useEffect(() => {
    const savedFilms =  JSON.parse(localStorage.getItem("savedMovies"));
    savedFilms && setRenderMovies(savedFilms);
  }, [initialSavedMovies])

  function onDeleteMovie(movie) {
  props.onDeleteMovie(movie);
}

function onActiveCheckbox () {
  props.onActiveCheckbox();
}

  return (
    <main className="SavedMovies">
      <header className="App__header-page-movies">
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
      <SearchFormSavedFilm />
      <FilterCheckboxSavedMovies 
      onActiveCheckbox={onActiveCheckbox}
            />
      <Preloader />
      <SavedMoviesCardList
       children={
       <>
        { ( renderMovies) && renderMovies.map((movie) => (
            <MoviesCard
            key={movie._id}
            movie={movie}
            id={user.data._id}
            imageLink={movie.image}
            nameFilm={movie.nameRU}
            duration={movie.duration}
            classNameSavedPage="MoviesCard__button-save-film_inactive"
            classNameHideButtonSaved="MoviesCard__button-saved-film_inactive"
            onDeleteMovie={onDeleteMovie}
          />

        )
        )
        }
        </>
       }

      />
      <Footer />
    </main>
  );
}

export default SavedMovies;
