import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby"

const Pac = () => {
    
    const data = useStaticQuery(imageQuery);

    return (
        <section className="wrap_pac_services">
            <GatsbyImage
                image={data.banner.childImageSharp.gatsbyImageData}
                className="wow animate__fadeInLeft"
                alt="Plan de atención Complementaria" />
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-lg-6 py-5 px-5">
                        <GatsbyImage
                            image={data.logoPac.childImageSharp.gatsbyImageData}
                            className="wow animate__fadeInRight"
                            alt="Plan de atención Complementaria" />
                        <p className="mt-2 mb-4 wow animate__fadeInRight">El Plan de Atención Complementaria (PAC); garantiza la atención integral para ti y los que más quieres, con una amplia red medica de especialistas, mayor cobertura y atención preferencial.</p>
                        <div className="container mb-3">
                            <div className="row">
                                <div className="align-items-center col-md-4 d-flex flex-column wow animate__fadeInRight" style={{animationDelay: `400ms`}}>
                                    <GatsbyImage image={data.middle1.childImageSharp.gatsbyImageData} />
                                    <strong className="d-block text-center fs-6 mt-2">Atención médica domiciliaria</strong>
                                </div>
                                <div className="align-items-center col-md-4 d-flex flex-column wow animate__fadeInRight" style={{animationDelay: `600ms`}}>
                                    <GatsbyImage image={data.middle2.childImageSharp.gatsbyImageData} />
                                    <strong className="d-block text-center fs-6 mt-2">Atención en accidentes</strong>
                                </div>
                                <div className="align-items-center col-md-4 d-flex flex-column wow animate__fadeInRight" style={{animationDelay: `800ms`}}>
                                    <GatsbyImage image={data.middle3.childImageSharp.gatsbyImageData} />
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

const imageQuery = graphql`query imageQuery {
  banner: file(name: {eq: "banner-middle"}) {
    childImageSharp {
      gatsbyImageData(width: 960, layout: CONSTRAINED)
    }
  }
  logoPac: file(name: {eq: "logo-pac"}) {
    childImageSharp {
      gatsbyImageData(width: 300, placeholder: NONE, layout: FIXED)
    }
  }
  middle1: file(name: {eq: "icon-middle-1"}) {
    childImageSharp {
      gatsbyImageData(width: 100, placeholder: NONE, layout: FIXED)
    }
  }
  middle2: file(name: {eq: "icon-middle-2"}) {
    childImageSharp {
      gatsbyImageData(width: 100, placeholder: NONE, layout: FIXED)
    }
  }
  middle3: file(name: {eq: "icon-middle-3"}) {
    childImageSharp {
      gatsbyImageData(width: 100, placeholder: NONE, layout: FIXED)
    }
  }
}
`