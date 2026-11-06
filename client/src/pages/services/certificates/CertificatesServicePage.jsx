import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ContentSection } from '../../../components/ui/ContentSection/ContentSection';
import { StepList } from '../../../components/ui/StepList/StepList';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Button } from '../../../components/ui/Button/Button';
import { Input } from '../../../components/ui/Input/Input';
import { Check } from '../../../assets/icons/Common/Common';
import styles from './CertificatesServicePage.module.css';

export const CertificatesServicePage = () => {
  // Check if user is logged in to show the correct CTA
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className={styles.page}>
      {/* Intro */}
      <div className={styles.intro}>
        <p>
          Este servicio permite solicitar copias digitales de partidas de nacimiento,
          matrimonio y defunción registradas en el Registro Civil de la Municipalidad
          Distrital de Huanuara.
        </p>

        {/* Main CTA based on authentication status */}
        <div className={styles.mainCta}>
          {isAuthenticated ? (
            <Link to="/profile">
              <Button variant="primary" size="lg">Iniciar solicitud</Button>
            </Link>
          ) : (
            <Link to="/auth/login">
              <Button variant="primary" size="lg">Iniciar sesión</Button>
            </Link>
          )}
          <span className={styles.ctaHint}>Es necesario identificarse para realizar el trámite.</span>
        </div>
      </div>

      <ContentSection id="info" title="Información importante">
        <ul className={styles.checkList}>
          <li>
            <span className={styles.checkIcon}><Check /></span>
            Solo puedes solicitar partidas registradas en el Registro Civil de la
            Municipalidad Distrital de Huanuara.
          </li>
          <li>
            <span className={styles.checkIcon}><Check /></span>
            La búsqueda de la partida puede arrojar un resultado negativo si no se
            encuentra registrada o si los datos proporcionados son insuficientes.
          </li>
          <li>
            <span className={styles.checkIcon}><Check /></span>
            Algunas partidas antiguas pueden requerir una verificación manual antes
            de su emisión.
          </li>
          <li>
            <span className={styles.checkIcon}><Check /></span>
            La solicitud está sujeta a la validación de los datos proporcionados por
            el solicitante.
          </li>
          <li>
            <span className={styles.checkIcon}><Check /></span>
            La entrega del documento dependerá de la disponibilidad y validación del
            registro correspondiente.
          </li>
        </ul>
      </ContentSection>

      <ContentSection id="quien" title="¿Quién puede solicitar una partida?">
        <p>
          La solicitud puede ser realizada por el <strong>titular de la partida</strong> o por
          una persona que cuente con la autorización o el interés legítimo correspondiente,
          según la naturaleza del trámite.
        </p>
      </ContentSection>

      <ContentSection id="como" title="¿Cómo solicitar una partida digital?">
        <StepList
          steps={[
            {
              title: 'Inicia sesión',
              description: 'Identifícate para iniciar tu solicitud de manera segura.',
            },
            {
              title: 'Selecciona la partida',
              description: 'Indica si deseas solicitar una partida de nacimiento, matrimonio o defunción.',
            },
            {
              title: 'Completa los datos',
              description: 'Ingresa la información necesaria para localizar la partida.',
            },
            {
              title: 'Envía y consulta',
              description: 'Revisa tu solicitud y consulta su estado desde la plataforma.',
            },
          ]}
        />
      </ContentSection>

      <ContentSection id="requisitos" title="Requisitos">
        <div className={styles.requisitoCard}>
          <p>Para realizar la solicitud, debes contar con la siguiente información:</p>
          <ul className={styles.checkList}>
            <li>
              <span className={styles.checkIcon}><Check /></span>
              Documento Nacional de Identidad (DNI) del solicitante.
            </li>
            <li>
              <span className={styles.checkIcon}><Check /></span>
              Tipo de partida: nacimiento, matrimonio o defunción.
            </li>
            <li>
              <span className={styles.checkIcon}><Check /></span>
              Nombres y apellidos de la persona registrada.
            </li>
            <li>
              <span className={styles.checkIcon}><Check /></span>
              Fecha del registro, si se conoce.
            </li>
            <li>
              <span className={styles.checkIcon}><Check /></span>
              Número de acta, libro o folio, si se dispone de esta información.
            </li>
          </ul>
        </div>

        <Alert variant="info" title="Importante">
          Mientras más información proporciones, será más fácil localizar la partida solicitada.
        </Alert>
      </ContentSection>

      <ContentSection id="presencial" title="Trámite presencial">
        <p>
          Si deseas realizar la solicitud de manera presencial, puedes acudir a la oficina
          de Registro Civil de la Municipalidad Distrital de Huanuara.
        </p>

        <div className={styles.infoCard}>
          <h3 className={styles.subtitle}>Lugar y horario de atención</h3>
          <p>
            <strong>Oficina de Registro Civil</strong><br />Municipalidad Distrital de Huanuara.
          </p>
          <p>
            <strong>Horario de atención:</strong><br />De lunes a viernes, en el
            horario establecido por la Municipalidad.
          </p>
          <p className={styles.mutedText}>El tiempo de atención dependerá de la
            disponibilidad y validación de la partida solicitada. El costo y medios
            de pago se informarán durante el proceso.
          </p>
        </div>
      </ContentSection>

      <ContentSection id="estado" title="Consulta el estado de tu solicitud">
        <p>
          Si ya realizaste una solicitud, puedes consultar el estado de tu trámite
          utilizando el número de solicitud asignado durante el registro.
        </p>

        {/* Status Checker Form (Visual only for now) */}
        <div className={styles.statusForm}>
          <div className={styles.inputGroup}>
            <Input
              label="Número de solicitud"
              placeholder="Ej: SOL-2023-0001"
              name="ticketNumber"
            // disabled until backend is ready
            />
            <Button variant="secondary" size="md">Consultar</Button>
          </div>
          <div className={styles.statusHints}>
            <span className={styles.statusBadgeWarning}>Pendiente</span>
            <span className={styles.statusBadgeInfo}>En revisión</span>
          </div>
        </div>
      </ContentSection>
    </div>
  );
};