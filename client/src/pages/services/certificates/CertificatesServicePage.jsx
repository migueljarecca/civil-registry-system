import { Check } from "../../../assets/icons/Common/Common"
import "./CertificatesServicePage.css"


export const CertificatesServicePage = () => {

    return (
        <div className="certificates-service">
            <section className="certificates-service__section">
                <h1 className="certificates-service__title">
                    Solicitud de partidas digitales
                </h1>

                <p className="certificates-service__description">
                    Este servicio permite solicitar copias digitales de partidas de
                    nacimiento, matrimonio y defunción registradas en el Registro Civil
                    de la Municipalidad Distrital de Huanuara.
                </p>
            </section>

            <section className="certificates-service__section">
                <h2 className="certificates-service__subtitle">
                    Información importante
                </h2>

                <ul className="certificates-service__list">
                    <li className="certificates-service__list-item">
                        <Check />
                        Solo puedes solicitar partidas registradas en el Registro Civil de
                        la Municipalidad Distrital de Huanuara.
                    </li>

                    <li className="certificates-service__list-item">
                        <Check />
                        La búsqueda de la partida puede arrojar un resultado negativo si
                        no se encuentra registrada o si los datos proporcionados son
                        insuficientes.
                    </li>

                    <li className="certificates-service__list-item">
                        <Check />
                        Algunas partidas antiguas pueden requerir una verificación manual
                        antes de su emisión.
                    </li>

                    <li className="certificates-service__list-item">
                        <Check />
                        La solicitud está sujeta a la validación de los datos
                        proporcionados por el solicitante.
                    </li>

                    <li className="certificates-service__list-item">
                        <Check />
                        La entrega del documento dependerá de la disponibilidad y
                        validación del registro correspondiente.
                    </li>
                </ul>
            </section>

            <section className="certificates-service__section">
                <h2 className="certificates-service__subtitle">
                    ¿Quién puede solicitar una partida?
                </h2>

                <p className="certificates-service__description">
                    La solicitud puede ser realizada por el titular de la partida o por
                    una persona que cuente con la autorización o el interés legítimo
                    correspondiente, según la naturaleza del trámite.
                </p>
            </section>            

            <section className="certificates-service__section">
                <h2 className="certificates-service__subtitle">
                    ¿Cómo solicitar una partida digital?
                </h2>

                <div className="certificates-service__steps">
                    <article className="certificates-service__step">
                      <span className="certificates-service__step-number">1</span>

                      <div className="certificates-service__step-content">
                          <h3 className="certificates-service__step-title">
                            Inicia sesión
                          </h3>

                          <p className="certificates-service__step-description">
                            Identifícate para iniciar tu solicitud de manera segura.
                          </p>
                      </div>
                    </article>

                    <article className="certificates-service__step">
                    <span className="certificates-service__step-number">2</span>

                    <div className="certificates-service__step-content">
                        <h3 className="certificates-service__step-title">
                         Selecciona la partida
                        </h3>

                        <p className="certificates-service__step-description">
                         Indica si deseas solicitar una partida de nacimiento, matrimonio o defunción.
                        </p>
                    </div>
                    </article>

                    <article className="certificates-service__step">
                    <span className="certificates-service__step-number">3</span>

                    <div className="certificates-service__step-content">
                        <h3 className="certificates-service__step-title">
                         Completa los datos
                        </h3>

                        <p className="certificates-service__step-description">
                         Ingresa la información necesaria para localizar la partida.
                        </p>
                    </div>
                    </article>

                    <article className="certificates-service__step">
                    <span className="certificates-service__step-number">4</span>

                    <div className="certificates-service__step-content">
                        <h3 className="certificates-service__step-title">
                         Envía y consulta
                        </h3>

                        <p className="certificates-service__step-description">
                         Revisa tu solicitud y consulta su estado desde la plataforma.
                        </p>
                    </div>
                    </article>
                </div>
            </section>            

            <section className="certificates-service__section">
                <h2 className="certificates-service__subtitle">
                  Requisitos
                </h2>

                <p className="certificates-service__description">
                  Para realizar la solicitud, debes contar con la siguiente
                  información:
                </p>

                <ul className="certificates-service__list">
                  <li className="certificates-service__list-item">
                    <Check />
                    Documento Nacional de Identidad (DNI) del solicitante.
                  </li>

                  <li className="certificates-service__list-item">
                    <Check />
                    Tipo de partida: nacimiento, matrimonio o defunción.
                  </li>

                  <li className="certificates-service__list-item">
                    <Check />
                    Nombres y apellidos de la persona registrada.
                  </li>

                  <li className="certificates-service__list-item">
                    <Check />
                    Fecha del registro, si se conoce.
                  </li>

                  <li className="certificates-service__list-item">
                    <Check />
                    Número de acta, libro o folio, si se dispone de esta información.
                  </li>
                </ul>
            </section>

      <section className="certificates-service__section">
        <div className="certificates-service__notice">
          <p>
            <strong>Importante:</strong>{" "}
            Mientras más información proporciones, será más fácil localizar
            la partida solicitada.
          </p>
        </div>      
      </section>      

      <section className="certificates-service__section">
          <h2 className="certificates-service__title">
            Solicitud de partidas - Trámite presencial
          </h2>

          <p className="certificates-service__description">
            Si deseas realizar la solicitud de manera presencial, puedes acudir
            a la oficina de Registro Civil de la Municipalidad Distrital de
            Huanuara.
          </p>
      </section>

      <section className="certificates-service__section">
          <h2 className="certificates-service__subtitle">
            Lugar y horario de atención
          </h2>

          <div className="certificates-service__information">
            <p className="certificates-service__description">
              <strong>Oficina de Registro Civil</strong>
              <br />
              Municipalidad Distrital de Huanuara.
            </p>

            <p className="certificates-service__description">
              <strong>Horario de atención:</strong>
              <br />
              De lunes a viernes, en el horario establecido por la
              Municipalidad.
            </p>
          </div>
      </section>

      <section className="certificates-service__section">
          <h2 className="certificates-service__subtitle">
            Tiempo de atención
          </h2>

          <p className="certificates-service__description">
            El tiempo de atención dependerá de la disponibilidad y validación de
            la partida solicitada.
          </p>
      </section>

      <section className="certificates-service__section">
          <h2 className="certificates-service__subtitle">
            Costo y medios de pago
          </h2>

          <p className="certificates-service__description">
            La información sobre el costo del trámite y los medios de pago será
            proporcionada durante el proceso de solicitud, de acuerdo con las
            disposiciones de la Municipalidad.
          </p>
      </section>

      <section className="certificates-service__section certificates-service__section--status">
          <h2 className="certificates-service__title">
            Consulta el estado de tu solicitud
          </h2>

          <p className="certificates-service__description">
            Si ya realizaste una solicitud, puedes consultar el estado de tu
            trámite utilizando el número de solicitud asignado durante el
            registro.
          </p>

          <ul className="certificates-service__status-list">
            <li className="certificates-service__status-item">
              Pendiente
            </li>
            <li className="certificates-service__status-item">
              En revisión
            </li>
          </ul>
      </section>      
        </div>
    )
}