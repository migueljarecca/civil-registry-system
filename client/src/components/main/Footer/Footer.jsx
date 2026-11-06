import { Link } from 'react-router-dom';
import { Clock, Phone } from '../../../assets/icons/Common/Common';
import { Facebook, Twitter } from '../../../assets/icons/Social/Social';
import { Logo } from '../../../assets/icons/Logo/Logo';
import styles from './Footer.module.css';

export const Footer = () => {

  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* ============ MAIN ============ */}
        <div className={styles.main}>
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.brandLink}>
              <span className={styles.logoWrapper}>
                <Logo />
              </span>
              <span className={styles.brandText}>
                <span
                  className={styles.brandTitle}>
                  Registro Civil
                </span>
                <span
                  className={styles.brandSubtitle}>
                  Municipalidad Distrital de Huanuara
                </span>
              </span>
            </Link>
            <p className={styles.brandDescription}>
              Organismo público encargado del registro de los hechos vitales
              y de la identidad de las personas.
            </p>
          </div>

          {/* Navegation */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Navegación</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/"
                  className={styles.link}>
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/services"
                  className={styles.link}
                >Servicios
                </Link>
              </li>
              <li>
                <Link to="/contact"
                  className={styles.link}>
                  Contacto
                </Link>
              </li>
              <li>
                <Link to="/auth/login"
                  className={styles.link}>
                  Iniciar sesión
                </Link>
              </li>
              <li>
                <Link to="/auth/register"
                  className={styles.link}>
                  Crear cuenta
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Trámites</h3>
            <ul className={styles.list}>
              <li>
                <Link to="/services/birth"
                  className={styles.link}>
                  Inscripción de nacimiento
                </Link>
              </li>
              <li>
                <Link to="/services/marriage"
                  className={styles.link}>
                  Matrimonio civil
                </Link>
              </li>
              <li>
                <Link to="/services/death"
                  className={styles.link}>
                  Inscripción de defunción
                </Link>
              </li>
              <li>
                <Link to="/services/certificates"
                  className={styles.link}>
                  Solicitud de partidas digitales
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.column}>
            <h3 className={styles.columnTitle}>Contacto</h3>
            <ul className={styles.list}>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}><Phone /></span>
                <span>970 449 496</span>
              </li>
              <li className={styles.contactItem}>
                <span className={styles.contactIcon}><Clock /></span>
                <span>Lun - Vie, 8am - 12pm y 3pm - 8pm</span>
              </li>
            </ul>

            <div className={styles.social}>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className={styles.socialLink}
              >
                <Facebook />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className={styles.socialLink}
              >
                <Twitter />
              </a>
            </div>
          </div>
        </div>

        {/* ============ BOTTOM ============ */}
        <div className={styles.bottom}>
          <span>© {currentYear} Municipalidad Distrital de Huanuara.
            Todos los derechos reservados.
          </span>
          <ul className={styles.legalList}>
            <li>
              <Link to="/"
                className={styles.legalLink}>
                Términos y condiciones</Link>
            </li>
            <li>
              <Link to="/"
                className={styles.legalLink}>
                Política de privacidad
              </Link>
            </li>
            <li>
              <Link to="/"
                className={styles.legalLink}>
                Accesibilidad
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};