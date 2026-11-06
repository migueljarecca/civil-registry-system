import { Link } from 'react-router-dom';
import { ContentSection } from '../../../components/ui/ContentSection/ContentSection';
import { StepList } from '../../../components/ui/StepList/StepList';
import { CostTable } from '../../../components/ui/CostTable/CostTable';
import { Alert } from '../../../components/ui/Alert/Alert';
import { Button } from '../../../components/ui/Button/Button';
import { Check } from '../../../assets/icons/Common/Common';
import styles from './MarriageServicePage.module.css';

export const MarriageServicePage = () => {
    return (
        <div className={styles.page}>
            {/* Intro */}
            <div className={styles.intro}>
                <p>
                    Si eres mayor de edad y deseas contraer matrimonio civil con tu pareja, debes
                    realizar el trámite ante la municipalidad correspondiente.
                </p>
                <p>
                    El matrimonio civil es la unión voluntaria de dos personas ante la ley con el
                    propósito de hacer vida en común. Ambos cónyuges tienen iguales derechos,
                    deberes, consideraciones, responsabilidades y autoridad en el hogar.
                </p>
            </div>

            <ContentSection id="requisitos" title="Requisitos generales">
                <ul className={styles.checkList}>
                    <li>
                        <span className={styles.checkIcon}><Check /></span>
                        Solicitud simple dirigida al alcalde o alcaldesa. Debe estar firmada por los contrayentes.
                    </li>
                    <li>
                        <span className={styles.checkIcon}><Check /></span>
                        Copia certificada de las actas de nacimiento de los contrayentes,
                        con una antigüedad no mayor a 3 meses.
                    </li>
                    <li>
                        <span className={styles.checkIcon}><Check /></span>
                        Copia de ambos lados del DNI de los contrayentes.</li>
                    <li>
                        <span className={styles.checkIcon}><Check /></span>
                        Certificado negativo para matrimonio (Reniec) o declaración jurada de soltería legalizada.</li>
                    <li>
                        <span className={styles.checkIcon}><Check /></span>
                        Declaración jurada de domicilio legalizada. Ten en cuenta que al menos uno de los
                        contrayentes debe vivir en la jurisdicción de la Municipalidad de Huanuara.</li>
                    <li>
                        <span className={styles.checkIcon}><Check /></span>
                        Certificado médico prenupcial, otorgado en el hospital o puesto de salud de tu localidad,
                        con antigüedad no mayor a 1 mes.</li>
                    <li>
                        <span className={styles.checkIcon}><Check /></span>
                        Copia del DNI, de ambos lados, de los testigos. No deben ser familiares
                        de ninguno de los contrayentes.</li>
                </ul>
            </ContentSection>

            <ContentSection id="casos" title="Requisitos según el caso">
                <p className={styles.introText}>
                    Dependiendo de la situación legal de los contrayentes, se deben presentar documentos adicionales:
                </p>

                <div className={styles.casosGrid}>
                    <div className={styles.casoCard}>
                        <h3 className={styles.subtitle}>Si uno es divorciado</h3>
                        <ul className={styles.checkList}>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Declaración jurada de hijos bajo patria potestad y bienes del matrimonio anterior.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Acta de matrimonio anterior original con anotación de disolución del vínculo.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Si es mujer: certificado médico de no embarazo (si no pasaron 300 días del divorcio).
                            </li>
                        </ul>
                    </div>

                    <div className={styles.casoCard}>
                        <h3 className={styles.subtitle}>Si uno es viudo</h3>
                        <ul className={styles.checkList}>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Declaración jurada de hijos bajo patria potestad y bienes o inventario judicial.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Acta de matrimonio anterior original y actualizada.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Acta de defunción del anterior cónyuge original y actualizada.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Si es viuda: certificado médico de no embarazo (si no pasaron 300 días del fallecimiento).
                            </li>
                        </ul>
                    </div>

                    <div className={`${styles.casoCard} ${styles.casoCardFull}`}>
                        <h3 className={styles.subtitle}>Si uno es extranjero</h3>
                        <ul className={styles.checkList}>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Acta de nacimiento apostillada o legalizada por el Ministerio de Relaciones Exteriores.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Pasaporte o carnet de extranjería.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Constancia de soltería apostillada o legalizada.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Si es divorciado: partida de matrimonio anterior con disolución del vínculo, apostillada.
                            </li>
                            <li>
                                <span className={styles.checkIcon}><Check /></span>
                                Documentos en otro idioma deben tener traducción oficial por traductor juramentado.
                            </li>
                        </ul>
                    </div>
                </div>

                <Alert variant="warning" title="Importante">
                    La documentación presentada para este trámite no debe tener más de 3 meses de antigüedad,
                    a excepción del Certificado Médico prenupcial.
                </Alert>
            </ContentSection>

            <ContentSection id="como" title="¿Cómo realizar el trámite?">
                <StepList
                    steps={[
                        {
                            title: 'Dirígete a la Municipalidad',
                            description:
                                'Acércate a la Sede Principal de la Municipalidad de Huanuara, de lunes a viernes de 8:00 a. m. a 12:00 p. m., y entrega los documentos al menos 20 días hábiles antes de la boda. Abrirán tu expediente matrimonial y te entregarán el edicto.',
                        },
                        {
                            title: 'Paga el trámite',
                            description:
                                'Ve a la caja del municipio y paga en efectivo por el derecho a trámite.',
                        },
                        {
                            title: 'Publica el edicto matrimonial',
                            description:
                                'Lleva el edicto al periódico de circulación nacional. Luego, entrega una copia en la municipalidad para que lo coloque en el mural por 8 días calendario. Si no hay oposición, se declara la capacidad para contraer matrimonio.',
                        },
                        {
                            title: 'Asiste a la ceremonia',
                            description:
                                'Acude al lugar el día y hora acordados con tu pareja y los testigos. Todos deben llevar su DNI.',
                        },
                        {
                            title: 'Recoge tu acta de matrimonio',
                            description:
                                'En un plazo máximo de 30 días hábiles, puedes solicitar el acta en el Reniec o en la Municipalidad de Huanuara.',
                        },
                    ]}
                />
            </ContentSection>

            <ContentSection id="costos" title="Costos del trámite">
                <p>
                    El pago se realiza en la caja del municipio en efectivo o con tarjeta.
                    Los costos se dividen en:
                </p>

                <h3 className={styles.subtitle}>Costos fijos</h3>
                <CostTable items={[
                    { label: 'Pliego matrimonial', price: 'S/ 105.00' },
                    { label: 'Formato de solicitud (hoja de envío)', price: 'S/ 3.30' },
                ]} />

                <h3 className={styles.subtitle} style={{ marginTop: '1.5rem' }}>Según el horario y lugar</h3>
                <CostTable items={[
                    { label: 'En la municipalidad y en horario de trabajo', price: 'S/ 187.00' },
                    { label: 'En la municipalidad y fuera del horario de trabajo (tarde)', price: 'S/ 213.40' },
                    { label: 'Fuera de la municipalidad y en horario de trabajo', price: 'S/ 309.10' },
                    { label: 'Fuera de la municipalidad y fuera del horario de trabajo', price: 'S/ 341.40' },
                    { label: 'Fuera del distrito y dentro del horario de trabajo', price: 'S/ 411.10' },
                    { label: 'Fuera del distrito y fuera del horario de trabajo', price: 'S/ 438.70' },
                ]} />
            </ContentSection>

            <ContentSection id="despues" title="Después del matrimonio">
                <h3 className={styles.subtitle}>Inscripción del matrimonio</h3>
                <p>
                    Una vez realizado el matrimonio, la municipalidad registra el acta y, cuando
                    corresponda, remite la información al Reniec para su incorporación a la base de datos.
                </p>
                <p>
                    Cuando el acta ya se encuentre disponible en la base de datos del Reniec, podrás
                    solicitar una copia certificada. Si el acta aún no se encuentra disponible, deberás
                    solicitarla en la municipalidad donde se registró el matrimonio.
                </p>
            </ContentSection>

            {/* CTA Final */}
            <div className={styles.ctaBox}>
                <div className={styles.ctaText}>
                    <h3 className={styles.ctaTitle}>¿Ya te casaste?</h3>
                    <p className={styles.ctaSubtitle}>
                        Puedes solicitar una copia digital de tu acta de matrimonio desde la plataforma.
                    </p>
                </div>
                <Link to="/services/certificates">
                    <Button variant="primary" size="md">Solicitar partida</Button>
                </Link>
            </div>
        </div>
    );
};