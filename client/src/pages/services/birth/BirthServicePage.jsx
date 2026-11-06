import { Link } from 'react-router-dom';
import { ContentSection } from '../../../components/ui/ContentSection/ContentSection';
import { StepList } from '../../../components/ui/StepList/StepList';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Button } from '../../../components/ui/Button/Button';
import styles from './BirthServicePage.module.css';
import { Check } from '../../../assets/icons/Common/Common';

export const BirthServicePage = () => {
  return (
    <div className={styles.page}>
      {/* Intro */}
      <div className={styles.intro}>
        <p>
          Si tienes un hijo recién nacido, debes registrarlo en cualquier oficina del
          Reniec a nivel nacional. Si no hay una cerca de tu localidad, puedes realizar
          la inscripción en la municipalidad de tu distrito o provincia y obtener su
          acta o partida de nacimiento por primera vez.
        </p>
        <p>
          Este procedimiento es <strong>gratuito</strong> y permite que tu hijo disfrute
          de todos los beneficios de ser un ciudadano peruano, como obtener su DNI o
          acceder a programas sociales.
        </p>
      </div>

      <ContentSection id="antes" title="Antes de realizar la inscripción">
        <h3 className={styles.subtitle}>Certificado de Nacido Vivo (CNV)</h3>
        <p>
          El Certificado de Nacido Vivo debe ser generado en el establecimiento de salud
          donde se atendió el parto.
        </p>
        <p>
          De esta manera, se genera el Certificado de Nacido Vivo, que identifica a la
          madre y al profesional que atendió el parto o cesárea.
        </p>
        <p>
          Este certificado es el requisito básico para conseguir el Acta de Nacimiento
          y la inscripción del niño en los Registros Civiles.
        </p>
      </ContentSection>

      <ContentSection id="requisitos" title="Requisitos para la inscripción">
        <div className={styles.requisitosGrid}>

          <div className={styles.requisitoCard}>

            <h3 className={styles.subtitle}>Padres casados</h3>
            
            <ul className={styles.requisitoList}>
              <li>
                <span className={styles.checkIcon}><Check /></span>
                Certificado de Nacido Vivo (CNV) original.
              </li>

              <li>
                <span className={styles.checkIcon}><Check /></span>
                DNI vigente del padre o de la madre que realiza la inscripción.
                </li>
              <li>
                <span className={styles.checkIcon}><Check /></span>
                Acta o partida de matrimonio, cuando sea necesario acreditar el vínculo matrimonial.
              </li>
            </ul>

            <p className={styles.note}>
              No es necesario que ambos padres acudan al Registro Civil.
            </p>
          </div>

          <div className={styles.requisitoCard}>

            <h3 className={styles.subtitle}>Padres no casados</h3>

            <ul className={styles.requisitoList}>
              <li>
                <span className={styles.checkIcon}><Check /></span>
                Certificado de Nacido Vivo (CNV) original.
              </li>
              <li>
                <span className={styles.checkIcon}><Check /></span>
                DNI vigente de ambos padres.
              </li>
            </ul>

            <p className={styles.note}>

              Es necesaria la presencia de ambos padres para realizar este trámite.
              Si solo se presenta uno de ellos, la municipalidad lo notificará en la
              inscripción como padre ausente.
            </p>
          </div>

        </div>

        <Alert variant="warning" title="Importante">
          No es necesario llevar al recién nacido para realizar la inscripción.
        </Alert>
      </ContentSection>

      <ContentSection id="plazo" title="Plazo para realizar la inscripción">
        <p>
          La inscripción ordinaria debe realizarse dentro de los <strong>60 días
          calendario</strong> siguientes al nacimiento.
        </p>
        <p>
          Si el nacimiento no fue inscrito dentro del plazo correspondiente, deberá
          realizarse mediante el procedimiento de inscripción de nacimiento
          extemporánea.
        </p>
      </ContentSection>

      <ContentSection id="como" title="¿Cómo realizar el trámite?">
        <StepList
          steps={[
            {
              title: 'Acude al Registro Civil',
              description:
                'Dirígete al Registro Civil de la Municipalidad Distrital de Huanuara con la documentación necesaria para realizar la inscripción.',
            },
            {
              title: 'Presenta la documentación',
              description:
                'Entrega los documentos requeridos para la inscripción, como el Certificado de Nacido Vivo y la identificación del padre o madre.',
            },
            {
              title: 'Recibe el acta de nacimiento',
              description:
                'Una vez realizada la inscripción, el registrador entregará la primera copia certificada del acta de nacimiento sin costo.',
            },
          ]}
        />
      </ContentSection>

      <ContentSection id="costo" title="Costo del trámite">
        <p>
          La inscripción ordinaria de nacimiento es <strong>gratuita</strong>. La
          primera copia certificada del acta de nacimiento también se entrega
          gratuitamente como parte de la inscripción.
        </p>
      </ContentSection>

      {/* CTA Final */}
      <div className={styles.ctaBox}>
        <div className={styles.ctaText}>
          <h3 className={styles.ctaTitle}>¿Ya realizaste la inscripción?</h3>
          <p className={styles.ctaSubtitle}>
            Puedes solicitar una copia digital de la partida de nacimiento desde la plataforma.
          </p>
        </div>
        <Link to="/services/certificates">
          <Button variant="primary" size="md">Solicitar partida</Button>
        </Link>
      </div>
    </div>
  );
};