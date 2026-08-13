import "./Header.css"

import { Clock, Cog8Tooth, Phone, User } from "../../../assets/icons/Common/Common"
import { Logo } from "../../../assets/icons/Logo/Logo"
import { Facebook, Twitter } from "../../../assets/icons/Social/Social"
import { NavLink } from "react-router-dom"

export const Header = () => {

    return (
        <header className="header"> 

            <div className="header__top">

                <div className="header__info">
                    <div className="header__schedule">
                        <Clock />
                        <span>Horario de atención: Lun - Vier, 8am - 12pm y 3pm - 8pm</span>
                    </div>
                    <div className="header__phone">
                        <Phone />
                        <span>970449496</span>
                    </div>
                </div>

                <div className="header__social">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <Facebook />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                        <Twitter />
                    </a>
                </div>
            </div>

            <div className="header__main">
                <div className="header__brand">
                    <div className="header__logo">
                        <Logo />
                    </div>
                    <span className="header__title">Registro Civil</span>
                </div>
                <div className="header__actions">
                    <User />
                    <Cog8Tooth />
                </div>
            </div>

            <div className="header__nav">
                <nav>
                    <ul className="header__menu">
                        <li>
                            <NavLink
                                to="services"
                            >
                                Servicios
                            </NavLink>
                            </li>
                        <li>
                            <NavLink
                                to="contact"    
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