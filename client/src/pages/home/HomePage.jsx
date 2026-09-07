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
                    <p className="home__subtitle">Encuentra tu registro de manera rápida y sencilla</p>
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

            <section className="home__quick-access">

                <div className="home__quick-access-content">
                    <h2 className="home__quick-access-title">Accesos rápidos</h2>
                </div>

                <nav className="home__quick-access-nav" aria-label="Acceso rápido a trámites">
                    <ul className="home__quick-access-grid">
                        <li className="home__quick-access-item">
                            <NavLink to="/births">
                                Nacimiento
                            </NavLink>
                        </li>

                        <li className="home__quick-access-item">
                            <NavLink to="/marriages">
                                Matrimonio
                            </NavLink>                        
                        </li>

                        <li className="home__quick-access-item">
                            <NavLink to="/deaths">
                                Defunción
                            </NavLink>
                        </li>
                    </ul>       
                </nav>
            </section>

            <section className="home__services">

                <div className="home__services-content">
                    <h2 className="home__services-title">Servicios</h2>
                </div>

                <div className="home__services-grid">

                    <div className="home__services-card">
                        <NavLink to="/births" className="home__services-card-link"></NavLink>
                        <div className="home__services-img-wrapper">
                            <img src={birth} alt="Birth Certificate" />
                        </div>
                        <div className="home__services-card-text">
                            <h3>Nacimientos</h3>
                        </div>
                    </div>

                    <div className="home__services-card">
                        <NavLink to="/marriages" className="home__services-card-link"></NavLink>
                        <div className="home__services-img-wrapper">
                            <img src={marriage} alt="Marriage Certificate" />
                        </div>
                        <div className="home__services-card-text">
                            <h3>Matrimonios</h3>
                        </div>
                    </div>

                    <div className="home__services-card">
                        <NavLink to="/deaths" className="home__services-card-link"></NavLink>
                        <div className="home__services-img-wrapper">
                            <img src={death} alt="Death Certificate" />
                        </div>
                        <div className="home__services-card-text">
                            <h3>Defunciones</h3>
                        </div>
                    </div>

                    <div className="home__services-card">
                        <NavLink to="/deaths" className="home__services-card-link"></NavLink>
                        <div className="home__services-img-wrapper">
                            <img src={certificate} alt="Death Certificate" />
                        </div>
                        <div className="home__services-card-text">
                            <h3>Certificados</h3>
                        </div>
                    </div>

                </div>

            </section>

        </main>
    )
}    