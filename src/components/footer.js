import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image";
import PdfFile from "/content/assets/MANUAL DEL USUARIO MULTIASISTIR.pdf"

const Footer = () => {

    const data = useStaticQuery(query)

    const socialMedia = data.wp.siteGeneralSettings.ACFTopMenu.socialMedia[0].socialNetwork

    return (
        <footer className="wrap_footer bg-gray-clear pb-4">
            <div className="container">
                <div className="row footer-menu pb-4 mb-4">
                    <div className="col-md-3 pb-3 pb-md-0" >
                        <strong>Servicios</strong>
                        <ul>
                            {data.services && data.services.edges.map((service) =>(
                                <li key={service.node.id}>
                                    <a href={service.node.uri} title={service.node.title}>{service.node.title}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="col-md-3 pb-3 pb-md-0" >
                        <a href={`/politicas/`} title={`Políticas`}><strong>Políticas</strong></a>
                        <ul>
                          <li><a href={PdfFile} title={`Manual de Usuario`} target="_blank" rel="noreferrer noopener">Manual de Usuario</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 pb-3 pb-md-0" >
                        <strong>Nosotros</strong>
                        <ul>
                            <li><a href={`/nosotros`} title={`Reseña Histórica`}>Reseña Histórica</a></li>
                            <li><a href={`/nosotros`} title={`Misión`}>Misión</a></li>
                            <li><a href={`/nosotros`} title={`Visión`}>Visión</a></li>
                            <li><a href={`/nosotros`} title={`Principios Institucionales`}>Principios Institucionales</a></li>
                            <li><a href={`/nosotros`} title={`Valores organizacionales`}>Valores organizacionales</a></li>
                        </ul>
                    </div>
                    <div className="col-md-3 pb-3 pb-md-0" >
                        <a href={`/contacto/`} title={`Contacto`}><strong>Contacto</strong></a>
                        <ul>
                            <li><a href={`/trabaja-con-nosotros`} title={`Trabaja con nosotros`}>Trabaja con nosotros</a></li>
                        </ul>
                    </div>
                </div>
                <div className="row align-items-center">
                    <div className="col-6">
                        <p className="copyright">© Todos los derechos reservados {new Date().getFullYear()} Multiasistir E.A.T</p>
                    </div>
                    <div className="col-6">
                        <ul className="d-flex wrap-social justify-content-end">
                            { 
                                socialMedia.map(( social, key) => {
                                    return (
                                        <li key={key}> <a href={social.url} target={`_blank`} rel={`noreferrer noopener`} title={social.meta} > <GatsbyImage
                                            image={social.icon.localFile.childImageSharp.gatsbyImageData}
                                            alt={social.meta} /></a></li>
                                    );
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

const query = graphql`query FooterQuery {
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
                  gatsbyImageData(width: 50, height: 50, placeholder: NONE, layout: FIXED)
                }
              }
            }
          }
        }
      }
    }
  }
  services: allWpPage(
    filter: {parentDatabaseId: {eq: 90}}
    sort: {fields: menuOrder}
  ) {
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