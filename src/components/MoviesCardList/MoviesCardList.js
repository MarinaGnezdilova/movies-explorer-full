import React from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function MoviesCardList(props) {
  const { filteredMovies } = React.useContext(CurrentUserContext);
  const isButtonElseHidden = filteredMovies.length < 4;
  return (
    <section className="MoviesCardList">
      <div className="MoviesCardList__film">{props.children}</div>
      <div>
        <button  className={
          (isButtonElseHidden || props.isButtonElseHidden ? `MoviesCardList__button-else_hidden` : `MoviesCardList__button-else`)
          
        }
        onClick={props.nextRender}
      >Еще</button>
      </div>
    </section>
  );
}

export default MoviesCardList;
