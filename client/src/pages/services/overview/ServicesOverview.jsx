import { Link } from "react-router-dom"
import { ChevronRight } from "../../../assets/icons/navigation/Navigation"
import birth from "../../../assets/images/birth.png"
import marriage from "../../../assets/images/marriage.png"
import death from "../../../assets/images/death.png"
import "./ServicesOverview.css"

export const ServicesOverview = () => {

    return (
        <section className="services-overview">

            <div className="services-overview__header">
                <h2 className="services-overview__title">
                    Servicios del Registro Civil
                </h2>
                <p className="services-overview__description">
                    Encuentra información sobre los principales trámites y servicios que
                    ofrece el Registro Civil de la Municipalidad.
                </p>
            </div>
            <div className="services-overview__container">

               <article className="service-card">
                    <div className="service-card__image">
                        <img src={birth} alt="Birth Certificate" />
                    </div>
                    <div className="service-card_content">
                        <div className="service-card__header">
                            <h3 className="service-card__title">Nacimiento</h3>
                            <p className="service-card__description">Inscripción y registro de nacimientos.</p>
                        </div>

                        <Link className="service-card__link">
                            <span>Más información</span>
                            <ChevronRight />
                        </Link>
                    </div>
                </article>
               <article className="service-card">
                    <div className="service-card__image">
                        <img src={marriage} alt="Marriage Certificate" />
                    </div>
                    <div className="service-card_content">
                        <div className="service-card__header">
                            <h3 className="service-card__title">Nacimiento</h3>
                            <p className="service-card__description">Inscripción y registro de nacimientos.</p>
                        </div>

                        <Link className="service-card__link">
                            <span>Más información</span>
                            <ChevronRight />
                        </Link>
                    </div>
                </article>
               <article className="service-card">
                    <div className="service-card__image">
                        <img src={death} alt="Death Certificate" />
                    </div>
                    <div className="service-card_content">
                        <div className="service-card__header">
                            <h3 className="service-card__title">Nacimiento</h3>
                            <p className="service-card__description">Inscripción y registro de nacimientos.</p>
                        </div>

                        <Link className="service-card__link">
                            <span>Más información</span>
                            <ChevronRight />
                        </Link>
                    </div>
                </article>
               <article className="service-card">
                    <div className="service-card__image">
                        <img src={birth} alt="Birth Certificate" />
                    </div>
                    <div className="service-card_content">
                        <div className="service-card__header">
                            <h3 className="service-card__title">Nacimiento</h3>
                            <p className="service-card__description">Inscripción y registro de nacimientos.</p>
                        </div>

                        <Link className="service-card__link">
                            <span>Más información</span>
                            <ChevronRight />
                        </Link>
                    </div>
                </article>                                                
            </div>

        </section>
    )
}