import "./HomePage.css"
import { NavLink } from "react-router-dom"
import marriage from "../../assets/images/marriage.png"
import birth from "../../assets/images/birth.png"
import death from "../../assets/images/death.png"
import certificate from "../../assets/images/certificate.png"

import { MagnifyingGlass } from "../../assets/icons/Common/Common"

export const HomePage = () => {

    return (

        <main className= "home">
            
            <section className="home__hero">

                <div className="home__content">
                    <h1 className="home__title">Registro Civil Digital</h1>
                    <p className="home__subtitle">Encuentra información y servicios para tus trámites de registro civil.</p>
                </div>


                <div className="home__search">

                    <form className="home__search-form">
                        <input 
                            type="text"
                            className="home__search-input"
                            placeholder="Buscar por DNI, nombres o apellidos..."
                        />
                        <button className="home__search-btn">
                            <MagnifyingGlass />
                        </button>
                    </form>
                </div>
                
            </section>

            <section className="home__services">

                <h2 className="home__services-title">Servicio</h2>

                <div className="home__services-container">

                    <article className="home__services-card">
                        <NavLink to="/services/birth" className="home__services-card-link"></NavLink>

                        <div className="home__services-card-img">
                            <img src={birth} alt="Nacimiento" />
                        </div>

                        <div className="home__services-card-content">
                            <h3 className="home__services-card-title">Nacimiento</h3>
                            <p className="home__services-card-description">
                                Información para inscribir el nacimiento de un recién nacido.
                            </p>
                        </div>
                    </article>

                    <article className="home__services-card">
                        <NavLink to="/services/marriage" className="home__services-card-link"></NavLink>

                        <div className="home__services-card-img">
                            <img src={marriage} alt="Matrimonio" />
                        </div>

                        <div className="home__services-card-content">
                            <h3 className="home__services-card-title">Matrimonio</h3>
                            <p className="home__services-card-description">
                                Conoce los requisitos y pasos para contraer matrimonio civil.
                            </p>
                        </div>
                    </article>

                    <article className="home__services-card">
                        <NavLink to="/services/death" className="home__services-card-link"></NavLink>

                        <div className="home__services-card-img">
                            <img src={death} alt="Defunción" />
                        </div>

                        <div className="home__services-card-content">
                            <h3 className="home__services-card-title">Defunción</h3>
                            <p className="home__services-card-description">
                                Información para realizar la inscripción de una defunción.
                            </p>
                        </div>
                    </article>

                    <article className="home__services-card">
                        <NavLink to="/services/certificates" className="home__services-card-link"></NavLink>

                        <div className="home__services-card-img">
                            <img src={certificate} alt="Partidas digitales" />
                        </div>

                        <div className="home__services-card-content">
                            <h3 className="home__services-card-title">Partida digital</h3>
                            <p className="home__services-card-description">
                                Solicita copias digitales de partidas de nacimiento, matrimonio o defunción.
                            </p>
                        </div>
                    </article>

                </div>
            </section>      
        </main>
    )
}
