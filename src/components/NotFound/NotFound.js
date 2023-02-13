import { Link } from "react-router-dom";
function NotFound() {
    return (
        <div className="NotFound">
            <h1 className="NotFound__title">404</h1>
            <h2 className="NotFound__text">Страница не найдена</h2>
            <Link to="/">
            <button className="NotFound__button-return">Назад</button>
            </Link> 
        </div>
    )
}

export default NotFound;