import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Footer = () => {

    const data = useStaticQuery(query)

    const socialMedia = data.wp.siteGeneralSettings.ACFTopMenu.socialMedia[0].socialNetwork

    return (
        <footer className="bg-gray-clear py-5">
            <div className="container">
                <div className="row footer-menu pb-4 mb-4">
                    <div className="col-md-3" >
                        <h4>Servicios</h4>
                    </div>
                    <div className="col-md-3" >
                        <h4>Políticas</h4>
                    </div>
                    <div className="col-md-3" >
                        <h4>Nosotros</h4>
                    </div>
                    <div className="col-md-3" >
                        <h4>Contacto</h4>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-6">
                        © Todos los derechos reservados {new Date().getFullYear()} Multiasistir E.A.T
                    </div>
                    <div className="col-6">
                        <ul className="d-flex wrap-social justify-content-end">
                            { 
                                socialMedia.map(( social, key) => {
                                    return (
                                        <li key={key}> <a href={social.url} target={`_blank`} rel={`noreferrer noopener`} title={social.meta} > <Img fixed={social.icon.localFile.childImageSharp.fixed} alt={social.meta} /></a></li>
                                    )
                                }) 
                            }
                        </ul>
                    </div>
                </div>
            </div>
            
        </footer>
    )
}

export default Footer

const query = graphql`
    query FooterQuery {
        wp {
            siteGeneralSettings {
                ACFTopMenu {
                socialMedia {
                    socialNetwork {
                    meta
                    url
                    icon {
                        localFile {
                            childImageSharp {
                                fixed(width: 50, height: 50) {
                                    ...GatsbyImageSharpFixed_noBase64
                                }
                            }
                        }
                    }
                    }
                }
                }
            }
        }
    }
`