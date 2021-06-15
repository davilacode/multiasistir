import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql } from "gatsby"

const Pbs = () => {
    
    const data = useStaticQuery(imageQuery);

    return (
        <section className="wrap_pbs_services">
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h2 className="pb-5">Servicios PBS</h2>
                    </div>
                    <div className="col-md-6 mb-4 col-lg-3 wow animate__fadeInRight" style={{animationDelay: `400ms`}}>
                        <a className="bg-white align-items-center d-flex flex-column p-4" href={data.ambulance.uri}>
                            <strong className="txt-blue-dark d-block text-center fs-6 mb-2">{data.ambulance.title}</strong>
                            <GatsbyImage image={data.pbs1.childImageSharp.gatsbyImageData} />
                            <p className="text-center">{data.ambulance.ACFLeadServices.leadHome}</p>
                            <span>Ver más +</span>
                        </a>
                    </div>
                    <div className="col-md-6 mb-4 col-lg-3 wow animate__fadeInRight" style={{animationDelay: `600ms`}}>
                        <a className="bg-white align-items-center d-flex flex-column p-4" href={data.homeMedical.uri}>
                            <strong className="txt-blue-dark d-block text-center fs-6 mb-2">{data.homeMedical.title}</strong>
                            <GatsbyImage image={data.pbs2.childImageSharp.gatsbyImageData} />
                            <p className="text-center">{data.homeMedical.ACFLeadServices.leadHome}</p>
                            <span>Ver más +</span>
                        </a>
                    </div>
                    <div className="col-md-6 mb-4 col-lg-3 wow animate__fadeInRight" style={{animationDelay: `800ms`}}>
                        <div className="bg-white align-items-center d-flex flex-column p-4">
                            <strong className="txt-blue-dark d-block text-center fs-6 mb-2">Asistencia a urgencias médicas</strong>
                            <GatsbyImage image={data.pbs3.childImageSharp.gatsbyImageData} />
                            <p className="text-center">La atención urgente surge cuando se hace necesaria la asistencia inmediata.</p>
                            <span>Ver más +</span>
                        </div>
                    </div>
                    <div className="col-md-6 mb-4 col-lg-3 wow animate__fadeInRight" style={{animationDelay: `1000ms`}}>
                        <div className="bg-white align-items-center d-flex flex-column p-4">
                            <strong className="txt-blue-dark d-block text-center fs-6 mb-2">Enfermería</strong>
                            <GatsbyImage image={data.pbs4.childImageSharp.gatsbyImageData} />
                            <p className="text-center">Proceso de atención de enfermería (PAE), es un método sistemático de brindar cuidado eficientes.</p>
                            <span>Ver más +</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Pbs

const imageQuery = graphql`query pbsImageQuery {
  pbs1: file(name: {eq: "icon-pbs-1"}) {
    childImageSharp {
      gatsbyImageData(width: 100, placeholder: NONE, layout: FIXED)
    }
  }
  pbs2: file(name: {eq: "icon-pbs-2"}) {
    childImageSharp {
      gatsbyImageData(width: 100, placeholder: NONE, layout: FIXED)
    }
  }
  pbs3: file(name: {eq: "icon-pbs-3"}) {
    childImageSharp {
      gatsbyImageData(width: 100, placeholder: NONE, layout: FIXED)
    }
  }
  pbs4: file(name: {eq: "icon-pbs-4"}) {
    childImageSharp {
      gatsbyImageData(width: 100, placeholder: NONE, layout: FIXED)
    }
  }
  homeMedical: wpPage(id: {eq: "cG9zdDozMzY="}) {
    id
    title
    uri
    ACFLeadServices {
      leadHome
    }
  }
  ambulance: wpPage(id: {eq: "cG9zdDozNDE="}) {
    id
    title
    uri
    ACFLeadServices {
      leadHome
    }
  }
}
`