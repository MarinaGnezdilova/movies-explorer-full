function Techs(props) {
  return (
    <>
      <section className="Main__techs-block-title"> {props.children}</section>
      <section className="Techs">
        <h2 className="Techs__title">7 технологий</h2>
        <p className="Techs__text">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>
        <ul className="Techs__technologies">
          <li className="Techs__technologies-element">HTML</li>
          <li className="Techs__technologies-element">CSS</li>
          <li className="Techs__technologies-element">JS</li>
          <li className="Techs__technologies-element">React</li>
          <li className="Techs__technologies-element">Git</li>
          <li className="Techs__technologies-element">Express.js</li>
          <li className="Techs__technologies-element">mongoDB</li>
        </ul>
      </section>
    </>
  );
}

export default Techs;
