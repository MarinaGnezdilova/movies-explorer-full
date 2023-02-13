import fotoStudent from "../../images/student_foto.png";
function AboutMe(props) {
  return (
    <>
      {props.children}
      <section className="AboutMe">
        <div className="AboutMe__block-text">
          <h2 className="AboutMe__name">Виталий</h2>
          <h3 className="AboutMe__shot-about">Фронтенд-разработчик, 30 лет</h3>
          <p className="AboutMe__long-about">
            Я родился и живу в Саратове, закончил факультет экономики СГУ. У
            меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
            бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
            Контур». После того, как прошёл курс по веб-разработке, начал
            заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a
            className="AboutMe__link"
            href="https://github.com/MarinaGnezdilova"
          >
            Github
          </a>
        </div>
        <img
          src={fotoStudent}
          alt="Фотография студента"
          className="AboutMe__foto"
        />
      </section>
    </>
  );
}

export default AboutMe;
