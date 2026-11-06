import { Link } from 'react-router-dom';
import { Card } from '../../../components/ui/Card/Card';
import birthImg from '../../../assets/images/birth.png';
import marriageImg from '../../../assets/images/marriage.png';
import deathImg from '../../../assets/images/death.png';
import certificateImg from '../../../assets/images/certificate.png';
import styles from './ServicesOverview.module.css';

const services = [
  {
    title: 'Inscripción de nacimiento',
    description:
      'Registra el nacimiento de tu hijo por primera vez y obtiene su acta de nacimiento.',
    image: birthImg,
    to: '/services/birth',
    tag: 'Trámite presencial',
  },
  {
    title: 'Matrimonio civil',
    description:
      'Contrae matrimonio civil ante la municipalidad y obtiene tu acta de matrimonio.',
    image: marriageImg,
    to: '/services/marriage',
    tag: 'Trámite presencial',
  },
  {
    title: 'Inscripción de defunción',
    description:
      'Registra el fallecimiento de una persona y obtiene la constancia correspondiente.',
    image: deathImg,
    to: '/services/death',
    tag: 'Trámite presencial',
  },
  {
    title: 'Solicitud de partidas digitales',
    description:
      'Solicita copias digitales de partidas de nacimiento, matrimonio o defunción.',
    image: certificateImg,
    to: '/services/certificates',
    tag: 'Servicio online',
  },
];

export const ServicesOverview = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.intro}>
        <h2 className={styles.introTitle}>Trámites disponibles</h2>
        <p className={styles.introText}>
          Selecciona el servicio que necesitas realizar. Puedes consultar los requisitos
          y pasos antes de comenzar.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((service) => (
          <Link key={service.to} to={service.to} className={styles.serviceLink}>
            <Card interactive className={styles.serviceCard}>
              <div className={styles.imageWrapper}>
                <img src={service.image} alt="" className={styles.image} />
              </div>
              <span className={styles.tag}>{service.tag}</span>
              <h3 className={styles.cardTitle}>{service.title}</h3>
              <p className={styles.cardDescription}>{service.description}</p>
              <span className={styles.cardCta}>Ver más →</span>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};