import { NavLink } from "react-router-dom"
import birth from "../../../assets/images/birth.png"
import marriage from "../../../assets/images/marriage.png"
import death from "../../../assets/images/death.png"
import certificate from "../../../assets/images/certificate.png"

import "./ServicesOverview.css"

export const ServicesOverview = () => {

    return (
        <div className="overview-service">

            <section className="overview-service__section">
                <h1 className="overview-service__title">
                    Servicios del Registro Civil
                </h1>
                <p className="overview-service__description">
                    Encuentra información sobre los principales trámites y servicios que
                    ofrece el Registro Civil de la Municipalidad.
                </p>
            </section>

            <section className="overview-service__section">
                <h2 className="overview-service__subtitle">
                    Servicios Disponibles
                </h2>

                <div className="overview-service__container">

                    <article className="overview-service__card">
                        <NavLink to="/services/birth" className="overview-service__card-link"></NavLink>

                        <div className="overview-service__card-img">
                            <img src={birth} alt="Nacimiento" />
                        </div>

                        <div className="overview-service__card-content">
                            <h3 className="overview-service__card-title">Nacimiento</h3>
                            <p className="overview-service__card-description">
                                Información para inscribir el nacimiento de un recién nacido.
                            </p>
                        </div>
                    </article>

                    <article className="overview-service__card">
                        <NavLink to="/services/marriage" className="overview-service__card-link"></NavLink>

                        <div className="overview-service__card-img">
                            <img src={marriage} alt="Matrimonio" />
                        </div>

                        <div className="overview-service__card-content">
                            <h3 className="overview-service__card-title">Matrimonio</h3>
                            <p className="overview-service__card-description">
                                Conoce los requisitos y pasos para contraer matrimonio civil.
                            </p>
                        </div>
                    </article>

                    <article className="overview-service__card">
                        <NavLink to="/services/death" className="overview-service__card-link"></NavLink>

                        <div className="overview-service__card-img">
                            <img src={death} alt="Defunción" />
                        </div>

                        <div className="overview-service__card-content">
                            <h3 className="overview-service__card-title">Defunción</h3>
                            <p className="overview-service__card-description">
                                Información para realizar la inscripción de una defunción.
                            </p>
                        </div>
                    </article>

                    <article className="overview-service__card">
                        <NavLink to="/services/certificates" className="overview-service__card-link"></NavLink>

                        <div className="overview-service__card-img">
                            <img src={certificate} alt="Partidas digitales" />
                        </div>

                        <div className="overview-service__card-content">
                            <h3 className="overview-service__card-title">Partidas digitales</h3>
                            <p className="overview-service__card-description">
                                Solicita copias digitales de partidas de nacimiento, matrimonio o defunción.
                            </p>
                        </div>
                    </article>

                </div>


            </section>

 

        </div>
    )
}