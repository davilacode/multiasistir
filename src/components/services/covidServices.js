import React from 'react'
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import PdfFile from "../../../content/assets/MANUAL DEL USUARIO MULTIASISTIR.pdf"

const CovidServices = () => {

    const data = useStaticQuery(imageQuery)

    return(
        <section className="wrap_covid_services">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="pb-5">Servicios COVID-19</h2>
                    </div>
                </div>
                <div className="row split">
                    <div className="align-items-center col-md-6 d-flex flex-column justify-content-between">
                        <div className="text-center">
                            <Img fixed={data.covid1.childImageSharp.fixed} />
                            <h3 className="mb-5">Plan de hospitalización <br/> de 10 días</h3>
                            <p>Servicio de asistencia y manejo médico al paciente con diagnóstico positivo para Covid - 19, evitando la complicación, deterioro y la consecuente hospitalización en centro asistencial. Evolución médica, Seguimiento permanente, Terapia respiratoria, etc.</p>
                        </div>
                        <Img fixed={data.iconPlus.childImageSharp.fixed} />
                    </div>
                    <div className="align-items-center col-md-6 d-flex flex-column justify-content-between">
                        <div className="text-center">
                            <Img fixed={data.covid2.childImageSharp.fixed} />
                            <h3 className="mb-5">Servicio de <br/>transporte</h3>
                            <p>Servicio de transporte en vehiculo convencional para transporte de pacientes y servicio de traslado en ambulancia.</p>
                        </div>
                        <Img fixed={data.iconPlus.childImageSharp.fixed} />
                    </div>
                </div>
                <div className="row link">
                    <div className="col-md-6 text-center">
                        <a href={PdfFile} download title="Manual del usuario Multiasistir">
                            <Img fixed={data.link1.childImageSharp.fixed} alt="Manual del usuario Multiasistir"/>
                        </a>
                    </div>
                    <div className="col-md-6 text-center">
                        <button data-bs-toggle="modal" data-bs-target="#ModalExamAgenda">
                            <Img fixed={data.link2.childImageSharp.fixed} alt="Agendar exámenes de laboratorio"/>
                        </button>
                    </div>
                </div>
                <div className="modal fade" id="ModalExamAgenda" tabIndex="-1" aria-labelledby="ModalExamAgendaLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Agendar exámenes de laboratorio</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="mb-3">
                                        <label htmlFor="FirstName" className="form-label">Nombre</label>
                                        <input type="text" className="form-control" id="FirstName" aria-describedby="emailHelp"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="lastName" className="form-label">Apellido</label>
                                        <input type="text" className="form-control" id="lastName"/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label">Correo electrónico</label>
                                        <input type="email" className="form-control" id="email"/>
                                    </div>
                                    <div className="modal-footer d-flex justify-content-end pb-0 pe-0">
                                        <button type="submit" className="btn btn-primary">Enviar</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CovidServices

const imageQuery = graphql`
  query covidImageQuery {
    covid1: file(name: {eq: "icon-covid-1"}) {
        childImageSharp {
            fixed (width: 175) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    covid2: file(name: {eq: "icon-covid-2"}) {
        childImageSharp {
            fixed (width: 175) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    iconPlus: file(name: {eq: "icon-plus-white"}) {
        childImageSharp {
            fixed (width: 50) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    link1: file(name: {eq: "link1"}) {
        childImageSharp {
            fixed (width: 500) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    link2: file(name: {eq: "link2"}) {
        childImageSharp {
            fixed (width: 500) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
  }
`