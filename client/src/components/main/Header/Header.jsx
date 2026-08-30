import "./Header.css"

import { Clock, Cog8Tooth, Phone, User } from "../../../assets/icons/Common/Common"
import { Logo } from "../../../assets/icons/Logo/Logo"
import { Facebook, Twitter } from "../../../assets/icons/Social/Social"
import { NavLink } from "react-router-dom"

export const Header = () => {

    return (
        <header className="header"> 

            <div className="header-top">

                <div className="header-top__info">
                    <div className="header-top__schedule">
                        <div className="header-top__icon-wrapper">
                            <Clock />
                        </div>
                        <span>Horario de atención: Lun - Vier, 8am - 12pm y 3pm - 8pm</span>
                    </div>
                    <div className="header-top__phone">
                        <div className="header-top__icon-wrapper">
                            <Phone />
                        </div>
                        <span>970449496</span>
                    </div>
                </div>

                <div className="header-top__social">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <div className="header-top__icon-wrapper">
                            <Facebook />
                        </div>
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <div className="header-top__icon-wrapper">
                            <Twitter />
                        </div>
                    </a>
                </div>
            </div>

            <div className="header-main">
                <div className="header-main__brand">
                    <div className="header-main__logo-wrapper">
                        <Logo />
                    </div>
                    <span className="header-main__title">Registro Civil</span>
                </div>
                <div className="header-main__actions">
                    <div className="header-main__icon-wrapper">
                        <User />
                    </div>
                    <div className="header-main__icon-wrapper">
                        <Cog8Tooth />
                    </div>
                </div>
            </div>

            <div className="header-nav">
                <nav className="header-nav__nav">
                    <ul className="header-main__menu">
                        <li className="header-main__item">
                            <NavLink
                                className="header-main__link"
                                to="/services"
                            >
                                Servicios
                            </NavLink>
                            </li>
                        <li>
                            <NavLink
                                className="header-main__link"
                                to="/contact"    
                            >
                                Contáctame
                            </NavLink>
                            </li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}