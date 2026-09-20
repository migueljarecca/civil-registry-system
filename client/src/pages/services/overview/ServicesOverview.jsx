import { Link } from "react-router-dom"
import { ChevronRight } from "../../../assets/icons/navigation/Navigation"
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
                            <div className="overview-service__card-image">
                                <img src={birth} alt="Birth Certificate" />
                            </div>
                            <div className="overview-service__card-content">
                                <div className="overview-service__card-header">
                                    <h3 className="overview-service__card-title">Nacimiento</h3>
                                    <p className="overview-service__card-description">Inscripción y registro de nacimientos.</p>
                                </div>

                                <Link className="overview-service__card-link">
                                    <span>Más información</span>
                                    <ChevronRight />
                                </Link>
                            </div>
                        </article>
                    <article className="overview-service__card">
                            <div className="overview-service__card-image">
                                <img src={marriage} alt="Marriage Certificate" />
                            </div>
                            <div className="overview-service__card-content">
                                <div className="overview-service__card-header">
                                    <h3 className="overview-service__card-title">Matrimonio</h3>
                                    <p className="overview-service__card-description">Información sobre el registro de matrimonios.</p>
                                </div>

                                <Link className="overview-service__card-link">
                                    <span>Más información</span>
                                    <ChevronRight />
                                </Link>
                            </div>
                        </article>
                    <article className="overview-service__card">
                            <div className="overview-service__card-image">
                                <img src={death} alt="Death Certificate" />
                            </div>
                            <div className="overview-service__card-content">
                                <div className="overview-service__card-header">
                                    <h3 className="overview-service__card-title">Defunción</h3>
                                    <p className="overview-service__card-description">Registro de defunciones.</p>
                                </div>

                                <Link className="overview-service__card-link">
                                    <span>Más información</span>
                                    <ChevronRight />
                                </Link>
                            </div>
                        </article>
                    <article className="overview-service__card">
                            <div className="overview-service__card-image">
                                <img src={certificate} alt="Birth Certificate" />
                            </div>
                            <div className="overview-service__card-content">
                                <div className="overview-service__card-header">
                                    <h3 className="overview-service__card-title">Certificados</h3>
                                    <p className="overview-service__card-description">Solicitud y emisión de certificados y copias.</p>
                                </div>

                                <Link className="overview-service__card-link">
                                    <span>Más información</span>
                                    <ChevronRight />
                                </Link>
                            </div>
                        </article>                                                
                    </div>


            </section>

 

        </div>
    )
}