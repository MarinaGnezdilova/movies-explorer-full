import imagePromo from "../../images/landing-logo.svg";
function Promo() {
  return (
    <section className="Promo">
      <div className="Promo__block-info">
        <h1 className="Promo__title">
          Учебный проект студента факультета Веб-разработки.
        </h1>
        <p className="Promo__text">
          Листайте ниже, чтобы узнать больше про этот проект и его создателя.
        </p>
        <button className="Promo__button">Узнать больше</button>
      </div>
      <img
        src={imagePromo}
        className="Promo__image"
        alt="Изображение в баннере"
      />
    </section>
  );
}

export default Promo;
