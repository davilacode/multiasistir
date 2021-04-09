import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const Footer = () => {

    const data = useStaticQuery(query)

    const socialMedia = data.wp.siteGeneralSettings.ACFTopMenu.socialMedia[0].socialNetwork

    return (
        <footer className="wrap_footer bg-gray-clear pb-4">
            <div className="container">
                <div className="row footer-menu pb-4 mb-4">
                    <div className="col-md-3" >
                        <strong>Servicios</strong>
                        <ul>
                            {data.services && data.services.edges.map((service) =>(
                                <li key={service.node.id}>
                                    <a href={service.node.uri} title={service.node.title}>{service.node.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-3" >
                        <strong>Políticas</strong>
                    </div>
                    <div className="col-md-3" >
                        <strong>Nosotros</strong>
                        <li><a href={`/nosotros`} title={`Reseña Histórica`}>Reseña Histórica</a></li>
                        <li><a href={`/nosotros`} title={`Misión`}>Misión</a></li>
                        <li><a href={`/nosotros`} title={`Visión`}>Visión</a></li>
                        <li><a href={`/nosotros`} title={`Principios Institucionales`}>Principios Institucionales</a></li>
                        <li><a href={`/nosotros`} title={`Valores organizacionales`}>Valores organizacionales</a></li>
                    </div>
                    <div className="col-md-3" >
                        <strong>Contacto</strong>
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
        services: allWpPage(filter: {parentDatabaseId: {eq: 90}}) {
            edges {
                node {
                    id
                    uri
                    title
                }
            }
        }
    }
`