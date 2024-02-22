import style from "./about.module.css";

function About() {
  return (
    <main>
      <div className={style.content}>
        <h1 className={style.sectionTitle}>About CareCompare</h1>
        <p>
          CareCompare is a 24-hour project done by Rafael Padilla and Peyton
          Barre for the Axxess 2024 Hackathon. We've since polished it a little
          more and hosted it online as a portfolio project. Keep in mind this is
          not meant to be a complete product, and is being hosted using free
          services! 
        </p>
      </div>
    </main>
  );
}

export default About;
