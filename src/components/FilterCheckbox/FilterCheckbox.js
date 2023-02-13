import React, { useState } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function FilterCheckbox(props) {
const [isActiveCheckbox, setIsActiveCheckbox ] = useState(false);
const { isResultSearchNull } = React.useContext(CurrentUserContext);

React.useEffect(() => {
    const statusCheckbox = JSON.parse(localStorage.getItem("checkbox"));
    setIsActiveCheckbox(statusCheckbox);
}, [isActiveCheckbox,  isResultSearchNull ])

    function handleClick() {
        if(isActiveCheckbox) {
            setIsActiveCheckbox(false);
            localStorage.setItem("checkbox", JSON.stringify(false));
        } else {
            setIsActiveCheckbox(true);
            localStorage.setItem("checkbox", JSON.stringify(true));
        }
        props.onActiveCheckbox();
}
 
    return (
        <>
        <div className="FilterCheckbox">
        <div className="FilterCheckbox__container">
        <button className={`FilterCheckbox__toggle-icon-container ${isActiveCheckbox ? " " : "FilterCheckbox__toggle-icon-container_inactive"}`} onClick={handleClick}>
            <div className="FilterCheckbox__toggle-icon-circle"></div>
        </button>
        <span className="FilterCheckbox__toggle-text">Короткометражки</span>
        </div>
        <span className={`${isResultSearchNull ? "preloader__error" : "preloader__error_hide"}`}>Ничего не найдено</span>
    </div>
    
    </>
    )

}

export default FilterCheckbox;