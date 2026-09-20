import { Check } from '../../../assets/icons/Common/Common'
import './BirthServicePage.css'

export const BirthServicePage = () => {

    return (
        <div className="birth-service">

            <header className="birth-service__section">
                <h1 className="birth-service__title">
                    Inscripción de nacimiento
                </h1>

                <p className="birth-service__description">
                    Si tienes un hijo recién nacido, debes registrarlo en cualquier
                    oficina del Reniec a nivel nacional. Si no hay una cerca de tu
                    localidad, puedes realizar la inscripción en la municipalidad
                    de tu distrito o provincia y obtener su acta o partida de
                    nacimiento por primera vez.
                </p>

                <p className="birth-service__description">
                    Este procedimiento es gratuito y permite que tu hijo disfrute
                    de todos los beneficios de ser un ciudadano peruano, como
                    obtener su DNI o acceder a programas sociales.
                </p>
            </header>

            <section className="birth-service__section">
                <h2 className="birth-service__subtitle">
                    Antes de realizar la inscripción
                </h2>

                <div className="birth-service__info">
                    <h3 className="birth-service__info-title">
                        Certificado de Nacido Vivo (CNV)
                    </h3>

                    <p className="birth-service__info-description">
                        El Certificado de Nacido Vivo debe ser generado en el
                        establecimiento de salud donde se atendió el parto.
                    </p>

                    <p className="birth-service__info-description">
                        De esta manera, se genera el Certificado de Nacido Vivo,
                        que identifica a la madre y al profesional que atendió
                        el parto o cesárea.
                    </p>

                    <p className="birth-service__info-description">
                        Este certificado es el requisito básico para conseguir
                        el Acta de Nacimiento y la inscripción del niño en los
                        Registros Civiles.
                    </p>
                </div>
            </section>

            <section className="birth-service__section">
                <h2 className="birth-service__subtitle">
                    Requisitos para la inscripción
                </h2>

                <div className="birth-service__requirements">
                    <h3 className="birth-service__requirements-title">
                        Padres casados
                    </h3>

                    <ul className="birth-service__requirements-list">
                        <li className="birth-service__requirements-item">
                            <Check />
                            Certificado de Nacido Vivo (CNV) original.
                        </li>
                        <li className="birth-service__requirements-item">
                            <Check />
                            DNI vigente del padre o de la madre que realiza la inscripción.
                        </li>
                        <li className="birth-service__requirements-item">
                            <Check />
                            Acta o partida de matrimonio, cuando sea necesario
                            acreditar el vínculo matrimonial.
                        </li>
                        <li className="birth-service__requirements-item">
                            <Check />
                            No es necesario que ambos padres acudan al Registro Civil.
                        </li>
                    </ul>
                </div>

                <div className="birth-service__requirements">
                    <h3 className="birth-service__requirements-title">
                        Padres no casados
                    </h3>

                    <ul className="birth-service__requirements-list">
                        <li className="birth-service__requirements-item">
                            <Check />
                            Certificado de Nacido Vivo (CNV) original.
                        </li>
                        <li className="birth-service__requirements-item">
                            <Check />
                            DNI vigente de ambos padres.
                        </li>
                        <li className="birth-service__requirements-item">
                            <Check />
                            Es necesaria la presencia de ambos padres para realizar
                            este trámite. Si solo se presenta uno de ellos, la
                            municipalidad lo notificará en la inscripción como
                            padre ausente.
                        </li>
                    </ul>
                </div>
            </section>

            <section className="birth-service__section">
                <div className="birth-service__notice">
                <p>
                    <strong>Importante:</strong>{" "}
                    No es necesario llevar al recién nacido para realizar la inscripción.
                </p>
                </div>      
            </section>               

            <section className="birth-service__section">
                <h2 className="birth-service__subtitle">
                    Plazo para realizar la inscripción
                </h2>

                <p className="birth-service__info-description">
                    La inscripción ordinaria debe realizarse dentro de los
                    60 días calendario siguientes al nacimiento.
                </p>

                <p className="birth-service__info-description">
                    Si el nacimiento no fue inscrito dentro del plazo
                    correspondiente, deberá realizarse mediante el procedimiento
                    de inscripción de nacimiento extemporánea.
                </p>
            </section>

            <section className="birth-service__section">
                <h2 className="birth-service__subtitle">
                    ¿Cómo realizar el trámite?
                </h2>

                <div className="birth-service__steps">

                    <article className="birth-service__step">
                        <span className="birth-service__step-number">1</span>

                        <div className="birth-service__step-content">
                            <h3 className="birth-service__step-title">
                                Acude al Registro Civil
                            </h3>

                            <p className="birth-service__step-description">
                                Dirígete al Registro Civil de la Municipalidad
                                Distrital de Huanuara con la documentación necesaria
                                para realizar la inscripción.
                            </p>
                        </div>
                    </article>

                    <article className="birth-service__step">
                        <span className="birth-service__step-number">2</span>

                        <div className="birth-service__step-content">
                            <h3 className="birth-service__step-title">
                                Presenta la documentación
                            </h3>

                            <p className="birth-service__step-description">
                                Entrega los documentos requeridos para la inscripción,
                                como el Certificado de Nacido Vivo y la identificación
                                del padre o madre.
                            </p>
                        </div>
                    </article>

                    <article className="birth-service__step">
                        <span className="birth-service__step-number">3</span>

                        <div className="birth-service__step-content">
                            <h3 className="birth-service__step-title">
                                Recibe el acta de nacimiento
                            </h3>

                            <p className="birth-service__step-description">
                                Una vez realizada la inscripción, el registrador
                                entregará la primera copia certificada del acta
                                de nacimiento sin costo.
                            </p>
                        </div>
                    </article>

                </div>
            </section>

            <section className="birth-service__section">
                <h2 className="birth-service__subtitle">
                    Costo del trámite
                </h2>

                <p className='birth-service__description'>
                    La inscripción ordinaria de nacimiento es gratuita. La
                    primera copia certificada del acta de nacimiento también
                    se entrega gratuitamente como parte de la inscripción.
                </p>
            </section>


        </div>
    )
}