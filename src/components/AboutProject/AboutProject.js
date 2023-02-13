function AboutProject(props) {
  return (
    <>
      {props.children}
      <section className="AboutProject">
        <div className="AboutProject__block">
          <div className="AboutProject__block-column">
            <h2 className="AboutProject__title">
              Дипломный проект включал 5 этапов
            </h2>
            <p className="AboutProject__text">
              Составление плана, работу над бэкендом, вёрстку, добавление
              функциональности и финальные доработки.
            </p>
          </div>
          <div className="AboutProject__block-column">
            <h2 className="AboutProject__title">
              На выполнение диплома ушло 5 недель
            </h2>
            <p className="AboutProject__text">
              У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
              соблюдать, чтобы успешно защититься.
            </p>
          </div>
        </div>

        <div className="AboutProject__graph">
          <div className="AboutProject__graph-element-first AboutProject__graph-element">
            1 неделя
          </div>
          <div className="AboutProject__graph-element-second AboutProject__graph-element">
            4 недели
          </div>
          <div className="AboutProject__graph-element">Back-end</div>
          <div className="AboutProject__graph-element">Front-end</div>
        </div>
      </section>
    </>
  );
}

export default AboutProject;
