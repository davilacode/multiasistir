import React from 'react'
import { GatsbyImage } from "gatsby-plugin-image";
import { useStaticQuery, graphql, Link } from "gatsby"

const Pac = () => {
    
    const data = useStaticQuery(imageQuery);

    const pacSection = data.wpPage.ACFLeadServices;
    const logoPac = data.logoPac.childImageSharp.gatsbyImageData;

    return (
        <section className="wrap_pac_services">
            <GatsbyImage
                image={pacSection.imageLead.localFile.childImageSharp.gatsbyImageData}
                className="wow animate__fadeInLeft"
                alt="Plan de atención Complementaria" />
            <div className="container">
                <div className="row justify-content-end">
                    <div className="col-lg-6 py-5 px-5">
                        <GatsbyImage
                            image={logoPac}
                            className="wow animate__fadeInRight"
                            alt="Plan de atención Complementaria" />
                        <p className="mt-2 mb-4 wow animate__fadeInRight">{pacSection.leadHome}</p>
                        <div className="container mb-3">
                            <div className="row">
                                {pacSection?.icons?.map(({icon, label}) => {
                                  return (
                                    <div className="align-items-center col-md-4 d-flex flex-column wow animate__fadeInRight" style={{animationDelay: `400ms`}}>
                                      <GatsbyImage image={icon?.localFile?.childImageSharp?.gatsbyImageData} alt={label} />
                                      <strong className="d-block text-center fs-6 mt-2">{label}</strong>
                                    </div>
                                  )
                                })}
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

query pacSection {
  wpPage(slug: {eq: "pac"}) {
    title
    ACFLeadServices {
      leadHome
      imageLead {
        localFile {
          childImageSharp {
            gatsbyImageData(width: 960, layout: CONSTRAINED)
          }
        }
      }
      icons {
        icon {
          localFile {
            childImageSharp {
              gatsbyImageData(width: 100, placeholder: NONE, layout: FIXED)
            }
          }
        }
        label
      }
    }
  }
  logoPac: file(name: {eq: "logo-pac"}) {
    childImageSharp {
      gatsbyImageData(width: 300, placeholder: NONE, layout: FIXED)
    }
  }
}
`