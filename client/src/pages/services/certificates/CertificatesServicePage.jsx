import { Check } from "../../../assets/icons/Common/Common"
import "./CertificatesServicePage.css"


export const CertificatesServicePage = () => {

    return (
        <main className="certificates-service">
            <section className="certificates-service__hero">
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
                <h2 className="certificates-service__section-title">
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

        </main>
    )
}