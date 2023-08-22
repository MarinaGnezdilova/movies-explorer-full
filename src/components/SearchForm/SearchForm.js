import React, { useState } from "react";
import iconSearch from "../../images/icon-search.svg";
import iconArrow from "../../images/icon_arrow.svg";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function SearchForm(props) {
  const { setSearchValue } = React.useContext(CurrentUserContext);
  const { filteredMovies } = React.useContext(CurrentUserContext);
  const { setIsResultSearchNull } = React.useContext(CurrentUserContext);
  const [value, setValue] = React.useState('');
  const [ isValueValid, setIsValueValid] = useState(true);

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (value === "") {
      setIsValueValid(false);
      setIsResultSearchNull(false);
    } else {
      setSearchValue(value);
      props.firstRender();
      localStorage.setItem("query", JSON.stringify(value));
      setIsValueValid(true);
      
    }
  }


  React.useEffect(() => {
    const query = JSON.parse(localStorage.getItem("query"));
    setValue(query);
  },[]);

  
  return (
    <>
      <form className="SearchForm">
        <div className="SearchForm__icon-search">
          <img
            alt="Иконка поиска"
            src={iconSearch}
            className="SearchForm__icon-search-image"
          />
        </div>
        <input 
          className="SearchForm__input" 
          placeholder="Фильм" 
          required
          value={value} onChange={handleChange}
        />
        <button type="submit" /*disabled={isValueValid}*/ className="SearchForm__button" onClick={handleSubmit}>
          <img
            src={iconArrow}
            alt="Кнопка в поисковой строке"
            className="SearchForm__button-image"
          />
        </button>
      </form>
      <span className={`${isValueValid ? "SearchForm__error_hide" : "SearchForm__error"}`}>Нужно ввести ключевое слово</span>
    </>
  );
}

export default SearchForm;
