import { Check } from "../../../assets/icons/Common/Common"
import "./MarriageServicePage.css"

export const MarriageServicePage = () => {

    return (
        <div className="marriage-service">

            <section className="marriage-service__section">
                <h1 className="marriage-service__title">
                    Matrimonio civil
                </h1>

                <p className="marriage-service__description">
                    Si eres mayor de edad y deseas contraer matrimonio civil con tu pareja,
                    debes realizar el trámite ante la municipalidad correspondiente.
                </p>

                <p className="marriage-service__description">
                    El matrimonio civil es la unión voluntaria de dos personas ante la ley
                    con el propósito de hacer vida en común. Ambos cónyuges tienen iguales
                    derechos, deberes, consideraciones, responsabilidades y autoridad en el hogar.
                </p>
            </section>

            <section className="marriage-service__section">
                <h2 className="marriage-service__subtitle">
                    Requisitos generales
                </h2>

                <ul className="marriage-service__list">
                    <li className="marriage-service__list-item">
                        <Check />
                        Solicitud simple dirigida al alcalde o alcaldesa. Debe estar firmada por los contrayentes.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Copia certificada de las actas de nacimiento de los contrayentes,
                        con una antigüedad no mayor a 3 meses.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Copia de ambos lados del DNI de los contrayentes.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Certificado negativo para matrimonio (Reniec) o declaración jurada de soltería legalizada.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Declaración jurada de domicilio legalizada. Ten en cuenta que al menos
                        uno de los contrayentes debe vivir en la jurisdicción de la Municipalidad de Huanuara.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Certificado médico prenupcial, otorgado en el hospital o puesto de salud
                        de tu localidad, con antigüedad no mayor a 1 mes.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Copia del DNI, de ambos lados, de los testigos. No deben ser familiares
                        de ninguno de los contrayentes.
                    </li>
                </ul>
            </section>

            <section className="marriage-service__section">
                <h2 className="marriage-service__subtitle">
                    Si uno de los contrayentes es divorciado
                </h2>

                <ul className="marriage-service__list">
                    <li className="marriage-service__list-item">
                        <Check />
                        Declaración jurada que indique el número de hijos bajo tu patria potestad
                        y bienes que están bajo la administración de tu anterior matrimonio.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Acta de matrimonio anterior original y actualizada con la anotación de
                        la disolución del vínculo matrimonial (sentencia de divorcio y la
                        inscripción de la misma en los Registros Públicos).
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Si eres mujer, agrega un certificado médico expedido por el Ministerio
                        de Salud, que acredite no encontrarse embarazada, al no haber transcurrido
                        300 días del divorcio (Código Civil Art. 243, inciso 3).
                    </li>
                </ul>
            </section>

            <section className="marriage-service__section">
                <h2 className="marriage-service__subtitle">
                    Si uno de los contrayentes es viudo
                </h2>

                <ul className="marriage-service__list">
                    <li className="marriage-service__list-item">
                        <Check />
                        Declaración jurada donde figure el número de hijos bajo tu patria potestad
                        y bienes que están bajo tu administración o inventario judicial.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Acta de matrimonio anterior original y actualizada.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Acta de defunción del anterior cónyuge original y actualizada.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        En caso de viuda, agrega un certificado médico que acredite no encontrarse
                        embarazada, cuando no hayan transcurrido 300 días desde el fallecimiento
                        del cónyuge anterior.
                    </li>
                </ul>
            </section>

            <section className="marriage-service__section">
                <h2 className="marriage-service__subtitle">
                    Si uno de los contrayentes es extranjero
                </h2>

                <ul className="marriage-service__list">
                    <li className="marriage-service__list-item">
                        <Check />
                        Acta de nacimiento apostillada (Convenio de la Haya) por el país de origen.
                        Caso contrario, debe estar legalizada por el Ministerio de Relaciones Exteriores.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Pasaporte o carnet de extranjería.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Constancia de soltería apostillada (Convenio de la Haya) por el país de origen.
                        Caso contrario, debe estar legalizada por el Ministerio de Relaciones Exteriores.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Si eres divorciado, agrega la partida de tu matrimonio anterior con la
                        disolución del vínculo matrimonial o sentencia del divorcio, debidamente apostillada.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Si los documentos presentados están en otro idioma, deberán contar con
                        traducción oficial por un traductor público juramentado o por la Junta
                        de Vigilancia de Traductores Públicos.
                    </li>
                </ul>
            </section>

            <section className="marriage-service__section">
                <div className="marriage-service__notice">
                    <p>
                        <strong>Importante:</strong>{" "}
                        La documentación presentada para este trámite no debe tener más de
                        3 meses de antigüedad a excepción del Certificado Médico prenupcial.
                    </p>
                </div>
            </section>

            <section className="marriage-service__section">
                <h2 className="marriage-service__title">
                    ¿Cómo realizar el trámite?
                </h2>

                <div className="marriage-service__steps">
                    <article className="marriage-service__step">
                        <span className="marriage-service__step-number">1</span>

                        <div className="marriage-service__step-content">
                            <h3 className="marriage-service__step-title">
                                Dirígete a la Municipalidad
                            </h3>

                            <p className="marriage-service__step-description">
                                Acércate a la Sede Principal de la Municipalidad de Huanuara,
                                de lunes a viernes de 8:00 a. m. a 12:00 p. m., y entrega los
                                documentos indicados en requisitos, al menos 20 días hábiles antes de la boda.
                            </p>

                            <p className="marriage-service__step-description">
                                La municipalidad abrirá tu expediente matrimonial y te entregará
                                el edicto para que lo publiques. Luego, debes elegir el día, la hora
                                y el lugar para realizar tu matrimonio.
                            </p>
                        </div>
                    </article>

                    <article className="marriage-service__step">
                        <span className="marriage-service__step-number">2</span>

                        <div className="marriage-service__step-content">
                            <h3 className="marriage-service__step-title">
                                Paga el trámite
                            </h3>

                            <p className="marriage-service__step-description">
                                Ve a la caja del municipio y paga en efectivo por el derecho a trámite.
                            </p>
                        </div>
                    </article>

                    <article className="marriage-service__step">
                        <span className="marriage-service__step-number">3</span>

                        <div className="marriage-service__step-content">
                            <h3 className="marriage-service__step-title">
                                Publica el edicto matrimonial
                            </h3>

                            <p className="marriage-service__step-description">
                                Lleva el edicto matrimonial al periódico de circulación nacional
                                de tu preferencia. Una vez publicado el texto, lleva una copia o
                                un comprobante de difusión a la municipalidad para que lo coloque
                                en un mural de sus oficinas durante 8 días calendario.
                            </p>

                            <p className="marriage-service__step-description">
                                Si tu pareja tiene su domicilio en otro distrito, debe tramitar el
                                edicto (exhibición de edicto matrimonial), previo pago, en la
                                municipalidad que le corresponde. Esta publicará el documento y lo
                                devolverá firmado y sellado para que sea anexado al expediente matrimonial.
                            </p>

                            <p className="marriage-service__step-description">
                                Si transcurren los 8 días sin oposición o noticia de algún impedimento,
                                la municipalidad declarará la capacidad de ambos contrayentes para contraer matrimonio.
                            </p>
                        </div>
                    </article>

                    <article className="marriage-service__step">
                        <span className="marriage-service__step-number">4</span>

                        <div className="marriage-service__step-content">
                            <h3 className="marriage-service__step-title">
                                Asiste a la ceremonia
                            </h3>

                            <p className="marriage-service__step-description">
                                Acude al lugar el día y hora acordados, donde un funcionario dirigirá
                                el matrimonio. Los contrayentes y los testigos deben llevar su DNI a la ceremonia.
                            </p>
                        </div>
                    </article>

                    <article className="marriage-service__step">
                        <span className="marriage-service__step-number">5</span>

                        <div className="marriage-service__step-content">
                            <h3 className="marriage-service__step-title">
                                Recoge tu acta de matrimonio
                            </h3>

                            <p className="marriage-service__step-description">
                                En un plazo máximo de 30 días hábiles después de la ceremonia,
                                puedes solicitar el acta de matrimonio en el Reniec o acudir a la
                                Municipalidad Distrital de Huanuara, de lunes a viernes de
                                8:00 a. m. hasta las 12:00 p. m., para solicitar una copia certificada.
                            </p>
                        </div>
                    </article>                    
                </div>


            </section>

            <section className="marriage-service__section">
                <h2 className="marriage-service__subtitle">
                    Costos del trámite
                </h2>

                <p className="marriage-service__description">
                    Ve a la caja del municipio y paga en efectivo o con tarjeta por el derecho
                    a trámite, según la siguiente escala de precios:
                </p>

                <ul className="marriage-service__list">
                    <li className="marriage-service__list-item">
                        <Check />
                        Pliego matrimonial: S/ 105.00.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Formato de solicitud (hoja de envío): S/ 3.30.
                    </li>
                </ul>

                <p className="marriage-service__description">
                    Los siguientes costos se determinan según el horario y lugar:
                </p>

                <ul className="marriage-service__list">
                    <li className="marriage-service__list-item">
                        <Check />
                        En la municipalidad y en horario de trabajo: S/ 187.00.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        En la municipalidad y fuera del horario de trabajo (tarde): S/ 213.40.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Fuera de la municipalidad y en horario de trabajo: S/ 309.10.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Fuera de la municipalidad y fuera del horario de trabajo: S/ 341.40.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Fuera del distrito y dentro del horario de trabajo: S/ 411.10.
                    </li>

                    <li className="marriage-service__list-item">
                        <Check />
                        Fuera del distrito y fuera del horario de trabajo: S/ 438.70.
                    </li>
                </ul>
            </section>

            <section className="marriage-service__section">
                <h2 className="marriage-service__subtitle">
                    Después del matrimonio
                </h2>

                <h3 className="marriage-service__heading">
                    Inscripción del matrimonio
                </h3>

                <p className="marriage-service__description">
                    Una vez realizado el matrimonio, la municipalidad registra el acta y,
                    cuando corresponda, remite la información al Reniec para su incorporación
                    a la base de datos.
                </p>

                <p className="marriage-service__description">
                    Cuando el acta ya se encuentre disponible en la base de datos del Reniec,
                    podrás solicitar una copia certificada. Si el acta aún no se encuentra
                    disponible, deberás solicitarla en la municipalidad donde se registró el matrimonio.
                </p>
            </section>

        </div>
    )
}