import React from 'react'
import Img from "gatsby-image"
import { useStaticQuery, graphql, Link } from "gatsby"
// import parse from "html-react-parser"

const Pac = () => {
    
    const data = useStaticQuery(imageQuery);

    return(
        <section className="wrap_pac_services">
            <Img className="wow animate__fadeInLeft" fluid={data.banner.childImageSharp.fluid} alt="Plan de atención Complementaria"/>
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-md-6 py-5 px-5">
                        <Img  className="wow animate__fadeInRight" fixed={data.logoPac.childImageSharp.fixed} alt="Plan de atención Complementaria" />
                        <p className="mt-2 mb-4 wow animate__fadeInRight">El Plan de Atención Complementaria (PAC); garantiza la atención integral para ti y los que más quieres, con una amplia red medica de especialistas, mayor cobertura y atención preferencial.</p>
                        <div className="container mb-3">
                            <div className="row">
                                <div className="align-items-center col-md-4 d-flex flex-column wow animate__fadeInRight" style={{animationDelay: `400ms`}}>
                                    <Img fixed={data.middle1.childImageSharp.fixed} />
                                    <strong className="d-block text-center fs-6 mt-2">Atención médica domiciliaria</strong>
                                </div>
                                <div className="align-items-center col-md-4 d-flex flex-column wow animate__fadeInRight" style={{animationDelay: `600ms`}}>
                                    <Img fixed={data.middle2.childImageSharp.fixed} />
                                    <strong className="d-block text-center fs-6 mt-2">Atención en accidentes</strong>
                                </div>
                                <div className="align-items-center col-md-4 d-flex flex-column wow animate__fadeInRight" style={{animationDelay: `800ms`}}>
                                    <Img fixed={data.middle3.childImageSharp.fixed} />
                                    <strong className="d-block text-center fs-6 mt-2">Ambulancia las 24 horas</strong>
                                </div>
                            </div>
                        </div>  
                        <Link className="btn-link m-auto wow animate__fadeInUp" to="/servicios"  style={{animationDelay: `800ms`}}>Ver más</Link>    
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Pac

const imageQuery = graphql`
  query imageQuery {
    banner: file(name: {eq: "banner-middle"}) {
        childImageSharp {
            fluid (maxWidth: 960) {
                ...GatsbyImageSharpFluid
            }
        }
    }
    logoPac: file(name: {eq: "logo-pac"}) {
        childImageSharp {
            fixed (width: 300) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    middle1: file(name: {eq: "icon-middle-1"}) {
        childImageSharp {
            fixed (width: 100) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    middle2: file(name: {eq: "icon-middle-2"}) {
        childImageSharp {
            fixed (width: 100) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
    middle3: file(name: {eq: "icon-middle-3"}) {
        childImageSharp {
            fixed (width: 100) {
                ...GatsbyImageSharpFixed_noBase64
            }
        }
    }
  }
`