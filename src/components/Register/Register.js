import Header from "../Header/Header";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
function Register(props) {
  const navigate = useNavigate();
  const {setLoggedIn} = React.useContext(CurrentUserContext);
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
        <main className="Register">
        <div className="Register__header">
          <div className="Register__button-top">
            <Header />
          </div>
          <h2 className="Register__title">{props.title}</h2>
          <form className="Register__form" onSubmit={props.submit} >
            <div className="Register__inputs">{props.children}</div>
              <button type="submit" className="Register__button">{props.buttonText}</button>
            <div className="Register__block-under-button">
              <p className="Register__text">{props.textUderButton}</p>
              <button onClick={handleClickEnter} className="Register__text-link-under-button">
                {props.textLinkUnderButton}
              </button>
            </div>
          </form>
        </div>
      </main>
    );
  }
  
  export default Register;