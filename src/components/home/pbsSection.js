import React from 'react'
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

const Pbs = () => {
    
    const data = useStaticQuery(imageQuery);

    return(
        <section className="wrap_pbs_services">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="pb-5">Servicios PBS</h2>
                    </div>
                    <div className="col-md-3 wow animate__fadeInRight" style={{animationDelay: `400ms`}}>
                        <div className="bg-white align-items-center d-flex flex-column p-4">
                            <strong className="txt-blue-dark d-block text-center fs-6 mb-2">Ambulancia las 24 horas</strong>
                            <Img fixed={data.pbs1.childImageSharp.fixed} />
                            <p className="text-center">Salvamos y cuidamos vidas las 24 horas del día, con atención médica en sitio donde se necesite.</p>
                            <span>Ver más +</span>
                        </div>
                    </div>
                    <div className="col-md-3 wow animate__fadeInRight" style={{animationDelay: `600ms`}}>
                        <div className="bg-white align-items-center d-flex flex-column p-4">
                            <strong className="txt-blue-dark d-block text-center fs-6 mb-2">Consulta médica domiciliaria</strong>
                            <Img fixed={data.pbs2.childImageSharp.fixed} />
                            <p className="text-center">La mayoría de los problemas de salud se pueden resolver en casa con una consulta médica.</p>
                            <span>Ver más +</span>
                        </div>
                    </div>
                    <div className="col-md-3 wow animate__fadeInRight" style={{animationDelay: `800ms`}}>
                        <div className="bg-white align-items-center d-flex flex-column p-4">
                            <strong className="txt-blue-dark d-block text-center fs-6 mb-2">Asistencia a urgencias médicas</strong>
                            <Img fixed={data.pbs3.childImageSharp.fixed} />
                            <p className="text-center">La atención urgente surge cuando se hace necesaria la asistencia inmediata.</p>
                            <span>Ver más +</span>
                        </div>
                    </div>
                    <div className="col-md-3 wow animate__fadeInRight" style={{animationDelay: `1000ms`}}>
                        <div className="bg-white align-items-center d-flex flex-column p-4">
                            <strong className="txt-blue-dark d-block text-center fs-6 mb-2">Enfermería</strong>
                            <Img fixed={data.pbs4.childImageSharp.fixed} />
                            <p className="text-center">Proceso de atención de enfermería (PAE), es un método sistemático de brindar cuidado eficientes.</p>
                            <span>Ver más +</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pbs

const imageQuery = graphql`
  query pbsImageQuery {
    pbs1: file(name: {eq: "icon-pbs-1"}) {
        childImageSharp {
            fixed (width: 100) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    pbs2: file(name: {eq: "icon-pbs-2"}) {
        childImageSharp {
            fixed (width: 100) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    pbs3: file(name: {eq: "icon-pbs-3"}) {
        childImageSharp {
            fixed (width: 100) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    pbs4: file(name: {eq: "icon-pbs-4"}) {
        childImageSharp {
            fixed (width: 100) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
  }
`