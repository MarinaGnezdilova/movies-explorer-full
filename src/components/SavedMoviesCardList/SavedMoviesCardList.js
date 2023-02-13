
function SavedMoviesCardList(props) {
    return (
      <section className="MoviesCardList">
         <div className="MoviesCardList__film">
        {props.children}
        </div>
      </section>
    );
  }
  
  export default SavedMoviesCardList;