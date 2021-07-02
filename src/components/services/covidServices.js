import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby"

import ScheduleForm from "../scheduleForm"
import PdfFile from "../../../content/assets/MANUAL DEL USUARIO MULTIASISTIR.pdf"

const CovidServices = () => {

    const data = useStaticQuery(imageQuery)

    return (
        <section className="wrap_covid_services">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="pb-5">Servicios COVID-19</h2>
                    </div>
                </div>
                <div className="row split">
                    <div className="align-items-center col-md-4 py-4 d-flex flex-column justify-content-between">
                        <a href="/servicios/toma-de-muestras-covid-19/" className="text-center">
                            <div className="text-center">
                                <GatsbyImage image={data.covid3.childImageSharp.gatsbyImageData} />
                                <h3 className="mb-5">Toma de muestras<br/> COVID - 19</h3>
                                <p>La prueba PCR es la por excelencia la prueba clínica de diagnóstico y es exigida en los aeropuertos internacionales para los viajeros. La prueba Rápida de Antígenos, es indicada para las personas que con sintomatología requieren de un diagnostico en un tiempo menor a dos horas.</p>
                            </div>
                            <GatsbyImage image={data.iconPlus.childImageSharp.gatsbyImageData} />
                        </a>
                    </div>
                    <div className="align-items-center col-md-4 py-4 d-flex flex-column justify-content-between">
                        <a href="/servicios/plan-hospitalizacion-10-dias/" className="text-center">
                            <div className="text-center">
                                <GatsbyImage image={data.covid1.childImageSharp.gatsbyImageData} />
                                <h3 className="mb-5">Plan de hospitalización <br/> de 10 días</h3>
                                <p>Servicio de asistencia y manejo médico al paciente con diagnóstico positivo para Covid - 19, evitando la complicación, deterioro y la consecuente hospitalización en centro asistencial. Evolución médica, Seguimiento permanente, Terapia respiratoria, etc.</p>
                            </div>
                            <GatsbyImage image={data.iconPlus.childImageSharp.gatsbyImageData} />
                        </a>
                    </div>
                    <div className="align-items-center col-md-4 py-4 d-flex flex-column justify-content-between">
                        <div className="text-center">
                            <GatsbyImage image={data.covid2.childImageSharp.gatsbyImageData} />
                            <h3 className="mb-5">Servicio de <br/>transporte</h3>
                            <p>Servicio de transporte en vehiculo convencional para transporte de pacientes y servicio de traslado en ambulancia.</p>
                        </div>
                        <GatsbyImage image={data.iconPlus.childImageSharp.gatsbyImageData} />
                    </div>
                </div>
                <div className="row link">
                    <div className="col-md-6 text-center">
                        <a href={PdfFile} download title="Manual del usuario Multiasistir">
                            <GatsbyImage
                                image={data.link1.childImageSharp.gatsbyImageData}
                                alt="Manual del usuario Multiasistir" />
                        </a>
                    </div>
                    <div className="col-md-6 text-center">
                        <button data-bs-toggle="modal" data-bs-target="#ModalExamAgenda">
                            <GatsbyImage
                                image={data.link2.childImageSharp.gatsbyImageData}
                                alt="Agendar exámenes de laboratorio" />
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

const imageQuery = graphql`query covidImageQuery {
  covid1: file(name: {eq: "icon-covid-1"}) {
    childImageSharp {
      gatsbyImageData(width: 150, placeholder: NONE, layout: FIXED)
    }
  }
  covid2: file(name: {eq: "icon-covid-2"}) {
    childImageSharp {
      gatsbyImageData(width: 150, placeholder: NONE, layout: FIXED)
    }
  }
  covid3: file(name: {eq: "icon-covid-3"}) {
    childImageSharp {
      gatsbyImageData(width: 150, placeholder: NONE, layout: FIXED)
    }
  }
  iconPlus: file(name: {eq: "icon-plus-white"}) {
    childImageSharp {
      gatsbyImageData(width: 50, placeholder: NONE, layout: FIXED)
    }
  }
  link1: file(name: {eq: "link1"}) {
    childImageSharp {
      gatsbyImageData(width: 500, placeholder: NONE, layout: CONSTRAINED)
    }
  }
  link2: file(name: {eq: "link2"}) {
    childImageSharp {
      gatsbyImageData(width: 500, placeholder: NONE, layout: CONSTRAINED)
    }
  }
}
`