function Portfolio() {
  return (
    <section className="Portfolio">
      <h2 className="Portfolio__title">Портфолио</h2>
      <ul className="Portfolio__list">
        <li className="Portfolio__link">
          <a href="site.ru" className="Portfolio__link-text">Статичный сайт</a>
          <a href="site.ru" className="Portfolio__link-icon">↗</a>
        </li>
        <li className="Portfolio__link">
          <a href="site.ru" className="Portfolio__link-text">Адаптивный сайт</a>
          <a href="site.ru" className="Portfolio__link-icon">↗</a>
        </li>
        <li className="Portfolio__link">
          <a href="site.ru" className="Portfolio__link-text">Одностраничное приложение</a>
          <a href="site.ru" className="Portfolio__link-icon">↗</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
