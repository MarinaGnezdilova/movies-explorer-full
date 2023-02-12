import React from "react";
import buttonDeleteFilm from "../../images/icon-button-delete-film.svg";
import iconSavedFilm from "../../images/icon-saved-film.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCard(props) {
  const [isMoviesSaved, setIsMoviesSaved] = React.useState(false);
  const [isMovieDelete, setIsMovieDelete] = React.useState(false);
  const [isMovieSavedInDB, setIsMovieSavedInDB] = React.useState(false);
  const statusCheckbox =  JSON.parse(localStorage.getItem("checkboxSavedMovies"));
  const isOwn = props.id === props.movie.owner;
  const { initialSavedMovies } = React.useContext(CurrentUserContext);
  /*const { isCheckboxActiveSavedMovies } = React.useContext(CurrentUserContext);*/
  const [isShortMovieActive, setIsShortMovieActive] = React.useState(false);
  const hours = () => { 
    if (props.duration >= 60) {
      return (Math.floor(props.duration/60)+'ч')
    } else {
      return ""
    }
    };

    const minutes = () => { 
      if (props.duration >= 60) {
        return (props.duration - Math.floor(props.duration/60)*60)+"м"
      } else {
        return props.duration+"м"
      }
      };
  
/*React.useEffect(() => {
  if(statusCheckbox === true) {
    if(props.movie.duration <= 40) {
      setIsShortMovieActive(false);
    } else {
      setIsShortMovieActive(true);
    }
  } else {
    setIsShortMovieActive(false);
  }
}, [isCheckboxActive])*/

React.useEffect(() => {
  if(statusCheckbox === true) {
    if(props.movie.duration <= 40) {
      setIsShortMovieActive(false);
    } else {
      setIsShortMovieActive(true);
    }
  } else {
    setIsShortMovieActive(false);
  }
}, [])

/*React.useEffect(() => {
  if(statusCheckbox === true) {
    if(props.movie.duration <= 40) {
      setIsShortMovieActive(false);
    } else {
      setIsShortMovieActive(true);
    }
  } else {
    setIsShortMovieActive(false);
  }
}, [isCheckboxActiveSavedMovies])*/

React.useEffect(() => {
  const initialMovies = JSON.parse(localStorage.getItem("savedMovies"));
  if(!initialMovies) {
    setIsMovieSavedInDB(false);
  } else {
    if(!initialMovies.find((item) => item.id == props.movie.id) === false) {
      setIsMovieSavedInDB(true);
    } else { 
      setIsMovieSavedInDB(false);
    }
    }     
    } 
, [])

  React.useEffect(() => {
    setIsMoviesSaved(true);
  }, []);

  function handleSaveClick() {
    setIsMovieSavedInDB(true);
    setIsMoviesSaved(true);
    props.onCardSave(props.movie);
  }

  function handleDeleteClick() {
    setIsMoviesSaved(false);
    props.onCardDelete(props.movie);
  }

  function handleDeleteSavesPage() {
    props.onDeleteMovie(props.movie);
    setIsMoviesSaved(false);
    setIsMovieDelete(true);
  }
  return (
    <div
      className={`${
        isMovieDelete || !isOwn || isShortMovieActive ? "MoviesCard_delete" : "MoviesCard"
      }`}
      
      
    >
      <a href={`${props.movie.trailerLink}`} target="_blank" rel="noreferrer">
      <img
        src={props.imageLink}
        alt="Баннер фильма"
        className="MoviesCard__card-image"
          />
      </a>
        
      <button
        className={`${
          isMovieSavedInDB
            ? "MoviesCard__button-saved-film"
            : "MoviesCard__button-saved-film_inactive"
        } ${
          isMoviesSaved
            ? "MoviesCard__button-saved-film"
            : "MoviesCard__button-saved-film_inactive"
        } ${props.classNameHideButtonSaved}`}
        onClick={handleDeleteClick}
      >
        
        <img
          src={iconSavedFilm}
          alt="Иконка сохраненного фильма"
          className="MoviesCard__button-image"
        />
        
      </button>
      <button
        className={` ${
          !isMoviesSaved || !isMovieSavedInDB
            ? "MoviesCard__button-save-film"
            : "MoviesCard__button-save-film_inactive"
        } ${props.classNameSavedPage}`}
        onClick={handleSaveClick}
      >
        Сохранить
      </button>
      <button
        className={`${
          props.hideButtonDelete
            ? "MoviesCard__button-delete-film-inactive"
            : "MoviesCard__button-delete-film-active"
        }`}
        onClick={handleDeleteSavesPage}
      >
        <img
          src={buttonDeleteFilm}
          alt="Иконка удаления фильма"
          className="MoviesCard__button-delete-film-image"
        />
      </button>
      <div className="MoviesCard__about-film">
        <h2 className="MoviesCard__film-name">{props.nameFilm}</h2>
        <div className="MoviesCard__duration">{`${hours()} ${minutes()}`}</div>
      </div>
    </div>
  );
}

export default MoviesCard;
