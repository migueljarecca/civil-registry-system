import { Wave } from "../assets/icons/Icons"
import { NavLink } from "react-router-dom"

import logoppal from "../assets/images/logo-ppal.png"
import birth from "../assets/images/birth.png"
import marriage from "../assets/images/marriage.png"
import death from "../assets/images/death.png"

export const Home = () => {

    return (
        <main className="home-main">

             <section className="home-section-hero">
                <div className="home-container-image">
                    <img src={logoppal} alt="Logo" />
                </div>
                <div className="home-container-text"> 
                    <h1>Registro Civil</h1>
                </div>
                <div className="home-container-wave">
                    <Wave />
                </div>
            </section>

            <section className="home-services">
                <div className="home-services__grid">

                    <div className="home-services__card">
                        <NavLink to="/services" className="home-services__item"></NavLink>
                        <div className="home-services__card-img-wrapper">
                            <img src={birth} alt="Birth Certificate" />
                        </div>
                        <div className="home-services__card-text">
                            <h2>Birth</h2>
                        </div>
                    </div>

                    <div className="home-services__card">
                        <NavLink to="/services" className="home-services__item"></NavLink>
                        <div className="home-services__card-img-wrapper">
                            <img src={marriage} alt="Marriage Certificate" />
                        </div>
                        <div className="home-services__card-text">
                            <h2>Marriage</h2>
                        </div>
                    </div>

                    <div className="home-services__card">
                        <NavLink to="/services" className="home-services__item"></NavLink>
                        <div className="home-services__card-img-wrapper">
                            <img src={death} alt="Death Certificate" />
                        </div>
                        <div className="home-services__card-text">
                            <h2>Death</h2>
                        </div>
                    </div>

                </div>

            </section>

        </main>
    )
}    