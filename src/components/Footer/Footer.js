function Footer() {
  return (
    <footer className="Footer">
      <h2 className="Footer__title">
        Учебный проект Яндекс.Практикум х BeatFilm.
      </h2>
      <div className="Footer__block">
        <p className="Footer__date">© 2020</p>
        <nav className="Footer__sponsors">
          <a className="Footer__sponsor" href="https://practicum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
          <a className="Footer__sponsor" href="https://github.com" target="_blank" rel="noreferrer">Github</a>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
