import logoHeader from "../../images/logo-header.svg";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="Header">
      <Link to="/" className="Header__main-button">
        <img
          className="Header__button-image"
          src={logoHeader}
          alt="Логотип в хедере"
        />
      </Link>
    </div>
  );
}

export default Header;
