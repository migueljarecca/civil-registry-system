import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card/Card';
import { Button } from '../../components/ui/Button/Button';
import heroImg from '../../assets/hero.png';
import birthImg from '../../assets/images/birth.png';
import marriageImg from '../../assets/images/marriage.png';
import deathImg from '../../assets/images/death.png';
import certificateImg from '../../assets/images/certificate.png';
import styles from './HomePage.module.css';
import { ArrowRight } from '../../assets/icons/Common/Common';

const services = [
  {
    title: 'Inscripción de nacimiento',
    description: 'Registra a tu recién nacido por primera vez en la municipalidad.',
    image: birthImg,
    to: '/services/birth',
    tag: 'Presencial',
  },
  {
    title: 'Matrimonio civil',
    description: 'Inicia tu expediente matrimonial ante la municipalidad.',
    image: marriageImg,
    to: '/services/marriage',
    tag: 'Presencial',
  },
  {
    title: 'Inscripción de defunción',
    description: 'Registra el fallecimiento y obtiene la constancia correspondiente.',
    image: deathImg,
    to: '/services/death',
    tag: 'Presencial',
  },
  {
    title: 'Solicitud de partidas digitales',
    description: 'Pide tu partida de nacimiento, matrimonio o defunción online.',
    image: certificateImg,
    to: '/services/certificates',
    tag: 'Online',
    highlight: true,
  },
];

const steps = [
  {
    number: '01',
    title: 'Inicia sesión',
    description: 'Ingresa con tu cuenta o regístrate para solicitar una partida digital.',
  },
  {
    number: '02',
    title: 'Selecciona la partida',
    description: 'Indica si necesitas una partida de nacimiento, matrimonio o defunción.',
  },
  {
    number: '03',
    title: 'Consulta el estado',
    description: 'Sigue el proceso de tu solicitud y descarga tu documento cuando este listo.',
  },
];

export const HomePage = () => {
  return (
    <div className={styles.page}>
      {/* ============ HERO ============ */}
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Municipalidad Distrital de Huanuara</span>
            <h1 className={styles.heroTitle}>
              Registro Civil Digital<br />
            </h1>
            <p className={styles.heroSubtitle}>
              Encuentra información y servicios para tus trámites de registro civil.
            </p>
            <div className={styles.heroActions}>
              <Link to="/services/certificates">
                <Button variant="primary" size="lg">Solicitar partida digital</Button>
              </Link>
              <Link to="/services">
                <Button variant="secondary" size="lg">Ver todos los servicios</Button>
              </Link>
            </div>
          </div>

          <div className={styles.heroImage}>
            <img src={heroImg} alt="" className={styles.heroImageEl} />
          </div>
        </div>
      </section>

      {/* ============ SERVICES ============ */}
      <section className={styles.section}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Servicios</span>
            <h2 className={styles.sectionTitle}>¿Qué necesitas realizar?</h2>
            <p className={styles.sectionSubtitle}>
              Conoce los trámites disponibles. Algunos se realizan online y otros de forma presencial.
            </p>
          </div>

          <div className={styles.servicesGrid}>
            {services.map((service) => (
              <Link
                key={service.to}
                to={service.to}
                className={styles.serviceLink}
              >
                <Card interactive className={styles.serviceCard}>
                  <div className={styles.serviceImageWrapper}>
                    <img
                      src={service.image}
                      alt=""
                      className={styles.serviceImage}
                    />
                  </div>
                  <div className={styles.serviceHeader}>
                    <h3 className={styles.serviceTitle}>{service.title}</h3>
                    <span className={`${styles.serviceTag} ${service.highlight ? styles.tagOnline : styles.tagPresencial}`}>
                      {service.tag}
                    </span>
                  </div>
                  <p className={styles.serviceDescription}>
                    {service.description}
                  </p>
                  <span className={styles.serviceCta}>
                    Ver más
                    <ArrowRight />
                  </span>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS (Partidas digitales) ============ */}
      <section className={`${styles.section} ${styles.sectionAlt}`}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.sectionEyebrow}>Solicitud de partidas</span>
            <h2 className={styles.sectionTitle}>Tres pasos para obtener tu documento</h2>
          </div>

          <div className={styles.stepsGrid}>
            {steps.map((step) => (
              <div key={step.number} className={styles.step}>
                <span className={styles.stepNumber}>{step.number}</span>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>¿Necesitas una partida digital?</h2>
            <p className={styles.ctaSubtitle}>
              Crea tu cuenta para iniciar tu solicitud y consultar el estado del trámite.
            </p>
            <Link to="/auth/register">
              <Button variant="primary" size="lg">Crear cuenta</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};