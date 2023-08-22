import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function FilterCheckboxSavedMovies(props) {
const [isActiveCheckbox, setIsActiveCheckbox ] = useState(false);
const { isResultSearchNullSM } = React.useContext(CurrentUserContext);

React.useEffect(() => {
    const statusCheckbox = JSON.parse(localStorage.getItem("checkboxSavedMovies"));
    setIsActiveCheckbox(statusCheckbox);
}, [isActiveCheckbox/*, isResultSearchNullSM*/])

    function handleClick() {
        if(isActiveCheckbox) {
            setIsActiveCheckbox(false);
            localStorage.setItem("checkboxSavedMovies", JSON.stringify(false));
        } else {
            setIsActiveCheckbox(true);
            localStorage.setItem("checkboxSavedMovies", JSON.stringify(true));
        }
        props.onActiveCheckbox();
}
 
    return (
        <>
        <div className="FilterCheckboxSavedMovies">
        <div className="FilterCheckboxSavedMovies__container">
        <button className={`FilterCheckboxSavedMovies__toggle-icon-container ${isActiveCheckbox ? " " : "FilterCheckboxSavedMovies__toggle-icon-container_inactive"}`} onClick={handleClick}>
            <div className="FilterCheckboxSavedMovies__toggle-icon-circle"></div>
        </button>
        <span className="FilterCheckboxSavedMovies__toggle-text">Короткометражки</span>
        </div>
        <span className={`${isResultSearchNullSM ? "preloader__error" : "preloader__error_hide"}`}>Ничего не найдено</span>
    </div>
    
    </>
    )

}

export default FilterCheckboxSavedMovies;