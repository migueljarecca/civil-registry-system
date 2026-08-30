import "./ServicesPage.css"
import { Outlet } from "react-router-dom"
import { NavLink } from "react-router-dom"

export const ServicesPage = () => {

    return (
        <div className="services">
            <header className="services__header">
                <div>
                    <h2 className="services__title">Servicios</h2>
                </div>
            </header>

            <div className="services__content">
                <aside className="services__sidebar">
                    <nav className="services__nav">
                        <ul className="services__list">
                            <li className="services__item">
                                <NavLink 
                                    className="services__link"
                                    to="/services" 
                                    end
                                >
                                    Todos los Servicios
                                </NavLink>
                            </li>
                            <li className="services__item">
                                <NavLink 
                                    className="services__link"
                                    to="/services/birth"
                                >
                                    Nacimiento
                                </NavLink>
                            </li>
                            <li className="services__item">
                                <NavLink 
                                    className="services__link"
                                    to="/services/marriage"
                                >
                                    Matrimonio
                                </NavLink>
                            </li>
                            <li className="services__item">
                                <NavLink 
                                    className="services__link"
                                    to="/services/death"
                                >
                                    Defunción
                                </NavLink>
                            </li>
                            <li className="services__item">
                                <NavLink 
                                    className="services__link" 
                                    to="/services/certificates"
                                >
                                    Certificados
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </aside>


                <main className="services__main">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}        