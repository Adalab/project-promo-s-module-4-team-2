import { Link } from 'react-router-dom';
import Header from './Header';
import logo from '../images/logo-adalab.png';
import logoFop from '../images/logo-fop.png';
import ls from '../service/localStorage';
import '../styles/App.scss';
import { useState } from 'react';


const Landing = ({ setDataCardList }) => {
  const dataCardLS = ls.get('dataCardLS', []);

  
  //const handleBtnRemoveCard = (ev) => {};
  const [favourite, setFavourite] = useState(false)
  
 const handleToogleFavourite = (ev) => {
  const clickedId = ev.currentTarget.id;
  console.log("me han clicado")
 setFavourite(!favourite)
  if(favourite === true){
    const foundFavourite = dataCardLS.find((fav) => fav.id === clickedId);
    
    console.log(foundFavourite)
    setDataCardList({...dataCardLS, [clickedId]: 'favourite' })
    
    
    
  }
  //  const clickedSerieId = ev.currentTarget.id;
  //   const foundSerie = series.find((serie) => serie.id === clickedSerieId);
  //   foundSerie.isFavorite = !foundSerie.isFavorite;
  //   setSeries([...series]);
  
    // const clickedId = ev.currentTarget.id;
    // const foundFavourite = dataCardLS.find((fav) => fav.id === clickedId);
    
    console.log(favourite)
    // setSeries([...series]);
  };
//   setFavourite(!favourite)
//    if(favourite === true) {
//     // setFavourite2({...favourite2, [ev.target.id]: 'favourite'})
//     console.log(ev.target.id)
//   }
//  }
 
  const renderCard = () => {
    return dataCardLS.map((obj, index) => {
      return (
        <li key={index} className="landing-card">
          <div
            className="landing-card-background"
            style={{
              backgroundImage: `url(${obj.photo})`,
            }}
          ></div>
          {/* <button className="btn-remove-card" onClick={handleBtnRemoveCard}>
            <i class="fa-sharp fa-solid fa-circle-xmark icons"></i>
          </button> */}
          <section className="project-info">
            <p className="project-subtitle">Personal Project Card</p>
            <hr className="landing-card-line" />

            <h2 className="project-title">{obj.name}</h2>
            <p className="project-slogan">{obj.slogan}</p>
            <p className="project-desc">{obj.desc}</p>
            <section className="tech-icons">
              <section className="project-technologies">
                <p className="text">{obj.technologies}</p>
              </section>
              <section>
                <a href={obj.demo} target="blank">
                  <i
                    className="fa-solid fa-globe icons"
                    title="Link a demo"
                  ></i>
                </a>
                <a href={obj.repo} target="blank">
                  <i
                    className="fa-brands fa-github icons"
                    title="Link a repositorio"
                  ></i>
                </a>
              </section>
            </section>
          </section>

          <section className="autor-info">
            <img
              className="autor-image"
              src={obj.image}
              alt="Foto de la autora"
            />
            <p className="autor-job">{obj.job}</p>
            <p className="autor-name">{obj.autor}</p>
            <i className={`fa-solid fa-star ${obj.isFavorite}`}  onClick={handleToogleFavourite} id={index}></i>
          </section>
        </li>
      );
    });
  };

  const handleResetCards = () => {
    ls.remove('dataCardLS');
    setDataCardList([]);
  };

  return (
    <div className="container">
      <Header logoFop={logoFop} logo={logo} linkTo={''} />
      <main>
        <h1 className="landing-title">Proyectos Molones</h1>
        <h2 className="landing-subtitle">
          Escaparate en línea para recoger ideas a través de la tecnología
        </h2>
        <section className="landing-buttons">
          <Link
            className="link btn-large"
            to="/create"
            title="Crear una nueva tarjeta"
          >
            Nuevo proyecto
          </Link>
          <button
            className="btn-reset-cards"
            onClick={handleResetCards}
            title="Borrar las tarjetas"
          >
            Borrar proyectos
          </button>
        </section>
        <ul className="landing-ul">{renderCard()}</ul>
      </main>
    </div>
  );
};

export default Landing;
