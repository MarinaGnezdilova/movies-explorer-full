import React from 'react'
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function Preloader(props) { 
    const { isLoading } = React.useContext(CurrentUserContext);
    return (
        <>
        <div className={`${isLoading ? "preloader_active" : "preloader_inactive"}`}>
            <div className="preloader__container">
                <span className="preloader__round"></span>
            </div>
        </div>
        </>
    )
};

export default Preloader
