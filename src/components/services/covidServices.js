import React from 'react'
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

import ScheduleForm from "../scheduleForm"
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
                    <div className="align-items-center col-md-4 py-4 d-flex flex-column justify-content-between">
                        <a href="/servicios/plan-hospitalizacion-10-dias/" className="text-center">
                            <div className="text-center">
                                <Img fixed={data.covid3.childImageSharp.fixed} />
                                <h3 className="mb-5">Toma de muestras<br/> COVID - 19</h3>
                                <p>La prueba PCR es la por excelencia la prueba clínica de diagnóstico y es exigida en los aeropuertos internacionales para los viajeros. La prueba Rápida de Antígenos, es indicada para las personas que con sintomatología requieren de un diagnostico en un tiempo menor a dos horas.</p>
                            </div>
                            <Img fixed={data.iconPlus.childImageSharp.fixed} />
                        </a>
                    </div>
                    <div className="align-items-center col-md-4 py-4 d-flex flex-column justify-content-between">
                        <a href="/servicios/plan-hospitalizacion-10-dias/" className="text-center">
                            <div className="text-center">
                                <Img fixed={data.covid1.childImageSharp.fixed} />
                                <h3 className="mb-5">Plan de hospitalización <br/> de 10 días</h3>
                                <p>Servicio de asistencia y manejo médico al paciente con diagnóstico positivo para Covid - 19, evitando la complicación, deterioro y la consecuente hospitalización en centro asistencial. Evolución médica, Seguimiento permanente, Terapia respiratoria, etc.</p>
                            </div>
                            <Img fixed={data.iconPlus.childImageSharp.fixed} />
                        </a>
                    </div>
                    <div className="align-items-center col-md-4 py-4 d-flex flex-column justify-content-between">
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
                            <Img fluid={data.link1.childImageSharp.fluid} alt="Manual del usuario Multiasistir"/>
                        </a>
                    </div>
                    <div className="col-md-6 text-center">
                        <button data-bs-toggle="modal" data-bs-target="#ModalExamAgenda">
                            <Img fluid={data.link2.childImageSharp.fluid} alt="Agendar exámenes de laboratorio"/>
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
                                <ScheduleForm />
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
            fixed (width: 150) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    covid2: file(name: {eq: "icon-covid-2"}) {
        childImageSharp {
            fixed (width: 150) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    covid3: file(name: {eq: "icon-covid-3"}) {
        childImageSharp {
            fixed (width: 150) {
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
            fluid (maxWidth: 500) {
                ...GatsbyImageSharpFluid_noBase64
            }
        }
    }
    link2: file(name: {eq: "link2"}) {
        childImageSharp {
            fluid (maxWidth: 500) {
                ...GatsbyImageSharpFluid_noBase64
            }
        }
    }
  }
`