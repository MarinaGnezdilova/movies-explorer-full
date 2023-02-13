import React, { useState } from "react";
import iconSearch from "../../images/icon-search.svg";
import iconArrow from "../../images/icon_arrow.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function SearchFormSavedFilm(props) {
  const { setSearchValueSavedFilm } = React.useContext(CurrentUserContext);
  const { setInitialSavedMovies } = React.useContext(CurrentUserContext);
  const { setIsResultSearchNullSM } = React.useContext(CurrentUserContext);
  
  
  const [value, setValue] = React.useState("");
  const [isValueValid, setIsValueValid] = useState(true);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value === "") {
      setIsValueValid(false);
      const initiaMovies = JSON.parse(localStorage.getItem("savedMovies"));
      setInitialSavedMovies(initiaMovies);
      setIsResultSearchNullSM(false);
      setSearchValueSavedFilm("");
    } else {
      setSearchValueSavedFilm(value);
      localStorage.setItem("querySaved", JSON.stringify(value));
      setIsValueValid(true);
    }
  }

  React.useEffect(() => {
   setIsResultSearchNullSM(false);
   setSearchValueSavedFilm("");
  }, []);

  return (
    <>
      <form className="SearchFormSavedFilm">
        <div className="SearchFormSavedFilm__icon-search">
          <img
            alt="Иконка поиска"
            src={iconSearch}
            className="SearchFormSavedFilm__icon-search-image"
          />
        </div>
        <input
          className="SearchFormSavedFilm__input"
          placeholder="Фильм"
          required
          value={value}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="SearchFormSavedFilm__button"
          onClick={handleSubmit}
        >
          <img
            src={iconArrow}
            alt="Кнопка в поисковой строке"
            className="SearchFormSavedFilm__button-image"
          />
        </button>
      </form>
      <span
        className={`${
          isValueValid ? "SearchForm__error_hide" : "SearchForm__error"
        }`}
      >
        Нужно ввести ключевое слово
      </span>
    </>
  );
}

export default SearchFormSavedFilm;
